# ⚡ Codemagic Quick Start (5 Minutes)

## 🎯 Fastest Way to Get Your APK

### 1️⃣ Sign Up (1 min)
👉 https://codemagic.io/signup
- Click "Sign up with GitHub"
- Authorize access

### 2️⃣ Add App (1 min)
- Click "Add application"
- Select: `van-sales-netzor-subscription`
- Click "Finish"

### 3️⃣ Add Secrets (2 min)
Go to: **Environment variables** tab

**Add these 2 variables:**

| Name | Value |
|------|-------|
| `EXPO_PUBLIC_SUPABASE_URL` | `https://lhledsnjzovhamddrjas.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | (Your Supabase anon key) |

### 4️⃣ Build (1 min)
- Click "Start new build"
- Branch: `main`
- Workflow: `android-workflow`
- Click "Start new build"

### 5️⃣ Download (10-15 min wait)
- Wait for build to complete ✅
- Click build → "Artifacts" tab
- Download `app-release.apk`

### 6️⃣ Install
- Transfer APK to phone
- Open and install
- Done! 🎉

---

## 📍 Where to Get Supabase Key

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: **Settings** → **API**
4. Copy: **anon/public** key

---

## ✅ That's It!

**Total time: ~20 minutes** (including build wait)

**Need detailed steps?** See `CODEMAGIC_SETUP.md`

