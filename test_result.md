# Testing Status - Password Reset Feature

## Current Testing Session
**Date**: 2026-03-09
**Focus**: Password Reset via Email (Resend)

## Test Requirements

### Backend API Tests
- [ ] GET /api/password/status - Service status
- [ ] POST /api/password/forgot - Request password reset
- [ ] POST /api/password/verify-token - Verify reset token
- [ ] POST /api/password/reset - Reset password with token
- [ ] POST /api/password/change - Change password (authenticated)

### Frontend Tests
- [ ] Forgot password page loads at /forgot-password
- [ ] Reset password page loads at /reset-password
- [ ] Login page has "Password dimenticata?" link

### Test Scenario
1. Request password reset for registered email
2. Verify token is created in database
3. Verify invalid token returns error
4. Reset password with valid token
5. Verify old token is marked as used

### Backend URL
https://hybrid-treasury.preview.emergentagent.com/api

## Notes
- Email service works even without API key (logs but doesn't send)
- Token expires after 1 hour
- Emails are in Italian

