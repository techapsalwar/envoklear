# Git Quick Start Guide

## Current Branch Structure ✅

```
✓ main      # Production branch (protected)
✓ develop   # Development branch (active)
```

## Quick Commands

### Check current branch
```bash
git branch
```

### Create a new feature
```bash
git checkout develop
git checkout -b feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: my feature description"
git checkout develop
git merge --no-ff feature/my-feature
```

### View full workflow
See `GIT_WORKFLOW.md` for complete documentation.

## Next Steps

1. **Add remote repository** (when ready):
   ```bash
   git remote add origin https://github.com/username/envoklear.git
   git push -u origin main
   git push -u origin develop
   ```

2. **Start development**:
   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

3. **Commit your work**:
   ```bash
   git add .
   git commit -m "feat: your changes"
   ```

---

📖 **Full Documentation:** [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)
