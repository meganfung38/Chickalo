from flask_mail import Message
from flask import render_template_string

def send_password_reset_email(mail, user_email: str, username: str, reset_token: str) -> bool:
    """
    Send password reset email to user.
    
    Args:
        mail: Flask-Mail instance
        user_email: User's email address
        username: User's username
        reset_token: Password reset token
    
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        # Generate reset link
        # For mobile app, we can't use deep links via email (iOS/Android restrictions)
        # Instead, use a web link that redirects to the app or shows instructions
        # For now, we'll provide the token directly for manual entry
        reset_link = f"https://chickalo.app/reset?token={reset_token}"
        deep_link = f"chickalo://reset-password?token={reset_token}"
        
        # HTML email template
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 30px;
                    border: 1px solid #ddd;
                }}
                .token-box {{
                    background: #fff;
                    border: 2px solid #4CAF50;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                }}
                .token {{
                    font-family: monospace;
                    font-size: 16px;
                    font-weight: bold;
                    color: #4CAF50;
                    word-break: break-all;
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 10px 0;
                }}
                .instructions {{
                    background: #e3f2fd;
                    border-left: 4px solid #2196F3;
                    padding: 15px;
                    margin: 20px 0;
                }}
                .warning {{
                    background: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    margin: 20px 0;
                }}
                .footer {{
                    background: #333;
                    color: #999;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    border-radius: 0 0 10px 10px;
                }}
                ol {{
                    text-align: left;
                    padding-left: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Chickalo</h1>
                <p>Password Reset Request</p>
            </div>
            
            <div class="content">
                <h2>Hi {username}!</h2>
                
                <p>We received a request to reset your password for your Chickalo account.</p>
                
                <div class="instructions">
                    <strong>📱 To reset your password:</strong>
                    <ol>
                        <li>Open the <strong>Chickalo app</strong> on your phone</li>
                        <li>Click <strong>"Forgot password?"</strong> on the login screen</li>
                        <li>When prompted, enter this reset code:</li>
                    </ol>
                </div>
                
                <div class="token-box">
                    <p style="margin: 0; font-size: 14px; color: #666;">Your Reset Code:</p>
                    <div class="token">{reset_token}</div>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">Copy this entire code</p>
                </div>
                
                <div class="warning">
                    <strong>⚠️ Important:</strong>
                    <ul>
                        <li>This code expires in <strong>15 minutes</strong></li>
                        <li>The code can only be used <strong>once</strong></li>
                        <li>Requesting a new code will invalidate this one</li>
                        <li>If you didn't request this reset, please ignore this email</li>
                    </ul>
                </div>
                
                <p style="margin-top: 30px;">Need help? Contact us at <a href="mailto:chickalo.auth@gmail.com" style="color: #4CAF50;">chickalo.auth@gmail.com</a></p>
            </div>
            
            <div class="footer">
                <p>© 2025 Chickalo - Your Location-Based Social App</p>
                <p>This is an automated email, please do not reply directly to this message.</p>
            </div>
        </body>
        </html>
        """
        
        # Plain text fallback
        text_body = f"""
        Hi {username}!
        
        We received a request to reset your password for your Chickalo account.
        
        TO RESET YOUR PASSWORD:
        1. Open the Chickalo app on your phone
        2. Click "Forgot password?" on the login screen
        3. Enter this reset code when prompted:
        
        {reset_token}
        
        IMPORTANT:
        - This code expires in 15 minutes
        - The code can only be used once
        - Requesting a new code will invalidate this one
        - If you didn't request this reset, please ignore this email
        
        Need help? Contact us at chickalo.auth@gmail.com
        
        - Chickalo Team
        """
        
        # Create message
        msg = Message(
            subject="Reset Your Chickalo Password",
            recipients=[user_email],
            body=text_body,
            html=html_body
        )
        
        # Send email
        mail.send(msg)
        print(f"[EMAIL] Password reset email sent to {user_email}")
        return True
        
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send password reset email: {str(e)}")
        return False

