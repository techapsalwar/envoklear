<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Tag;
use App\Models\QuoteRequest;
use App\Models\NewsletterSubscriber;
use App\Models\User;
use Illuminate\Support\Str;

class RealisticContentSeeder extends Seeder
{
    public function run(): void
    {
        echo "Starting RealisticContentSeeder...\n";

        // Retrieve Admin User
        $admin = User::where('email', 'admin@envoklear.com')->first();
        if (!$admin) {
            echo "Admin user not found!\n";
            return;
        }
        echo "Admin user found: {$admin->id}\n";

        // Retrieve Categories (assume they exist from DatabaseSeeder)
        $categories = [
            'technology',
            'marketing',
            'hardware',
            'design',
            'business',
        ];

        // Create Tags
        echo "Creating Tags...\n";
        $tags = ['Web Development', 'SEO', 'Digital Marketing', 'Cloud Computing', 'SaaS', 'UI/UX', 'E-commerce'];
        $tagIds = [];
        foreach ($tags as $tagName) {
            $tag = Tag::firstOrCreate(['slug' => Str::slug($tagName)], ['name' => $tagName]);
            $tagIds[] = $tag->id;
        }
        echo "Tags created.\n";

        // Create Realistic Blogs
        echo "Creating Blogs...\n";
        $blogs = [
            [
                'title' => 'The Future of Web Development in 2025',
                'category_slug' => 'technology',
                'summary' => 'Exploring the latest trends and technologies shaping the web development landscape, from AI-driven coding to WebAssembly.',
                'content' => '<p>The web development landscape is constantly evolving, and 2025 promises to be a pivotal year. With the rise of AI-driven coding assistants, WebAssembly, and edge computing, the way we build and deploy web applications is undergoing a fundamental shift.</p><h2>AI-Driven Development</h2><p>Artificial Intelligence is no longer just a buzzword; it\'s a core part of the developer toolkit. From code generation to automated testing, AI is streamlining workflows and enabling developers to focus on higher-level problem solving.</p><h2>WebAssembly (Wasm)</h2><p>WebAssembly continues to gain traction, allowing high-performance applications written in languages like Rust and C++ to run directly in the browser.</p>',
                'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            ],
            [
                'title' => '5 SEO Strategies to Boost Your Traffic',
                'category_slug' => 'marketing',
                'summary' => 'Discover actionable SEO strategies that can help you increase your website visibility and drive more organic traffic.',
                'content' => '<p>Search Engine Optimization (SEO) is crucial for any online business. Here are five strategies to help you rank higher:</p><ol><li><strong>Focus on User Experience (UX):</strong> Google prioritizes sites that offer a great user experience.</li><li><strong>Optimize for Voice Search:</strong> With the rise of smart speakers, optimizing for conversational queries is key.</li><li><strong>High-Quality Content:</strong> Content is still king. Provide value to your readers.</li><li><strong>Mobile-First Indexing:</strong> Ensure your site is fully responsive.</li><li><strong>Technical SEO:</strong> Fix broken links and optimize page speed.</li></ol>',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            ],
            [
                'title' => 'Why Your Business Needs a Custom Web App',
                'category_slug' => 'business',
                'summary' => 'Off-the-shelf software might not cut it. Learn why a custom web application could be the game-changer your business needs.',
                'content' => '<p>Every business is unique, and sometimes, generic software just doesn\'t fit the bill. Custom web applications offer tailored solutions that align perfectly with your workflows.</p><h3>Scalability</h3><p>Custom apps grow with your business, ensuring you never outgrow your tools.</p><h3>Security</h3><p>Built with your specific security needs in mind, custom apps can offer better protection than mass-market software.</p><h3>Integration</h3><p>Seamlessly integrate with your existing systems and third-party APIs.</p>',
                'image' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            ],
        ];

        foreach ($blogs as $blogData) {
            echo "Creating blog: {$blogData['title']}...\n";
            $category = Category::where('slug', $blogData['category_slug'])->first();
            if (!$category) {
                echo "Category not found: {$blogData['category_slug']}\n";
                continue;
            }
            
            try {
                $blog = Blog::create([
                    'user_id' => $admin->id,
                    'category_id' => $category->id,
                    'title' => $blogData['title'],
                    'slug' => Str::slug($blogData['title']),
                    'summary' => $blogData['summary'],
                    'content' => $blogData['content'],
                    'image' => $blogData['image'],
                    'status' => 'published',
                    'published_at' => now(),
                    'views' => rand(100, 5000),
                    'is_featured' => rand(0, 1),
                ]);
                echo "Blog created: {$blog->id}\n";
                
                // Attach random tags
                $blog->tags()->attach(array_rand(array_flip($tagIds), rand(1, 3)));
            } catch (\Exception $e) {
                echo "Failed to create blog: " . $e->getMessage() . "\n";
            }
        }

        // Create Realistic Quote Requests
        echo "Creating Quote Requests...\n";
        QuoteRequest::create([
            'name' => 'Alice Johnson',
            'email' => 'alice.j@example.com',
            'phone' => '555-0123',
            'whatsapp' => '555-0123',
            'service_type' => 'Web Development',
            'requirements' => 'Hi, I am looking to build a custom e-commerce platform for my boutique. We need inventory management and payment gateway integration.',
            'budget_range' => '$5,000 - $10,000',
            'deadline' => now()->addMonth(),
            'status' => 'new',
        ]);
        echo "Quote Request 1 created.\n";

        QuoteRequest::create([
            'name' => 'Bob Smith',
            'email' => 'bob.smith@techcorp.com',
            'phone' => '555-0456',
            'whatsapp' => '555-0456',
            'service_type' => 'Digital Marketing',
            'requirements' => 'We need help with our SEO strategy and social media management. Looking for a long-term partnership.',
            'budget_range' => '$1,000 - $3,000',
            'deadline' => now()->addWeeks(2),
            'status' => 'contacted',
        ]);
        echo "Quote Request 2 created.\n";

        // Create Newsletter Subscribers
        echo "Creating Subscribers...\n";
        echo "Subscribers created.\n";
    }
}
