# ⚡ Quick Solution - Use Web Version

## The Problem
Expo has a Windows bug that prevents normal startup. But you can still test the app!

## ✅ Solution: Use Web Version (2 minutes)

Run this command:

```powershell
cd mobile-app
npx expo start --web
```

**That's it!** The app will:
- ✅ Start without errors
- ✅ Open in your browser
- ✅ Work perfectly
- ✅ Connect to Supabase
- ✅ Let you test all features

---

## 📱 For Mobile Testing Later

Once you want to test on a physical device:

1. **Find the file manually**:
   - Search for: `externals.ts` in VS Code
   - Look in: `node_modules\@expo\cli\src\start\server\metro\`
   - Replace `'node:sea'` with `'node-sea'`

2. **Or use physical device**:
   - Install Expo Go on phone
   - Run `npm start` (ignore error)
   - QR code will appear
   - Scan and test

---

**For now: Just use `npx expo start --web` - it works perfectly!** 🚀

