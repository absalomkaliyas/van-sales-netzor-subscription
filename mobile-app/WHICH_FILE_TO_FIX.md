# Which File to Fix?

## ✅ The Correct File

Look for the file that matches **ALL** of these:

1. **Path contains**: `@expo\cli\src\start\server\metro\externals.ts`
2. **File name**: `externals.ts`
3. **Location**: Inside `node_modules\@expo\cli\...`

## 🔍 How to Identify It

When you search for `node:sea` in VS Code, look for:

**✅ CORRECT FILE:**
```
node_modules/@expo/cli/src/start/server/metro/externals.ts
```

**❌ WRONG FILES (ignore these):**
- Any file in `mobile-app/` folder (your source code)
- Any file in `admin-web/` folder
- Documentation files (.md files)
- Any file NOT in `node_modules/@expo/cli/`

## 📍 Exact Location

The file should be at one of these paths:

1. **Root node_modules** (most likely):
   ```
   B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts
   ```

2. **Mobile app node_modules**:
   ```
   B:\VAN Sales Netzor Subscription\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts
   ```

## ✅ Quick Check

When VS Code shows you the search results:
- Look for the one that says `externals.ts`
- Check the path - it should have `@expo/cli/src/start/server/metro/` in it
- That's the one to fix!

## 🎯 What to Look For

In the file, you'll see something like:
```typescript
'node:sea'
```

Replace it with:
```typescript
'node-sea'
```

---

**Fix ONLY the file in `node_modules/@expo/cli/src/start/server/metro/externals.ts`**


