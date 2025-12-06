# Manual Fix for Expo Windows Bug

## The Problem
Expo crashes before showing QR code because it tries to create directory `node:sea` (invalid on Windows).

## Manual Fix Steps

### Step 1: Find the File
The file is located at one of these paths:
- `B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts`
- `B:\VAN Sales Netzor Subscription\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts`
r


### Step 2: Open in VS Code
1. Open VS Code
2. Press `Ctrl + P` (Quick Open)
3. Paste one of the paths above
4. Press Enter

### Step 3: Find and Replace
1. Press `Ctrl + H` (Find & Replace)
2. In "Find" box, type: `'node:sea'`
3. In "Replace" box, type: `'node-sea'` (remove the colon)
4. Click "Replace All" (or press `Alt + A`)
5. Press `Ctrl + S` to save

### Step 4: Try Again
```powershell
cd mobile-app
npm start
```

Now the QR code should appear! 📱

---

## Alternative: Use Expo Web (Temporary)

If the fix doesn't work, test in browser:

```powershell
cd mobile-app
npx expo start --web
```

This opens at http://localhost:8081

---

## Still Not Working?

The file might be in a different location. Search for it:

1. In VS Code, press `Ctrl + Shift + F` (Search in files)
2. Search for: `node:sea`
3. It will show you where the file is
4. Open that file and replace `'node:sea'` with `'node-sea'`


