# 🔍 Find and Fix the Expo Bug - Step by Step

## The File Location

Based on your error, the file is at:
```
B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

## Quick Fix Steps

### Method 1: VS Code Search (Easiest)

1. **Open VS Code**
2. **Press `Ctrl + Shift + F`** (Search in all files)
3. **Search for**: `node:sea` (exactly like this)
4. **VS Code will show you the file** - click on it
5. **Press `Ctrl + H`** (Find & Replace)
6. **Find**: `'node:sea'`
7. **Replace**: `'node-sea'` (remove the colon)
8. **Click "Replace All"**
9. **Save** (`Ctrl + S`)
10. **Try again**: `npx expo start --web`

### Method 2: File Explorer

1. **Open File Explorer**
2. **Navigate to**: `B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\`
3. **Open**: `externals.ts` in Notepad or VS Code
4. **Press `Ctrl + H`** (Find & Replace)
5. **Find**: `'node:sea'`
6. **Replace**: `'node-sea'`
7. **Save**
8. **Try again**: `npx expo start --web`

### Method 3: PowerShell One-Liner

Run this in PowerShell (from project root):

```powershell
$file = "B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts"
(Get-Content $file) -replace "'node:sea'", "'node-sea'" | Set-Content $file
```

Then try: `npx expo start --web`

---

## ✅ After Fixing

Once you've fixed the file, run:

```powershell
cd mobile-app
npx expo start --web
```

The app should start and open in your browser! 🎉

---

**The fix is just removing the colon from `node:sea` → `node-sea`**

