# Fix: Expo Metro Error on Windows

## Problem
Error: `ENOENT: no such file or directory, mkdir '...\node:sea'`

This happens because Expo tries to create a directory with a colon (`:`) in the name, which is invalid on Windows.

## Solutions

### Solution 1: Update Expo CLI (Recommended)

```powershell
cd mobile-app
npm install -g expo-cli@latest
npx expo install --fix
```

### Solution 2: Use Expo Go Web (Temporary Workaround)

Instead of `npm start`, try:

```powershell
cd mobile-app
npx expo start --web
```

This will open the app in your browser instead of trying to use Metro bundler.

### Solution 3: Downgrade or Update Expo Version

The issue might be with the Expo version. Try:

```powershell
cd mobile-app
npm install expo@latest
npm install
npx expo start --clear
```

### Solution 4: Manual Directory Creation Workaround

Create the problematic directory structure manually:

```powershell
cd mobile-app
New-Item -ItemType Directory -Force -Path ".expo\metro\externals\node-sea"
```

Then try starting again.

### Solution 5: Use WSL (Windows Subsystem for Linux)

If available, run Expo in WSL where this issue doesn't occur.

## Quick Test: Web Version

For now, test the mobile app in web browser:

```powershell
cd mobile-app
npx expo start --web
```

This will open at http://localhost:8081


