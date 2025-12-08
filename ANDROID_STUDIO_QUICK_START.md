# 🚀 Android Studio Quick Start

## Fastest Way to Build Your APK

### 1️⃣ Install Android Studio
- Download: https://developer.android.com/studio
- Install and complete setup wizard

### 2️⃣ Prepare Project
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npm install
npx expo prebuild --platform android --clean
```

### 3️⃣ Open in Android Studio
- Open Android Studio
- **File → Open** → Select `mobile-app\android` folder
- Wait for Gradle sync

### 4️⃣ Build APK
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- Or in terminal: `cd android && .\gradlew assembleRelease`

### 5️⃣ Find APK
- Location: `mobile-app\android\app\build\outputs\apk\release\app-release.apk`
- Copy to phone and install!

---

## ✅ That's It!

Building locally is often more reliable than cloud builds.

See `BUILD_WITH_ANDROID_STUDIO.md` for detailed troubleshooting.

