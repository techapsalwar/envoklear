<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $replySubject }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background-color: #0f172a;
            color: #e2e8f0;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
            padding: 30px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: white;
        }
        .logo span {
            background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 20px;
            font-weight: 600;
            color: white;
            margin-bottom: 20px;
        }
        .message {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 24px;
            margin: 20px 0;
            border-left: 4px solid #6366f1;
            white-space: pre-wrap;
        }
        .reference-box {
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-top: 30px;
        }
        .reference-title {
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .reference-content {
            color: #cbd5e1;
            font-size: 14px;
        }
        .footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 25px 30px;
            text-align: center;
        }
        .footer p {
            color: #64748b;
            font-size: 13px;
            margin-bottom: 10px;
        }
        .footer a {
            color: #6366f1;
            text-decoration: none;
        }
        .social-links {
            margin-top: 15px;
        }
        .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Envo<span>Klear</span></div>
        </div>
        
        <div class="content">
            <p class="greeting">Hi {{ $quote->name }},</p>
            
            <div class="message">{!! nl2br(e($replyMessage)) !!}</div>
            
            <div class="reference-box">
                <p class="reference-title">Your Quote Request Reference</p>
                <div class="reference-content">
                    <p><strong>Service:</strong> {{ $quote->service_type ?? 'General Inquiry' }}</p>
                    <p><strong>Submitted:</strong> {{ $quote->created_at->format('M d, Y') }}</p>
                    <p><strong>Reference ID:</strong> #{{ $quote->id }}</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Best regards,<br><strong style="color: white;">The EnvoKlear Team</strong></p>
            <p style="margin-top: 15px;">
                <a href="mailto:hello@envoklear.info">hello@envoklear.info</a> | 
                <a href="tel:+919982432654">+91 9982432654</a>
            </p>
            <p style="margin-top: 10px; font-size: 12px;">
                &copy; {{ date('Y') }} EnvoKlear. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
