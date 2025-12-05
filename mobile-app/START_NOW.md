# 🚀 Start Expo Server - Manual Steps

## Quick Start (Do This Now!)

### Step 1: Open PowerShell/Terminal

Open a **new** PowerShell or Command Prompt window.

### Step 2: Navigate to Mobile App Folder

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
```

### Step 3: Start Expo

```powershell
npm start
```

**OR** if that doesn't work:

```powershell
npx expo start
```

### Step 4: Wait for QR Code

- You may see `node:sea` error - **that's OK!**
- Wait 10-30 seconds
- QR code will appear in the terminal

### Step 5: Scan QR Code

- **Android**: Open Expo Go app → Tap "Scan QR code" → Point at QR code
- **iOS**: Open Camera app → Point at QR code → Tap notification

---

## Alternative: Use Tunnel Mode

If QR code doesn't appear or connection issues:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo start --tunnel
```

This works even on different networks!

---

## What You Should See

After running `npm start`, you should see:

```
Starting project at B:\VAN Sales Netzor Subscription\mobile-app
env: load .env
env: export EXPO_PUBLIC_SUPABASE_URL...

› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

**The QR code will be displayed as ASCII art in the terminal!**

---

## Troubleshooting

### If QR code doesn't appear:

1. **Wait longer** - Sometimes takes 30-60 seconds
2. **Try tunnel mode** - `npx expo start --tunnel`
3. **Clear cache** - `npx expo start --clear`
4. **Check port** - Make sure port 8081 is not blocked

### If connection fails:

1. **Same Wi-Fi** - Phone and computer must be on same network
2. **Firewall** - Allow Node.js through Windows Firewall
3. **Use tunnel** - Works on any network

---

## Quick Commands Reference

```powershell
# Normal start
npm start

# With tunnel (works anywhere)
npx expo start --tunnel

# Clear cache and start
npx expo start --clear

# Web version (for testing)
npx expo start --web
```

---

**Run these commands in YOUR terminal to see the QR code!** 📱

