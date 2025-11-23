<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuoteRequestAcknowledgment extends Mailable
{
    use Queueable, SerializesModels;

    public $quote;

    public function __construct(QuoteRequest $quote)
    {
        $this->quote = $quote;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Thank You for Your Quote Request - EnvoKlear',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-acknowledgment',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
