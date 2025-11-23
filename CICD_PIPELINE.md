# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for automated testing and deployment.

## Workflows

### 1. CI (Continuous Integration) - `ci.yml`

**Triggers:**
- Pull requests to `main` or `develop`
- Pushes to `develop` branch

**Steps:**
1. Setup PHP 8.2 with required extensions
2. Setup MySQL 8.0 for testing
3. Setup Node.js 20
4. Install Composer dependencies
5. Install NPM dependencies
6. Build frontend assets
7. Run database migrations
8. Run PHPUnit tests
9. Run Laravel Pint (code style)
10. Upload coverage reports

**Environment:**
- Ubuntu Latest
- PHP 8.2
- MySQL 8.0
- Node.js 20

---

### 2. CD (Continuous Deployment) - `deploy.yml`

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Steps:**
1. Checkout code
2. Setup PHP 8.2
3. Install production dependencies (--no-dev)
4. Setup Node.js 20
5. Build optimized assets
6. Create deployment package
7. Deploy via FTP to Hostinger
8. Run post-deployment commands via SSH:
   - Clear config cache
   - Clear route cache
   - Clear view cache
   - Run migrations
   - Link storage

---

## Required GitHub Secrets

### FTP Deployment:
- `FTP_SERVER` - Hostinger FTP hostname
- `FTP_USERNAME` - FTP username
- `FTP_PASSWORD` - FTP password
- `FTP_SERVER_DIR` - Target directory path

### SSH Post-Deployment:
- `SSH_HOST` - SSH hostname
- `SSH_USERNAME` - SSH username  
- `SSH_PASSWORD` - SSH password or private key
- `SSH_PORT` - SSH port (usually 65002)
- `DEPLOY_PATH` - Deployment path on server

---

## Usage

### Running Tests Locally

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test --filter=ExampleTest

# Check code style
vendor/bin/pint --test
```

### Deploying to Production

```bash
# 1. Ensure you're on develop
git checkout develop

# 2. Make changes and commit
git add .
git commit -m "feat: your changes"
git push origin develop

# 3. Create PR and merge to main after tests pass

# 4. Deployment runs automatically on push to main
git checkout main
git merge develop
git push origin main
```

### Manual Deployment Trigger

Go to GitHub → Actions → Deploy to Hostinger → Run workflow

---

## Monitoring Deployments

1. Go to repository → **Actions** tab
2. Click on the workflow run
3. View logs for each step
4. Check for errors or warnings

---

## Troubleshooting

### Tests Failing
- Check test logs in GitHub Actions
- Run tests locally to reproduce
- Verify database configuration

### Deployment Failing
- Check FTP credentials in secrets
- Verify server directory exists
- Check SSH connection
- Review deployment logs

### Post-Deployment Commands Failing
- Verify SSH credentials
- Check file permissions on server
- Ensure PHP artisan is accessible
- Review Laravel logs on server

---

## Best Practices

1. **Always test locally** before pushing
2. **Run Pint** before committing: `vendor/bin/pint`
3. **Write tests** for new features
4. **Review GitHub Actions logs** after deployment
5. **Monitor production** after deployment
6. **Keep secrets secure** - never commit them

---

## Workflow Files Location

- `.github/workflows/ci.yml` - Testing workflow
- `.github/workflows/deploy.yml` - Deployment workflow

---

**Last Updated:** 2025-11-23
