# 🔐 Set Environment Variables - Correct Commands

## The Issue

The command needs to specify which **environment** to use (preview, production, etc.)

---

## ✅ Correct Commands

Run these commands **one by one**:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# 1. Set Supabase URL for preview environment
eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --scope project --type string --environment preview

# 2. Set Supabase Anon Key for preview environment
eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY" --scope project --type string --environment preview

# 3. Verify variables
eas env:list

# 4. Rebuild
eas build --platform android --profile preview
```

---

## Alternative: Interactive Mode

If the above doesn't work, use interactive mode:

```powershell
# 1. Set Supabase URL (interactive)
eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --scope project --type string

# When prompted:
# - Visibility: Select "Plain text"
# - Environment: Select "preview" (or press Enter for all)

# 2. Set Supabase Anon Key (interactive)
eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY" --scope project --type string

# When prompted:
# - Visibility: Select "Plain text"
# - Environment: Select "preview" (or press Enter for all)
```

---

## Quick Copy-Paste (With Environment)

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"
eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --scope project --type string --environment preview
eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY" --scope project --type string --environment preview
eas build --platform android --profile preview
```

---

## When Using Interactive Mode

When you see:
```
√ Select visibility: » Plain text
√ Select environment: »
```

**For environment**, you can:
- Type `preview` and press Enter (for preview builds)
- Or just press Enter (for all environments - recommended)

---

**Try the commands with `--environment preview` added!** 🚀

