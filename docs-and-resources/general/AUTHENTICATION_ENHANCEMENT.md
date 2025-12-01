# Authentication System Enhancement

## Overview
Enhanced Chickalo's authentication system with email validation, uniqueness enforcement, and a complete forgot password flow.

## Features Implemented

### 1. Email Validation
- **Frontend**: Already had email regex validation in `ValidationUtils.isValidEmail()`
- **Backend**: Added `is_valid_email()` function in `auth.py`
  - Uses regex pattern: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  - Applied to both registration and login endpoints

### 2. Email Uniqueness
- **Already Enforced**: Database schema has `UNIQUE` constraint on `users.email`
- **Backend Check**: `register_user()` queries DB before creating new user
- **Error Message**: Returns `'User with this email already exists'` (400 error)

### 3. Forgot Password System

#### Database
- **New Table**: `password_reset_tokens`
  ```sql
  - id (SERIAL PRIMARY KEY)
  - user_id (FK to users, CASCADE delete)
  - token (VARCHAR 255, UNIQUE)
  - expires_at (TIMESTAMP) - 1 hour expiration
  - used (BOOLEAN DEFAULT false)
  - created_at (TIMESTAMP)
  ```
- **Indexes**: On `token` and `user_id` for performance

#### Backend API (`auth.py`)
1. **`request_password_reset()`** - `/api/auth/forgot-password` (POST)
   - Validates email format
   - Generates secure token using `secrets.token_urlsafe(32)`
   - Stores token with 1-hour expiration
   - Logs reset link to console (email integration pending)
   - **Security**: Always returns same message (doesn't reveal if email exists)

2. **`verify_reset_token()`** - `/api/auth/verify-reset-token` (POST)
   - Checks if token exists
   - Validates not used
   - Validates not expired
   - Returns validation status

3. **`reset_password()`** - `/api/auth/reset-password` (POST)
   - Validates token (exists, not used, not expired)
   - Validates new password (min 6 characters)
   - Hashes new password with bcrypt
   - Updates user's password_hash
   - Marks token as used
   - Returns success message

#### Frontend Components

1. **ForgotPasswordScreen** (`/mobile/src/screens/ForgotPasswordScreen.tsx`)
   - Email input with validation
   - Calls `authAPI.requestPasswordReset()`
   - Shows success message regardless of email existence (security)
   - "Back to Login" link

2. **ResetPasswordScreen** (`/mobile/src/screens/ResetPasswordScreen.tsx`)
   - New password + confirm password inputs
   - Validates password matching and length
   - Calls `authAPI.resetPassword(token, password)`
   - Returns to login on success

3. **LoginScreen** - Updated
   - Added "Forgot password?" link below sign-in button
   - Navigates to ForgotPasswordScreen

4. **App.tsx** - Updated Navigation
   - Added `forgotPassword` and `resetPassword` to Screen type
   - Added `resetToken` state for password reset flow
   - Integrated new screens into navigation

#### API Service (`api.ts`)
```typescript
requestPasswordReset(email: string)
verifyResetToken(token: string)
resetPassword(token: string, password: string)
```

## User Flow

### Forgot Password Flow
1. User clicks "Forgot password?" on login screen
2. Enters email → Backend generates token
3. Token logged to backend console (email pending)
4. User receives success message
5. **Manual Step**: Copy token from backend logs
6. Use token to navigate to reset screen (future: deep link)
7. Enter new password twice
8. Password updated → Return to login

## Security Features

1. **Email Obfuscation**: Reset request always returns success (no email enumeration)
2. **Token Expiration**: 1-hour window for password reset
3. **Single Use**: Tokens marked as `used` after password reset
4. **Secure Token Generation**: `secrets.token_urlsafe(32)` (cryptographically strong)
5. **Password Hashing**: bcrypt with salt (unchanged)
6. **SQL Injection Protection**: Parameterized queries
7. **Cascade Delete**: Tokens deleted when user is deleted

## Testing

### Manual Test Steps
1. **Email Validation**:
   ```
   - Try registering with invalid email: "testuser" → Should fail
   - Try registering with valid email: "test@example.com" → Should succeed
   ```

2. **Email Uniqueness**:
   ```
   - Register: "user1@test.com"
   - Try registering again with same email → Should fail with "User with this email already exists"
   ```

3. **Forgot Password**:
   ```bash
   # Backend running
   cd backend/src && gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:3000 app:app
   
   # Test with curl or frontend
   curl -X POST http://localhost:3000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email": "emailmeganfung@gmail.com"}'
   
   # Check backend logs for token
   # [PASSWORD RESET] User: ForestFox542 (emailmeganfung@gmail.com)
   # [PASSWORD RESET] Token: <TOKEN>
   # [PASSWORD RESET] Link: chickalo://reset-password?token=<TOKEN>
   ```

4. **Reset Password**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/reset-password \
     -H "Content-Type: application/json" \
     -d '{"token": "<TOKEN_FROM_LOGS>", "password": "newpassword123"}'
   
   # Login with new password
   ```

## Database Queries

### Check reset tokens
```sql
SELECT * FROM password_reset_tokens ORDER BY created_at DESC;
```

### Check user password (hash)
```sql
SELECT id, email, username, password_hash FROM users WHERE email = 'test@example.com';
```

### Clean up expired tokens (manual, no cron yet)
```sql
DELETE FROM password_reset_tokens WHERE expires_at < NOW();
```

## Future Enhancements

1. **Email Integration**: Use Flask-Mail to send actual emails
   - Configure SMTP settings (Gmail, SendGrid, etc.)
   - Create HTML email templates
   - Update `request_password_reset()` to send email

2. **Deep Linking**: Handle `chickalo://reset-password?token=X` URLs
   - Configure Expo deep linking
   - Parse token from URL and navigate to ResetPasswordScreen

3. **Token Cleanup**: Cron job to delete expired tokens
   - PostgreSQL: `pg_cron` extension
   - Or backend scheduled task

4. **Rate Limiting**: Prevent abuse of password reset endpoint
   - Redis for request tracking
   - Limit: e.g., 3 requests per email per hour

5. **2FA (Two-Factor Auth)**: Add optional second factor
   - TOTP (Google Authenticator)
   - SMS verification

## Dependencies Added

### Backend
- `Flask-Mail==0.9.1` (in requirements.txt, not configured yet)

### Frontend
- No new dependencies (uses existing React Native components)

## Files Changed

### Backend
- `backend/src/auth.py` - Added 3 functions, email validation
- `backend/src/app.py` - Added 3 routes
- `backend/database/schema.sql` - Added password_reset_tokens table
- `backend/requirements.txt` - Added Flask-Mail

### Frontend
- `mobile/src/services/api.ts` - Added 3 API methods
- `mobile/src/screens/LoginScreen.tsx` - Added forgot password link
- `mobile/src/screens/ForgotPasswordScreen.tsx` - NEW FILE
- `mobile/src/screens/ResetPasswordScreen.tsx` - NEW FILE
- `mobile/src/types/index.ts` - Updated Screen type
- `mobile/App.tsx` - Added navigation for new screens

## Notes

- **Current State**: Token logging only (no email sending)
- **Production Ready**: Backend logic complete, needs email config
- **User Experience**: Requires manual token copy (temporary)
- **Security**: Follows OWASP best practices for password reset

