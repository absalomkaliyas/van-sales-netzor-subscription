# 📱 Build Android App with Android Studio - Step by Step

## ✅ Yes! You Can Build with Android Studio

Building locally with Android Studio is often more reliable and gives you better error messages.

---

## 📋 Prerequisites

1. **Android Studio** - [Download here](https://developer.android.com/studio)
2. **Java JDK 17** - (Usually comes with Android Studio)
3. **Node.js 20** - [Download here](https://nodejs.org/)
4. **Expo CLI** - Will install in steps below

---

## 🚀 Step-by-Step Guide

### Step 1: Install Android Studio

1. Download Android Studio from: https://developer.android.com/studio
2. Install it (includes Android SDK, Gradle, etc.)
3. Open Android Studio
4. Complete the setup wizard (it will download SDK components)

### Step 2: Install Node.js and Expo CLI

1. **Install Node.js 20:**
   - Download from: https://nodejs.org/
   - Install it
   - Verify: Open PowerShell and run:
     ```powershell
     node --version
     npm --version
     ```

2. **Install Expo CLI globally:**
   ```powershell
   npm install -g @expo/cli
   ```

### Step 3: Prepare Your Project

1. **Open PowerShell in your project:**
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Create Android native project:**
   ```powershell
   npx expo prebuild --platform android --clean
   ```
   
   This creates the `android` folder with native Android code.

### Step 4: Open Project in Android Studio

1. **Open Android Studio**

2. **Click "Open" or "File → Open"**

3. **Navigate to:**
   ```
   B:\VAN Sales Netzor Subscription\mobile-app\android
   ```

4. **Click "OK"**

5. **Wait for Gradle sync** (Android Studio will download dependencies)

### Step 5: Configure Build Settings

1. **Check Gradle version:**
   - Android Studio will use the Gradle version specified in `android/gradle/wrapper/gradle-wrapper.properties`
   - Expo SDK 50 uses Gradle 8.3+ (should be auto-configured)

2. **Check Java version:**
   - Go to: **File → Project Structure → SDK Location**
   - Ensure **JDK 17** is selected
   - If not, download JDK 17 from Android Studio settings

3. **Check Android SDK:**
   - Go to: **File → Project Structure → SDK Location**
   - Ensure **Android SDK 34** is installed
   - If not: **Tools → SDK Manager → SDK Platforms → Android 14.0 (API 34)**

### Step 6: Build the APK

**Option A: Build from Android Studio UI**

1. **Select build variant:**
   - Click on **"app"** dropdown (top center, next to play button)
   - Select **"release"** (not debug)

2. **Build APK:**
   - Go to: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - Wait for build to complete
   - When done, click **"locate"** in the notification

3. **Find your APK:**
   - Location: `mobile-app\android\app\build\outputs\apk\release\app-release.apk`

**Option B: Build from Terminal (Faster)**

1. **Open Terminal in Android Studio:**
   - **View → Tool Windows → Terminal**

2. **Run build command:**
   ```powershell
   cd android
   .\gradlew assembleRelease
   ```

3. **Find your APK:**
   - Location: `mobile-app\android\app\build\outputs\apk\release\app-release.apk`

### Step 7: Install on Your Device

1. **Enable Developer Options on your Android phone:**
   - Go to: **Settings → About Phone**
   - Tap **"Build Number"** 7 times
   - Go back to **Settings → Developer Options**
   - Enable **"USB Debugging"**

2. **Connect phone via USB**

3. **Install APK:**
   - Copy `app-release.apk` to your phone
   - Open it on your phone
   - Allow installation from unknown sources if prompted
   - Install!

---

## 🔧 Troubleshooting

### Error: "SDK location not found"

**Fix:**
1. Create `local.properties` file in `mobile-app/android/` folder
2. Add:
   ```properties
   sdk.dir=C\:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```
   (Replace with your actual SDK path - find it in Android Studio: **File → Project Structure → SDK Location**)

### Error: "Gradle sync failed"

**Fix:**
1. **File → Invalidate Caches → Invalidate and Restart**
2. Wait for Gradle sync to complete
3. Try building again

### Error: "Java version mismatch"

**Fix:**
1. **File → Project Structure → SDK Location**
2. Set **JDK location** to JDK 17
3. If JDK 17 not available: **File → Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK → Download JDK**

### Error: "Android SDK not found"

**Fix:**
1. **Tools → SDK Manager**
2. Install **Android 14.0 (API 34)**
3. Install **Android SDK Build-Tools 34.0.0**
4. Click **Apply** and wait for installation

### Build takes too long

**Fix:**
- First build always takes longer (downloading dependencies)
- Subsequent builds are much faster
- Be patient! ☕

---

## ✅ Advantages of Building with Android Studio

1. **Better Error Messages** - See exactly what's wrong
2. **Faster Iteration** - Build locally without waiting for cloud
3. **Debugging** - Can debug native code if needed
4. **No Build Limits** - Build as many times as you want
5. **Full Control** - Modify Gradle files if needed

---

## 📝 Quick Reference

**Build APK:**
```powershell
cd mobile-app\android
.\gradlew assembleRelease
```

**APK Location:**
```
mobile-app\android\app\build\outputs\apk\release\app-release.apk
```

**Clean Build (if issues):**
```powershell
cd mobile-app\android
.\gradlew clean
.\gradlew assembleRelease
```

---

## 🎯 Next Steps After Building

1. ✅ Test APK on your device
2. ✅ If it works, you can distribute it
3. ✅ For production, sign the APK (see Android Studio docs)
4. ✅ Upload to Google Play Store (if needed)

---

## 💡 Pro Tips

1. **First build is slow** - Be patient, it's downloading everything
2. **Keep Android Studio updated** - Get latest SDK tools
3. **Use release build** - Debug builds are larger and slower
4. **Check build logs** - Android Studio shows detailed errors

---

## 🆘 Still Having Issues?

If you encounter errors:
1. Check the **Build** tab in Android Studio (bottom panel)
2. Look for red error messages
3. Google the specific error message
4. Check Expo documentation: https://docs.expo.dev/

Good luck! 🚀

