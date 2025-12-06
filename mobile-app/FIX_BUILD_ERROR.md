# 🔧 Fix Build Error - Missing Environment Variables

## The Problem

The build failed because the app needs Supabase environment variables, but they're not configured for EAS Build.

**Error**: "Unknown error. See logs of the Read app config build phase"

---

## ✅ Solution: Set Environment Variables in EAS

### Step 1: Get Your Supabase Credentials

You need:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

These should be in your `.env` file or you can get them from Supabase dashboard.

### Step 2: Set EAS Secrets

Run these commands in your terminal:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# Set Supabase URL
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "YOUR_SUPABASE_URL" --type string

# Set Supabase Anon Key
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "YOUR_SUPABASE_ANON_KEY" --type string
```

**Replace:**
- `YOUR_SUPABASE_URL` with your actual Supabase URL (e.g., `https://xxxxx.supabase.co`)
- `YOUR_SUPABASE_ANON_KEY` with your actual Supabase anon key

### Step 3: Update eas.json

Make sure your `eas.json` includes environment variables:

```json
{
  "build": {
    "preview": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": ""
      }
    }
  }
}
```

---

## Alternative: Quick Fix - Update eas.json

If you prefer to set them directly in `eas.json` (less secure but works):

1. Open `mobile-app/eas.json`
2. Add environment variables to the preview profile
3. Rebuild

---

## Step-by-Step Fix

### Option A: Use EAS Secrets (Recommended)

```powershell
# 1. Navigate to mobile app
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# 2. Set Supabase URL (replace with your actual URL)
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --type string

# 3. Set Supabase Anon Key (replace with your actual key)
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "YOUR_ANON_KEY_HERE" --type string

# 4. Rebuild
eas build --platform android --profile preview
```

### Option B: Update eas.json Directly

1. Open `mobile-app/eas.json`
2. Update it to include env variables (see below)
3. Rebuild

---

## Updated eas.json

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://lhledsnjzovhamddrjas.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "YOUR_ANON_KEY_HERE"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://lhledsnjzovhamddrjas.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "YOUR_ANON_KEY_HERE"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://lhledsnjzovhamddrjas.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "YOUR_ANON_KEY_HERE"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

**Replace `YOUR_ANON_KEY_HERE` with your actual Supabase anon key!**

---

## After Fixing

Run the build again:

```powershell
eas build --platform android --profile preview
```

---

## Get Your Supabase Credentials

If you don't have them:

1. Go to https://supabase.com
2. Login to your project
3. Go to Settings → API
4. Copy:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

---

## Quick Fix Commands

```powershell
# Set secrets (replace with your actual values)
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --type string
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "YOUR_KEY" --type string

# Rebuild
eas build --platform android --profile preview
```

---

**After setting the environment variables, the build should succeed!** 🚀


