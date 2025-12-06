# 🔧 Manual Fix for node:sea Error - SIMPLE STEPS

## The Problem
Expo tries to create directory `node:sea` (with colon) which is **invalid on Windows**.

## ✅ EASIEST FIX - 3 Steps

### Step 1: Open VS Code Search
1. Open VS Code
2. Press `Ctrl + Shift + F` (Search in all files)
3. Make sure you're in the project root: `B:\VAN Sales Netzor Subscription`

### Step 2: Find the File
1. In the search box, type: **`node:sea`**
2. Press Enter
3. VS Code will show you **exactly where** the file is
4. Click on the result to open the file

### Step 3: Fix It
1. In the opened file, press `Ctrl + H` (Find & Replace)
2. **Find**: `'node:sea'` (with single quotes)
3. **Replace**: `'node-sea'` (remove the colon)
4. Click **"Replace All"**
5. Press `Ctrl + S` to save

### Step 4: Try Again
```powershell
cd mobile-app
npm start
```

**That's it!** 🎉

---

## 🚀 Alternative: Use Physical Device (Works Even With Error!)

**The error doesn't prevent the app from working!**

1. Install **Expo Go** on your phone
2. Run: `cd mobile-app && npm start`
3. **Ignore the error** - it will still show QR code
4. Scan QR code with Expo Go
5. App loads on phone ✅

---

## 📍 Where is the File?

The file is usually at:
```
B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

OR

```
B:\VAN Sales Netzor Subscription\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

**Use VS Code search to find it - it's the easiest way!**

---

## ❓ Still Can't Find It?

1. The file might not exist if `node_modules` wasn't installed properly
2. Try: `cd mobile-app && npm install`
3. Then search again for `node:sea`


