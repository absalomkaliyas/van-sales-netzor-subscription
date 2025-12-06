# 📱 Run Mobile App on Physical Device

## ✅ Quick Steps

### Step 1: Install Expo Go on Your Phone

**Android:**
- Open Google Play Store
- Search for "Expo Go"
- Install the app

**iOS:**
- Open App Store
- Search for "Expo Go"
- Install the app

### Step 2: Start Expo (Ignore the Error)

```powershell
cd mobile-app
npm start
```

**You'll see the error about `node:sea` - that's OK!** 

The error appears but Expo still works. Just wait a few seconds...

### Step 3: QR Code Will Appear

After the error, you'll see:
- Metro bundler starting
- QR code in the terminal
- Options: `Press a │ open Android`, `Press i │ open iOS simulator`, etc.

### Step 4: Scan QR Code

1. **Open Expo Go app** on your phone
2. **Tap "Scan QR Code"** (Android) or use Camera app (iOS)
3. **Scan the QR code** from terminal
4. **App will load** on your phone! 🎉

---

## 🔧 If QR Code Doesn't Appear

### Option 1: Use Tunnel Mode

```powershell
cd mobile-app
npx expo start --tunnel
```

This creates a tunnel that works even if phone and computer are on different networks.

### Option 2: Use LAN Mode (Same Network)

```powershell
cd mobile-app
npx expo start --lan
```

Make sure your phone and computer are on the same WiFi network.

### Option 3: Manual Connection

1. In Expo Go app, tap "Enter URL manually"
2. Type: `exp://YOUR_IP:8081`
   - Replace `YOUR_IP` with your computer's IP address
   - Find IP: Run `ipconfig` in PowerShell, look for IPv4 address

---

## 📋 Troubleshooting

### "Unable to connect to server"
- Make sure phone and computer are on same WiFi
- Or use `--tunnel` mode
- Check firewall isn't blocking port 8081

### "App not loading"
- Check `.env` file has correct Supabase credentials
- Make sure Supabase URL and keys are correct
- Check internet connection on phone

### QR Code Not Scanning
- Make sure terminal window is large enough
- Try `--tunnel` mode for better connectivity
- Or manually enter the URL in Expo Go

---

## ✅ Success!

Once connected, you'll see:
- Login screen
- After login: Dashboard with check-in/check-out
- All tabs working (Products, Customers, Orders, Profile)
- Full functionality on your phone!

---

**The `node:sea` error is just a Windows bug - it doesn't prevent the app from working!** 🚀


