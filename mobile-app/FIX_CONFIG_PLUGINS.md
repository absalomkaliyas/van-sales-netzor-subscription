# 🔧 Fix @expo/config-plugins Missing Error

## The Problem

Build failed because `expo-camera` plugin requires `@expo/config-plugins` but it was removed.

Even though `expo doctor` warns about it, **we need it** because plugins like `expo-camera` depend on it.

---

## ✅ Solution Applied

Added `@expo/config-plugins` back to dependencies with version `~8.0.0` (compatible with SDK 51).

### What Changed

- Added `"@expo/config-plugins": "~8.0.0"` back to dependencies

---

## About the Warning

`expo doctor` warns about this, but as it says:
> "If you installed "@expo/config-plugins" to fulfill a peer dependency for a config plugin, the plugin's maintainer should switch to the "expo/config-plugins" import, and you can ignore this warning."

Since `expo-camera` needs it, we can ignore the warning and keep it.

---

## Rebuild Now

```powershell
eas build --platform android --profile preview
```

The build should work now! 🎉

---

**The plugin needs it, so we keep it despite the warning!** 🚀

