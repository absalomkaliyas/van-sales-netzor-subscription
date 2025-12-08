# 📱 Test App on Android Emulator - Step by Step

## 🎯 Two Ways to Test

### Option 1: Using Expo (Fastest - Recommended for Development)
- Quick setup, no build needed
- Hot reload for instant changes
- Best for development

### Option 2: Using Android Studio Emulator (Full Native Build)
- More realistic testing
- Tests actual APK
- Best for final testing

---

## 🚀 Option 1: Test with Expo (Recommended)

### Step 1: Set Up Android Emulator

1. **Open Android Studio**
2. **Tools → Device Manager** (or **More Actions → Virtual Device Manager**)
3. **Click "Create Device"**
4. **Select Device:**
   - Choose **Pixel 5** or **Pixel 6** (recommended)
   - Click **Next**
5. **Select System Image:**
   - Choose **API 34 (Android 14)** or **API 33 (Android 13)**
   - If not installed, click **Download** next to it
   - Wait for download (may take 10-15 minutes)
   - Click **Next**
6. **Verify Configuration:**
   - Click **Finish**
7. **Start Emulator:**
   - Click **▶️ Play button** next to your device
   - Wait for emulator to boot (2-3 minutes first time)

### Step 2: Start Expo Development Server

1. **Open PowerShell:**
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   ```

2. **Start Expo:**
   ```powershell
   npm start
   ```
   
   **Note:** If you get the `node:sea` error, it's okay - Expo will still work!

3. **Press `a` key** in the terminal
   - This will automatically launch the app on the Android emulator
   - Or scan the QR code with Expo Go (if installed on emulator)

### Step 3: App Opens on Emulator

- App will load automatically
- You'll see your supplier app!
- Changes reload automatically (hot reload)

---

## 🏗️ Option 2: Test with Android Studio (Full Build)

### Step 1: Set Up Android Emulator

(Same as Option 1, Step 1 above)

### Step 2: Build and Run from Android Studio

1. **Open your project in Android Studio:**
   - File → Open → `mobile-app\android`

2. **Wait for Gradle sync** to complete

3. **Select your emulator:**
   - Top toolbar: Device dropdown → Select your emulator
   - If not running, start it from Device Manager first

4. **Run the app:**
   - Click **▶️ Run** button (green play icon)
   - Or press **Shift + F10**
   - Or **Run → Run 'app'**

5. **Wait for build:**
   - First build: 5-10 minutes
   - Subsequent builds: 1-2 minutes

6. **App launches on emulator!**

---

## ⚙️ Alternative: Use Physical Device (Easiest)

### For Quick Testing:

1. **Install Expo Go** on your Android phone:
   - Google Play Store → Search "Expo Go" → Install

2. **Start Expo:**
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   npm start
   ```

3. **Scan QR code:**
   - Open Expo Go app on phone
   - Tap "Scan QR code"
   - Point camera at terminal QR code
   - App loads instantly!

**Advantages:**
- ✅ No emulator setup needed
- ✅ Faster than emulator
- ✅ Real device testing
- ✅ Works even with `node:sea` error

---

## 🔧 Troubleshooting Emulator

### Emulator Won't Start

**Error: "HAXM not installed" or "Hyper-V conflict"**

**Solution:**
1. **Enable Virtualization in BIOS:**
   - Restart computer
   - Enter BIOS (usually F2, F10, or Del during boot)
   - Enable **Virtualization Technology (VT-x)** or **AMD-V**
   - Save and exit

2. **For Windows:**
   - Disable Hyper-V if enabled:
     ```powershell
     # Run as Administrator
     dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
     ```
   - Restart computer

### Emulator is Slow

**Solutions:**
1. **Increase RAM:**
   - Device Manager → Edit device → Show Advanced Settings
   - Increase RAM to 2048 MB or more

2. **Use x86_64 System Image:**
   - More efficient than ARM images

3. **Close other applications:**
   - Free up system resources

### "SDK location not found"

**Solution:**
1. Create `local.properties` in `android` folder:
   ```properties
   sdk.dir=C\:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```
2. Find your SDK path:
   - Android Studio → File → Project Structure → SDK Location

---

## 📋 Quick Reference

### Start Expo Development Server:
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm start
# Then press 'a' for Android emulator
```

### Build and Run in Android Studio:
1. Start emulator from Device Manager
2. Click ▶️ Run button
3. Wait for build and launch

### Test on Physical Device:
1. Install Expo Go on phone
2. `npm start` in mobile-app folder
3. Scan QR code with Expo Go

---

## 💡 Pro Tips

1. **Use Expo for development** - Much faster iteration
2. **Use Android Studio build for final testing** - Tests actual APK
3. **Physical device is fastest** - No emulator setup needed
4. **Keep emulator running** - Faster subsequent launches

---

## ✅ Success Checklist

- [ ] Android emulator created and running
- [ ] Expo server started (`npm start`)
- [ ] Pressed `a` to launch on emulator
- [ ] App loaded successfully
- [ ] Can interact with app

---

## 🎯 Recommended Workflow

**For Development:**
1. Use **Expo + Physical Device** (fastest)
2. Or **Expo + Emulator** (if no physical device)

**For Final Testing:**
1. Build APK in Android Studio
2. Install on emulator or physical device
3. Test full production build

---

## 🆘 Still Having Issues?

**Common Problems:**
- Emulator won't start → Check virtualization in BIOS
- App won't load → Check emulator is running
- Build fails → Check Gradle sync completed
- Expo won't connect → Check emulator is running and press `a`

**Need Help?**
- Share the exact error message
- Check Android Studio's Build tab for errors
- Verify emulator is actually running (not just created)

Good luck! 🚀

