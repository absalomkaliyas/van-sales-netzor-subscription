# 🔐 Set Environment Variables - Updated Commands

## The Issue

- `eas secret:create` is deprecated
- Use `eas env:create` instead
- `eas.json` should not have empty env values

---

## ✅ Solution: Use EAS Environment Variables

### Step 1: Set Environment Variables

Run these commands **one by one**:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# 1. Set Supabase URL
eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --scope project --type string

# 2. Set Supabase Anon Key
eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY" --scope project --type string

# 3. Verify variables are set
eas env:list

# 4. Rebuild
eas build --platform android --profile preview
```

---

## What Changed

- ✅ Removed empty env values from `eas.json`
- ✅ Using `eas env:create` instead of deprecated `eas secret:create`
- ✅ Environment variables are stored in EAS, not in `eas.json`

---

## Expected Output

After running commands 1 and 2:

```
✔ Created environment variable EXPO_PUBLIC_SUPABASE_URL
✔ Created environment variable EXPO_PUBLIC_SUPABASE_ANON_KEY
```

---

## After Setting Variables

Run the build:

```powershell
eas build --platform android --profile preview
```

This should work now! 🎉

---

## Quick Copy-Paste (All Commands)

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --scope project --type string
eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY" --scope project --type string
eas build --platform android --profile preview
```

---

**Run these updated commands!** 🚀


