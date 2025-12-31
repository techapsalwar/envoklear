<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'whatsapp',
        'company',
        'website',
        'service_type',
        'requirements',
        'budget_range',
        'deadline',
        'status',
        'priority',
        'assigned_to',
        'notes',
        'ip_address',
        'user_agent',
        'source',
    ];

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function emailMessages()
    {
        return $this->hasMany(EmailMessage::class)->orderBy('created_at', 'asc');
    }
}
