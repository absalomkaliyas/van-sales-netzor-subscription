# 🚀 Upgrade to Expo SDK 51 - Fix useDefaultAndroidSdkVersions Error

## Why Upgrade?

The `useDefaultAndroidSdkVersions()` error is a **known bug in SDK 50**. SDK 51 has fixed this issue.

---

## ✅ Step-by-Step Upgrade

### Step 1: Update Expo Package

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm install expo@~51.0.0
```

### Step 2: Update All Dependencies

```powershell
npx expo install --fix
```

This will automatically update all Expo packages to SDK 51 compatible versions.

### Step 3: Verify Changes

Check that packages were updated:

```powershell
npm list expo
```

Should show `expo@51.x.x`

### Step 4: Rebuild

```powershell
eas build --platform android --profile preview
```

---

## 📋 What Will Change

- `expo` → `~51.0.0`
- All Expo packages will update to SDK 51 versions
- `expo-build-properties` will update if needed
- Your app code should work without changes

---

## ⚠️ Breaking Changes (Minimal)

SDK 51 has minimal breaking changes. Your current code should work as-is.

If you encounter any issues:
1. Check the [SDK 51 changelog](https://expo.dev/changelog/2024-05-07-sdk-51)
2. Run `npx expo-doctor` to check for issues

---

## ✅ After Upgrade

Once upgraded, the `useDefaultAndroidSdkVersions()` error should be **completely resolved**.

---

**This is the proper fix - upgrade to SDK 51!** 🚀

