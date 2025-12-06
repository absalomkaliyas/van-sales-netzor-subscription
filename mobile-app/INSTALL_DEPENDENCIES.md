# 📦 Install Dependencies First

## The Error

You're seeing this error:
```
ConfigError: Cannot determine the project's Expo SDK version because the module `expo` is not installed.
```

This means you need to install dependencies first!

---

## ✅ Quick Fix

Run these commands in PowerShell:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm install
```

**Wait for it to finish** - this will install all dependencies including:
- `expo` (required)
- `expo-build-properties` (for Gradle fixes)
- All other packages

---

## After Installation

Once `npm install` completes, run:

```powershell
npx expo install --fix
```

This ensures all Expo packages are compatible with SDK 50.

---

## Then Build

After dependencies are installed:

```powershell
eas build --platform android --profile preview
```

---

## What Happens

1. **`npm install`** - Installs all packages from `package.json`
2. **`npx expo install --fix`** - Aligns Expo packages with SDK 50
3. **`eas build`** - Builds your APK

---

**Run `npm install` first, then everything else will work!** 🚀
