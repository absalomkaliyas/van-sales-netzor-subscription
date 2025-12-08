# 🏗️ Run App in Android Studio Only - Step by Step

## 🎯 Goal: Build and Run Native Android App Directly from Android Studio

This method builds the full native Android app (not Expo development server).

---

## 📋 Prerequisites

- ✅ Android Studio installed
- ✅ Android emulator created (or physical device connected)
- ✅ `android` folder exists (from `npx expo prebuild`)

---

## 🚀 Step-by-Step Instructions

### Step 1: Open Project in Android Studio

1. **Open Android Studio**

2. **File → Open** (or **Welcome Screen → Open**)

3. **Navigate to:**
   ```
   B:\VAN Sales Netzor Subscription\mobile-app\android
   ```

4. **Click "OK"**

5. **If asked "Trust Project?"** → Click **"Trust Project"**

---

### Step 2: Wait for Gradle Sync

1. **Bottom right corner** will show:
   - "Gradle sync in progress..."
   - This takes **2-5 minutes** first time

2. **Wait until you see:**
   - "Gradle sync finished" ✅
   - Or green checkmark in bottom right

3. **If errors appear:**
   - Check **Build** tab (bottom panel)
   - See troubleshooting section below

---

### Step 3: Set Up Android Emulator

**Option A: Create New Emulator (If Not Done)**

1. **Tools → Device Manager** (or **More Actions → Virtual Device Manager**)

2. **Click "Create Device"**

3. **Select Device:**
   - Choose **Pixel 5** or **Pixel 6**
   - Click **Next**

4. **Select System Image:**
   - Choose **API 34 (Android 14)** or **API 33**
   - If not installed, click **Download**
   - Wait for download (10-15 minutes)
   - Click **Next**

5. **Click "Finish"**

6. **Start Emulator:**
   - Click **▶️ Play button** next to your device
   - Wait for emulator to boot (2-3 minutes)

**Option B: Use Existing Emulator**

1. **Start emulator:**
   - **Tools → Device Manager**
   - Click **▶️ Play button** next to your device
   - Wait for it to boot

**Option C: Use Physical Device**

1. **Enable USB Debugging on phone:**
   - Settings → About Phone → Tap "Build Number" 7 times
   - Settings → Developer Options → Enable "USB Debugging"

2. **Connect phone via USB**

3. **Allow USB debugging** when prompted on phone

---

### Step 4: Select Device in Android Studio

1. **Top toolbar** → Look for device dropdown
   - Should show: **"No devices"** or device name

2. **Click the dropdown**

3. **Select your emulator or connected device**
   - If emulator is running, it will appear here
   - If phone is connected, it will appear here

---

### Step 5: Build and Run

**Method 1: Using Run Button (Easiest)**

1. **Click ▶️ Run button** (green play icon in top toolbar)
   - Or press **Shift + F10**
   - Or **Run → Run 'app'**

2. **Wait for build:**
   - First build: **5-10 minutes**
   - Shows progress in **Build** tab (bottom)
   - Subsequent builds: **1-2 minutes**

3. **App launches automatically** on emulator/device!

**Method 2: Using Terminal (Faster)**

1. **View → Tool Windows → Terminal** (or bottom panel → Terminal tab)

2. **Run:**
   ```powershell
   .\gradlew installDebug
   ```
   - This builds and installs debug APK
   - Faster than full release build

3. **Or for release build:**
   ```powershell
   .\gradlew assembleRelease
   .\gradlew installRelease
   ```

---

## ✅ Success Indicators

You'll know it worked when:
- ✅ Build completes: "BUILD SUCCESSFUL"
- ✅ App installs on device/emulator
- ✅ App launches automatically
- ✅ You see your supplier app running!

---

## 🔧 Troubleshooting

### Error: "SDK location not found"

**Solution:**
1. Create `local.properties` file in `android` folder
2. Add this line (replace with your SDK path):
   ```properties
   sdk.dir=C\:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```
3. Find your SDK path:
   - Android Studio → **File → Project Structure → SDK Location**
   - Copy the "Android SDK location" path

### Error: "Gradle sync failed"

**Solution:**
1. **File → Invalidate Caches → Invalidate and Restart**
2. Wait for Android Studio to restart
3. Gradle will sync again automatically

### Error: "Java version mismatch"

**Solution:**
1. **File → Project Structure → SDK Location**
2. Set **JDK location** to **JDK 17**
3. If JDK 17 not available:
   - **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
   - **Gradle JDK → Download JDK** → Select **JDK 17**

### Error: "Android SDK not found"

**Solution:**
1. **Tools → SDK Manager**
2. Install **Android 14.0 (API 34)**
3. Install **Android SDK Build-Tools 34.0.0**
4. Click **Apply** and wait for installation

### Build Takes Too Long

**This is normal!**
- First build: 5-10 minutes (downloading dependencies)
- Subsequent builds: 1-2 minutes
- Be patient! ☕

### App Won't Install on Device

**Solutions:**
1. **Check USB Debugging is enabled** on phone
2. **Allow installation** when prompted on phone
3. **Check device is connected:**
   ```powershell
   adb devices
   ```
   Should show your device

### "No devices" in Device Dropdown

**Solutions:**
1. **Start emulator first** (Device Manager → Play button)
2. **Wait for emulator to fully boot** (home screen visible)
3. **Refresh device list:** Click device dropdown → Refresh
4. **For physical device:** Enable USB debugging and connect via USB

---

## 📋 Quick Reference

### Build and Run:
```
Click ▶️ Run button (or Shift + F10)
```

### Build Only (No Run):
```
Build → Make Project (or Ctrl + F9)
```

### Build APK:
```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### Terminal Commands:
```powershell
# Build and install debug
.\gradlew installDebug

# Build release APK
.\gradlew assembleRelease

# Install release
.\gradlew installRelease
```

---

## 💡 Pro Tips

1. **First build is slow** - Be patient, it's downloading everything
2. **Keep emulator running** - Faster subsequent launches
3. **Use debug build for testing** - Faster than release
4. **Check Build tab** - Shows detailed progress and errors
5. **Use Terminal** - Often faster than menu options

---

## 🎯 Build Variants

### Debug Build (Default)
- Faster to build
- Includes debugging tools
- Larger file size
- **Use for:** Development and testing

### Release Build
- Optimized and smaller
- No debugging tools
- Production-ready
- **Use for:** Final testing and distribution

**To switch:**
- Top toolbar → **Build Variants** tab
- Select **debug** or **release**

---

## ✅ Complete Checklist

- [ ] Android Studio opened project successfully
- [ ] Gradle sync completed (no errors)
- [ ] Emulator created and running (or device connected)
- [ ] Device selected in dropdown
- [ ] Clicked Run button
- [ ] Build completed successfully
- [ ] App launched on device/emulator

---

## 🆘 Still Having Issues?

**Check:**
1. **Build tab** (bottom panel) - Shows all errors
2. **Gradle sync** completed successfully
3. **Device/emulator** is actually running
4. **SDK and JDK** are properly configured

**Common Fixes:**
- File → Invalidate Caches → Restart
- Tools → SDK Manager → Install missing components
- File → Project Structure → Check SDK/JDK settings

---

## 🎉 Success!

Once the app launches, you'll see your supplier app running natively on Android!

You can now:
- ✅ Test all features
- ✅ Debug issues
- ✅ Build production APK
- ✅ Distribute to users

Good luck! 🚀

