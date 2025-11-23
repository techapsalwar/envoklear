#!/bin/bash

# Laravel Hostinger 403 Fix Script
# This script fixes the common directory structure issue

echo "🔧 Fixing Laravel directory structure for Hostinger..."

# Get the current directory
CURRENT_DIR=$(pwd)

echo "Current directory: $CURRENT_DIR"

# Check if we're in the right place
if [ ! -f "artisan" ]; then
    echo "❌ Error: artisan file not found. Make sure you're in the Laravel root directory."
    exit 1
fi

# Fix 1: Copy public folder contents to root (if public_html IS the root)
echo "📁 Copying public folder contents to current directory..."
cp -r public/* ./
cp public/.htaccess ./ 2>/dev/null || true

# Fix 2: Update index.php paths
echo "📝 Updating index.php paths..."
sed -i 's|__DIR__\.'"'"'/../vendor/autoload.php|__DIR__.'"'"'/vendor/autoload.php|g' index.php
sed -i 's|__DIR__\.'"'"'/../bootstrap/app.php|__DIR__.'"'"'/bootstrap/app.php|g' index.php

# Fix 3: Set correct permissions
echo "🔐 Setting correct permissions..."
chmod -R 755 storage bootstrap/cache
chmod -R 755 .

# Fix 4: Clear caches
echo "🗑️  Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Fix 5: Recreate caches
echo "✨ Recreating caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Fix complete! Check your site now."
echo "If still showing 403, check:"
echo "1. File permissions (should be 755 for directories, 644 for files)"
echo "2. .htaccess file exists in root"
echo "3. PHP version matches (8.2+)"
