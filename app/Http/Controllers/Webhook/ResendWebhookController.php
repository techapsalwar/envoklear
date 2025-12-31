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
        try {
            $payload = $request->all();

            Log::info('Resend webhook received', ['type' => $payload['type'] ?? 'unknown']);

            // Handle inbound email
            if (($payload['type'] ?? '') === 'email.received') {
                $this->handleInboundEmail($payload['data'] ?? []);
            }

            return response()->json(['status' => 'ok']);
        } catch (\Exception $e) {
            Log::error('Webhook processing failed: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            // Return 200 even on error to prevent Resend from retrying endlessly if it's a code bug
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 200);
        }
    }

    protected function handleInboundEmail(array $data): void
    {
        // Resend "from" field is typically "Name <email@domain.com>"
        $rawFrom = $data['from'] ?? '';
        $fromEmail = $this->extractEmail($rawFrom);
        
        // Resend "to" is an array of strings
        $rawTo = $data['to'] ?? [];
        $toEmail = is_array($rawTo) ? implode(', ', $rawTo) : (string)$rawTo;
        
        // Content might be missing or empty
        $subject = $data['subject'] ?? 'No Subject';
        $bodyHtml = $data['html'] ?? null;
        $bodyText = $data['text'] ?? null;

        // Processing: If text is missing but HTML exists, strip tags. If HTML missing but text exists, nl2br.
        if (empty($bodyText) && !empty($bodyHtml)) {
            $bodyText = strip_tags($bodyHtml);
        }
        if (empty($bodyHtml) && !empty($bodyText)) {
            $bodyHtml = nl2br(e($bodyText));
        }

        Log::info('Processing inbound email', [
            'raw_from' => $rawFrom,
            'extracted_email' => $fromEmail,
            'subject' => $subject,
            'has_html' => !empty($bodyHtml),
            'has_text' => !empty($bodyText),
        ]);

        if (empty($fromEmail)) {
            Log::warning('Could not extract email from: ' . $rawFrom);
            return;
        }

        // Try to find the quote request by sender email
        $quoteRequest = QuoteRequest::where('email', $fromEmail)->latest()->first();

        // Store the inbound email
        EmailMessage::create([
            'quote_request_id' => $quoteRequest?->id,
            'direction' => 'inbound',
            'from_email' => $fromEmail, 
            'from_name' => $this->extractName($rawFrom),
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
            'from_email' => $fromEmail,
        ]);
    }

    protected function extractEmail(string $string): string
    {
        // Extract email from "Name <email@example.com>" or just "email@example.com"
        if (preg_match('/<([^>]+)>/', $string, $matches)) {
            return $matches[1];
        }
        return trim($string);
    }

    protected function extractName(string $string): ?string
    {
        // Extract name from "Name <email@example.com>"
        if (preg_match('/^(.+?)\s*<.+>$/', $string, $matches)) {
            return trim($matches[1], ' "\'');
        }
        return null;
    }
}
