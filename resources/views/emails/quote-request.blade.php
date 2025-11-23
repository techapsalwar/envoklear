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
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #10b981;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 New Quote Request</h1>
        <p>You have received a new quote request from your website</p>
    </div>
    
    <div class="content">
        <div class="info-row">
            <span class="label">👤 Name:</span>
            <span class="value">{{ $quote->name }}</span>
        </div>
        
        <div class="info-row">
            <span class="label">📧 Email:</span>
            <span class="value">{{ $quote->email }}</span>
        </div>
        
        <div class="info-row">
            <span class="label">💬 WhatsApp:</span>
            <span class="value">{{ $quote->whatsapp }}</span>
        </div>
        
        @if($quote->company)
        <div class="info-row">
            <span class="label">🏢 Company:</span>
            <span class="value">{{ $quote->company }}</span>
        </div>
        @endif
        
        @if($quote->website)
        <div class="info-row">
            <span class="label">🌐 Website:</span>
            <span class="value">{{ $quote->website }}</span>
        </div>
        @endif
        
        @if($quote->service_type)
        <div class="info-row">
            <span class="label">💼 Service Type:</span>
            <span class="value">{{ $quote->service_type }}</span>
        </div>
        @endif
        
        @if($quote->budget_range)
        <div class="info-row">
            <span class="label">💰 Budget Range:</span>
            <span class="value">{{ $quote->budget_range }}</span>
        </div>
        @endif
        
        @if($quote->deadline)
        <div class="info-row">
            <span class="label">📅 Deadline:</span>
            <span class="value">{{ \Carbon\Carbon::parse($quote->deadline)->format('d M Y') }}</span>
        </div>
        @endif
        
        <div class="info-row">
            <span class="label">📝 Requirements:</span>
            <span class="value">{{ $quote->requirements }}</span>
        </div>
        
        <div class="info-row">
            <span class="label">🕒 Received:</span>
            <span class="value">{{ $quote->created_at->format('d M Y, h:i A') }}</span>
        </div>
        
        <div style="text-align: center;">
            <a href="{{ url('/admin/quotes/' . $quote->id) }}" class="button">
                View in Admin Dashboard
            </a>
        </div>
    </div>
    
    <div class="footer">
        <p>This is an automated notification from EnvoKlear</p>
        <p>&copy; {{ date('Y') }} EnvoKlear. All rights reserved.</p>
    </div>
</body>
</html>
