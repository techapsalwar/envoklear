<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use App\Mail\NewsletterSubscribed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email',
        ]);

        $subscriber = NewsletterSubscriber::create([
            'email' => $validated['email'],
            'status' => 'subscribed',
            'ip_address' => $request->ip(),
            'source' => 'website_footer',
        ]);

        // Send email notification to admin
        try {
            Mail::to(config('mail.from.address'))->send(new NewsletterSubscribed($subscriber));
        } catch (\Exception $e) {
            \Log::error('Failed to send newsletter notification email: ' . $e->getMessage());
        }

        // Send welcome email to subscriber
        try {
            Mail::to($subscriber->email)->send(new \App\Mail\NewsletterWelcome($subscriber));
        } catch (\Exception $e) {
            \Log::error('Failed to send newsletter welcome email: ' . $e->getMessage());
        }

        return Redirect::back()->with('success', 'Successfully subscribed to our newsletter!');
    }
}
