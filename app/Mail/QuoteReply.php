<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuoteReply extends Mailable
{
    use Queueable, SerializesModels;

    public QuoteRequest $quote;

    public string $replySubject;

    public string $replyMessage;

    public function __construct(QuoteRequest $quote, string $subject, string $message)
    {
        $this->quote = $quote;
        $this->replySubject = $subject;
        $this->replyMessage = $message;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->replySubject,
            replyTo: [config('mail.from.address')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-reply',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
