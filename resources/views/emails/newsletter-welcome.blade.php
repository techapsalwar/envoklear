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
        .emoji-large {
            font-size: 48px;
            margin: 20px 0;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .greeting {
            font-size: 24px;
            color: #059669;
            margin-bottom: 20px;
            font-weight: 600;
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
            padding: 25px;
            margin: 25px 0;
            border-radius: 4px;
            text-align: left;
        }
        .highlight-box h3 {
            margin-top: 0;
            color: #059669;
        }
        .benefit-item {
            margin: 15px 0;
            padding-left: 25px;
            position: relative;
        }
        .benefit-item:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 18px;
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
            <div class="emoji-large">🎉</div>
            <h1>Welcome to EnvoKlear!</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Thank You for Subscribing! 🚀</div>
            
            <p class="message">
                We're thrilled to have you join the <strong>EnvoKlear community</strong>! You've just taken the first step towards staying updated with the latest in digital innovation, technology trends, and exclusive insights.
            </p>
            
            <div class="highlight-box">
                <h3>📬 What to Expect from Our Newsletter</h3>
                <div class="benefit-item">
                    <strong>Industry Insights:</strong> Latest trends in web development, mobile apps, and digital marketing
                </div>
                <div class="benefit-item">
                    <strong>Expert Tips:</strong> Actionable advice to grow your business online
                </div>
                <div class="benefit-item">
                    <strong>Exclusive Offers:</strong> Special discounts and early access to our services
                </div>
                <div class="benefit-item">
                    <strong>Success Stories:</strong> Real case studies from our clients
                </div>
                <div class="benefit-item">
                    <strong>Tech Updates:</strong> New features, tools, and innovations
                </div>
            </div>
            
            <p class="message">
                We respect your inbox and promise to send only valuable content. No spam, ever! 🙏
            </p>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; color: #1e40af; font-weight: 600;">
                    💡 <strong>Pro Tip:</strong> Add envoklear@gmail.com to your contacts to ensure you never miss our updates!
                </p>
            </div>
            
            <p class="message">
                While you're here, explore our latest blog posts and discover how we're helping businesses transform digitally.
            </p>
            
            <a href="{{ url('/blog') }}" class="button">Read Our Blog</a>
            
            <p class="message" style="margin-top: 30px;">
                <strong>Need help with a project?</strong><br>
                We're here to bring your ideas to life!
            </p>
            
            <a href="{{ url('/') }}" class="button" style="background: #3b82f6;">Get a Free Quote</a>
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
                You're receiving this email because you subscribed at {{ url('/') }}<br>
                Don't want to receive these emails? <a href="#" style="color: #10b981;">Unsubscribe</a><br>
                &copy; {{ date('Y') }} EnvoKlear. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
