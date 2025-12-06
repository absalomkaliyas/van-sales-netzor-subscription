# Troubleshooting Login Issues

## Common Issues and Solutions

### Issue 1: User Doesn't Exist in Supabase Auth

**Problem**: User exists in `users` table but not in Supabase Authentication.

**Solution**: Create the user in Supabase Auth:

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: `absalomkaliyas@gmail.com`
   - **Password**: (create a password)
   - ✅ **Auto Confirm User**: Check this
4. Click **"Create user"**

### Issue 2: Wrong Password

**Solution**: 
- Reset password in Supabase Dashboard → Authentication → Users
- Or create a new user with a known password

### Issue 3: RLS Policies Blocking

**Problem**: Row Level Security might be blocking the query to `users` table.

**Solution**: Check RLS policies allow authenticated users to read their own data.

### Issue 4: Browser Console Errors

**Check**: Open browser Developer Tools (F12) → Console tab
- Look for error messages
- Check network tab for failed requests

### Issue 5: Environment Variables

**Check**: Verify `.env.local` has correct values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://lhledsnjzovhamddrjas.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

---

## Quick Test

1. **Check if user exists in Auth**:
   - Supabase Dashboard → Authentication → Users
   - Should see your email listed

2. **Test login directly in Supabase**:
   - Try logging in via Supabase Dashboard
   - If that works, the issue is in the app code
   - If that doesn't work, the issue is with the user account

3. **Check browser console**:
   - Open F12 → Console
   - Try logging in
   - Look for error messages

---

## Debug Steps

1. Open browser console (F12)
2. Try to login
3. Check for errors in console
4. Check Network tab for failed requests
5. Share the error message for help

---

## Quick Fix: Create User in Auth

If user doesn't exist in Supabase Auth:

1. Supabase Dashboard → Authentication → Users
2. Add user → Create new user
3. Email: `absalomkaliyas@gmail.com`
4. Password: (your password)
5. Auto Confirm: ✅
6. Create user

Then try logging in again!


