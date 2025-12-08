# 🔑 How to Find Your Supabase Anon Key

## Step-by-Step Guide

### Step 1: Go to Supabase Dashboard

1. Open your browser
2. Go to [https://supabase.com](https://supabase.com)
3. Click **"Sign in"** (top right)
4. Log in with your account

### Step 2: Select Your Project

1. After logging in, you'll see your projects list
2. Click on your project: **`van-sales-netzor-subscription`** (or the project name you created)

### Step 3: Go to Project Settings

1. In the left sidebar, click the **⚙️ Settings** icon (gear icon)
2. Click **"API"** (under Project Settings)

### Step 4: Find Your Anon Key

You'll see a section called **"Project API keys"** with two keys:

1. **`anon` `public`** ← This is the one you need!
   - This is your **Anon Key** (also called Public Key)
   - It's safe to use in client-side code
   - Click the **👁️ eye icon** to reveal it
   - Or click **"Copy"** to copy it

2. **`service_role` `secret`** ← Don't use this one!
   - This is your Service Role Key (secret)
   - Keep this private - never expose it

### Step 5: Copy the Key

1. Click the **👁️ eye icon** next to `anon` `public` to reveal the key
2. Click **"Copy"** button (or manually copy the entire key)
3. The key looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long string)

---

## 📋 Quick Visual Guide

```
Supabase Dashboard
  └─ Your Project
      └─ ⚙️ Settings (left sidebar)
          └─ API
              └─ Project API keys
                  └─ anon public ← Click eye icon 👁️ to reveal
                      └─ Copy this key!
```

---

## ✅ What You Need for Codemagic

**Variable Name:** `EXPO_PUBLIC_SUPABASE_ANON_KEY`

**Value:** The long string you copied (starts with `eyJ...`)

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MjAyNzk0MTY3OH0.abc123def456...
```

---

## 🔒 Security Note

- ✅ **Anon Key** is safe to use in mobile apps (it's public)
- ✅ It's already in your `.env` file
- ✅ You can use it in Codemagic environment variables
- ❌ **Service Role Key** should NEVER be exposed

---

## 💡 Alternative: Check Your Local .env File

If you have the project open locally, you can also find it in:

**File:** `mobile-app/.env`

Look for:
```
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Copy the value after the `=` sign (without quotes).

---

## 🆘 Can't Find It?

1. Make sure you're logged into the correct Supabase account
2. Make sure you selected the correct project
3. Check that you're in **Settings → API** (not other settings)
4. The key should be visible after clicking the eye icon 👁️

---

## ✅ Next Step

Once you have the key:
1. Go back to Codemagic
2. Add environment variable: `EXPO_PUBLIC_SUPABASE_ANON_KEY`
3. Paste the key as the value
4. Set Group to: `expo_secrets`
5. Mark as **Secure**: Yes ✅

