# 🚀 Quick Deployment Guide

## ⚡ FASTEST: Use Codemagic (5 minutes setup)

### Step 1: Sign Up
1. Go to: https://codemagic.io/signup
2. Sign up with GitHub (free)

### Step 2: Connect Repo
1. Click "Add application"
2. Select: `van-sales-netzor-subscription`
3. Click "Finish"

### Step 3: Add Secrets
1. Go to app → "Environment variables"
2. Click "Add variable"
3. Add these 2 variables:
   - Name: `EXPO_PUBLIC_SUPABASE_URL`
     Value: `https://lhledsnjzovhamddrjas.supabase.co`
   - Name: `EXPO_PUBLIC_SUPABASE_ANON_KEY`
     Value: (your anon key from Supabase)

### Step 4: Build
1. Click "Start new build"
2. Branch: `main`
3. Workflow: `android-workflow`
4. Click "Start new build"

### Step 5: Download APK
- Wait 10-15 minutes
- Click "Download" on the build
- Install APK on your Android device

**✅ Done! APK ready in 15 minutes**

---

## 🔧 ALTERNATIVE: Fix GitHub Actions (Downgrade Expo)

If you want to keep using GitHub Actions:

```powershell
cd mobile-app
npm install expo@~50.0.0
npx expo install --fix
git add .
git commit -m "Downgrade Expo SDK to 50 for Gradle compatibility"
git push
```

Then GitHub Actions should work.

---

## 📱 TESTING: Use Expo Go (No Build)

For quick testing without building:

1. Install **Expo Go** app on your phone
2. Run: `cd mobile-app && npm start`
3. Scan QR code with Expo Go
4. App loads instantly!

**Note:** This is for testing only, not production.

---

## 🎯 RECOMMENDED: Codemagic

**Why?**
- ✅ Free (500 min/month)
- ✅ Works immediately
- ✅ Mobile-optimized
- ✅ Already configured

**Start here:** https://codemagic.io/signup

