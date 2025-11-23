# SSH Deployment Setup Guide

## Required GitHub Secrets

You need to configure these secrets in your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

### SSH Secrets:

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `SSH_PRIVATE_KEY` | Your private SSH key | Generated locally (see below) |
| `HOSTING_IP` | Hostinger server IP | Hostinger hPanel → SSH Access |
| `HOSTING_USER` | SSH username | Hostinger hPanel → SSH Access (e.g., u123456789) |
| `HOSTING_PORT` | SSH port | Usually `65002` for Hostinger |
| `TARGET_DIR` | Full deployment path | e.g., `/home/u123456789/domains/envoklear.info/public_html` |

---

## Step 1: Generate SSH Key Pair (If you don't have one)

On your local machine:

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "deploy@envoklear" -f ~/.ssh/envoklear_deploy

# This creates two files:
# ~/.ssh/envoklear_deploy       (private key - keep secret!)
# ~/.ssh/envoklear_deploy.pub   (public key - upload to server)
```

---

## Step 2: Add Public Key to Hostinger

### Method 1: Via hPanel (Recommended)

1. Login to Hostinger hPanel
2. Go to **Advanced → SSH Access**
3. Click **Manage SSH Keys** or **Authorized Keys**
4. Click **Add New SSH Key**
5. Paste the content of `~/.ssh/envoklear_deploy.pub`
6. Save

### Method 2: Via SSH (If you have access)

```bash
# SSH into your server
ssh -p 65002 u123456789@your-server-ip

# Add your public key to authorized_keys
nano ~/.ssh/authorized_keys
# Paste your public key content
# Save and exit (Ctrl+O, Enter, Ctrl+X)

# Set correct permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

## Step 3: Add Private Key to GitHub Secrets

1. Copy your **private key**:
   ```bash
   # On Windows
   type %USERPROFILE%\.ssh\envoklear_deploy
   
   # On Mac/Linux
   cat ~/.ssh/envoklear_deploy
   ```

2. Go to GitHub repository:
   - **Settings → Secrets and variables → Actions**
   - Click **New repository secret**
   - Name: `SSH_PRIVATE_KEY`
   - Value: Paste the **entire** private key (including `-----BEGIN...` and `-----END...` lines)
   - Click **Add secret**

---

## Step 4: Add Other Secrets

### Get Hostinger SSH Details:

1. Login to hPanel
2. Go to **Advanced → SSH Access**
3. Note down:
   - **IP Address** (e.g., 123.123.123.123)
   - **Username** (e.g., u123456789)
   - **Port** (usually 65002)

### Add to GitHub Secrets:

```
HOSTING_IP = 123.123.123.123
HOSTING_USER = u123456789
HOSTING_PORT = 65002
TARGET_DIR = /home/u123456789/domains/envoklear.info/public_html
```

**⚠️ Important:** Make sure `TARGET_DIR` path is correct!

---

## Step 5: Test SSH Connection (Optional but Recommended)

Test locally first:

```bash
ssh -i ~/.ssh/envoklear_deploy -p 65002 u123456789@123.123.123.123

# If successful, you should see Hostinger welcome message
# Type 'exit' to disconnect
```

---

## Step 6: Deploy!

Once all secrets are configured:

```bash
git add .
git commit -m "feat: switch to SSH/Rsync deployment"
git push origin main
```

This will trigger the deployment workflow using SSH!

---

## Troubleshooting

### Error: Permission denied (publickey)
- Make sure public key is added to `~/.ssh/authorized_keys` on server
- Check private key format in GitHub secrets (must include BEGIN/END lines)
- Verify SSH port is correct (usually 65002 for Hostinger)

### Error: Host key verification failed
- Add to workflow (already included):
  ```yaml
  ARGS: "-rlgoDzvc -i --strict-host-key-checking=no"
  ```

### Error: Connection timed out
- Check HOSTING_IP is correct
- Check HOSTING_PORT is correct (65002)
- Ensure SSH is enabled in hPanel

### Files not deploying
- Check TARGET_DIR path is correct
- Verify SSH user has write permissions to directory

---

## What Gets Deployed

**Included:**
- All application files
- Built assets (from `npm run build`)
- Composer dependencies (installed on server)

**Excluded:**
- `node_modules/` (too large, not needed)
- `.git/` (version control)
- `.github/` (workflows)
- `tests/` (testing files)
- `storage/logs/` (server-specific)
- `.env` (must exist on server already)
- `vendor/` (installed on server with composer)

---

## Post-Deployment Commands

After deployment, these commands run automatically:

```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link
```

---

**Last Updated:** 2025-11-23
