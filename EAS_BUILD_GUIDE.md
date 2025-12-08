# 🚀 Build with EAS Build (Expo Application Services)

## ✅ EAS Build Setup Complete!

Your `eas.json` is configured and ready to build!

---

## 📋 Step-by-Step: Build with EAS

### Step 1: Install EAS CLI (if not already installed)

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo Account

```bash
eas login
```

**If you don't have an account:**
1. Go to https://expo.dev
2. Sign up for free account
3. Then run `eas login`

### Step 3: Navigate to Mobile App

```bash
cd mobile-app
```

### Step 4: Configure EAS (First Time Only)

```bash
eas build:configure
```

This will:
- ✅ Link your project to EAS
- ✅ Set up build profiles
- ✅ Configure credentials

### Step 5: Set Environment Variables in EAS

**Option A: Using EAS CLI (Recommended)**

```bash
# Set Supabase URL
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --type string

# Set Supabase Anon Key
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicdFEUUFY" --type string
```

**Option B: Using Expo Dashboard**
1. Go to https://expo.dev/accounts/[your-account]/projects/van-sales-netzor-supplier
2. Click **"Secrets"** in sidebar
3. Click **"Add Secret"**
4. Add both variables:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Step 6: Build Android APK

**For Preview Build (Internal Testing):**
```bash
eas build --platform android --profile preview
```

**For Production Build:**
```bash
eas build --platform android --profile production
```

### Step 7: Wait for Build

- **Build time:** 10-20 minutes
- **Watch progress:**
  - In terminal (live logs)
  - Or at https://expo.dev (web dashboard)

### Step 8: Download APK

**When build completes:**

1. **From Terminal:**
   - Build URL will be shown
   - Click the link to download

2. **From Expo Dashboard:**
   - Go to https://expo.dev
   - Click on your project
   - Go to **"Builds"** tab
   - Click on completed build
   - Click **"Download"** button

---

## 🎯 Build Profiles

### Preview Profile
- **Purpose:** Internal testing
- **Distribution:** Internal (APK)
- **Command:** `eas build --platform android --profile preview`

### Production Profile
- **Purpose:** Production release
- **Distribution:** APK
- **Command:** `eas build --platform android --profile production`

---

## 🔧 Quick Build Commands

```bash
# Preview build (recommended for testing)
cd mobile-app
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production

# Build for both platforms
eas build --platform all --profile preview
```

---

## ✅ Pre-Build Checklist

- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Logged in to Expo (`eas login`)
- [ ] EAS configured (`eas build:configure`)
- [ ] Environment variables set (in `eas.json` or EAS secrets)
- [ ] In `mobile-app` directory
- [ ] Code committed to git

---

## 📱 After Build Completes

1. **Download APK** from Expo dashboard
2. **Install on device:**
   - Copy APK to phone
   - Tap to install
   - Allow "Install from unknown sources" if needed
3. **Test your app!**

---

## 🆘 Troubleshooting

### Error: "Not logged in"
```bash
eas login
```

### Error: "Project not configured"
```bash
cd mobile-app
eas build:configure
```

### Error: "Environment variables not found"
- Check `eas.json` has env vars
- Or set them in EAS dashboard under "Secrets"

### Error: "Build failed"
1. Check build logs in terminal
2. Or check https://expo.dev dashboard
3. Look for specific error messages
4. Share error and I'll help fix

---

## 💡 EAS Build vs Codemagic

**EAS Build:**
- ✅ Official Expo service
- ✅ Automatic credential management
- ✅ Integrated with Expo ecosystem
- ✅ Free tier available

**Codemagic:**
- ✅ More customization
- ✅ Direct Gradle control
- ✅ CI/CD workflows

**Both work great!** Choose based on your preference.

---

## 🎉 Ready to Build!

**Quick Start:**
```bash
cd mobile-app
eas build --platform android --profile preview
```

**That's it!** EAS will handle everything else. 🚀

---

## 📚 More Resources

- **EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **EAS CLI Docs:** https://docs.expo.dev/eas/
- **Expo Dashboard:** https://expo.dev

