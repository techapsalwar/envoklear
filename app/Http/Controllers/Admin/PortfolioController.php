<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::orderBy('sort_order')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Portfolios/Index', [
            'portfolios' => $portfolios
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Portfolios/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'website_url' => 'nullable|url|max:255',
            'color' => 'required|string|max:255',
            'image_desktop' => 'nullable|image|max:2048',
            'image_tablet' => 'nullable|image|max:2048',
            'image_mobile' => 'nullable|image|max:2048',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        // Handle image uploads
        if ($request->hasFile('image_desktop')) {
            $path = $request->file('image_desktop')->store('portfolios', 'public');
            $validated['image_desktop'] = '/public/storage/' . $path;
        }

        if ($request->hasFile('image_tablet')) {
            $path = $request->file('image_tablet')->store('portfolios', 'public');
            $validated['image_tablet'] = '/public/storage/' . $path;
        }

        if ($request->hasFile('image_mobile')) {
            $path = $request->file('image_mobile')->store('portfolios', 'public');
            $validated['image_mobile'] = '/public/storage/' . $path;
        }

        Portfolio::create($validated);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio item created successfully.');
    }

    public function edit($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        return Inertia::render('Admin/Portfolios/Edit', [
            'portfolio' => $portfolio
        ]);
    }

    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'website_url' => 'nullable|url|max:255',
            'color' => 'required|string|max:255',
            'image_desktop' => 'nullable|image|max:2048',
            'image_tablet' => 'nullable|image|max:2048',
            'image_mobile' => 'nullable|image|max:2048',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        // Handle image uploads
        if ($request->hasFile('image_desktop')) {
            // Delete old image
            if ($portfolio->image_desktop) {
                $oldPath = str_replace('/public/storage/', '', $portfolio->image_desktop);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_desktop')->store('portfolios', 'public');
            $validated['image_desktop'] = '/public/storage/' . $path;
        }

        if ($request->hasFile('image_tablet')) {
            if ($portfolio->image_tablet) {
                $oldPath = str_replace('/public/storage/', '', $portfolio->image_tablet);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_tablet')->store('portfolios', 'public');
            $validated['image_tablet'] = '/public/storage/' . $path;
        }

        if ($request->hasFile('image_mobile')) {
            if ($portfolio->image_mobile) {
                $oldPath = str_replace('/public/storage/', '', $portfolio->image_mobile);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_mobile')->store('portfolios', 'public');
            $validated['image_mobile'] = '/public/storage/' . $path;
        }

        $portfolio->update($validated);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio item updated successfully.');
    }

    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);

        // Delete associated images
        if ($portfolio->image_desktop) {
            $path = str_replace('/storage/', '', $portfolio->image_desktop);
            Storage::disk('public')->delete($path);
        }
        if ($portfolio->image_tablet) {
            $path = str_replace('/storage/', '', $portfolio->image_tablet);
            Storage::disk('public')->delete($path);
        }
        if ($portfolio->image_mobile) {
            $path = str_replace('/storage/', '', $portfolio->image_mobile);
            Storage::disk('public')->delete($path);
        }

        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio item deleted successfully.');
    }
}
