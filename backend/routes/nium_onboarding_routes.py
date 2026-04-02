"""
NIUM Customer Onboarding Routes — REAL API Integration (No Simulation).

Implements the full NIUM Unified Add Customer API with ALL onboarding methods:
1. E_KYC        — Electronic KYC (automated identity verification)
2. MANUAL_KYC   — Manual document upload + review
3. E_DOC_VERIFY — Electronic document verification
4. SCREENING_KYC— Screening-only (basic compliance checks)

API Reference: https://docs.nium.com/docs/unified-add-customer-api

Endpoints:
- POST /create-customer       — Create customer with selected KYC mode
- GET  /status                 — Get onboarding/compliance status
- GET  /customer-details       — Full NIUM customer details
- POST /upload-document        — Upload KYC document for MANUAL_KYC
- POST /respond-rfi            — Respond to NIUM Request for Information
- GET  /compliance-status      — Real-time compliance/KYC status
- POST /update-customer        — Update customer details
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
import httpx
import os
import uuid
import logging

from database.mongodb import get_database
from routes.auth import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/nium-onboarding", tags=["NIUM Onboarding"])

NIUM_API_KEY = os.environ.get("NIUM_API_KEY", "")
NIUM_BASE_URL = os.environ.get("NIUM_API_BASE", "https://gateway.nium.com")
NIUM_CLIENT_HASH = os.environ.get("NIUM_CLIENT_HASH_ID", "")


def _nium_headers() -> dict:
    """Standard NIUM API headers per API Reference."""
    return {
        "x-api-key": NIUM_API_KEY,
        "x-request-id": str(uuid.uuid4()),
        "x-client-name": "NeoNobleRamp",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


# ── Models ──

class IdentificationDoc(BaseModel):
    identification_type: str = Field(description="PASSPORT, NATIONAL_ID, DRIVING_LICENCE, etc.")
    identification_value: str
    identification_doc_expiry: Optional[str] = None

class TaxDetail(BaseModel):
    country_of_residence: str
    tax_id_number: str

class OnboardCustomerRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    country_code: str = Field(default="IT", description="ISO 2-letter country code")
    nationality: str = Field(default="IT")
    date_of_birth: str = Field(description="YYYY-MM-DD format")
    mobile: str = Field(description="Phone number without country prefix")
    kyc_mode: str = Field(default="E_KYC", description="E_KYC, MANUAL_KYC, E_DOC_VERIFY, SCREENING_KYC")
    billing_address1: str = Field(default="")
    billing_city: str = Field(default="")
    billing_zip_code: str = Field(default="")
    billing_country: str = Field(default="IT")
    billing_state: Optional[str] = None
    country_of_birth: Optional[str] = None
    pep: bool = Field(default=False, description="Politically Exposed Person")
    verification_consent: bool = Field(default=True)
    intended_use_of_account: str = Field(default="Day-to-day spending")
    estimated_monthly_funding: str = Field(default="1000-5000")
    identification_doc: Optional[List[IdentificationDoc]] = None
    tax_details: Optional[List[TaxDetail]] = None

class UpdateCustomerRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    mobile: Optional[str] = None
    billing_address1: Optional[str] = None
    billing_city: Optional[str] = None
    billing_zip_code: Optional[str] = None

class UploadDocumentRequest(BaseModel):
    document_type: str = Field(description="PASSPORT, NATIONAL_ID, DRIVING_LICENCE, UTILITY_BILL, BANK_STATEMENT")
    document_front_base64: str = Field(description="Base64 encoded front of document")
    document_back_base64: Optional[str] = None

class RfiResponseRequest(BaseModel):
    rfi_hash_id: str
    rfi_response_fields: dict


# ── Helper: Make authenticated NIUM call ──

async def _nium_request(method: str, path: str, json_data: dict = None) -> dict:
    """Execute authenticated NIUM API request. Returns raw response data."""
    url = f"{NIUM_BASE_URL}{path}"
    headers = _nium_headers()
    request_id = headers["x-request-id"]

    db = get_database()
    log_entry = {
        "id": request_id,
        "method": method,
        "path": path,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            if method == "POST":
                resp = await client.post(url, json=json_data, headers=headers)
            elif method == "PUT":
                resp = await client.put(url, json=json_data, headers=headers)
            elif method == "GET":
                resp = await client.get(url, headers=headers)
            else:
                resp = await client.request(method, url, json=json_data, headers=headers)

            log_entry["status_code"] = resp.status_code
            log_entry["response_preview"] = resp.text[:500]
            await db.nium_api_logs.insert_one({**log_entry, "_id": request_id})

            if resp.status_code >= 400:
                error_detail = resp.text[:500]
                logger.error(f"[NIUM] {method} {path}: {resp.status_code} - {error_detail}")
                return {
                    "error": True,
                    "status_code": resp.status_code,
                    "detail": error_detail,
                    "request_id": request_id,
                }

            return resp.json() if resp.text else {"success": True}

    except httpx.TimeoutException:
        logger.error(f"[NIUM] Timeout on {method} {path}")
        log_entry["error"] = "Timeout"
        await db.nium_api_logs.insert_one({**log_entry, "_id": request_id})
        return {"error": True, "detail": "NIUM API timeout", "request_id": request_id}
    except Exception as e:
        logger.error(f"[NIUM] Exception on {method} {path}: {e}")
        log_entry["error"] = str(e)
        await db.nium_api_logs.insert_one({**log_entry, "_id": request_id})
        return {"error": True, "detail": str(e), "request_id": request_id}


# ── Endpoints ──

@router.post("/create-customer")
async def create_nium_customer(
    req: OnboardCustomerRequest,
    current_user: dict = Depends(get_current_user),
):
    """
    Create a REAL NIUM customer. Supports all KYC modes:
    - E_KYC: Electronic (automated) identity verification
    - MANUAL_KYC: Manual document review
    - E_DOC_VERIFY: Electronic document verification
    - SCREENING_KYC: Screening-only compliance checks

    NO simulated fallback. Returns real NIUM response or real error.
    """
    if not NIUM_API_KEY or not NIUM_CLIENT_HASH:
        raise HTTPException(
            status_code=503,
            detail="Configurazione NIUM mancante. Assicurati che NIUM_API_KEY e NIUM_CLIENT_HASH_ID siano impostati nel .env",
        )

    db = get_database()
    uid = current_user["user_id"]

    # Check if already onboarded
    user = await db.users.find_one({"id": uid}, {"_id": 0})
    if user and user.get("nium_customer_hash") and user.get("nium_mode") == "live":
        return {
            "message": "Cliente NIUM gia presente",
            "customer_hash": user["nium_customer_hash"],
            "wallet_hash": user.get("nium_wallet_hash", ""),
            "status": "existing",
            "mode": "live",
        }

    # Validate KYC mode
    valid_modes = ["E_KYC", "MANUAL_KYC", "E_DOC_VERIFY", "SCREENING_KYC"]
    if req.kyc_mode.upper() not in valid_modes:
        raise HTTPException(
            status_code=400,
            detail=f"kycMode non valido. Modi supportati: {', '.join(valid_modes)}",
        )

    # Build NIUM payload (per Unified Add Customer API)
    payload = {
        "firstName": req.first_name,
        "lastName": req.last_name,
        "email": req.email,
        "nationality": req.nationality,
        "countryCode": req.country_code,
        "mobile": req.mobile,
        "dateOfBirth": req.date_of_birth,
        "kycMode": req.kyc_mode.upper(),
        "pep": req.pep,
        "verificationConsent": req.verification_consent,
        "intendedUseOfAccount": req.intended_use_of_account,
        "estimatedMonthlyFunding": req.estimated_monthly_funding,
    }

    if req.billing_address1:
        payload["billingAddress1"] = req.billing_address1
    if req.billing_city:
        payload["billingCity"] = req.billing_city
    if req.billing_zip_code:
        payload["billingZipCode"] = req.billing_zip_code
    if req.billing_country:
        payload["billingCountry"] = req.billing_country
    if req.billing_state:
        payload["billingState"] = req.billing_state
    if req.country_of_birth:
        payload["countryOfBirth"] = req.country_of_birth

    # Identification documents (for MANUAL_KYC and E_DOC_VERIFY)
    if req.identification_doc:
        payload["identificationDoc"] = [
            {
                "identificationType": doc.identification_type,
                "identificationValue": doc.identification_value,
                **({"identificationDocExpiry": doc.identification_doc_expiry} if doc.identification_doc_expiry else {}),
            }
            for doc in req.identification_doc
        ]

    # Tax details (EU compliance)
    if req.tax_details:
        payload["taxDetails"] = [
            {"countryOfResidence": td.country_of_residence, "taxIdNumber": td.tax_id_number}
            for td in req.tax_details
        ]

    # Call NIUM API
    result = await _nium_request(
        "POST",
        f"/api/v1/client/{NIUM_CLIENT_HASH}/customer",
        payload,
    )

    if result.get("error"):
        # Return the real error — NO simulation
        raise HTTPException(
            status_code=result.get("status_code", 502),
            detail={
                "message": "Errore NIUM API durante la creazione del cliente",
                "nium_error": result.get("detail", "Errore sconosciuto"),
                "request_id": result.get("request_id"),
                "troubleshooting": [
                    "Verifica che NIUM_API_KEY sia corretto e attivo",
                    "Verifica che NIUM_CLIENT_HASH_ID sia il tuo clientHashId NIUM (UUID 36 caratteri)",
                    "Verifica che NIUM_API_BASE sia corretto (https://gateway.nium.com per produzione, https://sandbox.nium.com per test)",
                    f"KYC mode usato: {req.kyc_mode.upper()}",
                    "Controlla i log su NIUM Portal > Logs per dettagli",
                ],
            },
        )

    # Success — extract customer/wallet hash
    customer_hash = result.get("customerHashId", "")
    wallet_hash = result.get("walletHashId", "")

    await db.users.update_one(
        {"id": uid},
        {"$set": {
            "nium_customer_hash": customer_hash,
            "nium_wallet_hash": wallet_hash,
            "nium_onboarded_at": datetime.now(timezone.utc).isoformat(),
            "nium_mode": "live",
            "nium_kyc_mode": req.kyc_mode.upper(),
            "nium_compliance_status": result.get("complianceStatus", "INITIATED"),
            "nium_data": {
                "first_name": req.first_name,
                "last_name": req.last_name,
                "country": req.country_code,
                "email": req.email,
            },
        }},
    )

    logger.info(f"[NIUM] Customer created LIVE: {customer_hash} (wallet: {wallet_hash}) for user {uid}")
    return {
        "message": "Cliente NIUM creato con successo",
        "customer_hash": customer_hash,
        "wallet_hash": wallet_hash,
        "compliance_status": result.get("complianceStatus", "INITIATED"),
        "kyc_mode": req.kyc_mode.upper(),
        "status": "live",
        "redirect_url": result.get("redirectUrl", ""),
    }


@router.get("/status")
async def get_onboarding_status(current_user: dict = Depends(get_current_user)):
    """Get NIUM onboarding status for current user."""
    db = get_database()
    user = await db.users.find_one(
        {"id": current_user["user_id"]},
        {"_id": 0, "nium_customer_hash": 1, "nium_wallet_hash": 1,
         "nium_mode": 1, "nium_onboarded_at": 1, "nium_kyc_mode": 1,
         "nium_compliance_status": 1},
    )
    if not user or not user.get("nium_customer_hash"):
        return {"onboarded": False, "nium_configured": bool(NIUM_API_KEY and NIUM_CLIENT_HASH)}

    return {
        "onboarded": True,
        "customer_hash": user["nium_customer_hash"],
        "wallet_hash": user.get("nium_wallet_hash", ""),
        "mode": user.get("nium_mode", "unknown"),
        "kyc_mode": user.get("nium_kyc_mode", ""),
        "compliance_status": user.get("nium_compliance_status", ""),
        "onboarded_at": user.get("nium_onboarded_at"),
    }


@router.get("/customer-details")
async def get_customer_details(current_user: dict = Depends(get_current_user)):
    """Get full NIUM customer details from their API."""
    if not NIUM_API_KEY or not NIUM_CLIENT_HASH:
        raise HTTPException(status_code=503, detail="Configurazione NIUM mancante")

    db = get_database()
    user = await db.users.find_one({"id": current_user["user_id"]}, {"_id": 0})
    if not user or not user.get("nium_customer_hash"):
        raise HTTPException(status_code=404, detail="Cliente NIUM non trovato. Effettua prima l'onboarding.")

    customer_hash = user["nium_customer_hash"]
    result = await _nium_request(
        "GET",
        f"/api/v1/client/{NIUM_CLIENT_HASH}/customer/{customer_hash}",
    )

    if result.get("error"):
        raise HTTPException(
            status_code=result.get("status_code", 502),
            detail=f"Errore NIUM: {result.get('detail', 'Errore sconosciuto')}",
        )

    return {"customer": result, "source": "nium_live"}


@router.get("/compliance-status")
async def get_compliance_status(current_user: dict = Depends(get_current_user)):
    """Check real-time NIUM compliance/KYC status for customer."""
    if not NIUM_API_KEY or not NIUM_CLIENT_HASH:
        raise HTTPException(status_code=503, detail="Configurazione NIUM mancante")

    db = get_database()
    user = await db.users.find_one({"id": current_user["user_id"]}, {"_id": 0})
    if not user or not user.get("nium_customer_hash"):
        raise HTTPException(status_code=404, detail="Cliente NIUM non trovato")

    customer_hash = user["nium_customer_hash"]

    # Customer Details V2 API for compliance status
    result = await _nium_request(
        "GET",
        f"/api/v1/client/{NIUM_CLIENT_HASH}/customer/{customer_hash}",
    )

    if result.get("error"):
        raise HTTPException(
            status_code=result.get("status_code", 502),
            detail=f"Errore NIUM: {result.get('detail', 'Errore sconosciuto')}",
        )

    compliance = result.get("complianceStatus", "UNKNOWN")

    # Update local status
    await db.users.update_one(
        {"id": current_user["user_id"]},
        {"$set": {"nium_compliance_status": compliance}},
    )

    return {
        "compliance_status": compliance,
        "kyc_status": result.get("kycStatus", ""),
        "customer_hash": customer_hash,
        "status_description": {
            "INITIATED": "Processo avviato, in attesa di verifica",
            "ACTION_REQUIRED": "Azione richiesta dal cliente",
            "RFI_REQUESTED": "Richiesta informazioni aggiuntive (RFI)",
            "IN_PROGRESS": "Verifica in corso",
            "COMPLETED": "Verifica completata con successo",
            "REJECTED": "Verifica rifiutata",
            "ERROR": "Errore nel processo di verifica",
        }.get(compliance, "Stato sconosciuto"),
    }


@router.post("/upload-document")
async def upload_document(
    req: UploadDocumentRequest,
    current_user: dict = Depends(get_current_user),
):
    """Upload KYC document to NIUM (for MANUAL_KYC mode)."""
    if not NIUM_API_KEY or not NIUM_CLIENT_HASH:
        raise HTTPException(status_code=503, detail="Configurazione NIUM mancante")

    db = get_database()
    user = await db.users.find_one({"id": current_user["user_id"]}, {"_id": 0})
    if not user or not user.get("nium_customer_hash"):
        raise HTTPException(status_code=404, detail="Cliente NIUM non trovato. Effettua prima l'onboarding.")

    customer_hash = user["nium_customer_hash"]

    payload = {
        "documentType": req.document_type,
        "document": req.document_front_base64,
    }
    if req.document_back_base64:
        payload["documentBack"] = req.document_back_base64

    result = await _nium_request(
        "POST",
        f"/api/v1/client/{NIUM_CLIENT_HASH}/customer/{customer_hash}/documents",
        payload,
    )

    if result.get("error"):
        raise HTTPException(
            status_code=result.get("status_code", 502),
            detail=f"Errore upload documento NIUM: {result.get('detail', 'Errore sconosciuto')}",
        )

    return {"message": "Documento caricato con successo su NIUM", "result": result}


@router.post("/respond-rfi")
async def respond_to_rfi(
    req: RfiResponseRequest,
    current_user: dict = Depends(get_current_user),
):
    """Respond to NIUM Request for Information (RFI)."""
    if not NIUM_API_KEY or not NIUM_CLIENT_HASH:
        raise HTTPException(status_code=503, detail="Configurazione NIUM mancante")

    db = get_database()
    user = await db.users.find_one({"id": current_user["user_id"]}, {"_id": 0})
    if not user or not user.get("nium_customer_hash"):
        raise HTTPException(status_code=404, detail="Cliente NIUM non trovato")

    customer_hash = user["nium_customer_hash"]

    result = await _nium_request(
        "POST",
        f"/api/v1/client/{NIUM_CLIENT_HASH}/customer/{customer_hash}/rfi/{req.rfi_hash_id}",
        req.rfi_response_fields,
    )

    if result.get("error"):
        raise HTTPException(
            status_code=result.get("status_code", 502),
            detail=f"Errore risposta RFI NIUM: {result.get('detail', 'Errore sconosciuto')}",
        )

    return {"message": "Risposta RFI inviata a NIUM", "result": result}


@router.post("/update-customer")
async def update_customer(
    req: UpdateCustomerRequest,
    current_user: dict = Depends(get_current_user),
):
    """Update existing NIUM customer details."""
    if not NIUM_API_KEY or not NIUM_CLIENT_HASH:
        raise HTTPException(status_code=503, detail="Configurazione NIUM mancante")

    db = get_database()
    user = await db.users.find_one({"id": current_user["user_id"]}, {"_id": 0})
    if not user or not user.get("nium_customer_hash"):
        raise HTTPException(status_code=404, detail="Cliente NIUM non trovato")

    customer_hash = user["nium_customer_hash"]
    payload = {}
    if req.first_name:
        payload["firstName"] = req.first_name
    if req.last_name:
        payload["lastName"] = req.last_name
    if req.email:
        payload["email"] = req.email
    if req.mobile:
        payload["mobile"] = req.mobile
    if req.billing_address1:
        payload["billingAddress1"] = req.billing_address1
    if req.billing_city:
        payload["billingCity"] = req.billing_city
    if req.billing_zip_code:
        payload["billingZipCode"] = req.billing_zip_code

    if not payload:
        raise HTTPException(status_code=400, detail="Nessun campo da aggiornare")

    result = await _nium_request(
        "PUT",
        f"/api/v1/client/{NIUM_CLIENT_HASH}/customer/{customer_hash}",
        payload,
    )

    if result.get("error"):
        raise HTTPException(
            status_code=result.get("status_code", 502),
            detail=f"Errore aggiornamento NIUM: {result.get('detail', 'Errore sconosciuto')}",
        )

    return {"message": "Dati cliente NIUM aggiornati", "result": result}


@router.get("/available-methods")
async def get_available_methods():
    """Get all available NIUM onboarding methods and configuration status."""
    return {
        "nium_configured": bool(NIUM_API_KEY and NIUM_CLIENT_HASH),
        "nium_base_url": NIUM_BASE_URL,
        "client_hash_set": bool(NIUM_CLIENT_HASH),
        "api_key_set": bool(NIUM_API_KEY),
        "available_kyc_modes": [
            {
                "mode": "E_KYC",
                "description": "Verifica elettronica automatica dell'identita",
                "requires_documents": False,
                "auto_verification": True,
            },
            {
                "mode": "MANUAL_KYC",
                "description": "Upload manuale documenti + revisione NIUM",
                "requires_documents": True,
                "auto_verification": False,
            },
            {
                "mode": "E_DOC_VERIFY",
                "description": "Verifica elettronica dei documenti",
                "requires_documents": True,
                "auto_verification": True,
            },
            {
                "mode": "SCREENING_KYC",
                "description": "Solo screening di compliance base",
                "requires_documents": False,
                "auto_verification": True,
            },
        ],
        "required_fields": {
            "mandatory": ["first_name", "last_name", "email", "nationality", "country_code", "mobile", "date_of_birth", "kyc_mode"],
            "recommended_eu": ["billing_address1", "billing_city", "billing_zip_code", "billing_country", "tax_details"],
            "for_manual_kyc": ["identification_doc"],
        },
        "setup_instructions": {
            "step_1": "Accedi a https://admin.nium.com (o sandbox: https://admin-sandbox.nium.com)",
            "step_2": "Vai su Configuration > API Keys",
            "step_3": "Copia il clientHashId (UUID 36 caratteri) e impostalo come NIUM_CLIENT_HASH_ID nel .env",
            "step_4": "Copia l'API Key e impostala come NIUM_API_KEY nel .env",
            "step_5": "Per sandbox usa NIUM_API_BASE=https://sandbox.nium.com, per produzione usa https://gateway.nium.com",
            "step_6": "Configura i webhook su NIUM Portal per ricevere aggiornamenti sullo stato di compliance",
        },
    }
