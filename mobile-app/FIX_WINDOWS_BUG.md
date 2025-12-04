# Fix Windows Expo Bug - Manual Steps

## The Problem
Expo tries to create directory `node:sea` (with colon) which is invalid on Windows.

## Quick Fix - Manual Patch

### Step 1: Find the File
Navigate to:
```
B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

### Step 2: Open the File
Open `externals.ts` in a text editor (VS Code, Notepad++, etc.)

### Step 3: Find and Replace
1. Press `Ctrl + H` (Find & Replace)
2. Find: `'node:sea'`
3. Replace: `'node-sea'` (remove the colon)
4. Click "Replace All"
5. Save the file

### Step 4: Try Again
```powershell
cd mobile-app
npm start
```

---

## Alternative: Use Physical Device (Easiest)

**This works even with the error!**

1. Install **Expo Go** on your phone
2. Run: `cd mobile-app && npm start`
3. **Ignore the error** - Expo still starts
4. **QR code will appear** in terminal
5. **Scan with Expo Go app**
6. **App loads on phone** ✅

The error is just during startup - Expo still works!

---

## Or: Skip Mobile App for Now

Your **admin portal is fully working**! You can:

1. ✅ Build all features in admin portal
2. ✅ Test mobile app later when Expo fixes the bug
3. ✅ Mobile app code is ready - just needs Expo fix

---

**Recommended: Use physical device - it works fine even with the error!**

