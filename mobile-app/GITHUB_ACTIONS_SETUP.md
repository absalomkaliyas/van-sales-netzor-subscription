# 🚀 GitHub Actions Setup - Step by Step

## Step 1: Add Secrets to GitHub

### 1.1 Go to GitHub Secrets Page

Open this URL in your browser:
```
https://github.com/absalomkaliyas/van-sales-netzor-subscription/settings/secrets/actions
```

### 1.2 Add First Secret: EXPO_PUBLIC_SUPABASE_URL

1. Click **"New repository secret"** button
2. **Name**: `EXPO_PUBLIC_SUPABASE_URL`
3. **Secret**: `https://lhledsnjzovhamddrjas.supabase.co`
4. Click **"Add secret"**

### 1.3 Add Second Secret: EXPO_PUBLIC_SUPABASE_ANON_KEY

1. Click **"New repository secret"** button again
2. **Name**: `EXPO_PUBLIC_SUPABASE_ANON_KEY`
3. **Secret**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY`
4. Click **"Add secret"**

### ✅ Verification

You should now see 2 secrets:
- ✅ `EXPO_PUBLIC_SUPABASE_URL`
- ✅ `EXPO_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 2: Trigger the Build

### Option A: Automatic (on push)

The build will automatically start when you push to `main` branch with changes in `mobile-app/` folder.

### Option B: Manual Trigger

1. Go to: `https://github.com/absalomkaliyas/van-sales-netzor-subscription/actions`
2. Click **"Build Android APK (Direct)"** workflow
3. Click **"Run workflow"** button (top right)
4. Select branch: `main`
5. Click green **"Run workflow"** button

---

## Step 3: Monitor Build Progress

1. Go to: `https://github.com/absalomkaliyas/van-sales-netzor-subscription/actions`
2. Click on the latest workflow run
3. Watch the build progress in real-time
4. Build takes **5-10 minutes**

---

## Step 4: Download APK

Once build completes (green checkmark):

1. Scroll down to **"Artifacts"** section
2. Click **"android-apk"**
3. APK file will download automatically
4. Install on your Android device! 📱

---

## What This Does

✅ Builds APK directly with Gradle (no EAS Build)  
✅ Runs on Ubuntu (no Windows issues)  
✅ Bypasses all Gradle compatibility errors  
✅ Free (2000 minutes/month on GitHub)  
✅ Automatic builds on every push  

---

## Troubleshooting

### Build Fails?

1. Check the workflow logs
2. Look for error messages
3. Common issues:
   - Missing secrets → Add them in Step 1
   - Dependencies issue → Will auto-fix with `expo install --fix`
   - Gradle error → Should not happen (we're using direct Gradle)

### Secrets Not Working?

- Make sure secret names are **exactly**:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Check for typos
- Secrets are case-sensitive

---

## Quick Reference

**Secrets URL**: https://github.com/absalomkaliyas/van-sales-netzor-subscription/settings/secrets/actions  
**Actions URL**: https://github.com/absalomkaliyas/van-sales-netzor-subscription/actions

---

**That's it! Your APK will be ready in 5-10 minutes!** 🎉

