# Database Setup - Quick Reference Card

## 🚀 5-Minute Setup

### Step 1: Supabase Project
```
1. Go to: https://supabase.com
2. Sign in / Sign up
3. Click "New Project"
4. Fill details → Create
5. Wait 2-3 minutes
```

### Step 2: Open SQL Editor
```
1. In Supabase Dashboard
2. Click "SQL Editor" (left sidebar)
3. Click "New query"
```

### Step 3: Copy & Paste Script
```
1. Open: scripts/setup-database.sql
2. Select All (Ctrl+A)
3. Copy (Ctrl+C)
4. Paste in SQL Editor (Ctrl+V)
```

### Step 4: Run Script
```
1. Click "Run" button (bottom right)
2. OR Press Ctrl+Enter
3. Wait for "Success" message
```

### Step 5: Verify
```
1. Click "Table Editor" (left sidebar)
2. See all tables listed
3. Done! ✅
```

---

## 📋 What Gets Created

### Tables (20+)
- `users` - User accounts
- `hubs` - Warehouses & sub-hubs
- `customers` - Shops/customers
- `products` - Product catalog
- `orders` - Sales orders
- `invoices` - Invoices
- `payments` - Payment records
- `inventory` - Stock inventory
- `routes` - Sales routes
- `attendance` - Check-in/out
- `location_tracking` - GPS tracking
- `product_returns` - Returns
- `credit_notes` - Credit notes
- `sync_queue` - Offline sync
- `audit_logs` - Audit trail
- And more...

### Features
- ✅ UUID primary keys
- ✅ Enum types for status fields
- ✅ Foreign key relationships
- ✅ Auto-update timestamps
- ✅ Performance indexes
- ✅ Row Level Security enabled

---

## 🔑 Get API Keys

**Location**: Settings → API

```env
# Copy these values:

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (keep secret!)
```

---

## 👤 Create Admin User

### Method 1: Via Supabase Dashboard
```
1. Authentication → Users
2. Add user → Create new user
3. Email: admin@netzor.com
4. Password: [your password]
5. Auto Confirm: ✅
6. Create user
```

### Method 2: Update Role in Database
```sql
-- In SQL Editor, run:
UPDATE users 
SET role = 'admin', is_active = true
WHERE email = 'admin@netzor.com';
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "extension already exists" | ✅ Safe to ignore |
| "type already exists" | ✅ Safe to ignore |
| "table already exists" | Drop table first or ignore |
| "permission denied" | Use SQL Editor (not restricted user) |
| Tables not showing | Refresh page |
| RLS blocking queries | Create RLS policies first |

---

## 🔒 Basic RLS Policies

Run this after database setup:

```sql
-- Allow users to read own profile
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

-- Allow authenticated users to read products
CREATE POLICY "Authenticated users can read products" ON products
    FOR SELECT USING (auth.role() = 'authenticated');
```

---

## ✅ Verification Queries

### Check Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### Check User Count
```sql
SELECT COUNT(*) as total_users FROM users;
```

### Check Admin User
```sql
SELECT name, email, role 
FROM users 
WHERE role = 'admin';
```

---

## 📚 Full Documentation

- **Detailed Guide**: `docs/DATABASE_SETUP_GUIDE.md`
- **Schema Reference**: `docs/DATABASE_SCHEMA.md`
- **SQL Script**: `scripts/setup-database.sql`

---

## 🆘 Need Help?

1. Check Supabase logs: **Logs** → **Postgres Logs**
2. Review error messages in SQL Editor
3. Verify environment variables
4. Check Supabase status: status.supabase.com

---

**Time to Complete**: ~5 minutes  
**Difficulty**: ⭐ Easy  
**Status**: ✅ Ready to use!


