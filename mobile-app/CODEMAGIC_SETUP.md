# 🚀 Codemagic Setup - Step by Step Guide

Follow these steps to build your Android APK using Codemagic (FREE & EASY).

---

## Step 1: Sign Up for Codemagic (2 minutes)

1. **Go to**: https://codemagic.io/signup
2. **Click**: "Sign up with GitHub" (recommended)
3. **Authorize**: Allow Codemagic to access your GitHub account
4. **Complete**: Fill in your email and basic info

**✅ You now have a free Codemagic account (500 build minutes/month)**

---

## Step 2: Connect Your Repository (1 minute)

1. **After signup**, you'll see the dashboard
2. **Click**: "Add application" (big blue button)
3. **Select**: "GitHub" as your Git provider
4. **Find your repo**: Search for `van-sales-netzor-subscription`
5. **Click**: On your repository name
6. **Click**: "Finish: Add application"

**✅ Your repository is now connected!**

---

## Step 3: Add Environment Variables (2 minutes)

1. **Click** on your app: `van-sales-netzor-subscription`
2. **Go to**: "Environment variables" tab (left sidebar)
3. **Click**: "Add variable" button

### Add First Variable:
- **Variable name**: `EXPO_PUBLIC_SUPABASE_URL`
- **Variable value**: `https://lhledsnjzovhamddrjas.supabase.co`
- **Group**: Click "Create new group" and name it `expo_secrets` (or you can use the default group)
- **Click**: "Add"

### Add Second Variable:
- **Click**: "Add variable" again
- **Variable name**: `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- **Variable value**: (Your Supabase anon key - get it from Supabase dashboard)
- **Group**: Select the same group you created above (`expo_secrets`) or use default
- **Click**: "Add"

**Note**: The group name doesn't matter for the build to work - you can use the default group or create a new one. Both variables just need to be added.

**✅ Environment variables are set!**

---

## Step 4: Configure Workflow (Already Done!)

The `codemagic.yaml` file is already configured in your repo. Codemagic will automatically detect it.

**✅ No action needed - it's ready!**

---

## Step 5: Start Your First Build (1 minute)

1. **Go to**: Your app dashboard
2. **Click**: "Start new build" button (top right)
3. **Select**:
   - **Branch**: `main`
   - **Workflow**: `android-workflow` (should be auto-selected)
4. **Click**: "Start new build"

**✅ Build started!**

---

## Step 6: Wait for Build (10-15 minutes)

1. **Watch the build progress** in real-time
2. **You'll see**:
   - ✅ Installing dependencies
   - ✅ Prebuilding Android
   - ✅ Building APK
   - ✅ Uploading artifacts

**⏳ Average build time: 10-15 minutes**

---

## Step 7: Download Your APK (1 minute)

1. **When build completes**, you'll see a green checkmark ✅
2. **Click**: On the build (or "Artifacts" tab)
3. **Find**: `app-release.apk` file
4. **Click**: "Download"
5. **Save** the APK to your computer

**✅ APK downloaded!**

---

## Step 8: Install on Android Device

### Option A: Direct Install (Easiest)
1. **Transfer APK** to your Android phone (USB, email, or cloud)
2. **Open** the APK file on your phone
3. **Allow** installation from unknown sources (if prompted)
4. **Install** the app
5. **Open** and test!

### Option B: Via ADB (If you have Android Studio)
```bash
adb install app-release.apk
```

**✅ App installed on your device!**

---

## 🎉 You're Done!

Your mobile app is now built and ready to use!

---

## 📋 Quick Reference

### Where to Find Things:

- **Codemagic Dashboard**: https://codemagic.io/apps
- **Your App**: Click on `van-sales-netzor-subscription`
- **Builds**: "Builds" tab (see all builds)
- **Artifacts**: Click on a build → "Artifacts" tab
- **Environment Variables**: "Environment variables" tab

### Build Status:
- 🟡 **Yellow** = Building
- 🟢 **Green** = Success ✅
- 🔴 **Red** = Failed ❌

---

## ❓ Troubleshooting

### Build Fails?
1. **Check logs**: Click on failed build → "Logs" tab
2. **Common issues**:
   - Missing environment variables → Add them in Step 3
   - Wrong branch → Make sure you're building `main` branch
   - Dependencies issue → Check if `package.json` is correct

### Can't Find APK?
- **Check**: "Artifacts" tab in the build
- **Look for**: `app-release.apk` or `*.apk` files
- **If not there**: Build might have failed - check logs

### Need Help?
- **Codemagic Docs**: https://docs.codemagic.io
- **Support**: support@codemagic.io

---

## 🎯 Next Steps After First Build

1. **Test the APK** on your device
2. **Share with team** - download and distribute
3. **Set up automatic builds**:
   - Go to "Settings" → "Build triggers"
   - Enable "Build on push" (builds automatically on git push)

---

## 💡 Pro Tips

- **Free tier**: 500 build minutes/month (plenty for testing)
- **Builds are cached**: Second build will be faster
- **Multiple workflows**: You can create iOS workflow later
- **Notifications**: Enable email notifications for build status

---

**Ready to start? Go to Step 1!** 🚀

