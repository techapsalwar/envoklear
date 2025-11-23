<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('category')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs
        ]);
    }

    public function create()
    {
        $categories = Category::where('is_active', true)->get();
        return Inertia::render('Admin/Blogs/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug',
            'category_id' => 'required|exists:categories,id',
            'summary' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'image' => 'nullable|image|max:2048',
            'author' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['author'] = $validated['author'] ?? auth()->user()->name;
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        Blog::create($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post created successfully.');
    }

    public function edit($id)
    {
        $blog = Blog::findOrFail($id);
        $categories = Category::where('is_active', true)->get();
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug,' . $id,
            'category_id' => 'required|exists:categories,id',
            'summary' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'image' => 'nullable|image|max:2048',
            'author' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
        ]);

        $validated['author'] = $validated['author'] ?? $blog->author ?? auth()->user()->name;

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($blog->image) {
                $oldPath = str_replace('/storage/', '', $blog->image);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('blogs', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($validated['status'] === 'published' && !$blog->published_at) {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post deleted successfully.');
    }
}
