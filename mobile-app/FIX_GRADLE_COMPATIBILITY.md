# 🔧 Fix Gradle Compatibility Error

## The Problem

Build failing with Gradle errors:
- `Cannot invoke method multiply() on null object`
- `Could not get unknown property 'release'`

This is a compatibility issue with Expo SDK 50 and Android Gradle.

---

## ✅ Solution: Update Expo SDK

I've updated `package.json` to use Expo SDK 51 which has better Android compatibility.

### What Changed

- Updated `"expo": "~50.0.0"` to `"expo": "~51.0.0"`

---

## Next Steps

### Step 1: Update Dependencies

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo install --fix
```

This will update all Expo packages to compatible versions.

### Step 2: Rebuild

```powershell
eas build --platform android --profile preview
```

---

## Alternative: If SDK 51 Doesn't Work

If the error persists, we can try:

1. **Use Expo SDK 49** (more stable):
   ```json
   "expo": "~49.0.0"
   ```

2. **Or add gradle.properties** configuration

---

## Quick Fix Commands

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo install --fix
eas build --platform android --profile preview
```

---

**Update dependencies first, then rebuild!** 🚀

