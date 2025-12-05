# 🚀 Setup GitHub Actions for Automatic APK Builds

## Quick Setup (5 minutes)

### Step 1: Add Expo Token to GitHub Secrets

1. Go to: https://expo.dev/accounts/[your-account]/settings/access-tokens
2. Create a new token
3. Copy the token
4. Go to your GitHub repo → Settings → Secrets and variables → Actions
5. Add secret: `EXPO_TOKEN` = (paste your token)

### Step 2: Add Supabase Secrets

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secret: `EXPO_PUBLIC_SUPABASE_URL` = `https://lhledsnjzovhamddrjas.supabase.co`
3. Add secret: `EXPO_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)

### Step 3: Push to GitHub

```powershell
git add .
git commit -m "Add GitHub Actions workflow"
git push
```

### Step 4: Check Build Status

1. Go to your GitHub repo
2. Click "Actions" tab
3. See build progress
4. Download APK when complete

---

## How It Works

- ✅ Automatically builds on every push
- ✅ Runs on Ubuntu (no Windows issues)
- ✅ Uses EAS Build (but in cloud, so Gradle issues are handled)
- ✅ APK available for download

---

## Manual Trigger

You can also trigger builds manually:
1. Go to Actions tab
2. Click "Build Android APK"
3. Click "Run workflow"

---

**This is the easiest and most reliable method!** 🎉

