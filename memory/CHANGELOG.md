# NeoNoble Ramp — Changelog

## April 2, 2026 - Sprint Finale
### DCA Trading Bot (P0) ✅
- Created `/app/backend/routes/dca_routes.py` — Full CRUD: create, list, pause, resume, cancel, history
- Integrated DCA executor into background scheduler (runs every 60s)
- Created `/app/frontend/src/pages/DCABot.js` — Full UI with plan cards, execution history table
- Added DCA Bot link card on Dashboard with AUTO badge
- Registered `/dca` route in App.js

### PDF Compliance Reports (P0) ✅
- Added `GET /api/export/compliance/pdf` to export_routes.py
- Generates professional PDF with: KYC status, portfolio summary, trade history, margin positions, DCA plans
- Uses ReportLab with NeoNoble purple branding
- PDF download button on DCA Bot page

### NIUM Onboarding Improvements (P0) ✅
- Updated customer creation payload: added `region`, enum codes for `estimatedMonthlyFunding`/`intendedUseOfAccount`
- Multi-version retry: v2 → v3 → v4 → v1 (v2 Unified API as primary)
- Added `GET /api/nium-onboarding/diagnostic` — full integration health check
- Added `GET /api/nium-onboarding/templates` — template discovery
- Added `GET /api/nium-onboarding/corporate-constants` — fetch NIUM config
- Added `POST /api/nium-onboarding/set-template-id` — admin runtime template config
- Template ID loaded from DB on startup (no .env edit required)

### SMS Notifications (P1) ✅
- Added `_send_sms_notification()` to notification_dispatch.py
- Twilio-ready: uses TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER env vars
- Silent fallback when Twilio not configured
- SMS logging to `sms_log` collection

### Bug Fixes
- Fixed blockchain listener `KeyError: 'address'` — now handles both `address` and `deposit_address` keys
- Fixed NIUM version priority (v2 first instead of v3)

### Testing
- Iteration 17: 24/24 tests passed (100% backend, 100% frontend)
