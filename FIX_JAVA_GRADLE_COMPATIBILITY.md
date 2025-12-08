# 🔧 Fix Java/Gradle Compatibility Issue

## ❌ Error: Java 21 incompatible with Gradle 8.3

**Problem:**
- Java 21.0.8 is installed
- Gradle 8.3 requires Java 17 or below
- Java 21 is too new for Gradle 8.3

**Solution:** Use Java 17 (recommended for Expo SDK 50)

---

## 🚀 Quick Fix: Change Java Version in Android Studio

### Step 1: Download Java 17 (if not installed)

1. **File → Project Structure → SDK Location**
2. Check if JDK 17 is listed
3. If not:
   - **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
   - **Gradle JDK → Download JDK**
   - Select **JDK 17** (or **17.0.x**)
   - Click **Download**
   - Wait for download

### Step 2: Set Java 17 for Project

**Method 1: Project Level**

1. **File → Project Structure → Project**
2. **SDK:** Select **JDK 17** (or **17.0.x**)
3. Click **OK**

**Method 2: Gradle Level (Recommended)**

1. **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
2. **Gradle JDK:** Select **JDK 17** (or **17.0.x**)
3. Click **Apply** → **OK**

### Step 3: Sync Project

1. **File → Sync Project with Gradle Files**
2. Or click **Sync Now** if prompted
3. Wait for sync to complete

---

## 🔄 Alternative: Upgrade Gradle (If You Want Java 21)

If you prefer to keep Java 21, upgrade Gradle instead:

### Step 1: Update Gradle Version

1. Open `android/gradle/wrapper/gradle-wrapper.properties`
2. Find line: `distributionUrl=...gradle-8.3-all.zip`
3. Change to: `distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-all.zip`
4. Save file

### Step 2: Sync Project

1. **File → Sync Project with Gradle Files**
2. Wait for Gradle 8.5 to download and sync

**Note:** Expo SDK 50 is tested with Gradle 8.3, so Java 17 is the safer choice.

---

## ✅ Recommended Solution: Use Java 17

**Why Java 17?**
- ✅ Compatible with Gradle 8.3 (used by Expo SDK 50)
- ✅ Stable and well-tested
- ✅ Recommended by Expo
- ✅ No Gradle upgrade needed

**Steps:**
1. Download JDK 17 in Android Studio (if needed)
2. Set Gradle JDK to 17
3. Sync project
4. Build should work!

---

## 📋 Verification

After changing to Java 17:

1. **File → Project Structure → SDK Location**
2. Check **JDK location** shows Java 17
3. **File → Settings → Build Tools → Gradle**
4. Check **Gradle JDK** shows Java 17
5. **File → Sync Project with Gradle Files**
6. Should sync without errors

---

## 🆘 Still Having Issues?

### Error: "JDK 17 not found"

**Solution:**
1. **File → Settings → Build Tools → Gradle**
2. **Gradle JDK → Download JDK**
3. Select **JDK 17**
4. Click **Download**
5. Wait for installation
6. Select it from dropdown

### Error: "Gradle sync still fails"

**Solution:**
1. **File → Invalidate Caches → Invalidate and Restart**
2. After restart, set Java 17 again
3. Sync project

### Check Current Java Version

**In Android Studio Terminal:**
```powershell
java -version
```

Should show: `openjdk version "17.x.x"`

---

## 💡 Pro Tip

**For Expo projects, always use Java 17:**
- Expo SDK 50 = Gradle 8.3 = Java 17
- This is the tested and recommended combination

---

## ✅ After Fix

Once Java 17 is set:
1. ✅ Gradle sync should complete
2. ✅ Build should work
3. ✅ You can run the app!

Good luck! 🚀

