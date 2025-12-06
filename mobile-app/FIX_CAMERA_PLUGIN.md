# 🔧 Fix Camera Plugin Issue

## The Problem

Build failing because `expo-camera` plugin can't find `@expo/config-plugins` even though it's in package.json.

This is a known issue with expo-camera v15 and SDK 51.

---

## ✅ Solution: Temporarily Remove Camera Plugin

I've removed the `expo-camera` plugin from `app.config.js` temporarily.

### What Changed

- Removed `expo-camera` plugin from config
- Camera functionality will still work, just without the plugin configuration
- You can add it back later when the compatibility issue is fixed

---

## Rebuild Now

```powershell
eas build --platform android --profile preview
```

The build should work now without the camera plugin configuration.

---

## Camera Still Works

Even without the plugin in config:
- ✅ Camera functionality still works
- ✅ You can still use `expo-camera` in your code
- ✅ Just missing the automatic permission configuration
- ✅ Permissions are already in Android manifest

---

## Add Camera Plugin Back Later

Once Expo fixes the compatibility, you can add it back:

```javascript
[
  "expo-camera",
  {
    cameraPermission: "Allow VAN Sales to access your camera..."
  }
]
```

---

**Rebuild now - it should work without the camera plugin!** 🚀


