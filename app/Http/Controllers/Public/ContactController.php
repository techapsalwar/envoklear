<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone' => 'nullable|string|max:20',
            'whatsapp' => 'required|string|max:20',
            'company' => 'nullable|string|max:150',
            'website' => 'nullable|url',
            'service_type' => 'nullable|string|max:100',
            'requirements' => 'required|string',
            'budget_range' => 'nullable|string|max:50',
            'deadline' => 'required|date',
        ]);

        $quote = QuoteRequest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'whatsapp' => $validated['whatsapp'],
            'company' => $validated['company'] ?? null,
            'website' => $validated['website'] ?? null,
            'service_type' => $validated['service_type'] ?? null,
            'requirements' => $validated['requirements'],
            'budget_range' => $validated['budget_range'] ?? null,
            'deadline' => $validated['deadline'],
            'status' => 'new',
            'priority' => 'medium',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'source' => 'website',
        ]);

        // Send acknowledgment email to user only (no admin notification)

        // Send acknowledgment email to user
        try {
            Mail::to($quote->email)->send(new \App\Mail\QuoteRequestAcknowledgment($quote));
        } catch (\Exception $e) {
            \Log::error('Failed to send quote acknowledgment email: ' . $e->getMessage());
        }

        return Redirect::back()->with('success', 'Thank you for your quote request! We will get back to you within 24 hours.');
    }
}
