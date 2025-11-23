<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::where('email', 'admin@envoklear.com')->first();
        if (!$user) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@envoklear.com',
                'password' => bcrypt('password'),
                'role' => 'super_admin',
            ]);
        }

        // Seed Categories
        \App\Models\Category::firstOrCreate(['slug' => 'technology'], ['name' => 'Technology', 'is_active' => true]);
        \App\Models\Category::firstOrCreate(['slug' => 'marketing'], ['name' => 'Marketing', 'is_active' => true]);
        \App\Models\Category::firstOrCreate(['slug' => 'hardware'], ['name' => 'Hardware', 'is_active' => true]);
        \App\Models\Category::firstOrCreate(['slug' => 'design'], ['name' => 'Design', 'is_active' => true]);
        \App\Models\Category::firstOrCreate(['slug' => 'business'], ['name' => 'Business', 'is_active' => true]);

        $this->call(RealisticContentSeeder::class);
    }
}
