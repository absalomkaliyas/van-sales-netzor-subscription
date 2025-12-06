# 🔐 Set EAS Secrets - Run These Commands

## Quick Setup

Run these commands **one by one** in your terminal:

```powershell
cd "B:\VAN Sales Netzor Subscription\mobile-app"

# 1. Set Supabase URL
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://lhledsnjzovhamddrjas.supabase.co" --type string

# 2. Set Supabase Anon Key
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI3NTMsImV4cCI6MjA4MDQyODc1M30.sNadPpNI1Sbno8Fxnx1FKY4s_xhau95T0PicfFEUUFY" --type string

# 3. Verify secrets are set
eas secret:list

# 4. Rebuild
eas build --platform android --profile preview
```

---

## What Each Command Does

1. **First command**: Sets your Supabase URL
2. **Second command**: Sets your Supabase anon key
3. **Third command**: Lists all secrets to verify they're set
4. **Fourth command**: Rebuilds the APK with the secrets

---

## Expected Output

After running the first two commands, you should see:
```
✔ Created secret EXPO_PUBLIC_SUPABASE_URL
✔ Created secret EXPO_PUBLIC_SUPABASE_ANON_KEY
```

---

## After Setting Secrets

Once secrets are set, run the build again:

```powershell
eas build --platform android --profile preview
```

This time it should succeed! 🎉

---

## Troubleshooting

### "Secret already exists"
- That's OK! It means it's already set
- Just run the build command

### "Not logged in"
- Run: `eas login`
- Then try again

---

**Copy and paste these commands into your terminal!** 🚀


