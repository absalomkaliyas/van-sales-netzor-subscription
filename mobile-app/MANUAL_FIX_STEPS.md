# 🔧 Manual Fix Steps for Expo Windows Bug

## Step-by-Step Instructions

### Step 1: Find the File

The file is located in one of these locations:

1. **Root node_modules** (most likely):
   ```
   B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
   ```

2. **Mobile app node_modules**:
   ```
   B:\VAN Sales Netzor Subscription\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts
   ```

### Step 2: Open in VS Code

1. Open VS Code
2. Press `Ctrl + P` (Quick Open)
3. Type: `externals.ts`
4. Look for the file in `@expo/cli/src/start/server/metro/` folder
5. Open it

### Step 3: Find and Replace

1. Press `Ctrl + H` (Find & Replace)
2. In the "Find" box, type: `'node:sea'`
3. In the "Replace" box, type: `'node-sea'` (remove the colon)
4. Click "Replace All" (or press `Alt + A`)
5. Press `Ctrl + S` to save

### Step 4: Try Again

```powershell
cd mobile-app
npm start
```

---

## ✅ Alternative: Use Web Version (Works Now!)

Instead of fixing the bug, you can test the app in your browser:

```powershell
cd mobile-app
npx expo start --web
```

This will:
- ✅ Start without the Windows bug
- ✅ Open in browser at http://localhost:8081
- ✅ Let you test all features
- ✅ Connect to Supabase

---

## ✅ Or: Use Physical Device

The error doesn't prevent the app from working:

1. Install **Expo Go** app on your phone
2. Run: `npm start` (ignore the error message)
3. **QR code will still appear** in terminal
4. Scan with Expo Go app
5. App loads on phone ✅

The error is just during startup - Expo still works!

---

**Recommended**: Use web version for now, fix the file later when you have time.

