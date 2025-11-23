# Laravel 403 Error Fix for Hostinger

## Problem
Getting 403 Forbidden error when accessing https://envoklear.info

## Common Causes
1. **Wrong directory structure** - Laravel's `public` folder content needs to be in `public_html`
2. **Incorrect file permissions**
3. **Missing or incorrect `.htaccess`**
4. **Wrong `index.php` paths**

---

## Solution 1: Run Fix Script via SSH (Quickest)

1. **SSH into your server:**
   ```bash
   ssh -p 65002 [your-username]@[your-server-ip]
   ```

2. **Navigate to your deployment directory:**
   ```bash
   cd /home/u123456789/domains/envoklear.info/public_html
   ```

3. **Run these commands:**
   ```bash
   # Copy public folder contents to root
   cp -r public/* ./
   cp public/.htaccess ./
   
   # Update index.php paths
   sed -i "s|__DIR__.'/../vendor/autoload.php'|__DIR__.'/vendor/autoload.php'|g" index.php
   sed -i "s|__DIR__.'/../bootstrap/app.php'|__DIR__.'/bootstrap/app.php'|g" index.php
   
   # Set permissions
   chmod -R 755 storage bootstrap/cache
   chmod 644 index.php
   chmod 644 .htaccess
   
   # Clear and cache
   php artisan config:clear
   php artisan cache:clear
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

4. **Check your site** - It should work now!

---

## Solution 2: Correct Deployment Structure

Update the deployment to use the correct structure:

### Option A: Symlink public_html to public (Preferred)

```bash
# SSH into server
cd /home/u123456789/domains/envoklear.info/

# Backup current public_html
mv public_html public_html.backup

# Create symlink
ln -s /home/u123456789/domains/envoklear.info/laravel_app/public public_html

# Update TARGET_DIR to deploy Laravel to laravel_app instead
```

Then update GitHub secret:
- `TARGET_DIR`: `/home/u123456789/domains/envoklear.info/laravel_app`

### Option B: Root .htaccess redirect

Create `.htaccess` in the Laravel root with:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

---

## Solution 3: Check File Permissions

```bash
# Connect via SSH
ssh -p 65002 [username]@[server-ip]

# Navigate to directory
cd /home/u123456789/domains/envoklear.info/public_html

# Fix permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod -R 755 storage bootstrap/cache
```

---

## Solution 4: Verify .htaccess

Make sure `public/.htaccess` exists with this content:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

---

## Quick Diagnosis

SSH into server and check:

```bash
# Check current directory structure
ls -la

# Check if index.php exists
cat index.php | head -20

# Check .htaccess
cat .htaccess

# Check permissions
ls -la storage/
ls -la bootstrap/cache/

# Test PHP
php -v
php artisan --version
```

---

## After Fix

1. Clear browser cache (Ctrl+Shift+R)
2. Visit https://envoklear.info
3. Should see the Laravel welcome page

---

## Prevention

Update the deployment workflow to automatically handle this:

Add to `.github/workflows/deploy.yml` in `SCRIPT_AFTER`:

```yaml
SCRIPT_AFTER: |
  cd ${{ secrets.TARGET_DIR }}
  
  # Copy public contents if needed
  if [ -d "public" ] && [ ! -f "index.php" ]; then
    cp -r public/* ./
    cp public/.htaccess ./
    sed -i "s|__DIR__.'/../vendor/autoload.php'|__DIR__.'/vendor/autoload.php'|g" index.php
    sed -i "s|__DIR__.'/../bootstrap/app.php'|__DIR__.'/bootstrap/app.php'|g" index.php
  fi
  
  composer install --no-dev --optimize-autoloader --no-interaction
  chmod -R 755 storage bootstrap/cache
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  php artisan migrate --force
  php artisan storage:link
```

---

**Quick Command to Run:**

```bash
ssh -p 65002 u123456789@server-ip "cd /home/u123456789/domains/envoklear.info/public_html && cp -r public/* ./ && cp public/.htaccess ./ && sed -i \"s|__DIR__.'/../vendor/autoload.php'|__DIR__.'/vendor/autoload.php'|g\" index.php && sed -i \"s|__DIR__.'/../bootstrap/app.php'|__DIR__.'/bootstrap/app.php'|g\" index.php && chmod -R 755 storage bootstrap/cache && php artisan config:cache"
```

Replace `u123456789` and `server-ip` with your actual values.
