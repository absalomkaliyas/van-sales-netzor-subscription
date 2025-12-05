# 🤖 Automatic Build Fix Script

## Run This One Command

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm run auto-fix
```

**OR**

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
powershell -ExecutionPolicy Bypass -File ./scripts/auto-fix-all.ps1
```

---

## What It Does Automatically

1. ✅ Fixes package.json (ensures Expo SDK 49)
2. ✅ Removes problematic dependencies
3. ✅ Fixes app.config.js (minimal config)
4. ✅ Removes app.json if exists
5. ✅ Runs `expo install --fix` to align packages
6. ✅ Checks environment variables
7. ✅ Runs expo doctor
8. ✅ Starts the build

---

## The Script Will

- Fix all known configuration issues
- Align all package versions
- Validate the setup
- Start the build automatically

---

## Just Run It

```powershell
npm run auto-fix
```

**That's it!** The script handles everything automatically. 🚀

---

## If Build Still Fails

The script will show the error. Common issues:
1. Environment variables not set → Set them with `eas env:create`
2. Network issues → Retry the build
3. Expo service issues → Check Expo status page

---

**Run `npm run auto-fix` and let it handle everything!** 🤖

