<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Public\BlogController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\NewsletterController;
use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Admin\QuoteController as AdminQuoteController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Models\Portfolio;

Route::get('/', function () {
    $portfolios = Portfolio::where('is_active', true)->orderBy('sort_order')->get();
    return Inertia::render('Welcome', [
        'portfolios' => $portfolios
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio');
})->name('portfolio');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Blogs
        Route::get('/blogs', [AdminBlogController::class, 'index'])->name('blogs.index');
        Route::get('/blogs/create', [AdminBlogController::class, 'create'])->name('blogs.create');
        Route::post('/blogs', [AdminBlogController::class, 'store'])->name('blogs.store');
        Route::get('/blogs/{id}/edit', [AdminBlogController::class, 'edit'])->name('blogs.edit');
        Route::put('/blogs/{id}', [AdminBlogController::class, 'update'])->name('blogs.update');
        Route::delete('/blogs/{id}', [AdminBlogController::class, 'destroy'])->name('blogs.destroy');

        // Quotes
        Route::get('/quotes', [AdminQuoteController::class, 'index'])->name('quotes.index');
        Route::get('/quotes/{id}', [AdminQuoteController::class, 'show'])->name('quotes.show');
        Route::put('/quotes/{id}', [AdminQuoteController::class, 'update'])->name('quotes.update');
        Route::delete('/quotes/{id}', [AdminQuoteController::class, 'destroy'])->name('quotes.destroy');

        // Portfolios
        Route::get('/portfolios', [AdminPortfolioController::class, 'index'])->name('portfolios.index');
        Route::get('/portfolios/create', [AdminPortfolioController::class, 'create'])->name('portfolios.create');
        Route::post('/portfolios', [AdminPortfolioController::class, 'store'])->name('portfolios.store');
        Route::get('/portfolios/{id}/edit', [AdminPortfolioController::class, 'edit'])->name('portfolios.edit');
        Route::put('/portfolios/{id}', [AdminPortfolioController::class, 'update'])->name('portfolios.update');
        Route::delete('/portfolios/{id}', [AdminPortfolioController::class, 'destroy'])->name('portfolios.destroy');

        // Newsletter
        Route::get('/subscribers', function () { return Inertia::render('Admin/Newsletter/Index'); })->name('subscribers.index');
    });
});

require __DIR__.'/auth.php';
