<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            margin: 20px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 20px;
            color: #059669;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            line-height: 1.8;
            color: #374151;
            margin-bottom: 20px;
        }
        .highlight-box {
            background: #f0fdf4;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .highlight-box h3 {
            margin-top: 0;
            color: #059669;
        }
        .info-item {
            margin: 10px 0;
            padding: 8px 0;
        }
        .label {
            font-weight: 600;
            color: #059669;
        }
        .button {
            display: inline-block;
            padding: 14px 30px;
            background: #10b981;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
            text-align: center;
        }
        .button:hover {
            background: #059669;
        }
        .footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #10b981;
            text-decoration: none;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #10b981;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Envo<span style="color: #d1fae5;">Klear</span></div>
            <h1>✅ Quote Request Received!</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello {{ $quote->name }}! 👋</div>
            
            <p class="message">
                Thank you for reaching out to <strong>EnvoKlear</strong>! We're excited about the opportunity to work with you.
            </p>
            
            <p class="message">
                We've successfully received your quote request and our team is already reviewing the details. Here's what happens next:
            </p>
            
            <div class="highlight-box">
                <h3>📋 Your Request Summary</h3>
                @if($quote->service_type)
                <div class="info-item">
                    <span class="label">Service:</span> {{ $quote->service_type }}
                </div>
                @endif
                @if($quote->budget_range)
                <div class="info-item">
                    <span class="label">Budget:</span> {{ $quote->budget_range }}
                </div>
                @endif
                @if($quote->deadline)
                <div class="info-item">
                    <span class="label">Deadline:</span> {{ \Carbon\Carbon::parse($quote->deadline)->format('d M Y') }}
                </div>
                @endif
            </div>
            
            <div class="highlight-box" style="background: #eff6ff; border-left-color: #3b82f6;">
                <h3 style="color: #1e40af;">⏱️ What's Next?</h3>
                <p style="margin: 0;">
                    <strong>1.</strong> Our team will review your requirements within <strong>24 hours</strong><br>
                    <strong>2.</strong> We'll prepare a detailed proposal tailored to your needs<br>
                    <strong>3.</strong> You'll receive a personalized quote via email or WhatsApp<br>
                    <strong>4.</strong> We'll schedule a call to discuss the project in detail
                </p>
            </div>
            
            <p class="message">
                In the meantime, feel free to explore our portfolio and learn more about how we've helped businesses like yours succeed.
            </p>
            
            <div style="text-align: center;">
                <a href="{{ url('/portfolio') }}" class="button">View Our Portfolio</a>
            </div>
            
            <p class="message" style="margin-top: 30px;">
                <strong>Need to reach us immediately?</strong><br>
                📧 Email: <a href="mailto:envoklear@gmail.com" style="color: #10b981;">envoklear@gmail.com</a><br>
                💬 WhatsApp: <a href="https://wa.me/{{ $quote->whatsapp }}" style="color: #10b981;">Contact Us</a>
            </p>
        </div>
        
        <div class="footer">
            <p style="margin-bottom: 20px;">
                <strong>EnvoKlear</strong> - Empowering businesses with innovative digital solutions
            </p>
            <div class="social-links">
                <a href="#">Facebook</a> • 
                <a href="#">Twitter</a> • 
                <a href="#">LinkedIn</a> • 
                <a href="#">Instagram</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
                This email was sent because you requested a quote at {{ url('/') }}<br>
                &copy; {{ date('Y') }} EnvoKlear. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
