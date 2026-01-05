"""API routes for pitch deck operations"""

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse
from typing import List, Dict, Any
from datetime import datetime
import io

from models.pitch_deck import PitchDeck, Slide, CompanyInfo
from data.default_slides import DEFAULT_SLIDES, COMPANY_INFO
from services.export_service import create_pptx, create_pdf

router = APIRouter(prefix="/pitch-deck", tags=["Pitch Deck"])


@router.get("/slides", response_model=List[Dict[str, Any]])
async def get_slides():
    """Get all pitch deck slides"""
    return DEFAULT_SLIDES


@router.get("/slides/{slide_id}", response_model=Dict[str, Any])
async def get_slide(slide_id: int):
    """Get a specific slide by ID"""
    for slide in DEFAULT_SLIDES:
        if slide["id"] == slide_id:
            return slide
    raise HTTPException(status_code=404, detail=f"Slide {slide_id} not found")


@router.get("/company-info", response_model=Dict[str, Any])
async def get_company_info():
    """Get company information"""
    return COMPANY_INFO


@router.get("/export/pptx")
async def export_pptx():
    """Export pitch deck as PowerPoint file"""
    try:
        pptx_bytes = create_pptx(DEFAULT_SLIDES, COMPANY_INFO)
        
        filename = f"NeoNoble_PitchDeck_{datetime.now().strftime('%Y%m%d')}.pptx"
        
        return Response(
            content=pptx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PowerPoint: {str(e)}")


@router.get("/export/pdf")
async def export_pdf():
    """Export pitch deck as PDF file"""
    try:
        pdf_bytes = create_pdf(DEFAULT_SLIDES, COMPANY_INFO)
        
        filename = f"NeoNoble_PitchDeck_{datetime.now().strftime('%Y%m%d')}.pdf"
        
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")


@router.get("/metadata")
async def get_metadata():
    """Get pitch deck metadata"""
    return {
        "name": COMPANY_INFO["name"],
        "version": "1.0",
        "total_slides": len(DEFAULT_SLIDES),
        "last_updated": datetime.utcnow().isoformat(),
        "export_formats": ["pptx", "pdf"]
    }
