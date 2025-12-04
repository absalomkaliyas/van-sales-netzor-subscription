# How to Find Your Supabase API Keys

## 🔍 Where to Find Supabase Keys

### Step 1: Go to Your Supabase Project

1. Log in to [https://app.supabase.com](https://app.supabase.com)
2. Select your project (the one where you created the database)

### Step 2: Navigate to API Settings

1. Click the **Settings** icon (⚙️) in the left sidebar
2. Click **API** in the settings menu

### Step 3: Copy the Keys

You'll see a section called **"Project API keys"** with:

#### 1. Project URL
```
https://xxxxx.supabase.co
```
- This is your `NEXT_PUBLIC_SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_URL`

#### 2. anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU3NjAwMH0.xxxxx
```
- This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- **This is safe to use in client-side code**

#### 3. service_role key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDAwMDAwMCwiZXhwIjoxOTk1NTc2MDAwfQ.xxxxx
```
- This is your `SUPABASE_SERVICE_ROLE_KEY`
- ⚠️ **NEVER expose this in client-side code!** Only use in server-side code.

---

## 📋 What Supabase Keys Look Like

### ✅ Correct Format:
- **Start with**: `eyJ` (JWT token format)
- **Very long**: Usually 200+ characters
- **Contains dots**: `eyJ...xxxxx.xxxxx.xxxxx`
- **Location**: Supabase Dashboard → Settings → API

### ❌ Wrong Format (Not Supabase):
- `sb_publishable_...` → This is **Stripe** (payment gateway)
- `sk_live_...` → This is **Stripe secret key**
- `pk_test_...` → This is **Stripe publishable key**
- Short keys → Usually other services

---

## 🔧 How to Configure Environment Variables

### For Admin Web Portal

Create file: `admin-web/.env.local`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=NETZOR
NEXT_PUBLIC_COMPANY_LOGO=/logo.png
```

### For Mobile App

Create file: `mobile-app/.env`

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎯 Quick Steps

1. **Go to**: https://app.supabase.com
2. **Select**: Your project
3. **Click**: Settings (⚙️) → API
4. **Copy**: 
   - Project URL
   - `anon` public key
   - `service_role` key (keep secret!)
5. **Paste**: Into your `.env.local` or `.env` files

---

## ⚠️ Important Notes

1. **Never commit** `.env.local` or `.env` files to Git (they're in `.gitignore`)
2. **Service Role Key** is powerful - only use server-side
3. **Anon Key** is safe for client-side use
4. **Project URL** should start with `https://` and end with `.supabase.co`

---

## 🔍 Verify Your Keys

After setting up, test the connection:

### In Admin Web (`admin-web/lib/supabase.ts`):
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Test Connection:
```typescript
// In your app
const { data, error } = await supabase.from('users').select('count')
console.log('Connection test:', error ? 'Failed' : 'Success')
```

---

## 🆘 Still Can't Find Keys?

1. **Check**: Are you in the correct Supabase project?
2. **Verify**: Did you create the project successfully?
3. **Look**: Settings → API → Project API keys section
4. **Contact**: Supabase support if keys are missing

---

**Remember**: Supabase keys are JWT tokens starting with `eyJ...` and are very long!

