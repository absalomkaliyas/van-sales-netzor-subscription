# Get Your Supabase API Keys - Quick Guide

## Your Supabase Project URL
✅ **Project URL**: `https://lhledsnjzovhamddrjas.supabase.co`

## Next: Get Your API Keys

### Step 1: Go to API Settings

1. Open: https://app.supabase.com
2. Select your project (the one with URL: `lhledsnjzovhamddrjas`)
3. Click **Settings** (⚙️ icon) in left sidebar
4. Click **API** in the settings menu

### Step 2: Copy These 3 Values

You'll see a section called **"Project API keys"**:

#### 1. Project URL (You already have this!)
```
https://lhledsnjzovhamddrjas.supabase.co
```

#### 2. anon public key
- Look for **"anon"** or **"public"** key
- It will be a very long string starting with `eyJ...`
- Example format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMDAwMDAsImV4cCI6MjAyNTU3NjAwMH0.xxxxx`
- **Copy this entire long string**

#### 3. service_role key
- Look for **"service_role"** key
- Also starts with `eyJ...` and is very long
- ⚠️ **Keep this secret!** Only use server-side
- **Copy this entire long string**

---

## What to Look For

In the Supabase API settings page, you should see:

```
Project API keys
┌─────────────────────────────────────────┐
│ anon public                             │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← Copy this
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ service_role                            │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← Copy this (keep secret!)
└─────────────────────────────────────────┘
```

---

## After You Get the Keys

Once you have all 3 values:
1. Project URL: `https://lhledsnjzovhamddrjas.supabase.co`
2. anon public key: `eyJ...` (long string)
3. service_role key: `eyJ...` (long string)

I'll help you set up the environment variables!

---

## Quick Access Link

You can also go directly to:
**Settings → API** in your Supabase project dashboard

---

**Tip**: The keys are very long (200+ characters). Make sure you copy the entire key!


