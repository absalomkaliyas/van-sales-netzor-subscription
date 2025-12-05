# 🚀 Run Build Now - One Command

## Simple Command

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm run build:now
```

**That's it!** The script will:
1. ✅ Fix all configuration automatically
2. ✅ Align all packages
3. ✅ Start the build

---

## What the Script Does

1. **Fixes package.json** - Ensures Expo SDK 49
2. **Removes problematic dependencies** - Removes @expo/config-plugins
3. **Fixes app.config.js** - Creates minimal working config
4. **Removes app.json** - If it exists
5. **Fixes dependencies** - Runs `npx expo install --fix`
6. **Checks environment** - Verifies EAS env vars
7. **Starts build** - Runs `npx eas build`

---

## Just Run It

```powershell
npm run build:now
```

**Wait 10-15 minutes for the build to complete!**

---

## If Build Fails

The script will show the error. Common issues:
- Environment variables not set → Set them with `eas env:create`
- Network issues → Retry
- Expo service issues → Check status

---

**Run `npm run build:now` and let it handle everything!** 🤖

