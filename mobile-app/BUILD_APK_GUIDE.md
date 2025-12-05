# 📱 Build Standalone APK - Complete Guide

## Why Build APK?

✅ **No development server needed**  
✅ **No Windows errors**  
✅ **Works on any Android device**  
✅ **Can distribute to multiple users**  
✅ **Professional deployment**

---

## Step-by-Step Instructions

### Step 1: Install EAS CLI

```powershell
npm install -g eas-cli
```

### Step 2: Login to Expo

```powershell
eas login
```

- If you don't have an Expo account, create one at: https://expo.dev
- It's **free** for basic usage

### Step 3: Navigate to Mobile App

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

### Step 4: Configure EAS Build

```powershell
eas build:configure
```

This will:
- Create `eas.json` (already created for you)
- Set up build configuration

### Step 5: Build APK

```powershell
eas build --platform android --profile preview
```

**This will:**
1. Upload your code to Expo's cloud servers
2. Build the APK in the cloud (no Windows issues!)
3. Give you a download link
4. Take about 10-15 minutes

### Step 6: Download and Install

1. Wait for build to complete
2. You'll get a download link
3. Download the APK file
4. Transfer to your Android phone
5. Enable "Install from unknown sources" in Android settings
6. Install the APK
7. Run the app!

---

## Alternative: Build Locally (If You Have Android Studio)

If you have Android Studio installed:

```powershell
eas build --platform android --profile preview --local
```

This builds on your machine but requires Android Studio setup.

---

## What You Need

- ✅ Expo account (free)
- ✅ Internet connection
- ✅ Android phone for testing

**That's it!** No need to fix Windows errors!

---

## Quick Commands

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
cd "B:\VAN Sales Netzor Subscription\mobile-app"
eas build --platform android --profile preview
```

---

## Troubleshooting

### "eas: command not found"
- Make sure EAS CLI is installed: `npm install -g eas-cli`
- Restart terminal after installation

### "Not logged in"
- Run: `eas login`
- Create account if needed

### Build fails
- Check your `.env` file has correct Supabase credentials
- Ensure all dependencies are in `package.json`

---

## After Building

Once you have the APK:
1. **Test on your phone** - Install and test all features
2. **Distribute to team** - Share APK with other users
3. **Update easily** - Build new APK when you make changes

---

## Next Builds

After the first build, future builds are faster:

```powershell
eas build --platform android --profile preview
```

---

**This completely bypasses the Windows `node:sea` error!** 🚀

The app is built in the cloud, so Windows issues don't matter!

