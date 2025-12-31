<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Portfolio;
use App\Models\QuoteRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Quote Statistics
        $totalQuotes = QuoteRequest::count();
        $newQuotes = QuoteRequest::where('status', 'new')->count();
        $inProgressQuotes = QuoteRequest::where('status', 'in_progress')->count();
        $wonQuotes = QuoteRequest::where('status', 'won')->count();
        $revenue = 0; // Placeholder if you don't have revenue column

        // Content Stats
        $totalBlogs = Blog::count();
        $totalPortfolios = Portfolio::count();

        // Recent Activity
        $recentQuotes = QuoteRequest::latest()
            ->take(5)
            ->get()
            ->map(function ($quote) {
                return [
                    'id' => $quote->id,
                    'name' => $quote->name,
                    'email' => $quote->email,
                    'service_type' => $quote->service_type,
                    'status' => $quote->status,
                    'created_at' => $quote->created_at,
                    'time_ago' => $quote->created_at->diffForHumans(),
                ];
            });

        $recentBlogs = Blog::latest()
            ->take(5)
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'author' => $blog->user->name ?? 'Admin',
                    'created_at' => $blog->created_at,
                    'time_ago' => $blog->created_at->diffForHumans(),
                ];
            });

        // Charts Data: Quotes by Status
        $quotesByStatus = QuoteRequest::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_quotes' => $totalQuotes,
                'new_quotes' => $newQuotes,
                'in_progress' => $inProgressQuotes,
                'won_quotes' => $wonQuotes,
                'total_blogs' => $totalBlogs,
                'total_portfolios' => $totalPortfolios,
            ],
            'recent_quotes' => $recentQuotes,
            'recent_blogs' => $recentBlogs,
            'charts' => [
                'quotes_by_status' => $quotesByStatus,
            ]
        ]);
    }
}
