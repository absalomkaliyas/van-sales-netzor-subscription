# 🔧 Fix node:sea Error in Release Build

## ❌ Error: `node:sea` directory creation fails during release build

**Problem:**
- Windows can't create directory with colon (`:`) in name
- Release build tries to create bundle
- Bundle creation fails due to `node:sea` error

---

## 🚀 Solution 1: Export Bundle First (Recommended)

Export the bundle before building, which avoids the Metro externals issue.

### Step 1: Export Bundle

**In PowerShell (run this first):**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
$env:EXPO_NO_METRO_EXTERNALS=1
npx expo export --platform android
```

**Wait for export to complete** (may take a few minutes)

### Step 2: Build Release APK

**In Android Studio:**
1. **Build Variants → release**
2. **Build → Build APK(s)**
3. **Should work now!** ✅

---

## 🚀 Solution 2: Patch Expo CLI (Permanent Fix)

### Step 1: Find and Patch File

**In PowerShell:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

**Find the file:**
```
node_modules\@expo\cli\build\src\start\server\metro\externals.js
```

**Or search for it:**
```powershell
Get-ChildItem -Recurse -Filter "externals.js" | Where-Object { $_.FullName -like "*@expo\cli*" }
```

### Step 2: Edit the File

1. **Open the file** in a text editor
2. **Find:** `'node:sea'` or `"node:sea"`
3. **Replace with:** `'node-sea'` or `"node-sea"`
4. **Save the file**

### Step 3: Rebuild

**In Android Studio:**
- **Build → Clean Project**
- **Build → Build APK(s)**

---

## 🚀 Solution 3: Use Environment Variable in Build

### Step 1: Set Environment Variable

**Before building, in PowerShell:**
```powershell
$env:EXPO_NO_METRO_EXTERNALS=1
```

**Keep PowerShell open!**

### Step 2: Build from Android Studio

1. **Build Variants → release**
2. **Build → Build APK(s)**
3. **Should work!** ✅

---

## 🚀 Solution 4: Create Directory Manually (Workaround)

### Step 1: Create Directory

**In PowerShell:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
New-Item -ItemType Directory -Force -Path ".expo\metro\externals\node_sea"
```

### Step 2: Try Build Again

**In Android Studio:**
- **Build → Build APK(s)**

**Note:** This might not fully work, but worth trying.

---

## 🚀 Solution 5: Use EAS Build (Cloud Build)

**Bypass Windows issues entirely:**

1. **Install EAS CLI:**
   ```powershell
   npm install -g eas-cli
   ```

2. **Login:**
   ```powershell
   eas login
   ```

3. **Build:**
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   eas build --platform android --profile preview
   ```

**Builds in cloud - no Windows issues!** ✅

---

## 📋 Recommended Approach

### Quick Fix (Try First):

1. **Set environment variable:**
   ```powershell
   $env:EXPO_NO_METRO_EXTERNALS=1
   ```

2. **Export bundle:**
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   npx expo export --platform android
   ```

3. **Build release APK in Android Studio**

### Permanent Fix:

1. **Patch externals.js** (Solution 2)
2. **Or use EAS Build** (Solution 5) - No Windows issues

---

## 🔧 Troubleshooting

### Export Fails with Same Error

**Try:**
```powershell
$env:EXPO_NO_METRO_EXTERNALS=1
$env:EXPO_NO_UPDATE_CHECK=1
npx expo export --platform android --clear
```

### Build Still Fails

**Try:**
1. **Clean everything:**
   ```powershell
   cd android
   .\gradlew clean
   cd ..
   Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
   ```

2. **Export again:**
   ```powershell
   $env:EXPO_NO_METRO_EXTERNALS=1
   npx expo export --platform android
   ```

3. **Build again**

---

## ✅ Success Checklist

- [ ] Set `EXPO_NO_METRO_EXTERNALS=1` environment variable
- [ ] Exported bundle successfully (`npx expo export`)
- [ ] Built release APK in Android Studio
- [ ] APK created successfully
- [ ] No `node:sea` error

---

## 💡 Pro Tips

1. **Export bundle first** - Often avoids the issue
2. **Use environment variable** - Simplest workaround
3. **Patch the file** - Permanent fix (but may need re-patch after npm install)
4. **Use EAS Build** - Best long-term solution (cloud build)

---

## 🎯 Next Steps

**Try Solution 1 first:**
1. Set environment variable
2. Export bundle
3. Build release APK

**If that doesn't work, try Solution 2** (patch the file)

**Or use Solution 5** (EAS Build) for cloud builds!

Good luck! 🚀

