# Fix: Infinite Recursion in RLS Policies

## Problem
Error: "infinite recursion detected in policy for relation 'users'"

This happens when RLS policies on the `users` table try to query the `users` table itself, creating a circular dependency.

## Solution

### Step 1: Run the Fix Script

1. Go to Supabase → **SQL Editor**
2. Open file: `scripts/fix-rls-policies.sql`
3. Copy ALL content
4. Paste in SQL Editor
5. Click **"Run"**

### Step 2: Verify Fix

1. Go to: http://localhost:3000/test-connection
2. Should now show: ✅ **Connection Successful!**

## What Changed

The fix removes policies that query the `users` table from within `users` table policies. Instead:

- ✅ Users can read their own profile (using `auth.uid()` directly)
- ✅ All authenticated users can read users (admin checks done in app code)
- ✅ Admin operations use service_role key (server-side, bypasses RLS)

## Alternative: Temporary Fix (Development Only)

If you need a quick fix for development:

```sql
-- Temporarily disable RLS on users table (DEVELOPMENT ONLY!)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

**⚠️ Warning**: Only use this for development. Re-enable RLS before production!

## After Fix

Your connection test should work, and you can proceed with building your application.

