# 📱 Install APK on Physical Android Device - Step by Step

## 🎯 Multiple Methods to Install APK

Choose the method that's easiest for you!

---

## 🚀 Method 1: USB + ADB (Fastest - Recommended)

### Step 1: Enable USB Debugging on Phone

1. **Go to:** Settings → About Phone
2. **Tap "Build Number" 7 times**
   - You'll see "You are now a developer!"
3. **Go back to Settings**
4. **Go to:** Developer Options (usually under System)
5. **Enable "USB Debugging"**
6. **Enable "Install via USB"** (if available)

### Step 2: Connect Phone to Computer

1. **Connect phone via USB cable**
2. **On phone:** Allow USB debugging when prompted
   - Check "Always allow from this computer"
   - Tap "Allow"

### Step 3: Verify Connection

**In Android Studio Terminal:**
```powershell
adb devices
```

**Should show:**
```
List of devices attached
ABC123XYZ    device
```

If shows "unauthorized":
- Check phone for USB debugging prompt
- Tap "Allow"

### Step 4: Install APK

**In Android Studio Terminal:**
```powershell
cd android
adb install app\build\outputs\apk\debug\app-debug.apk
```

**Or use full path:**
```powershell
adb install "B:\VAN Sales Netzor Subscription\mobile-app\android\app\build\outputs\apk\debug\app-debug.apk"
```

**Wait for "Success" message!**

### Step 5: Launch App

- **Find app icon** on phone
- **Tap to launch**

**Or via ADB:**
```powershell
adb shell monkey -p com.netzor.vansales.supplier -c android.intent.category.LAUNCHER 1
```

---

## 🚀 Method 2: Transfer APK and Install (Easiest)

### Step 1: Copy APK to Phone

**Option A: USB Transfer**
1. **Connect phone via USB**
2. **On phone:** Allow file transfer when prompted
3. **On computer:** Open File Explorer
4. **Navigate to phone storage**
5. **Copy APK file:**
   - From: `B:\VAN Sales Netzor Subscription\mobile-app\android\app\build\outputs\apk\debug\app-debug.apk`
   - To: Phone's Download folder (or any folder)

**Option B: Email/Cloud**
1. **Email APK to yourself** (Gmail, Outlook, etc.)
2. **Or upload to Google Drive/Dropbox**
3. **On phone:** Download from email/cloud

**Option C: Bluetooth**
1. **Send APK via Bluetooth** from computer to phone
2. **On phone:** Accept file transfer

### Step 2: Enable Unknown Sources

1. **Settings → Security** (or **Apps → Special access**)
2. **Enable "Install unknown apps"** or **"Unknown sources"**
3. **Or when installing:** Tap "Settings" → Enable for your file manager

### Step 3: Install APK

1. **On phone:** Open **File Manager** (or **Downloads** app)
2. **Find:** `app-debug.apk`
3. **Tap the APK file**
4. **Tap "Install"**
5. **Wait for installation**
6. **Tap "Open"** to launch app

---

## 🚀 Method 3: Using Android Studio (If ADB Works)

### Step 1: Connect Phone

1. **Enable USB Debugging** (see Method 1, Step 1)
2. **Connect via USB**
3. **Allow USB debugging** on phone

### Step 2: Select Device in Android Studio

1. **Top toolbar → Device dropdown**
2. **Select your phone** (should appear)
3. **If not showing:**
   - **Run → Edit Configurations**
   - **Target:** Select your device

### Step 3: Install and Run

1. **Click ▶️ Run button**
2. **Or:** **Run → Run 'app'**
3. **App builds, installs, and launches automatically!**

---

## 🚀 Method 4: Using Wireless ADB (No USB Cable!)

### Step 1: Connect Once via USB

1. **Connect phone via USB**
2. **Enable USB Debugging**
3. **Allow USB debugging**

### Step 2: Enable Wireless Debugging

1. **Settings → Developer Options**
2. **Enable "Wireless debugging"**
3. **Tap "Wireless debugging"**
4. **Tap "Pair device with pairing code"**
5. **Note the IP address and port** (e.g., 192.168.1.100:12345)

### Step 3: Connect Wirelessly

**In Terminal:**
```powershell
adb pair 192.168.1.100:12345
```
(Enter pairing code when prompted)

Then:
```powershell
adb connect 192.168.1.100:XXXXX
```
(Use the port shown on phone)

### Step 4: Install APK

```powershell
adb install app\build\outputs\apk\debug\app-debug.apk
```

**Now you can disconnect USB!** ✅

---

## 🔧 Troubleshooting

### Error: "Device not found"

**Solutions:**
1. **Check USB cable** - Try different cable
2. **Check USB port** - Try different port
3. **Enable USB Debugging** on phone
4. **Allow USB debugging** when prompted
5. **Restart ADB:**
   ```powershell
   adb kill-server
   adb start-server
   adb devices
   ```

### Error: "Installation failed"

**Solutions:**
1. **Uninstall previous version:**
   ```powershell
   adb uninstall com.netzor.vansales.supplier
   ```
2. **Enable "Install unknown apps"** on phone
3. **Check phone has enough storage**
4. **Try:** `adb install -r app-debug.apk` (force reinstall)

### Error: "Unauthorized device"

**Solutions:**
1. **Check phone** for USB debugging prompt
2. **Tap "Allow"** and check "Always allow"
3. **Revoke USB debugging** and reconnect:
   - Settings → Developer Options → Revoke USB debugging authorizations
   - Reconnect and allow again

### APK Won't Install from File Manager

**Solutions:**
1. **Enable "Install unknown apps"** for your file manager:
   - Settings → Apps → Special access → Install unknown apps
   - Select your file manager → Enable
2. **Try different file manager** (Google Files, ES File Explorer)
3. **Check APK file is not corrupted** - Try downloading again

---

## 📋 Quick Reference

### APK Location:
```
B:\VAN Sales Netzor Subscription\mobile-app\android\app\build\outputs\apk\debug\app-debug.apk
```

### Install via ADB:
```powershell
adb install app\build\outputs\apk\debug\app-debug.apk
```

### Check Connected Devices:
```powershell
adb devices
```

### Uninstall App:
```powershell
adb uninstall com.netzor.vansales.supplier
```

---

## ✅ Success Checklist

- [ ] USB Debugging enabled on phone
- [ ] Phone connected via USB (or wirelessly)
- [ ] `adb devices` shows your device
- [ ] APK installed successfully
- [ ] App icon appears on phone
- [ ] App launches without errors

---

## 💡 Pro Tips

1. **Method 2 (Transfer & Install)** is easiest if ADB doesn't work
2. **Keep USB Debugging enabled** - Faster future installs
3. **Use wireless ADB** - No cable needed after first setup
4. **Test on multiple devices** - Different screen sizes, Android versions
5. **Keep APK file** - Can reinstall anytime

---

## 🎯 Recommended Method

**For First Time:**
- **Method 2 (Transfer & Install)** - Easiest, no ADB needed

**For Development:**
- **Method 1 (USB + ADB)** - Fastest, automatic install

**For Convenience:**
- **Method 4 (Wireless ADB)** - No cable after setup

---

## 🎉 After Installation

Once installed:
1. ✅ **App icon appears** on phone
2. ✅ **Tap to launch** and test
3. ✅ **Test all features**
4. ✅ **Share with others** (send them the APK)

**Your app is now on your phone!** 🚀

