# Deployment Guide for EnvoKlear Laravel on Hostinger

This guide provides a complete CI/CD setup using GitHub Actions to deploy the EnvoKlear Laravel application to Hostinger.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Initial Server Setup](#initial-server-setup)
4. [GitHub Secrets Configuration](#github-secrets-configuration)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Deployment Workflow](#deployment-workflow)
7. [Troubleshooting](#troubleshooting)

---

## Overview

**CI/CD Strategy:**
- **CI (Continuous Integration):** Runs tests on every pull request and push to `develop`
- **CD (Continuous Deployment):** Automatically deploys to Hostinger when code is pushed to `main`

**Deployment Methods:**
- **Primary:** FTP deployment via GitHub Actions
- **Alternative:** SSH/Rsync deployment (if SSH access available)

---

## Prerequisites

### Hostinger Requirements

1. **Hosting Plan:** Premium Shared Hosting or higher
2. **PHP Version:** 8.2 or higher
3. **Database:** MySQL 8.0
4. **Access Methods:**
   - FTP credentials
   - SSH access (recommended, if available)

### Local Development

```bash
# Check PHP version
php -v  # Should be 8.2+

# Check Composer
composer --version

# Check Node.js
node -v  # Should be 20+
```

---

## Initial Server Setup

### Step 1: Hostinger Configuration

1. **Login to hPanel** (control.hostinger.com)

2. **Create MySQL Database:**
   - Go to **Databases → MySQL Databases**
   - Create database: `envoklear_db`
   - Create user and grant all privileges
   - Note: Database name, username, password

3. **Get FTP Credentials:**
   - Go to **Files → FTP Accounts**
   - Note: FTP Host, Username, Password, Port (usually 21)

4. **Enable SSH (if available):**
   - Go to **Advanced → SSH Access**
   - Enable SSH
   - Note: SSH Host, Port (usually 65002), Username

### Step 2: Server Directory Structure

```
/home/u123456789/
├── domains/
│   └── envoklear.info/
│       ├── public_html/          # Web root
│       │   ├── index.php         # Laravel entry point
│       │   ├── .htaccess
│       │   └── assets/           # Built assets
│       └── laravel_app/          # Private Laravel files
│           ├── app/
│           ├── config/
│           ├── routes/
│           └── .env
```

### Step 3: Create .env on Server

SSH into your server or use File Manager to create `.env`:

```env
APP_NAME="EnvoKlear"
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://envoklear.info

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=envoklear_db
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=envoklear@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=envoklear@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

---

## GitHub Secrets Configuration

### Required Secrets

Go to your repository: **Settings → Secrets and variables → Actions → New repository secret**

#### FTP Deployment Secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `FTP_SERVER` | FTP hostname | `ftp.envoklear.info` |
| `FTP_USERNAME` | FTP username | `u123456789` |
| `FTP_PASSWORD` | FTP password | `your_ftp_password` |
| `FTP_SERVER_DIR` | Target directory | `/public_html/` |

#### SSH Deployment Secrets (Alternative):

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SSH_HOST` | SSH hostname | `ssh.envoklear.info` |
| `SSH_USERNAME` | SSH username | `u123456789` |
| `SSH_PASSWORD` | SSH password or key | `your_ssh_password` |
| `SSH_PORT` | SSH port | `65002` |
| `DEPLOY_PATH` | Deployment path | `/home/u123456789/domains/envoklear.info/public_html` |

---

## CI/CD Pipeline

### Workflow Files Created

1. **`.github/workflows/ci.yml`** - Continuous Integration
   - Runs on: Pull requests to `main` and `develop`, pushes to `develop`
   - Actions: Run tests, check code style, build assets

2. **`.github/workflows/deploy.yml`** - Continuous Deployment
   - Runs on: Push to `main` branch
   - Actions: Build, deploy to Hostinger, run migrations

### CI Workflow (Testing)

```yaml
Trigger: PR to main/develop OR push to develop
→ Setup PHP 8.2 + MySQL
→ Install dependencies
→ Run migrations
→ Run tests
→ Check code style (Pint)
→ Generate coverage report
```

### CD Workflow (Deployment)

```yaml
Trigger: Push to main
→ Setup PHP 8.2
→ Install Composer dependencies (production)
→ Setup Node.js 20
→ Build frontend assets (Vite)
→ Create deployment package
→ Upload via FTP to Hostinger
→ Run post-deployment commands (SSH)
   - Clear caches
   - Run migrations
   - Link storage
```

---

## Deployment Workflow

### Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Build locally
composer install --no-dev --optimize-autoloader
npm run build

# 2. Create archive
tar -czf deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='tests' \
  --exclude='storage/logs/*' \
  .

# 3. Upload to server via FTP or SCP
scp -P 65002 deploy.tar.gz user@host:/path/to/deploy

# 4. SSH into server
ssh -p 65002 user@host

# 5. Extract and setup
cd /path/to/deploy
tar -xzf deploy.tar.gz
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

### Automated Deployment (via GitHub)

```bash
# 1. Commit your changes
git add .
git commit -m "feat: your changes"

# 2. Push to develop first (triggers CI tests)
git push origin develop

# 3. After tests pass, merge to main
git checkout main
git merge develop
git push origin main  # This triggers deployment!

# 4. Monitor deployment
# Go to GitHub → Actions to watch the deployment progress
```

---

## Hostinger-Specific Configuration

### Public Directory Setup

Laravel's entry point is `/public/index.php`, but Hostinger serves from `/public_html/`.

**Option 1: Root .htaccess (Recommended for shared hosting)**

Create `/.htaccess` in project root:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

**Option 2: Move Public Contents**

```bash
# Copy public folder contents to public_html
cp -r public/* ../public_html/

# Update paths in public_html/index.php
# Change:
require __DIR__.'/../vendor/autoload.php';
# To:
require __DIR__.'/../laravel_app/vendor/autoload.php';
```

### File Permissions

```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## Troubleshooting

### Common Issues

**1. 500 Internal Server Error**
```bash
# Check Laravel logs
tail -f storage/logs/laravel.log

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

**2. Assets Not Loading**
```bash
# Rebuild assets
npm run build

# Check asset paths in .env
APP_URL=https://envoklear.info

# Clear view cache
php artisan view:clear
```

**3. Database Connection Errors**
```bash
# Verify .env database settings
# Test database connection
php artisan migrate:status
```

**4. Permission Errors**
```bash
# Fix storage permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

**5. FTP Deployment Fails**
- Verify FTP credentials in GitHub Secrets
- Check FTP_SERVER_DIR path is correct
- Ensure FTP user has write permissions

**6. SSH Commands Fail**
- Verify SSH access is enabled in Hostinger
- Check SSH credentials and port (usually 65002)
- Test SSH connection manually first

### Testing Deployment

```bash
# Test FTP connection
ftp $FTP_SERVER
# Enter username and password

# Test SSH connection
ssh -p $SSH_PORT $SSH_USERNAME@$SSH_HOST

# Check deployed site
curl https://envoklear.info
```

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Database is accessible
- [ ] Email sending works
- [ ] Forms submission works (Quote, Newsletter)
- [ ] Admin dashboard accessible
- [ ] Assets (CSS, JS, images) load
- [ ] HTTPS is enabled
- [ ] Error logging is working

---

## Rollback Procedure

If deployment fails:

```bash
# 1. SSH into server
ssh -p 65002 user@host

# 2. Navigate to backup
cd /path/to/backups

# 3. Restore previous version
cp -r backup-YYYYMMDD/* /path/to/public_html/

# 4. Clear caches
php artisan config:cache
php artisan cache:clear
```

---

## Continuous Improvement

### Monitoring

- Set up uptime monitoring (e.g., UptimeRobot)
- Enable error notifications
- Monitor GitHub Actions for failed deployments

### Optimization

- Enable OPcache in Hostinger
- Use Redis for caching (if available)
- Optimize database queries
- Minify assets

---

## Support

For issues:
1. Check GitHub Actions logs
2. Review Laravel logs: `storage/logs/laravel.log`
3. Contact Hostinger support for hosting issues
4. Review this documentation

---

**Last Updated:** 2025-11-23
**Version:** 1.0.0
