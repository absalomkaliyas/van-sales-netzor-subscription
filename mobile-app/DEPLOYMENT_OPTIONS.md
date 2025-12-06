# Mobile App Deployment Options

Since GitHub Actions is having Gradle issues, here are **4 alternative ways** to deploy your mobile app:

---

## 🚀 Option 1: Codemagic (RECOMMENDED - Free & Easy)

**Best for:** Free CI/CD, mobile-optimized, handles Expo well

### Setup Steps:

1. **Sign up**: https://codemagic.io/signup (Free tier: 500 build minutes/month)

2. **Connect GitHub**:
   - Go to https://codemagic.io/apps
   - Click "Add application"
   - Select your GitHub repo: `van-sales-netzor-subscription`
   - Click "Finish"

3. **Add Secrets**:
   - Go to your app settings → "Environment variables"
   - Add these variables:
     - `EXPO_PUBLIC_SUPABASE_URL` = `https://lhledsnjzovhamddrjas.supabase.co`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)

4. **Start Build**:
   - Click "Start new build"
   - Select branch: `main`
   - Workflow: `android-workflow`
   - Click "Start new build"

5. **Download APK**:
   - Wait ~10-15 minutes
   - Download APK from build artifacts

**✅ Pros:** Free, mobile-optimized, handles Gradle well  
**❌ Cons:** 500 minutes/month limit on free tier

---

## 🎯 Option 2: Downgrade Expo SDK (Fix Root Cause)

**Best for:** Making GitHub Actions work

The issue is Expo SDK 51 has Gradle compatibility problems. Let's downgrade to SDK 50 (stable):

### Steps:

```powershell
cd mobile-app
npm install expo@~50.0.0
npx expo install --fix
```

Then commit and push - GitHub Actions should work.

**✅ Pros:** Fixes the root cause, keeps using GitHub Actions  
**❌ Cons:** Slightly older Expo version

---

## 📦 Option 3: EAS Build (Expo's Official Service)

**Best for:** Official Expo support, managed builds

### Setup Steps:

1. **Install EAS CLI**:
   ```powershell
   npm install -g eas-cli
   ```

2. **Login**:
   ```powershell
   eas login
   ```

3. **Configure** (already done - `eas.json` exists)

4. **Set Environment Variables**:
   ```powershell
   eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --scope project --type string --environment preview
   eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "YOUR_ANON_KEY" --scope project --type string --environment preview
   ```

5. **Build**:
   ```powershell
   cd mobile-app
   eas build --platform android --profile preview
   ```

6. **Download**:
   - Go to https://expo.dev
   - Your builds → Download APK

**✅ Pros:** Official Expo service, handles everything  
**❌ Cons:** Free tier has queue limits

---

## 🔧 Option 4: Bitrise (Alternative CI/CD)

**Best for:** Professional CI/CD, more control

### Setup Steps:

1. **Sign up**: https://www.bitrise.io (Free tier available)

2. **Connect GitHub**:
   - Add your repository
   - Select "React Native" workflow

3. **Configure**:
   - Add environment variables (same as Codemagic)
   - Use default React Native workflow

4. **Build**:
   - Trigger build manually or on push

**✅ Pros:** Professional, flexible  
**❌ Cons:** More complex setup

---

## 🎯 RECOMMENDED: Try Option 1 (Codemagic) First

**Why?**
- ✅ Free tier (500 min/month)
- ✅ Mobile-optimized
- ✅ Handles Expo/Gradle well
- ✅ Easy setup (5 minutes)
- ✅ Already configured (`codemagic.yaml` exists)

**Next Steps:**
1. Sign up at https://codemagic.io
2. Connect your GitHub repo
3. Add secrets
4. Start build
5. Download APK in 10-15 minutes

---

## 📱 Quick Test: Use Expo Go (No Build Needed!)

**For testing only** - works on physical device:

1. **Fix the Windows bug** (if needed):
   - Search for `node:sea` in VS Code
   - Replace with `node-sea`

2. **Start Expo**:
   ```powershell
   cd mobile-app
   npm start
   ```

3. **Scan QR code** with Expo Go app

**✅ Pros:** Instant, no build needed  
**❌ Cons:** Requires Expo Go app, not production-ready

---

## 🏆 Best Overall Solution

**For production APK:** Use **Codemagic** (Option 1)  
**For quick testing:** Use **Expo Go** (Quick Test)

The `codemagic.yaml` file is already created - just sign up and connect!

