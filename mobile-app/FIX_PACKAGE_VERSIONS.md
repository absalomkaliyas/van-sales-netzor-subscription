# 🔧 Fix Package Version Mismatches

## The Problem

After running `npx expo install --fix`, it detected version mismatches:
- `expo-file-system@17.0.1` - should be `~16.0.9` for SDK 50
- `expo-linking@8.0.10` - should be `~6.2.2` for SDK 50
- `expo-status-bar@3.0.9` - should be `~1.11.1` for SDK 50

---

## ✅ Solution

### Option 1: Use npx expo install (Recommended)

Run this command to install the correct versions:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo install expo-file-system@~16.0.9 expo-linking@~6.2.2 expo-status-bar@~1.11.1
```

This will:
- Install the correct SDK 50 compatible versions
- Update package.json
- Update node_modules

### Option 2: Manual npm install

If Option 1 doesn't work:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm install expo-file-system@16.0.9 expo-linking@6.2.2 expo-status-bar@1.11.1
```

### Option 3: Clean Install

If versions are still wrong, do a clean reinstall:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
rm -r node_modules
npm install
npx expo install --fix
```

---

## ✅ Verify

After installing, verify the versions:

```powershell
npm list expo-file-system expo-linking expo-status-bar
```

You should see:
- `expo-file-system@16.0.9`
- `expo-linking@6.2.2`
- `expo-status-bar@1.11.1`

---

## Then Rebuild

Once versions are correct:

```powershell
eas build --platform android --profile preview
```

---

**Run the install command to fix the versions!** 🚀
