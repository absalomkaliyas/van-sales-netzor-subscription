# ⚡ Quick Fix: Release Build node:sea Error

## 🚀 Solution: Export Bundle First

The release build fails because it tries to create the bundle and hits the `node:sea` error. Export the bundle first with the environment variable set.

---

## 📋 Step-by-Step Fix

### Step 1: Open PowerShell

**In Android Studio Terminal or separate PowerShell:**

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

### Step 2: Set Environment Variable and Export

```powershell
$env:EXPO_NO_METRO_EXTERNALS=1
npx expo export --platform android
```

**Wait for export to complete** (2-5 minutes)

**You should see:**
- ✅ "Exporting..."
- ✅ "Bundling JavaScript..."
- ✅ "Export complete!"

### Step 3: Build Release APK

**In Android Studio:**
1. **Build Variants → release** (make sure it's selected)
2. **Build → Build APK(s)**
3. **Should work now!** ✅

---

## ✅ What This Does

- **Exports bundle with environment variable set** - Skips Metro externals
- **Bundle is created** - No `node:sea` error
- **Release build uses exported bundle** - No Metro needed during build

---

## 🔧 If Export Still Fails

### Try with More Flags:

```powershell
$env:EXPO_NO_METRO_EXTERNALS=1
$env:EXPO_NO_UPDATE_CHECK=1
npx expo export --platform android --clear
```

### Or Run Fix Script First:

```powershell
.\fix-node-sea-comprehensive.ps1
$env:EXPO_NO_METRO_EXTERNALS=1
npx expo export --platform android
```

---

## 📝 Quick Copy-Paste

**Run this in PowerShell:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
$env:EXPO_NO_METRO_EXTERNALS=1
npx expo export --platform android
```

**Then in Android Studio:**
- Build Variants → release
- Build → Build APK(s)

---

## ✅ Success!

Once export completes and release APK builds:
- ✅ No `node:sea` error
- ✅ Release APK includes JavaScript bundle
- ✅ Works standalone on device!

**Try it now!** 🚀

