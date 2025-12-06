# 📦 Install Dependencies - Correct Directory

## ⚠️ Important: Run in the Right Folder!

You ran `npm install` in `C:\Users\Absalom` but you need to run it in the **mobile-app** folder!

---

## ✅ Correct Steps

### Step 1: Navigate to Mobile App Folder

Open PowerShell and run:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

### Step 2: Verify You're in the Right Place

Check that you see `package.json`:

```powershell
dir package.json
```

You should see:
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          [date]              [size] package.json
```

### Step 3: Install Dependencies

```powershell
npm install
```

**This will take 2-5 minutes** - you should see it installing many packages (not just 17!).

You should see output like:
```
added 500+ packages
```

### Step 4: Fix Expo Dependencies

```powershell
npx expo install --fix
```

This ensures all Expo packages match SDK 50.

---

## ✅ Verify Installation

After `npm install` completes, check:

```powershell
dir node_modules
```

You should see a `node_modules` folder with hundreds of subfolders.

---

## Then Build

```powershell
eas build --platform android --profile preview
```

---

**Make sure you're in the `mobile-app` folder before running `npm install`!** 🚀
