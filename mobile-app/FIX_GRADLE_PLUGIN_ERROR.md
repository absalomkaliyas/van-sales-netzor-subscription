# 🔧 Fix Gradle Plugin Error

## The Problem

Build failed with:
```
Plugin [id: 'com.facebook.react.settings'] was not found
```

This happens when Expo SDK 51 is used but React Native Gradle plugin isn't properly configured.

---

## ✅ Solution: Use Expo SDK 50 (Stable)

I've reverted to Expo SDK 50 which is more stable and has better Android build support.

### What Changed

- Reverted `expo` from `~51.0.0` to `~50.0.0`
- Reverted `@expo/config-plugins` to `~8.0.0`
- Reverted `expo-camera` to `~14.0.0`
- Reverted `react-native` to `0.73.0`

---

## Next Steps

### Step 1: Update Dependencies

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo install --fix
```

This will ensure all packages are compatible with Expo SDK 50.

### Step 2: Rebuild

```powershell
eas build --platform android --profile preview
```

---

## Why SDK 50?

- ✅ More stable Android builds
- ✅ Better Gradle compatibility
- ✅ All packages tested together
- ✅ Less likely to have plugin issues

---

## Quick Commands

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo install --fix
eas build --platform android --profile preview
```

---

**Update dependencies first, then rebuild!** 🚀


