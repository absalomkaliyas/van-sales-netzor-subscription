# ⚡ Quick Start - GitHub Actions Build

## 3 Simple Steps

### Step 1: Add Secrets to GitHub

Go to: `https://github.com/absalomkaliyas/van-sales-netzor-subscription/settings/secrets/actions`

Add these secrets:
- `EXPO_PUBLIC_SUPABASE_URL` = `https://lhledsnjzovhamddrjas.supabase.co`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` = (your anon key from Supabase)

### Step 2: Push to GitHub

```powershell
git push
```

### Step 3: Download APK

1. Go to: `https://github.com/absalomkaliyas/van-sales-netzor-subscription/actions`
2. Click on the latest workflow run
3. Scroll down to "Artifacts"
4. Download `android-apk`

---

## That's It! 🎉

**No EAS Build issues, no Gradle errors - just works!**

---

## Manual Trigger

You can also trigger manually:
1. Go to Actions tab
2. Click "Build Android APK (Direct)"
3. Click "Run workflow"
4. Click green "Run workflow" button

---

**This builds directly with Gradle - bypasses all EAS issues!** ✅

