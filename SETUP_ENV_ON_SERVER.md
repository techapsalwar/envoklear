# How to Setup .env on Hostinger

## Method 1: Via SSH (Recommended - Fastest)

### Step 1: SSH into your server
```bash
ssh -p 65002 [your-username]@[your-server-ip]
```

### Step 2: Navigate to your site directory
```bash
cd /home/u123456789/domains/envoklear.info/public_html
```

### Step 3: Create .env file
```bash
nano .env
```

### Step 4: Paste this content (Update the values marked with YOUR_*):

```env
APP_NAME=EnvoKlear
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://envoklear.info

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_envoklear
DB_USERNAME=u123456789_envoklear
DB_PASSWORD=YOUR_DATABASE_PASSWORD_HERE

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
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD_HERE
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=envoklear@gmail.com
MAIL_FROM_NAME="EnvoKlear"
```

### Step 5: Save and exit
- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

### Step 6: Generate APP_KEY
```bash
php artisan key:generate --force
```

### Step 7: Set correct permissions
```bash
chmod 644 .env
```

### Step 8: Clear and cache config
```bash
php artisan config:clear
php artisan config:cache
```

### Step 9: Test
Visit https://envoklear.info - should now work!

---

## Method 2: Via Hostinger File Manager

### Step 1: Get Database Credentials from Hostinger

1. Login to Hostinger hPanel
2. Go to **Databases → MySQL Databases**
3. Note down:
   - Database Name (e.g., `u123456789_envoklear`)
   - Database User (e.g., `u123456789_envoklear`)
   - Database Password

### Step 2: Create .env file locally

1. Copy `.env.production` template from your project
2. Update these values:
   ```
   DB_DATABASE=u123456789_envoklear     # From hPanel
   DB_USERNAME=u123456789_envoklear     # From hPanel
   DB_PASSWORD=your_actual_db_password  # From hPanel
   MAIL_PASSWORD=your_gmail_app_password # Your Gmail app password
   ```

### Step 3: Upload via File Manager

1. Go to Hostinger hPanel
2. Click **Files → File Manager**
3. Navigate to: `domains/envoklear.info/public_html/`
4. Click **Upload** button
5. Select your modified `.env` file
6. Upload

### Step 4: Generate APP_KEY via SSH

You still need to SSH in to generate the key:
```bash
ssh -p 65002 [user]@[server]
cd /home/u123456789/domains/envoklear.info/public_html
php artisan key:generate --force
php artisan config:cache
```

---

## Method 3: One-Line SSH Command (Quickest!)

Copy this entire command, replace the values, and run:

```bash
ssh -p 65002 [USER]@[SERVER_IP] "cd /home/u123456789/domains/envoklear.info/public_html && cat > .env << 'EOF'
APP_NAME=EnvoKlear
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://envoklear.info

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=YOUR_DB_NAME
DB_USERNAME=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD

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
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=envoklear@gmail.com
MAIL_FROM_NAME=EnvoKlear
EOF
chmod 644 .env && php artisan key:generate --force && php artisan config:cache && echo '✅ .env created successfully!'"
```

**Replace:**
- `[USER]` - Your SSH username (e.g., u123456789)
- `[SERVER_IP]` - Your server IP
- `YOUR_DB_NAME` - Database name from hPanel
- `YOUR_DB_USER` - Database user from hPanel
- `YOUR_DB_PASSWORD` - Database password from hPanel
- `YOUR_GMAIL_APP_PASSWORD` - Your Gmail app password

---

## Required Values to Get

### 1. Database Credentials (From Hostinger hPanel)
- Go to: **Databases → MySQL Databases**
- Get: Database Name, Username, Password

### 2. Gmail App Password (Already have?)
- If not, generate at: https://myaccount.google.com/apppasswords
- Use the app password from earlier setup

---

## Verify .env is Working

After creating the file, check:

```bash
# SSH into server
ssh -p 65002 [user]@[server]

cd /home/u123456789/domains/envoklear.info/public_html

# Check .env exists
ls -la .env

# Check APP_KEY is generated
cat .env | grep APP_KEY
# Should show: APP_KEY=base64:xxxxx...

# Test database connection
php artisan migrate:status
```

---

## After .env is Created

1. Visit https://envoklear.info
2. Should now work!
3. If still error, check logs:
   ```bash
   tail -50 storage/logs/laravel.log
   ```

---

## Important Notes

⚠️ **Never commit .env to Git** - It contains sensitive passwords
✅ The `.env` file must be created manually on the server
✅ Each environment (local, production) has its own `.env`
✅ APP_KEY must be generated on the server

---

Need help? Let me know which method you'd like to use and I can guide you through it!
