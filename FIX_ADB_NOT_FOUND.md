# 🔧 Fix: ADB Not Found Error

## ❌ Error: `adb` is not recognized

This means ADB (Android Debug Bridge) is not in your system PATH.

---

## 🚀 Solution 1: Use Android Studio Terminal (Easiest)

Android Studio's terminal has ADB in PATH automatically.

1. **In Android Studio:**
   - **View → Tool Windows → Terminal**
   - This terminal has ADB configured

2. **Run the command:**
   ```powershell
   cd android
   adb install app\build\outputs\apk\debug\app-debug.apk
   ```

**This should work!** ✅

---

## 🚀 Solution 2: Use Full Path to ADB

Find your Android SDK location and use full path.

### Step 1: Find Android SDK Path

1. **Android Studio → File → Project Structure → SDK Location**
2. **Copy the "Android SDK location"** path
   - Usually: `C:\Users\YourUsername\AppData\Local\Android\Sdk`

### Step 2: Use Full Path

```powershell
# Replace with your actual SDK path
C:\Users\YourUsername\AppData\Local\Android\Sdk\platform-tools\adb.exe install app\build\outputs\apk\debug\app-debug.apk
```

**Example:**
```powershell
C:\Users\John\AppData\Local\Android\Sdk\platform-tools\adb.exe install app\build\outputs\apk\debug\app-debug.apk
```

---

## 🚀 Solution 3: Add ADB to PATH (Permanent Fix)

### Step 1: Find Android SDK Path

1. **Android Studio → File → Project Structure → SDK Location**
2. **Copy the path** (e.g., `C:\Users\YourUsername\AppData\Local\Android\Sdk`)

### Step 2: Add to PATH

**Windows 10/11:**

1. **Press Windows Key + X** → **System**
2. **Advanced system settings** (right side)
3. **Environment Variables** button
4. **Under "System variables"** → Find **Path** → Click **Edit**
5. **Click "New"**
6. **Add:** `C:\Users\YourUsername\AppData\Local\Android\Sdk\platform-tools`
   (Replace with your actual SDK path)
7. **Click OK** on all dialogs
8. **Restart PowerShell/Terminal**

**Now `adb` will work everywhere!** ✅

---

## 🚀 Solution 4: Drag and Drop (Easiest - No ADB Needed!)

**This doesn't require ADB at all!**

1. **Open File Explorer**
2. **Navigate to:**
   ```
   B:\VAN Sales Netzor Subscription\mobile-app\android\app\build\outputs\apk\debug\
   ```
3. **Find:** `app-debug.apk`
4. **Make sure emulator is running**
5. **Drag the APK file** from File Explorer
6. **Drop it on the emulator screen**
7. **App installs automatically!** ✅

**This is the easiest method!**

---

## 🚀 Solution 5: Install via Android Studio

1. **In Android Studio:**
   - **Right-click** on `app-debug.apk` in Project view
   - Or navigate to the file in File Explorer within Android Studio
   - **Right-click → Run → Run 'app'** (if available)

2. **Or use Build menu:**
   - **Build → Install APK(s)...**
   - Select your APK file
   - Click OK

---

## 📋 Quick Reference

### Find SDK Path:
```
Android Studio → File → Project Structure → SDK Location
```

### ADB Location:
```
[SDK Path]\platform-tools\adb.exe
```

### Example Full Path:
```
C:\Users\YourUsername\AppData\Local\Android\Sdk\platform-tools\adb.exe
```

---

## ✅ Recommended: Use Android Studio Terminal

**Easiest solution:**
1. **View → Tool Windows → Terminal** in Android Studio
2. **Run:**
   ```powershell
   cd android
   adb install app\build\outputs\apk\debug\app-debug.apk
   ```

**Or use drag-and-drop - even easier!**

---

## 🎯 Next Steps

After installing:
1. ✅ **App should appear on emulator**
2. ✅ **Open app drawer** (swipe up)
3. ✅ **Tap your app** to launch
4. ✅ **Test all features!**

---

## 💡 Pro Tip

**For future use:**
- Add ADB to PATH (Solution 3) - Works everywhere
- Or always use Android Studio terminal - Has ADB configured
- Or use drag-and-drop - No setup needed!

Good luck! 🚀

