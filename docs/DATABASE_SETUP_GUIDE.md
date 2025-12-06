# Database Setup Guide - Step by Step

This guide will walk you through setting up the complete database schema in Supabase for the Field Sales & Automatic Invoicing System.

## Prerequisites

1. A Supabase account (free tier works perfectly)
2. A Supabase project created
3. Access to your Supabase project dashboard

---

## Step 1: Create Supabase Account & Project

### 1.1 Sign Up / Sign In

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"** if you already have an account
3. Sign in with GitHub, Google, or email

### 1.2 Create New Project

1. Once logged in, click **"New Project"** button (usually in the top right or on the dashboard)
2. Fill in the project details:
   - **Name**: `van-sales-netzor` (or any name you prefer)
   - **Database Password**: Create a strong password (save this securely!)
   - **Region**: Choose the closest region to your users (e.g., `Southeast Asia (Singapore)` for India)
   - **Pricing Plan**: Select **"Free"** (perfect for development and small teams)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be provisioned

---

## Step 2: Access SQL Editor

1. In your Supabase project dashboard, look at the left sidebar
2. Click on **"SQL Editor"** (it has a database icon)
3. You'll see a blank SQL editor window

---

## Step 3: Open the Setup Script

1. In your local project, navigate to: `scripts/setup-database.sql`
2. Open the file in any text editor (VS Code, Notepad++, etc.)
3. **Select ALL** the content (Ctrl+A or Cmd+A)
4. **Copy** the entire content (Ctrl+C or Cmd+C)

**OR** you can view it directly:
- The file is located at: `B:\VAN Sales Netzor Subscription\scripts\setup-database.sql`
- Open it with any text editor

---

## Step 4: Paste and Run the Script

### 4.1 Paste the SQL Script

1. Go back to Supabase SQL Editor
2. Click in the SQL editor text area
3. **Paste** the entire script (Ctrl+V or Cmd+V)
4. You should see a long SQL script with:
   - CREATE EXTENSION statements
   - CREATE TYPE statements (for enums)
   - CREATE TABLE statements (for all tables)
   - CREATE INDEX statements
   - CREATE FUNCTION and TRIGGER statements

### 4.2 Review the Script (Optional but Recommended)

The script will create:
- **Extensions**: UUID generation
- **Enum Types**: user_role, order_status, payment_mode, etc.
- **Tables**: users, hubs, customers, products, orders, invoices, payments, etc.
- **Indexes**: For better query performance
- **Triggers**: Auto-update timestamps
- **Row Level Security**: Enabled on all tables

### 4.3 Run the Script

1. Look at the bottom right of the SQL Editor
2. Click the **"Run"** button (or press `Ctrl+Enter`)
3. Wait for execution to complete (usually 10-30 seconds)

### 4.4 Verify Success

You should see:
- ✅ **Success message**: "Success. No rows returned"
- ✅ **Execution time**: Usually shows in milliseconds
- ✅ **No errors** in red

If you see errors:
- Check the error message
- Common issues:
  - Extension already exists (safe to ignore)
  - Type already exists (safe to ignore)
  - Table already exists (if running twice)

---

## Step 5: Verify Tables Were Created

### 5.1 Check Table Browser

1. In Supabase dashboard, click **"Table Editor"** in the left sidebar
2. You should see all the tables listed:
   - `users`
   - `hubs`
   - `customers`
   - `products`
   - `orders`
   - `invoices`
   - `payments`
   - `inventory`
   - `routes`
   - `attendance`
   - `location_tracking`
   - `product_returns`
   - `credit_notes`
   - `sync_queue`
   - `audit_logs`
   - And more...

### 5.2 Verify with SQL Query

1. Go back to **SQL Editor**
2. Run this query to count tables:

```sql
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

You should see all your tables with their column counts.

---

## Step 6: Set Up Row Level Security (RLS) Policies

The script enables RLS but doesn't create policies. You need to create policies for data access.

### 6.1 Basic RLS Policies

Run this in SQL Editor to create basic policies:

```sql
-- Allow users to read their own user record
CREATE POLICY "Users can read own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Allow admins to read all users
CREATE POLICY "Admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Allow admins to manage all users
CREATE POLICY "Admins can manage all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow authenticated users to read products
CREATE POLICY "Authenticated users can read products" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins and hub managers to manage products
CREATE POLICY "Admins and hub managers can manage products" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- Allow salesmen to read customers in their routes
CREATE POLICY "Salesmen can read route customers" ON customers
    FOR SELECT USING (
        route_id IN (
            SELECT route_id FROM routes
            WHERE assigned_user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- Allow salesmen to create orders
CREATE POLICY "Salesmen can create orders" ON orders
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Allow users to read their own orders
CREATE POLICY "Users can read own orders" ON orders
    FOR SELECT USING (user_id = auth.uid());

-- Allow admins and managers to read all orders
CREATE POLICY "Admins can read all orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Similar policies for other tables...
-- Add more policies as needed based on your access requirements
```

**Note**: These are basic policies. You'll need to create comprehensive policies for all tables based on your business logic.

---

## Step 7: Get Your API Credentials

You'll need these for your application:

1. Go to **Settings** (gear icon) → **API**
2. Copy the following:

### For Admin Web Portal (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### For Mobile App (`.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Service Role Key (Keep Secret!)
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
⚠️ **Warning**: Never expose the service role key in client-side code!

---

## Step 8: Create Your First Admin User

### 8.1 Create User via Supabase Auth

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: `admin@netzor.com` (or your admin email)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**
5. Copy the **User UID** (you'll need this)

### 8.2 Update User Role in Database

1. Go to **SQL Editor**
2. Run this query (replace `USER_UID_HERE` with the actual UID):

```sql
-- Insert user record with admin role
INSERT INTO users (id, name, email, phone, role, is_active)
VALUES (
    'USER_UID_HERE',  -- Replace with actual UID from Auth
    'Admin User',
    'admin@netzor.com',
    '+919999999999',  -- Replace with actual phone
    'admin',
    true
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin', is_active = true;
```

**OR** if the user already exists in the users table:

```sql
-- Update existing user to admin
UPDATE users 
SET role = 'admin', is_active = true
WHERE email = 'admin@netzor.com';
```

---

## Step 9: Test Database Connection

### 9.1 Test from Admin Web Portal

1. Make sure you've set up `.env.local` in `admin-web/`
2. Run: `cd admin-web && npm run dev`
3. Check browser console for connection errors

### 9.2 Test with SQL Query

Run this in SQL Editor to test:

```sql
-- Test query
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count
FROM users;
```

---

## Troubleshooting

### Error: "extension already exists"
- **Solution**: This is normal if running the script multiple times. Safe to ignore.

### Error: "type already exists"
- **Solution**: The enum types already exist. Safe to ignore or comment out those lines.

### Error: "table already exists"
- **Solution**: Tables are already created. You can:
  - Drop tables first: `DROP TABLE IF EXISTS table_name CASCADE;`
  - Or comment out CREATE TABLE statements

### Error: "permission denied"
- **Solution**: Make sure you're using the SQL Editor (has full permissions), not a restricted user.

### Tables not showing in Table Editor
- **Solution**: Refresh the page or check if you're in the correct project.

### RLS blocking all queries
- **Solution**: Create RLS policies (Step 6) before testing queries.

---

## Next Steps

After database setup:

1. ✅ **Configure Environment Variables**: Add Supabase credentials to your apps
2. ✅ **Set Up Authentication**: Configure Supabase Auth settings
3. ✅ **Create RLS Policies**: Set up comprehensive access control
4. ✅ **Add Initial Data**: 
   - Create hubs/warehouses
   - Add products
   - Add customers
   - Create routes
5. ✅ **Test Application**: Verify admin portal and mobile app can connect

---

## Quick Reference

### Important Supabase URLs:
- **Dashboard**: `https://app.supabase.com/project/YOUR_PROJECT_ID`
- **API Docs**: `https://app.supabase.com/project/YOUR_PROJECT_ID/api`
- **SQL Editor**: `https://app.supabase.com/project/YOUR_PROJECT_ID/sql`

### Key Files:
- **Database Script**: `scripts/setup-database.sql`
- **Schema Docs**: `docs/DATABASE_SCHEMA.md`
- **Setup Guide**: `docs/SETUP_GUIDE.md`

---

## Support

If you encounter issues:
1. Check Supabase logs: **Logs** → **Postgres Logs**
2. Review error messages in SQL Editor
3. Verify all environment variables are set correctly
4. Check Supabase status: [status.supabase.com](https://status.supabase.com)

---

**Congratulations!** 🎉 Your database is now set up and ready to use!


