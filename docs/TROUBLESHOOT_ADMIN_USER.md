# Troubleshooting: Admin User Not Found

## Issue: "No rows returned" when checking for admin user

This means either:
1. User doesn't exist in the `users` table
2. User exists but role is not set to 'admin'
3. User was created in Auth but not synced to users table

## Solution Steps

### Step 1: Check if user exists in Supabase Auth

1. Go to Supabase → **Authentication** → **Users**
2. Do you see any users listed?
   - **If YES**: Note the email and User UID
   - **If NO**: Create a user first (see Step 2)

### Step 2: Check if user exists in users table

Run this in SQL Editor:
```sql
SELECT * FROM users;
```

- **If you see users**: Check their email and role
- **If empty**: User needs to be inserted into users table

### Step 3: Insert User into users table

If user exists in Auth but not in users table, run this:

```sql
-- Replace with actual values from Auth
INSERT INTO users (id, name, email, phone, role, is_active)
VALUES (
    'USER_UID_FROM_AUTH',  -- Get from Authentication → Users → User UID
    'Admin User',           -- Or your name
    'admin@netzor.com',    -- Your email from Auth
    '+919999999999',       -- Your phone number
    'admin',
    true
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin', is_active = true;
```

### Step 4: Update existing user role

If user exists in users table but role is not 'admin':

```sql
UPDATE users 
SET role = 'admin', is_active = true
WHERE email = 'your-email@netzor.com';
```

### Step 5: Verify

```sql
SELECT name, email, role, is_active 
FROM users 
WHERE role = 'admin';
```

You should now see your admin user!


