<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function index(Request $request)
    {
        $query = QuoteRequest::query()->with('assignedUser');

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
        $quote = QuoteRequest::with('assignedUser')->findOrFail($id);

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

    public function destroy($id)
    {
        $quote = QuoteRequest::findOrFail($id);
        $quote->delete();

        return redirect()->back()->with('success', 'Quote deleted successfully.');
    }
}
