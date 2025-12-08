# 🔍 Debug: No Error in Logcat But App Won't Run

## 🤔 Situation: Build Successful, No Logcat Error, But App Doesn't Run

This usually means the app isn't launching or installing properly.

---

## 🔍 Step 1: Check Run Tab (Not Logcat)

**Logcat might not show errors if app never launched.**

1. **Bottom panel → Run tab** (not Logcat)
2. **Look for messages like:**
   - "Installing APK..."
   - "Launching app..."
   - "Waiting for device..."
   - Any red error messages

3. **What does it say?**
   - Does it say "Installation failed"?
   - Does it say "Launching" but nothing happens?
   - Does it complete successfully?

---

## 🔍 Step 2: Check if App Actually Installed

### On Emulator:
1. **Look at emulator screen**
2. **Check app drawer** (swipe up from bottom)
3. **Do you see your app icon?**
   - App name: "VAN Sales NETZOR - Supplier" or similar
   - If yes → App installed but not launching
   - If no → App didn't install

### Check via Terminal:
1. **View → Tool Windows → Terminal**
2. Run:
   ```powershell
   adb shell pm list packages | findstr "netzor"
   ```
3. Should show your app package name
4. If nothing shows → App didn't install

---

## 🔍 Step 3: Try Manual Installation

### Install APK Manually:

1. **Build APK first:**
   - **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - Wait for build
   - Click **"locate"** in notification

2. **Find APK:**
   - Location: `android\app\build\outputs\apk\debug\app-debug.apk`

3. **Install manually:**
   ```powershell
   adb install android\app\build\outputs\apk\debug\app-debug.apk
   ```

4. **Try launching:**
   ```powershell
   adb shell am start -n com.netzor.vansales.supplier/.MainActivity
   ```
   (Replace with your actual package name and activity)

---

## 🔍 Step 4: Check Device Connection

### Verify Device is Connected:

1. **Terminal:**
   ```powershell
   adb devices
   ```
2. **Should show:**
   ```
   List of devices attached
   emulator-5554    device
   ```
3. **If shows "offline" or nothing:**
   ```powershell
   adb kill-server
   adb start-server
   adb devices
   ```

---

## 🔍 Step 5: Check App Configuration

### Verify Main Activity Exists:

1. **Check:** `android/app/src/main/AndroidManifest.xml`
2. **Look for:**
   ```xml
   <activity
       android:name=".MainActivity"
       ...
   >
       <intent-filter>
           <action android:name="android.intent.action.MAIN" />
           <category android:name="android.intent.category.LAUNCHER" />
       </intent-filter>
   </activity>
   ```

3. **If missing or wrong:** This could be the issue

---

## 🔍 Step 6: Check Run Configuration

### Verify Run Configuration:

1. **Top toolbar → Run configuration dropdown** (next to Run button)
2. **Click "Edit Configurations..."**
3. **Check:**
   - **Module:** Should be "app"
   - **Launch:** Should be "Default Activity"
   - **Target:** Should be your emulator/device

4. **If wrong, fix and try again**

---

## 🔍 Step 7: Try Different Launch Method

### Method 1: Use Terminal to Launch

1. **Find your app package name:**
   - Check `android/app/build.gradle` → `applicationId`
   - Usually: `com.netzor.vansales.supplier`

2. **Launch app:**
   ```powershell
   adb shell monkey -p com.netzor.vansales.supplier -c android.intent.category.LAUNCHER 1
   ```

### Method 2: Click App Icon on Emulator

1. **If app is installed:**
   - Open app drawer on emulator
   - Click your app icon
   - See if it launches

---

## 🔍 Step 8: Check for Silent Crashes

### App Might Be Crashing Immediately:

1. **Logcat → Filter by package name:**
   - Enter your package name in filter: `com.netzor.vansales.supplier`
   - Look for any messages (even if not red)

2. **Check for:**
   - "FATAL EXCEPTION"
   - "Process crashed"
   - "Application not responding"

3. **Try filtering by "Error" or "Fatal":**
   - Logcat → Filter dropdown → Error
   - See if anything appears

---

## 🔍 Step 9: Check Build Output

### Check Full Build Log:

1. **Build → Rebuild Project**
2. **View → Tool Windows → Build**
3. **Look for any warnings or errors**
4. **Check if APK was actually created:**
   - `android/app/build/outputs/apk/debug/app-debug.apk`
   - Does this file exist?

---

## 🔍 Step 10: Try Clean Install

### Complete Clean Reinstall:

1. **Uninstall app from emulator:**
   ```powershell
   adb uninstall com.netzor.vansales.supplier
   ```

2. **Clean project:**
   - **Build → Clean Project**

3. **Rebuild:**
   - **Build → Rebuild Project**

4. **Run again:**
   - Click **▶️ Run**

---

## 📋 Diagnostic Checklist

- [ ] Checked Run tab (not just Logcat)
- [ ] Verified app is installed (app icon visible or `adb shell pm list packages`)
- [ ] Checked device connection (`adb devices`)
- [ ] Verified AndroidManifest.xml has MainActivity
- [ ] Checked Run configuration is correct
- [ ] Tried manual APK installation
- [ ] Checked if APK file exists
- [ ] Tried launching app manually from emulator
- [ ] Filtered Logcat by package name
- [ ] Checked Build tab for warnings

---

## 🎯 Most Likely Issues

### Issue 1: App Not Installing
**Symptoms:** No app icon, `adb shell pm list packages` shows nothing
**Fix:** Check Run tab for installation errors, try manual install

### Issue 2: App Installing But Not Launching
**Symptoms:** App icon visible but clicking does nothing
**Fix:** Check AndroidManifest.xml, verify MainActivity exists

### Issue 3: Silent Crash
**Symptoms:** App starts then immediately closes
**Fix:** Filter Logcat by package name, look for crash logs

### Issue 4: Wrong Run Configuration
**Symptoms:** Nothing happens when clicking Run
**Fix:** Check Run configuration, verify module and target

---

## 💡 Pro Tips

1. **Always check Run tab first** - Shows installation/launch process
2. **Verify app is installed** - Check emulator app drawer
3. **Try manual launch** - Click app icon on emulator
4. **Check APK exists** - Verify build actually created APK file
5. **Use terminal commands** - Often more reliable than UI

---

## 🆘 What to Share

If still not working, share:
1. **What Run tab shows** (exact messages)
2. **Is app icon visible on emulator?**
3. **What `adb devices` shows**
4. **What `adb shell pm list packages | findstr netzor` shows**
5. **Does APK file exist?** (`android/app/build/outputs/apk/debug/app-debug.apk`)

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Run tab shows "Launching app..." and "Success"
- ✅ App icon appears on emulator
- ✅ App launches and shows your UI
- ✅ No errors in Run tab or Logcat

Good luck! 🚀

