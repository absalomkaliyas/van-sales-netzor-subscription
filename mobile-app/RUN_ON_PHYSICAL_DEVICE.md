# 📱 How to Run Mobile App on Physical Device

## Quick Start Guide

### Prerequisites

1. **Install Expo Go** on your phone:
   - **Android**: [Google Play Store - Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS**: [App Store - Expo Go](https://apps.apple.com/app/expo-go/id982107779)

2. **Ensure your phone and computer are on the same Wi-Fi network**

---

## Method 1: Using Expo Go (Easiest - Recommended)

### Step 1: Start the Expo Server

```powershell
cd mobile-app
npm start
```

**Note**: You may see the `node:sea` error - **this is OK!** The error appears but Expo still works. Wait a few seconds and you'll see:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### Step 2: Scan the QR Code

#### For Android:
1. Open **Expo Go** app
2. Tap **"Scan QR code"**
3. Point camera at the QR code in terminal
4. App will load automatically

#### For iOS:
1. Open **Camera** app (built-in)
2. Point at the QR code in terminal
3. Tap the notification that appears
4. App opens in Expo Go

### Step 3: Use the App

Once loaded, you can:
- Login with your credentials
- Test all features
- See real-time updates

---

## Method 2: Using Development Build (Advanced)

If you want a standalone app without Expo Go:

### For Android:

```powershell
cd mobile-app
npx expo run:android
```

This will:
- Build the app
- Install on connected Android device
- Launch automatically

**Requirements**:
- Android device connected via USB
- USB debugging enabled
- Android Studio installed

### For iOS:

```powershell
cd mobile-app
npx expo run:ios
```

This will:
- Build the app
- Install on connected iPhone/iPad
- Launch automatically

**Requirements**:
- Mac computer
- Xcode installed
- iOS device connected via USB
- Apple Developer account

---

## Troubleshooting

### Issue: QR Code Not Appearing

**Solution 1**: Wait a bit longer - sometimes it takes 10-20 seconds after the error

**Solution 2**: Try clearing cache:
```powershell
cd mobile-app
npx expo start --clear
```

**Solution 3**: Check if port 8081 is available:
```powershell
netstat -ano | findstr :8081
```

### Issue: Can't Connect to Server

**Solution 1**: Ensure same Wi-Fi network
- Phone and computer must be on same network

**Solution 2**: Try tunnel mode:
```powershell
cd mobile-app
npx expo start --tunnel
```

**Solution 3**: Check firewall settings
- Allow Node.js through Windows Firewall

### Issue: App Loads But Shows Error

**Solution 1**: Check environment variables
- Ensure `.env` file exists in `mobile-app` folder
- Verify Supabase credentials are correct

**Solution 2**: Check Supabase connection
- Verify internet connection
- Check Supabase project is active

### Issue: node:sea Error (Windows)

**This is OK!** The error doesn't prevent the app from working. The QR code will still appear after the error. If you want to fix it:

1. Open VS Code
2. Press `Ctrl + Shift + F`
3. Search for: `node:sea`
4. Replace `'node:sea'` with `'node-sea'`
5. Save and restart

---

## Testing Checklist

Once the app loads on your device:

- [ ] Login works
- [ ] Home screen shows hub info
- [ ] Inventory shows hub stock
- [ ] Customers shows route customers
- [ ] Products shows with stock
- [ ] Can create new order
- [ ] Stock validation works
- [ ] Payments screen shows invoices
- [ ] Can collect payment
- [ ] Check-in/Check-out works
- [ ] GPS location captured

---

## Development Tips

### Hot Reload
- Changes to code automatically reload in Expo Go
- No need to restart the app

### Debugging
- Shake device to open developer menu
- Enable remote debugging
- View console logs in terminal

### Network Debugging
- Use tunnel mode if Wi-Fi issues
- Check network tab in developer menu

---

## Alternative: Use Web Version (For Testing)

If you can't use a physical device right now:

```powershell
cd mobile-app
npx expo start --web
```

This opens the app in your browser at `http://localhost:8081`

**Note**: Some features (GPS, camera) won't work in web version.

---

## Quick Reference

### Start Expo:
```powershell
cd mobile-app
npm start
```

### Start with Tunnel (if Wi-Fi issues):
```powershell
cd mobile-app
npx expo start --tunnel
```

### Clear Cache and Start:
```powershell
cd mobile-app
npx expo start --clear
```

### Start Web Version:
```powershell
cd mobile-app
npx expo start --web
```

---

## Success Indicators

✅ **QR code appears in terminal**  
✅ **Expo Go app opens on phone**  
✅ **App loads successfully**  
✅ **Login screen appears**  
✅ **Can navigate all screens**

---

## Need Help?

1. Check the terminal for error messages
2. Verify environment variables in `.env`
3. Ensure Supabase connection is working
4. Try tunnel mode if network issues
5. Check Expo Go app is up to date

---

**The app works on physical devices even with the Windows `node:sea` error!** 🚀

Just wait for the QR code to appear and scan it with Expo Go!


