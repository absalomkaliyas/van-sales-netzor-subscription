# 🔧 Fix Release Build Errors

## ❌ Release Build Failed

Let's diagnose and fix the issue.

---

## 🔍 Step 1: Check the Actual Error

### Where to Look:

1. **Build Tab (Bottom Panel):**
   - Look for **red error messages**
   - Copy the **exact error text**

2. **Run Tab:**
   - Check for error messages
   - Look for what step failed

3. **Gradle Console:**
   - **View → Tool Windows → Gradle Console**
   - Shows detailed build output

---

## 🚀 Common Fixes

### Fix 1: Missing Signing Configuration

**Error:** "Signing config 'release' not found"

**Solution:**
1. **File → Project Structure → Modules → app → Signing Configs**
2. **Add signing config:**
   - **Store File:** Create or select keystore
   - **Store Password:** Your password
   - **Key Alias:** Your key alias
   - **Key Password:** Your key password

**Or use debug signing for testing:**
1. **Open:** `android/app/build.gradle`
2. **Find:** `buildTypes { release {`
3. **Add:**
   ```gradle
   signingConfig signingConfigs.debug
   ```

### Fix 2: ProGuard/R8 Issues

**Error:** "R8: Missing classes" or "ProGuard rules"

**Solution:**
1. **Open:** `android/app/build.gradle`
2. **Find:** `buildTypes { release {`
3. **Add:**
   ```gradle
   minifyEnabled false
   shrinkResources false
   ```

### Fix 3: Missing Bundle Generation

**Error:** "Bundle not found" or "index.android.bundle"

**Solution:**
1. **Generate bundle first:**
   ```powershell
   cd android
   .\gradlew bundleRelease
   ```

2. **Or build APK with bundle:**
   - **Build → Generate Signed Bundle / APK**
   - Select **APK**
   - Follow wizard

### Fix 4: Clean Build

**Error:** Build cache issues

**Solution:**
1. **Build → Clean Project**
2. **File → Invalidate Caches → Invalidate and Restart**
3. **After restart:**
   - **File → Sync Project with Gradle Files**
   - **Build → Rebuild Project**

### Fix 5: Check Build Variant

**Error:** Wrong build configuration

**Solution:**
1. **Build Variants tab**
2. **Make sure "release" is selected**
3. **Not "debug"**

---

## 🔧 Step-by-Step: Build Release APK Properly

### Method 1: Using Android Studio (Recommended)

1. **Build Variants → release**

2. **Build → Generate Signed Bundle / APK**

3. **Select "APK"** → **Next**

4. **Create new keystore** (for first time):
   - **Key store path:** Choose location
   - **Password:** Create password
   - **Key alias:** Create alias
   - **Key password:** Create password
   - **Validity:** 25 years
   - **Certificate info:** Fill in details
   - **Click OK**

5. **Select keystore** → **Enter passwords** → **Next**

6. **Select "release"** → **Finish**

7. **Wait for build** → **Click "locate"** when done

### Method 2: Using Gradle (Terminal)

1. **Generate bundle first:**
   ```powershell
   cd android
   .\gradlew bundleRelease
   ```

2. **Or build APK directly:**
   ```powershell
   .\gradlew assembleRelease
   ```

3. **Find APK:**
   - `android/app/build/outputs/apk/release/app-release.apk`

---

## 🔍 Diagnostic Steps

### Step 1: Check Build Output

1. **View → Tool Windows → Build**
2. **Look for red errors**
3. **Copy the exact error message**

### Step 2: Check Gradle Sync

1. **File → Sync Project with Gradle Files**
2. **Wait for sync**
3. **Check for errors**

### Step 3: Check build.gradle

1. **Open:** `android/app/build.gradle`
2. **Check:** `buildTypes { release {`
3. **Verify configuration is correct**

---

## 📋 Common Error Messages & Fixes

### Error: "Task :app:bundleReleaseJsAndAssets FAILED"

**Fix:**
```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
npx expo export --platform android
cd android
.\gradlew assembleRelease
```

### Error: "Signing config not found"

**Fix:**
Add to `android/app/build.gradle`:
```gradle
android {
    buildTypes {
        release {
            signingConfig signingConfigs.debug
            // ... other config
        }
    }
}
```

### Error: "Cannot find module"

**Fix:**
1. **Clean build:**
   ```powershell
   cd android
   .\gradlew clean
   ```
2. **Rebuild:**
   ```powershell
   .\gradlew assembleRelease
   ```

### Error: "Out of memory"

**Fix:**
1. **Open:** `android/gradle.properties`
2. **Add:**
   ```properties
   org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
   ```

---

## 🎯 Quick Fix: Use Debug APK with Bundle

If release build keeps failing, use debug APK but generate bundle:

1. **Generate bundle:**
   ```powershell
   cd "B:\VAN Sales Netzor Subscription\mobile-app"
   npx expo export --platform android
   ```

2. **Build debug APK:**
   - **Build Variants → debug**
   - **Build → Build APK(s)**

3. **Debug APK will include bundle** (if export worked)

---

## 📝 What to Share

To help diagnose, please share:
1. **Exact error message** from Build tab
2. **Which step failed** (e.g., "bundleRelease", "assembleRelease")
3. **Full error text** (copy from Build tab)

---

## ✅ Success Indicators

Release build succeeds when:
- ✅ "BUILD SUCCESSFUL" in Build tab
- ✅ APK file created in `android/app/build/outputs/apk/release/`
- ✅ No red errors in Build tab

---

## 💡 Pro Tips

1. **Always clean before release build**
2. **Check Build tab for exact error**
3. **Use Generate Signed Bundle/APK** - Handles signing automatically
4. **Export bundle first** if using Expo

---

## 🆘 Still Failing?

**Share:**
1. Exact error message from Build tab
2. Screenshot of error (if possible)
3. What step it failed on

**Then I can provide specific fix!**

Good luck! 🚀

