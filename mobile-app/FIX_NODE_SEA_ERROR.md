# 🔧 Fix node:sea Error - Step by Step

## The Error
```
Error: ENOENT: no such file or directory, mkdir '...\node:sea'
```

This happens because Expo tries to create a directory with a colon (`:`) which is invalid on Windows.

---

## ✅ EASIEST FIX - Use VS Code Search

### Step 1: Open VS Code
Open your project in VS Code:
```
B:\VAN Sales Netzor Subscription
```

### Step 2: Search for the String
1. Press `Ctrl + Shift + F` (Search in all files)
2. Make sure you're searching in the **entire workspace**
3. In the search box, type: **`node:sea`** (exactly like this)
4. Press Enter

### Step 3: Find the File
VS Code will show you **exactly where** the file is. Look for:
- File path containing: `@expo\cli\src\start\server\metro\externals.ts`
- Or: `expo\metro\externals.ts`

### Step 4: Open the File
Click on the search result to open the file.

### Step 5: Fix It
1. Press `Ctrl + H` (Find & Replace)
2. In **"Find"** box: `'node:sea'` (with single quotes)
3. In **"Replace"** box: `'node-sea'` (remove the colon)
4. Click **"Replace All"** (or press `Alt + A`)
5. Press `Ctrl + S` to save

### Step 6: Try Again
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm start
```

**That's it!** The QR code should appear now! 🎉

---

## Alternative: Manual File Edit

If you can't find it with search:

### Step 1: Navigate to File
The file is usually at:
```
B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

OR

```
B:\VAN Sales Netzor Subscription\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts
```

### Step 2: Open in VS Code
1. In VS Code, press `Ctrl + P` (Quick Open)
2. Paste the path above
3. Press Enter

### Step 3: Find and Replace
1. Press `Ctrl + H`
2. Find: `'node:sea'`
3. Replace: `'node-sea'`
4. Replace All
5. Save

---

## Alternative: Use Tunnel Mode (Bypass the Error)

If you can't fix the file right now, use tunnel mode:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo start --tunnel
```

This might work even with the error!

---

## Quick PowerShell Fix Script

If you want to try an automated fix, run this in PowerShell:

```powershell
cd "B:\VAN Sales Netzor Subscription"

# Find the file
$file = Get-ChildItem -Recurse -Filter "externals.ts" | Where-Object { $_.FullName -match "expo.*metro" } | Select-Object -First 1

if ($file) {
    Write-Host "Found: $($file.FullName)" -ForegroundColor Green
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace "'node:sea'", "'node-sea'"
    $content = $content -replace '"node:sea"', '"node-sea"'
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "✅ Fixed!" -ForegroundColor Green
} else {
    Write-Host "File not found. Use VS Code search method above." -ForegroundColor Yellow
}
```

---

## Still Not Working?

1. **Reinstall node_modules**:
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   Remove-Item -Recurse -Force node_modules
   npm install
   ```
   Then try the fix again.

2. **Use tunnel mode** - It might bypass the issue

3. **Check Expo version** - Update Expo:
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   npx expo install expo@latest
   ```

---

## Recommended: VS Code Search Method

**The easiest way is to use VS Code search (`Ctrl + Shift + F`) to find `node:sea` and replace it with `node-sea`.**

This takes 30 seconds and fixes it permanently! 🚀


