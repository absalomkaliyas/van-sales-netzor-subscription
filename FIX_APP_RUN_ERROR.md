# 🔧 Fix "Unknown Error" When Running App

## ✅ Build Successful, But App Won't Run

This is a common issue. Let's diagnose and fix it.

---

## 🔍 Step 1: Check What Error You See

### Where to Look:

1. **Run Tab (Bottom Panel):**
   - Look for red error messages
   - Check what it says exactly

2. **Logcat Tab (Bottom Panel):**
   - Shows app logs and errors
   - Filter by "Error" to see issues

3. **Build Tab:**
   - Check for any warnings or errors

---

## 🚀 Common Fixes

### Fix 1: Check Emulator/Device is Running

**Problem:** Emulator not running or device not connected

**Solution:**
1. **Tools → Device Manager**
2. Make sure emulator shows **"Running"** status
3. If not running, click **▶️ Play button**
4. Wait for emulator to fully boot (home screen visible)
5. Try running app again

**For Physical Device:**
1. Check USB cable is connected
2. Enable **USB Debugging** on phone
3. Allow USB debugging when prompted
4. Check device appears in device dropdown

---

### Fix 2: Clear App Data and Reinstall

**Problem:** Previous installation corrupted

**Solution:**
1. **Uninstall app from emulator/device:**
   - Long press app icon → Uninstall
   - Or: **Settings → Apps → Your App → Uninstall**

2. **Clean build:**
   - **Build → Clean Project**
   - Wait for completion

3. **Rebuild and run:**
   - Click **▶️ Run** again

---

### Fix 3: Check Logcat for Actual Error

**Problem:** "Unknown error" doesn't tell us what's wrong

**Solution:**
1. **View → Tool Windows → Logcat** (or bottom panel → Logcat tab)
2. **Filter by:** Select your app package name
3. **Look for red errors** when you try to run
4. **Common errors:**
   - `ActivityNotFoundException` → App entry point missing
   - `ClassNotFoundException` → Missing dependency
   - `Permission denied` → Missing permissions
   - `OutOfMemoryError` → Emulator needs more RAM

---

### Fix 4: Check App Permissions

**Problem:** App crashes due to missing permissions

**Solution:**
1. Check `android/app/src/main/AndroidManifest.xml`
2. Verify permissions are declared:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.CAMERA" />
   ```

3. **For Android 6.0+:** Some permissions need runtime requests
   - Check if app requests permissions at runtime
   - Grant permissions when prompted

---

### Fix 5: Increase Emulator RAM

**Problem:** Emulator doesn't have enough memory

**Solution:**
1. **Tools → Device Manager**
2. **Edit** your emulator (pencil icon)
3. **Show Advanced Settings**
4. **RAM:** Increase to **2048 MB** or **4096 MB**
5. **Click Finish**
6. **Restart emulator**
7. Try running app again

---

### Fix 6: Check ADB Connection

**Problem:** Android Debug Bridge (ADB) not working

**Solution:**
1. **View → Tool Windows → Terminal**
2. Run:
   ```powershell
   adb devices
   ```
3. Should show your device/emulator
4. If not:
   ```powershell
   adb kill-server
   adb start-server
   adb devices
   ```

---

### Fix 7: Rebuild from Scratch

**Problem:** Build cache corrupted

**Solution:**
1. **Build → Clean Project**
2. **File → Invalidate Caches → Invalidate and Restart**
3. After restart:
   - **File → Sync Project with Gradle Files**
   - Wait for sync
   - Click **▶️ Run** again

---

### Fix 8: Check Minimum SDK Version

**Problem:** App requires higher Android version than emulator

**Solution:**
1. Check `android/app/build.gradle`:
   ```gradle
   minSdkVersion 23  // Should be 23 or lower for most devices
   ```
2. Make sure emulator Android version is >= minSdkVersion
3. If emulator is too old, create new one with Android 13 or 14

---

## 🔍 Diagnostic Steps

### Step 1: Check Logcat

1. **View → Tool Windows → Logcat**
2. **Clear logcat** (trash icon)
3. **Try running app**
4. **Look for red errors**
5. **Copy the error message**

### Step 2: Check Device Logs

1. **Run in Terminal:**
   ```powershell
   adb logcat
   ```
2. **Try running app**
3. **Look for error messages**
4. **Press Ctrl+C to stop**

### Step 3: Check App Installation

1. **Run in Terminal:**
   ```powershell
   adb shell pm list packages | findstr "netzor"
   ```
2. Should show your app package
3. If not, app didn't install

---

## 📋 Quick Checklist

- [ ] Emulator/device is running and fully booted
- [ ] Device selected in Android Studio dropdown
- [ ] Checked Logcat for actual error message
- [ ] App uninstalled and reinstalled
- [ ] Build → Clean Project done
- [ ] ADB connection working (`adb devices`)
- [ ] Emulator has enough RAM (2048 MB+)
- [ ] Permissions are declared in AndroidManifest.xml

---

## 🎯 Most Common Issues

### Issue 1: "App keeps stopping"

**Cause:** App crash on startup
**Fix:** Check Logcat for crash reason (usually missing dependency or permission)

### Issue 2: "Installation failed"

**Cause:** Previous installation conflict
**Fix:** Uninstall app manually, then reinstall

### Issue 3: "Device offline"

**Cause:** ADB connection lost
**Fix:** Restart ADB server (`adb kill-server && adb start-server`)

### Issue 4: "App not responding"

**Cause:** App stuck or emulator too slow
**Fix:** Increase emulator RAM, or use physical device

---

## 💡 Pro Tips

1. **Always check Logcat first** - It shows the real error
2. **Use physical device** - Often faster and more reliable than emulator
3. **Clean build regularly** - Prevents cache issues
4. **Check emulator is fully booted** - Wait for home screen before running

---

## 🆘 Still Not Working?

**Share these details:**
1. **Exact error message** from Logcat
2. **Emulator or physical device?**
3. **What happens when you click Run?**
   - Does it install but not launch?
   - Does it crash immediately?
   - Does nothing happen?
4. **Logcat output** (filtered by Error)

---

## ✅ Success Indicators

You'll know it worked when:
- ✅ App installs successfully
- ✅ App launches automatically
- ✅ You see your supplier app running
- ✅ No errors in Logcat

Good luck! 🚀

