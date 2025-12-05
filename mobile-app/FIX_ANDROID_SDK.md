# 🔧 Fix Android SDK Configuration

## The Problem

Build failing with:
- `Could not find method useCoreDependencies()`
- `compileSdkVersion is not specified`

These are Android build configuration issues.

---

## ✅ Solution Applied

Added Android SDK configuration to `app.config.js`:
- `compileSdkVersion: 34`
- `targetSdkVersion: 34`
- `buildToolsVersion: "34.0.0"`

---

## Rebuild Now

```powershell
eas build --platform android --profile preview
```

---

## If Still Failing

If you still get errors, try:

1. **Clear build cache**:
   ```powershell
   eas build --platform android --profile preview --clear-cache
   ```

2. **Or use development build**:
   ```powershell
   eas build --platform android --profile development
   ```

---

**The Android SDK is now configured!** 🚀

