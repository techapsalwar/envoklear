<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\QuoteReply;
use App\Models\EmailMessage;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function index(Request $request)
    {
        $query = QuoteRequest::query()
            ->with('assignedUser')
            ->withCount(['emailMessages as unread_emails_count' => function ($q) {
                $q->where('direction', 'inbound')->where('is_read', false);
            }]);

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by priority
        if ($request->has('priority') && $request->priority !== '') {
            $query->where('priority', $request->priority);
        }

        $quotes = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('Admin/Quotes/Index', [
            'quotes' => $quotes,
            'filters' => $request->only(['search', 'status', 'priority']),
        ]);
    }

    public function show($id)
    {
        $quote = QuoteRequest::with(['assignedUser', 'emailMessages'])->findOrFail($id);

        // Mark all inbound emails as read when viewing
        $quote->emailMessages()->inbound()->unread()->update(['is_read' => true]);

        return Inertia::render('Admin/Quotes/Show', [
            'quote' => $quote,
        ]);
    }

    public function update(Request $request, $id)
    {
        $quote = QuoteRequest::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:new,contacted,in_progress,quoted,won,lost',
            'priority' => 'nullable|in:low,medium,high',
            'notes' => 'nullable|string',
        ]);

        $quote->update($validated);

        return redirect()->back()->with('success', 'Quote updated successfully.');
    }

    public function reply(Request $request, $id)
    {
        $quote = QuoteRequest::findOrFail($id);

        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            Mail::to($quote->email)->send(new QuoteReply(
                $quote,
                $validated['subject'],
                $validated['message']
            ));

            // Store the outbound email in database
            EmailMessage::create([
                'quote_request_id' => $quote->id,
                'direction' => 'outbound',
                'from_email' => config('mail.from.address'),
                'from_name' => config('mail.from.name'),
                'to_email' => $quote->email,
                'subject' => $validated['subject'],
                'body_html' => nl2br(e($validated['message'])),
                'body_text' => $validated['message'],
                'is_read' => true,
            ]);

            // Update status to contacted if still new
            if ($quote->status === 'new') {
                $quote->update(['status' => 'contacted']);
            }

            return redirect()->back()->with('success', 'Reply sent successfully to ' . $quote->email);
        } catch (\Exception $e) {
            \Log::error('Failed to send quote reply: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Failed to send email. Please try again.');
        }
    }

    public function destroy($id)
    {
        $quote = QuoteRequest::findOrFail($id);
        $quote->delete();

        return redirect()->back()->with('success', 'Quote deleted successfully.');
    }
}

