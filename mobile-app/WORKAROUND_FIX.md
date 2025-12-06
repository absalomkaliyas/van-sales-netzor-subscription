# 🔧 Workaround: Create Directory Manually

Since the file doesn't exist yet, let's create the directory structure manually to prevent the error.

## Step 1: Create the Directory

Run this in PowerShell:

```powershell
cd mobile-app
New-Item -ItemType Directory -Force -Path ".expo\metro\externals\node-sea"
```

This creates the directory with the correct name (without colon).

## Step 2: Try Starting Expo

```powershell
npm start
```

The error might still appear, but Expo should continue and show the QR code.

---

## Alternative: Reinstall Dependencies

If the above doesn't work, try reinstalling:

```powershell
cd mobile-app
rm -r node_modules
npm install
```

Then try starting again.

---

## Or: Use Tunnel Mode (Bypasses Some Issues)

```powershell
cd mobile-app
npx expo start --tunnel
```

Tunnel mode sometimes works around Windows path issues.

---

**Try creating the directory first - that might fix it!**


