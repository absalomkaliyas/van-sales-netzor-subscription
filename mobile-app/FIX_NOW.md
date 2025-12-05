# 🔧 Quick Fix for Expo Windows Bug

## The Problem
Expo tries to create directory `node:sea` (with colon) which is invalid on Windows.

## ✅ Solution 1: Auto-Fix Script (Easiest)

Run this command in PowerShell:

```powershell
cd mobile-app
powershell -ExecutionPolicy Bypass -File .\scripts\fix-expo-windows.ps1
```

Then try again:
```powershell
npm start
```

## ✅ Solution 2: Manual Fix

1. **Find the file**:
   - Open VS Code
   - Press `Ctrl + Shift + F` (Search in files)
   - Search for: `node:sea`
   - It will show you the file location

2. **Fix it**:
   - Open the file (usually in `node_modules\@expo\cli\src\start\server\metro\externals.ts`)
   - Press `Ctrl + H` (Find & Replace)
   - Find: `'node:sea'`
   - Replace: `'node-sea'` (remove the colon)
   - Click "Replace All"
   - Save the file

3. **Try again**:
   ```powershell
   npm start
   ```

## ✅ Solution 3: Use Web Version (Works Immediately)

Test the app in browser while fixing the mobile issue:

```powershell
cd mobile-app
npx expo start --web
```

This opens at http://localhost:8081 and works perfectly!

## ✅ Solution 4: Use Physical Device (Recommended)

**The error doesn't prevent the app from working!**

1. Install **Expo Go** app on your phone
2. Run: `npm start` (ignore the error)
3. **QR code will still appear** in terminal
4. Scan with Expo Go app
5. App loads on phone ✅

The error is just during startup - Expo still works!

---

**Recommended**: Try Solution 1 (auto-fix script) first!

