<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Models\EmailMessage;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ResendWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        Log::info('Resend webhook received', ['type' => $payload['type'] ?? 'unknown']);

        // Handle inbound email
        if (($payload['type'] ?? '') === 'email.received') {
            $this->handleInboundEmail($payload['data'] ?? []);
        }

        return response()->json(['status' => 'ok']);
    }

    protected function handleInboundEmail(array $data): void
    {
        $fromEmail = $data['from'] ?? '';
        $toEmail = $data['to'] ?? '';
        $subject = $data['subject'] ?? 'No Subject';
        $bodyHtml = $data['html'] ?? '';
        $bodyText = $data['text'] ?? '';

        Log::info('Processing inbound email', [
            'from' => $fromEmail,
            'to' => $toEmail,
            'subject' => $subject,
        ]);

        // Try to find the quote request by sender email
        $quoteRequest = QuoteRequest::where('email', $fromEmail)->latest()->first();

        if (!$quoteRequest) {
            Log::warning('No quote request found for email: ' . $fromEmail);
        }

        // Store the inbound email
        EmailMessage::create([
            'quote_request_id' => $quoteRequest?->id,
            'direction' => 'inbound',
            'from_email' => $fromEmail,
            'from_name' => $this->extractName($fromEmail),
            'to_email' => $toEmail,
            'subject' => $subject,
            'body_html' => $bodyHtml,
            'body_text' => $bodyText,
            'resend_message_id' => $data['id'] ?? null,
            'in_reply_to' => $data['in_reply_to'] ?? null,
            'is_read' => false,
        ]);

        Log::info('Inbound email stored', [
            'quote_request_id' => $quoteRequest?->id,
            'from' => $fromEmail,
        ]);
    }

    protected function extractName(string $email): ?string
    {
        // Extract name from "Name <email@example.com>" format
        if (preg_match('/^(.+?)\s*<.+>$/', $email, $matches)) {
            return trim($matches[1]);
        }

        return null;
    }
}
