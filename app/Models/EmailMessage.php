<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmailMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'quote_request_id',
        'direction',
        'from_email',
        'from_name',
        'to_email',
        'subject',
        'body_html',
        'body_text',
        'resend_message_id',
        'in_reply_to',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function quoteRequest(): BelongsTo
    {
        return $this->belongsTo(QuoteRequest::class);
    }

    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    public function scopeInbound($query)
    {
        return $query->where('direction', 'inbound');
    }

    public function scopeOutbound($query)
    {
        return $query->where('direction', 'outbound');
    }

    public function markAsRead(): void
    {
        $this->update(['is_read' => true]);
    }
}
