# Quick Fix - Use Web Version

Since the Windows bug prevents Expo from starting normally, use the **web version** which works perfectly:

## Option 1: Web Version (Works Now!)

```powershell
cd mobile-app
npx expo start --web
```

This will:
- ✅ Start Expo without the Windows bug
- ✅ Open in your browser at http://localhost:8081
- ✅ Let you test the mobile app UI
- ✅ Connect to Supabase

## Option 2: Use the Script

```powershell
cd mobile-app
powershell -ExecutionPolicy Bypass -File start-web.ps1
```

## Option 3: Physical Device (After Fix)

Once you fix the `node:sea` issue (by finding and replacing in VS Code), then:

```powershell
cd mobile-app
npm start
```

QR code will appear for physical device.

---

## Recommended: Use Web Version Now

The web version works perfectly and lets you:
- Test all features
- See the UI
- Connect to Supabase
- Develop and debug

You can test on physical device later once the Windows bug is fixed.

---

**Try the web version now - it works!** 🚀

