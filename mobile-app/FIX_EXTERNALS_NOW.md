# 🔧 Fix externals.ts File - Quick Guide

## The File Location

The file is at:
```
B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

## Quick Fix (3 Steps)

### Step 1: Open the File

1. Open VS Code (or any text editor)
2. Press `Ctrl + O` (Open File)
3. Navigate to: `B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts`
4. Open it

### Step 2: Find and Replace

1. Press `Ctrl + H` (Find & Replace)
2. In **"Find"** box: `'node:sea'` (with single quotes)
3. In **"Replace"** box: `'node-sea'` (with single quotes)
4. Click **"Replace All"**

### Step 3: Save

1. Press `Ctrl + S` to save
2. Done! ✅

---

## Alternative: PowerShell One-Liner

If the file exists, run this in PowerShell:

```powershell
$file = "B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts"
(Get-Content $file -Raw) -replace "'node:sea'", "'node-sea'" -replace '"node:sea"', '"node-sea"' -replace 'node:sea', 'node-sea' | Set-Content $file -NoNewline
```

---

## Verify Fix

After fixing, search the file again for `node:sea` - it should not be found.

---

## Then Try

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm start
```

**The QR code should appear now!** 🎉

