# 📱 Create Android Folder - Manual Steps

## ⚠️ Why the Command Didn't Run

The prebuild command takes several minutes, so it timed out. You need to run it manually in your PowerShell terminal.

---

## 🚀 Step-by-Step Instructions

### Step 1: Open PowerShell

1. Press `Windows Key + X`
2. Select **"Windows PowerShell"** or **"Terminal"**

### Step 2: Navigate to Mobile App Folder

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

### Step 3: Run Prebuild Command

```powershell
npx expo prebuild --platform android --clean
```

**Important:** 
- This will take **3-5 minutes** - be patient!
- It will ask: "Would you like to proceed?" - Type **`y`** and press Enter
- You'll see it creating files and downloading dependencies

### Step 4: Wait for Completion

You'll see output like:
```
✔ Created native project
✔ Android folder created
```

### Step 5: Verify Android Folder Exists

```powershell
dir android
```

You should see the `android` folder with files inside.

---

## ✅ After Prebuild Completes

Once the `android` folder is created:

1. **Open Android Studio**
2. **File → Open**
3. **Navigate to:** `B:\VAN Sales Netzor Subscription\mobile-app\android`
4. **Click OK**
5. **Wait for Gradle sync** (may take a few minutes)

---

## ⚠️ If Prebuild Fails

### Error: "Cannot find module..."

**Fix:**
```powershell
npm install
npx expo install --fix
npx expo prebuild --platform android --clean
```

### Error: "Git working tree is dirty"

**Option 1: Proceed anyway**
- When asked, type `y` and press Enter

**Option 2: Commit changes first**
```powershell
cd "B:\VAN Sales Netzor Subscription"
git add .
git commit -m "Prepare for Android build"
cd mobile-app
npx expo prebuild --platform android --clean
```

### Error: Takes too long

- **This is normal!** Prebuild downloads Android SDK components
- First time can take 5-10 minutes
- Be patient and let it complete

---

## 📝 Quick Copy-Paste Commands

```powershell
# Navigate to mobile-app
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# Run prebuild
npx expo prebuild --platform android --clean

# When asked to proceed, type: y

# Verify android folder was created
dir android
```

---

## 💡 Pro Tips

1. **Keep PowerShell open** - Don't close it during prebuild
2. **Be patient** - First prebuild always takes longer
3. **Check internet** - Prebuild downloads dependencies
4. **Don't interrupt** - Let it complete fully

---

## 🎯 What Prebuild Does

- Creates `android` folder with native Android code
- Downloads Android SDK components
- Configures Gradle build files
- Sets up all necessary Android project files

**This is a one-time setup!** After this, you can build in Android Studio.

---

## 🆘 Still Having Issues?

If prebuild keeps failing:
1. Check the error message
2. Make sure you're in the `mobile-app` folder
3. Try: `npm install` first
4. Check internet connection

Good luck! 🚀

