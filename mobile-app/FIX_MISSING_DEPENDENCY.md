# 🔧 Fix Missing Dependency Error

## The Problem

Build failed because `@expo/config-plugins` is missing. This package is required by `expo-camera` plugin.

---

## ✅ Solution: Add Missing Dependency

I've already added `@expo/config-plugins` to your `package.json`.

### Step 1: Commit the Change

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
git add package.json
git commit -m "Add missing @expo/config-plugins dependency"
git push
```

### Step 2: Rebuild

```powershell
eas build --platform android --profile preview
```

---

## What Was Fixed

Added to `package.json`:
```json
"@expo/config-plugins": "~8.0.0"
```

This package is required for Expo plugins (like expo-camera) to work during the build.

---

## Alternative: Install Locally First

If you want to test locally first:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm install
```

Then rebuild.

---

## After Fixing

The build should now succeed! The missing dependency has been added to `package.json`.

---

**Just commit the change and rebuild!** 🚀

