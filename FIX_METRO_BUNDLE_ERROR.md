# 🔧 Fix: "Unable to load script" / Metro Bundle Error

## ❌ Error: App Can't Find JavaScript Bundle

**Problem:**
```
Unable to load script. Make sure you're either running Metro 
(run 'npx react-native start') or that your bundle 'index.android.bundle' 
is packaged correctly for release.
```

**Cause:**
- Debug APK is trying to connect to Metro bundler (development server)
- Metro is not running
- JavaScript bundle is not included in APK

---

## 🚀 Solution 1: Build Release APK (Recommended)

Release APK includes the JavaScript bundle, so it works standalone.

### Step 1: Build Release APK

1. **In Android Studio:**
   - **Top toolbar → Build Variants tab**
   - **Select "release"** (not debug)

2. **Build APK:**
   - **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - Wait for build (5-10 minutes)

3. **Find Release APK:**
   - Location: `android\app\build\outputs\apk\release\app-release.apk`

### Step 2: Install Release APK

**Uninstall debug version first:**
```powershell
adb uninstall com.netzor.vansales.supplier
```

**Install release APK:**
```powershell
adb install android\app\build\outputs\apk\release\app-release.apk
```

**Or drag and drop** the release APK to your device.

**Release APK works standalone - no Metro needed!** ✅

---

## 🚀 Solution 2: Run Metro Bundler (For Debug Build)

If you want to use debug APK, you need Metro running.

### Step 1: Start Metro Bundler

**In PowerShell:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm start
```

**Or:**
```powershell
npx expo start
```

**Keep this running!** Don't close the terminal.

### Step 2: Connect Device to Same Network

**For Physical Device:**
1. **Phone and computer must be on same WiFi network**
2. **Shake phone** (or use adb command) to open developer menu
3. **Tap "Settings"**
4. **Enter computer's IP address** (shown in Metro terminal)

**For Emulator:**
- Should connect automatically (localhost)

### Step 3: Reload App

- **Shake device** → **Reload**
- Or press **R** in Metro terminal

**Now debug APK will work!** ✅

---

## 🚀 Solution 3: Use Expo Run (Easiest)

This builds and runs with Metro automatically.

### Step 1: Start Development Server

**In PowerShell:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo run:android
```

**This will:**
- Start Metro bundler
- Build and install APK
- Launch app automatically
- Connect everything together

**Easiest method for development!** ✅

---

## 🚀 Solution 4: Build Standalone APK with Bundle

Create APK that includes JavaScript bundle.

### Step 1: Generate Bundle

**In Terminal:**
```powershell
cd android
.\gradlew bundleRelease
```

**Or manually:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo export --platform android
```

### Step 2: Build APK with Bundle

**In Android Studio:**
1. **Build Variants → release**
2. **Build → Build Bundle(s) / APK(s) → Build APK(s)**

**This includes the JavaScript bundle!** ✅

---

## 📋 Quick Fix Summary

### For Standalone APK (No Metro):
1. **Build Variants → release**
2. **Build → Build APK(s)**
3. **Install release APK**
4. **Works without Metro!** ✅

### For Development (With Metro):
1. **Start Metro:** `npm start` or `npx expo start`
2. **Keep Metro running**
3. **Connect device to same network**
4. **Reload app**

### Easiest (Expo Run):
1. **Run:** `npx expo run:android`
2. **Everything handled automatically!** ✅

---

## 🔧 Troubleshooting

### Error: "Metro bundler not found"

**Solution:**
- Make sure you're in `mobile-app` folder
- Run: `npm start` or `npx expo start`
- Keep terminal open

### Error: "Can't connect to Metro"

**For Physical Device:**
1. **Check phone and computer on same WiFi**
2. **Shake phone** → Settings → Enter computer IP
3. **Check firewall** - Allow Node.js/Metro

**For Emulator:**
- Should work automatically
- If not, check `adb reverse`:
  ```powershell
  adb reverse tcp:8081 tcp:8081
  ```

### Release APK Still Shows Error

**Solution:**
1. **Clean build:**
   ```powershell
   cd android
   .\gradlew clean
   ```
2. **Rebuild release APK**
3. **Uninstall old version first**

---

## ✅ Recommended Approach

### For Testing/Development:
- **Use:** `npx expo run:android`
- **Or:** Debug APK + Metro bundler running

### For Distribution:
- **Use:** Release APK (includes bundle)
- **No Metro needed!**

---

## 💡 Pro Tips

1. **Release APK is standalone** - No Metro needed
2. **Debug APK needs Metro** - For development only
3. **Use Expo Run** - Handles everything automatically
4. **Keep Metro running** - If using debug builds

---

## 🎯 Next Steps

**Quick Fix:**
1. **Build Variants → release**
2. **Build → Build APK(s)**
3. **Install release APK**
4. **App works!** ✅

**Or for Development:**
1. **Run:** `npx expo run:android`
2. **Everything works automatically!** ✅

---

## 🎉 Success!

Once you build release APK or start Metro:
- ✅ App loads JavaScript bundle
- ✅ No more "Unable to load script" error
- ✅ App works perfectly!

**Try building release APK - it's the easiest fix!** 🚀

