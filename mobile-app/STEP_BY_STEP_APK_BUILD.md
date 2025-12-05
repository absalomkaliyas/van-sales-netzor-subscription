# 📱 Step-by-Step: Build APK for Android

Follow these steps **one by one** in your terminal.

---

## STEP 1: Install EAS CLI

Open PowerShell or Command Prompt and run:

```powershell
npm install -g eas-cli
```

**Wait for it to finish.** You should see:
```
+ eas-cli@x.x.x
added 1 package in 10s
```

**Press Enter if it asks anything.**

---

## STEP 2: Verify Installation

Check if EAS is installed:

```powershell
eas --version
```

You should see a version number like: `eas-cli/x.x.x`

**If you see an error**, restart your terminal and try again.

---

## STEP 3: Login to Expo

```powershell
eas login
```

**What happens:**
- If you have an Expo account: Enter your email and password
- If you DON'T have an account:
  - Type `n` when asked
  - It will open browser to create account
  - Create free account at https://expo.dev
  - Come back to terminal and login

**Wait for:** `Successfully logged in`

---

## STEP 4: Navigate to Mobile App Folder

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

**Verify you're in the right place:**
```powershell
dir
```

You should see files like: `package.json`, `app.json`, `app` folder, etc.

---

## STEP 5: Configure EAS Build (First Time Only)

```powershell
eas build:configure
```

**What happens:**
- It will ask: "Set up EAS Build?"
- Type: `y` and press Enter
- It will create/update `eas.json`
- Wait for: "Configured EAS Build successfully"

---

## STEP 6: Build the APK

```powershell
eas build --platform android --profile preview
```

**What happens:**
1. It will ask: "Would you like to create a new Android build?"
2. Type: `y` and press Enter
3. It will ask: "How would you like to upload your credentials?"
4. Choose: `Set up credentials automatically` (usually option 1)
5. It will upload your code to Expo servers
6. **Wait 10-15 minutes** for build to complete

**You'll see:**
```
✔ Build finished
📦 https://expo.dev/artifacts/...
```

**Copy that URL!** That's your APK download link.

---

## STEP 7: Download APK

1. **Open the URL** in your browser (the one from Step 6)
2. **Click "Download"** button
3. **Save the APK file** to your computer (remember where you saved it!)

---

## STEP 8: Transfer to Android Phone

**Option A: USB Cable**
1. Connect phone to computer via USB
2. Copy the APK file to your phone's Downloads folder
3. Disconnect phone

**Option B: Email/Cloud**
1. Email the APK to yourself
2. Open email on phone
3. Download APK

**Option C: Google Drive/Dropbox**
1. Upload APK to cloud storage
2. Download on phone

---

## STEP 9: Install on Android Phone

1. **On your phone**, go to Settings → Security
2. **Enable "Install from unknown sources"** or "Allow from this source"
3. **Open File Manager** on phone
4. **Find the APK file** (Downloads folder or wherever you saved it)
5. **Tap the APK file**
6. **Tap "Install"**
7. **Wait for installation** (30 seconds - 1 minute)
8. **Tap "Open"** when done

---

## STEP 10: Test the App

1. **Open the app** on your phone
2. **Login** with your credentials
3. **Test all features:**
   - Home screen
   - Inventory
   - Customers
   - Orders
   - Payments
   - Check-in/Check-out

---

## ✅ Success!

Your app is now installed and running on your phone!

---

## Troubleshooting

### "eas: command not found"
- Restart terminal after installing EAS CLI
- Or run: `npm install -g eas-cli` again

### "Not logged in"
- Run: `eas login` again
- Make sure you created Expo account

### Build fails
- Check your `.env` file exists in `mobile-app` folder
- Make sure Supabase credentials are correct
- Check internet connection

### Can't install APK
- Make sure "Install from unknown sources" is enabled
- Try downloading APK again
- Check if phone has enough storage

---

## Next Time

When you make changes to the app:

1. Make your code changes
2. Run: `eas build --platform android --profile preview`
3. Download new APK
4. Install on phone

**That's it!** Much easier than fixing Windows errors! 🚀

---

## Quick Reference

```powershell
# Install EAS
npm install -g eas-cli

# Login
eas login

# Navigate
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# Build APK
eas build --platform android --profile preview
```

---

**Follow these steps one by one, and you'll have your APK in 15-20 minutes!** 📱

