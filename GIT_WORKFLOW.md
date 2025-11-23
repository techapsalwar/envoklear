# EnvoKlear Git Workflow Guide

## Branch Structure

```
main          # Production-ready code (protected)
├── develop   # Development branch (integration)
├── feature/* # Feature branches
├── bugfix/*  # Bug fix branches
└── hotfix/*  # Emergency production fixes
```

---

## Branches Explained

### `main`
- **Purpose:** Production-ready code only
- **Protection:** Direct commits not allowed
- **Merges from:** `hotfix/*`, `develop` (via release)
- **Deploy:** Automatically to production

### `develop`
- **Purpose:** Integration branch for features
- **Base for:** `feature/*`, `bugfix/*`
- **Merges to:** `main` (via release process)
- **Deploy:** Automatically to staging

### `feature/*`
- **Purpose:** New features and enhancements
- **Naming:** `feature/feature-name` (e.g., `feature/user-dashboard`)
- **Base:** `develop`
- **Merges to:** `develop`
- **Lifetime:** Temporary (deleted after merge)

### `bugfix/*`
- **Purpose:** Non-urgent bug fixes
- **Naming:** `bugfix/bug-description` (e.g., `bugfix/login-validation`)
- **Base:** `develop`
- **Merges to:** `develop`
- **Lifetime:** Temporary (deleted after merge)

### `hotfix/*`
- **Purpose:** Critical production bugs
- **Naming:** `hotfix/issue-description` (e.g., `hotfix/payment-gateway`)
- **Base:** `main`
- **Merges to:** `main` AND `develop`
- **Lifetime:** Temporary (deleted after merge)

---

## Workflow Commands

### Initial Setup
```bash
# Initialize repository
git init

# Create develop branch
git checkout -b develop

# Push both branches to remote
git push -u origin main
git push -u origin develop
```

### Feature Development
```bash
# Create and switch to feature branch
git checkout develop
git checkout -b feature/my-feature

# Work on your feature
git add .
git commit -m "feat: add new feature"

# Push feature branch
git push -u origin feature/my-feature

# Merge back to develop (after review)
git checkout develop
git merge --no-ff feature/my-feature
git push origin develop

# Delete feature branch
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Bug Fix
```bash
# Create bugfix branch
git checkout develop
git checkout -b bugfix/fix-description

# Fix the bug
git add .
git commit -m "fix: resolve issue description"

# Merge back to develop
git checkout develop
git merge --no-ff bugfix/fix-description
git push origin develop

# Delete bugfix branch
git branch -d bugfix/fix-description
```

### Hotfix (Emergency)
```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-issue

# Fix the issue
git add .
git commit -m "hotfix: resolve critical issue"

# Merge to main
git checkout main
git merge --no-ff hotfix/critical-issue
git tag -a v1.0.1 -m "Hotfix: critical issue"
git push origin main --tags

# Also merge to develop
git checkout develop
git merge --no-ff hotfix/critical-issue
git push origin develop

# Delete hotfix branch
git branch -d hotfix/critical-issue
```

### Release Process
```bash
# Create release branch
git checkout develop
git checkout -b release/v1.0.0

# Update version numbers, changelog
git commit -m "chore: prepare release v1.0.0"

# Merge to main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0

# Push everything
git push origin main --tags
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
```

---

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples:
```bash
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(api): resolve data validation error"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor(header): extract navigation to component"
```

---

## Best Practices

### ✅ Do's
- Always create feature branches from `develop`
- Write descriptive commit messages
- Keep commits small and focused
- Pull latest changes before starting work
- Delete branches after merging
- Use `--no-ff` for merges to preserve history
- Tag releases on `main`

### ❌ Don'ts
- Don't commit directly to `main` or `develop`
- Don't merge without code review
- Don't push incomplete features
- Don't mix multiple changes in one commit
- Don't forget to pull before pushing

---

## Branch Protection Rules

### `main` Branch
- ✅ Require pull request reviews (1+)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ No force pushes
- ✅ No deletions

### `develop` Branch  
- ✅ Require pull request reviews (1+)
- ✅ Require status checks to pass
- ❌ Allow force pushes (with care)

---

## Quick Reference

| Task | Command |
|------|---------|
| Create feature | `git checkout -b feature/name develop` |
| Create bugfix | `git checkout -b bugfix/name develop` |
| Create hotfix | `git checkout -b hotfix/name main` |
| Switch branch | `git checkout branch-name` |
| Check status | `git status` |
| View branches | `git branch -a` |
| Delete local branch | `git branch -d branch-name` |
| Delete remote branch | `git push origin --delete branch-name` |

---

## Troubleshooting

### Merge Conflicts
```bash
# Pull latest changes
git pull origin develop

# Resolve conflicts in your editor
# Then stage resolved files
git add .
git commit -m "merge: resolve conflicts"
```

### Undo Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1
```

### Discard Local Changes
```bash
git checkout -- filename
# or discard all
git reset --hard HEAD
```

---

## Visual Workflow

```
main     ──●────────────●────────●──────→ (production)
            ↑          ↑        ↑
            │          │        │ (release/hotfix)
develop  ───●─────●────●────●───●──────→ (staging)
             ↗   ↗      ↗  ↗
feature/*   /   /      /  /
           ●   ●      ●  ●
```

---

**Remember:** This workflow ensures code quality, clear history, and safe deployments! 🚀
