# Codemagic Setup Guide - Step by Step

## 📱 How to Build Your Mobile App with Codemagic

### Step 1: Create Codemagic Account

1. Go to [https://codemagic.io](https://codemagic.io)
2. Click **"Sign up"** or **"Get started"**
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Codemagic to access your GitHub account

### Step 2: Add Your Repository

1. After signing in, click **"Add application"**
2. Select your GitHub account
3. Find and select: **`van-sales-netzor-subscription`**
4. Click **"Add application"**

### Step 3: Configure Environment Variables

1. In your app settings, go to **"Environment variables"**
2. Click **"Add variable"** for each:

   **Variable 1:**
   - **Name:** `EXPO_PUBLIC_SUPABASE_URL`
   - **Value:** `https://lhledsnjzovhamddrjas.supabase.co`
   - **Group:** `expo_secrets` (create this group if it doesn't exist)
   - **Secure:** No (it's a public URL)

   **Variable 2:**
   - **Name:** `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `[Your Supabase anon key]`
   - **Group:** `expo_secrets`
   - **Secure:** Yes (mark as secure)

3. Click **"Save"** for each variable

### Step 4: Start Your First Build

1. Go to your app dashboard
2. Click **"Start new build"**
3. Select:
   - **Workflow:** `android-production-build` (auto-detected from `codemagic.yaml`)
   - **Branch:** `main`
4. Click **"Start new build"**

### Step 5: Wait for Build to Complete

- Build typically takes 10-15 minutes
- You'll see real-time logs
- You'll get a notification when complete

### Step 6: Download Your APK

1. Once build completes, click on the build
2. Scroll to **"Artifacts"** section
3. Download the **APK file**
4. Install on your Android device!

---

## 🔧 Configuration Details

Your `codemagic.yaml` is already configured with:

- ✅ Expo SDK 50 (stable)
- ✅ Node.js 20
- ✅ Java 17
- ✅ Clean build process
- ✅ Automatic APK generation

---

## 📋 Quick Checklist

- [ ] Signed up for Codemagic
- [ ] Connected GitHub repository
- [ ] Added `EXPO_PUBLIC_SUPABASE_URL` environment variable
- [ ] Added `EXPO_PUBLIC_SUPABASE_ANON_KEY` environment variable
- [ ] Started first build
- [ ] Downloaded APK

---

## 🆘 Troubleshooting

### Build Fails?

1. Check the build logs for errors
2. Verify environment variables are set correctly
3. Make sure `codemagic.yaml` is in the repository root
4. Check that the branch name matches (usually `main`)

### Can't Find Workflow?

- Make sure `codemagic.yaml` is committed to your repository
- Check that it's in the root directory (not in `mobile-app/`)
- The workflow name should be `android-production-build`

### Environment Variables Not Working?

- Make sure the **Group** is set to `expo_secrets`
- Verify variable names match exactly (case-sensitive)
- Check that secure variables are marked as "Secure"

---

## 💡 Tips

1. **Free Tier:** Codemagic offers free builds (with some limits)
2. **Build History:** All builds are saved for 30 days
3. **Notifications:** Enable email/Slack notifications for build status
4. **Automatic Builds:** You can set up automatic builds on push to `main` branch

---

## 🎯 Next Steps After First Build

1. Test the APK on your Android device
2. If successful, you can set up automatic builds
3. Consider setting up distribution (Google Play, etc.)

---

## 📞 Need Help?

- Codemagic Docs: [https://docs.codemagic.io](https://docs.codemagic.io)
- Codemagic Support: Available in the dashboard

