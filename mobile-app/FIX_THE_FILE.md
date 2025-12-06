# ✅ Fix the File You Found

## Step-by-Step Instructions

### Step 1: Open the File
1. In VS Code, click on the file you found in `node_modules/@expo/cli/`
2. It should be named `externals.ts` or similar

### Step 2: Find and Replace
1. **Press `Ctrl + H`** (Find & Replace)
2. **In the "Find" box**, type: `'node:sea'` (with single quotes)
3. **In the "Replace" box**, type: `'node-sea'` (remove the colon)
4. **Click "Replace All"** (or press `Alt + A`)
5. **Save the file** (`Ctrl + S`)

### Step 3: Also Check For
If you see any of these, replace them too:
- `"node:sea"` → `"node-sea"` (with double quotes)
- `node:sea` → `node-sea` (without quotes)

### Step 4: Try Expo Again
```powershell
cd mobile-app
npm start
```

**Now the QR code should appear!** 📱

---

## Quick Reference
- **Find**: `'node:sea'`
- **Replace**: `'node-sea'` (just remove the colon `:`)
- **Save**: `Ctrl + S`

That's it! 🎉


