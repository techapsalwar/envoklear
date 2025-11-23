<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
            text-align: center;
        }
        .info-row {
            margin: 15px 0;
            padding: 10px;
            background: white;
            border-left: 4px solid #10b981;
            border-radius: 4px;
        }
        .label {
            font-weight: bold;
            color: #059669;
            display: block;
            margin-bottom: 5px;
        }
        .value {
            color: #374151;
        }
        .footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
        }
        .icon {
            font-size: 48px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📧 New Newsletter Subscription</h1>
    </div>
    
    <div class="content">
        <div class="icon">✅</div>
        <h2>Someone just subscribed to your newsletter!</h2>
        
        <div class="info-row">
            <span class="label">📧 Email:</span>
            <span class="value">{{ $subscriber->email }}</span>
        </div>
        
        <div class="info-row">
            <span class="label">📍 Source:</span>
            <span class="value">{{ $subscriber->source ?? 'Website' }}</span>
        </div>
        
        <div class="info-row">
            <span class="label">🕒 Subscribed:</span>
            <span class="value">{{ $subscriber->created_at->format('d M Y, h:i A') }}</span>
        </div>
        
        <div class="info-row">
            <span class="label">🌐 IP Address:</span>
            <span class="value">{{ $subscriber->ip_address }}</span>
        </div>
    </div>
    
    <div class="footer">
        <p>This is an automated notification from EnvoKlear</p>
        <p>&copy; {{ date('Y') }} EnvoKlear. All rights reserved.</p>
    </div>
</body>
</html>
