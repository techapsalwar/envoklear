# Laravel 500 Internal Server Error - Debug Guide

## Quick Diagnosis via SSH

SSH into your server and run these commands:

```bash
ssh -p 65002 [username]@[server-ip]
cd /home/u123456789/domains/envoklear.info/public_html

# Check Laravel logs
tail -50 storage/logs/laravel.log

# Check PHP errors
cat storage/logs/laravel-*.log | tail -100

# Check if .env exists
ls -la .env

# Check APP_KEY
cat .env | grep APP_KEY
```

---

## Common Causes & Fixes

### 1. Missing .env File ⚠️ (Most Common)

**Check:**
```bash
ls -la .env
```

**Fix:**
```bash
# Copy from example
cp .env.example .env

# Edit the file
nano .env
```

**Update these values:**
```env
APP_NAME=EnvoKlear
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://envoklear.info

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u885878505_EnvoKleaLarave
DB_USERNAME=u885878505_envoklear
DB_PASSWORD=Envoklear1!

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=envoklear@gmail.com
MAIL_PASSWORD=jliqribqvludchlr
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=envoklear@gmail.com
MAIL_FROM_NAME="EnvoKlear"
```

**Then generate APP_KEY:**
```bash
php artisan key:generate
```

---

### 2. Missing APP_KEY

**Check:**
```bash
cat .env | grep APP_KEY
```

**Fix:**
```bash
php artisan key:generate
php artisan config:cache
```

---

### 3. File Permissions

**Fix:**
```bash
chmod -R 755 storage bootstrap/cache
chown -R $USER:$USER storage bootstrap/cache
```

---

### 4. Missing Vendor Dependencies

**Fix:**
```bash
composer install --no-dev --optimize-autoloader
```

---

### 5. Database Connection Error

**Check:**
```bash
php artisan migrate:status
```

**Fix:**
```bash
# Update .env with correct database credentials
nano .env

# Then:
php artisan config:clear
php artisan config:cache
php artisan migrate --force
```

---

### 6. Clear All Caches

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Then rebuild:
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

### 7. Check PHP Version

```bash
php -v
# Should be 8.2 or higher
```

If wrong version, change in Hostinger hPanel:
- Settings → PHP Configuration → Select PHP 8.2

---

## Complete Fix Script

Run this to fix all common issues:

```bash
cd /home/u123456789/domains/envoklear.info/public_html

# Ensure .env exists
if [ ! -f .env ]; then
  cp .env.example .env
  echo "⚠️  Created .env - YOU MUST EDIT IT WITH CORRECT VALUES!"
fi

# Generate APP_KEY if missing
php artisan key:generate --force

# Fix permissions
chmod -R 755 storage bootstrap/cache
find storage -type f -exec chmod 644 {} \;
find bootstrap/cache -type f -exec chmod 644 {} \;

# Install dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Clear everything
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Rebuild caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Link storage
php artisan storage:link

echo "✅ Fix complete! Check your site now."
```

---

## Check Server Error Logs

### Via SSH:
```bash
# Laravel logs
tail -f storage/logs/laravel.log

# Apache/PHP logs (if accessible)
tail -f /var/log/apache2/error.log
```

### Via Hostinger File Manager:
1. Go to File Manager
2. Navigate to `domains/envoklear.info/public_html/storage/logs/`
3. Download and view `laravel.log`

---

## After Fixing

1. Clear browser cache (Ctrl+Shift+R)
2. Visit https://envoklear.info
3. If still error 500, check the logs for specific error

---

## Most Likely Solution

The most common cause is **missing or empty APP_KEY**. Run:

```bash
ssh -p 65002 [user]@[server] "cd /home/u123456789/domains/envoklear.info/public_html && php artisan key:generate --force && php artisan config:cache && echo 'Done!'"
```

Replace values in brackets with your actual credentials.
