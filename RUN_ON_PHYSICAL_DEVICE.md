# 📱 Run App on Physical Android Device via USB Debugging

## ✅ Complete Guide: USB Debugging with Android Studio

---

## 📋 Prerequisites Checklist

- [ ] Android Studio installed
- [ ] Android device (phone/tablet)
- [ ] USB cable (data cable, not just charging)
- [ ] Developer options enabled on device
- [ ] USB debugging enabled
- [ ] Device drivers installed (if needed)

---

## 🔧 Step 1: Enable Developer Options on Your Device

### For Android 8.0 and above:

1. **Open Settings** on your device
2. **Go to:** About phone (or About device)
3. **Find:** Build number
4. **Tap Build number 7 times**
   - You'll see: "You are now a developer!"
5. **Go back** to Settings
6. **You'll see:** "Developer options" (new menu item)

### For older Android versions:

1. **Settings** → **About phone**
2. **Tap Build number** 7 times
3. **Developer options** will appear

---

## 🔓 Step 2: Enable USB Debugging

1. **Open Settings** on your device
2. **Go to:** Developer options
3. **Enable:**
   - ✅ **USB debugging**
   - ✅ **Stay awake** (optional, keeps screen on while charging)
   - ✅ **Install via USB** (optional, for easier app installation)

---

## 🔌 Step 3: Connect Device to Computer

1. **Connect USB cable** to device and computer
2. **On your device:** You'll see a popup
   - **"Allow USB debugging?"**
   - **Check:** "Always allow from this computer"
   - **Tap:** "Allow" or "OK"

---

## 💻 Step 4: Verify Device in Android Studio

### Option A: Using Android Studio

1. **Open Android Studio**
2. **Open your project:** `mobile-app/android`
3. **Look at bottom toolbar:**
   - You should see your device name
   - Example: "Pixel 6" or "Samsung Galaxy..."

### Option B: Using Terminal/Command Prompt

**In Android Studio Terminal:**

```bash
cd android
adb devices
```

**You should see:**
```
List of devices attached
ABC123XYZ    device
```

**If you see "unauthorized":**
- Check device screen for USB debugging permission
- Tap "Allow" on device

**If device not listed:**
- Try different USB cable
- Try different USB port
- Check USB drivers (see troubleshooting below)

---

## 🚀 Step 5: Run App on Device

### Method 1: Using Android Studio UI

1. **In Android Studio:**
   - **Select your device** from device dropdown (top toolbar)
   - **Click green "Run" button** (▶️)
   - Or: **Run** → **Run 'app'**

2. **Wait for build:**
   - Gradle will build the app
   - App will install on device
   - App will launch automatically

### Method 2: Using Terminal

```bash
cd mobile-app/android
./gradlew installDebug
```

**Then launch manually:**
- Find app icon on device
- Tap to open

### Method 3: Using ADB Directly

```bash
cd mobile-app/android
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.netzor.vansales.supplier/.MainActivity
```

---

## 🔍 Step 6: Verify App is Running

1. **Check device screen:**
   - App should open automatically
   - You should see your app interface

2. **Check Android Studio:**
   - **Logcat** tab shows app logs
   - **Run** tab shows build status

---

## 🆘 Troubleshooting

### Problem: Device Not Detected

**Solution 1: Check USB Connection**
- Try different USB cable
- Try different USB port
- Use USB 2.0 port (not USB 3.0 if having issues)

**Solution 2: Install USB Drivers**

**For Windows:**
1. **Download:** Android USB drivers
   - Google: "Android USB drivers [your device brand]"
   - Or use: Universal ADB drivers
2. **Install drivers**
3. **Restart computer**
4. **Reconnect device**

**For Mac/Linux:**
- Usually works automatically
- If not, install device-specific drivers

**Solution 3: Enable File Transfer Mode**
- On device: Pull down notification
- Tap "USB" notification
- Select: **"File Transfer"** or **"MTP"**

---

### Problem: "Unauthorized" Device

**Solution:**
1. **On device:**
   - Look for "Allow USB debugging?" popup
   - Check "Always allow from this computer"
   - Tap "Allow"

2. **If popup doesn't appear:**
   - Disconnect USB
   - Go to: Settings → Developer options
   - **Revoke USB debugging authorizations**
   - Reconnect USB
   - Allow when popup appears

---

### Problem: ADB Not Found

**Solution:**
1. **Use Android Studio's terminal** (has ADB in PATH)
2. **Or add ADB to system PATH:**
   - Windows: Add `%LOCALAPPDATA%\Android\Sdk\platform-tools` to PATH
   - Mac/Linux: Add `~/Android/Sdk/platform-tools` to PATH

---

### Problem: App Crashes on Launch

**Solution 1: Check Logcat**
1. **In Android Studio:**
   - Open **Logcat** tab
   - Filter by: `com.netzor.vansales.supplier`
   - Look for red error messages

**Solution 2: Build Release APK**
```bash
cd mobile-app/android
./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk
```

**Solution 3: Check Metro Bundler**
- If using Expo development build:
  - Start Metro: `npx expo start`
  - Shake device → "Reload"

---

### Problem: "Installation failed" or "App not installed"

**Solution:**
1. **Uninstall existing app** from device
2. **Enable:** Settings → Developer options → **"Install via USB"**
3. **Try installing again**

---

## 📱 Quick Commands Reference

```bash
# Check connected devices
adb devices

# Install debug APK
cd mobile-app/android
./gradlew installDebug

# Install release APK
./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk

# Uninstall app
adb uninstall com.netzor.vansales.supplier

# View device logs
adb logcat

# Restart ADB server (if device not detected)
adb kill-server
adb start-server
```

---

## ✅ Success Checklist

- [ ] Developer options enabled
- [ ] USB debugging enabled
- [ ] Device connected via USB
- [ ] Device authorized (checked "Always allow")
- [ ] Device appears in `adb devices`
- [ ] Device selected in Android Studio
- [ ] App builds successfully
- [ ] App installs on device
- [ ] App launches automatically
- [ ] App runs without crashes

---

## 🎯 Best Practices

1. **Use original USB cable** (not cheap charging cables)
2. **Keep device unlocked** during development
3. **Keep USB debugging enabled** (don't disable after setup)
4. **Use "Stay awake"** option (prevents screen lock)
5. **Check Logcat regularly** for errors

---

## 💡 Pro Tips

1. **Wireless Debugging (Android 11+):**
   - Settings → Developer options → Wireless debugging
   - Connect via IP address (no USB needed!)

2. **Multiple Devices:**
   - Connect multiple devices
   - Select which one to use in Android Studio

3. **Hot Reload:**
   - Shake device → "Reload"
   - Or press `R` in Metro bundler terminal

---

## 🎉 You're All Set!

**Your app should now run on your physical device!**

**If you encounter any issues:**
1. Check Logcat for errors
2. Verify device is authorized
3. Try restarting ADB: `adb kill-server && adb start-server`
4. Share the error and I'll help fix it!

---

## 📚 Additional Resources

- **Android Studio Docs:** https://developer.android.com/studio/run/device
- **ADB Commands:** https://developer.android.com/studio/command-line/adb
- **USB Drivers:** https://developer.android.com/studio/run/oem-usb

