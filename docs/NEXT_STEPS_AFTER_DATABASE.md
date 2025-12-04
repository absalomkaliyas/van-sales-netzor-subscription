# Next Steps After Database Setup ✅

Congratulations! Your database is set up. Here's what to do next:

## ✅ Completed
- [x] Database tables created
- [x] Tables verified in Supabase

---

## 🔒 Step 1: Set Up Row Level Security (RLS) Policies

Your tables have RLS enabled, but you need policies for data access.

### Quick Setup:
1. Open Supabase **SQL Editor**
2. Open file: `scripts/setup-rls-policies.sql`
3. Copy ALL content (Ctrl+A, Ctrl+C)
4. Paste in SQL Editor
5. Click **"Run"**

This creates policies for:
- Users can read their own data
- Admins can manage all data
- Salesmen can access their routes/customers
- And more...

---

## 🔑 Step 2: Get Your API Credentials

You'll need these for your applications:

1. In Supabase Dashboard, go to **Settings** (⚙️ icon) → **API**
2. Copy these values:

### For Admin Web Portal (`admin-web/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### For Mobile App (`mobile-app/.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Keep `SUPABASE_SERVICE_ROLE_KEY` secret! Never expose it in client-side code.

---

## 👤 Step 3: Create Your First Admin User

### Method 1: Via Supabase Dashboard (Easiest)

1. Go to **Authentication** → **Users** in Supabase
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: `admin@netzor.com` (or your email)
   - **Password**: Create a strong password
   - ✅ **Auto Confirm User**: Check this box
4. Click **"Create user"**
5. **Copy the User UID** (you'll see it in the user list)

### Method 2: Update User Role in Database

1. Go to **SQL Editor** in Supabase
2. Run this query (replace `USER_UID_HERE` with the actual UID from Step 1):

```sql
-- Insert admin user record
INSERT INTO users (id, name, email, phone, role, is_active)
VALUES (
    'USER_UID_HERE',  -- Replace with actual UID
    'Admin User',
    'admin@netzor.com',  -- Replace with your email
    '+919999999999',  -- Replace with your phone
    'admin',
    true
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin', is_active = true;
```

**OR** if user already exists:

```sql
-- Update existing user to admin
UPDATE users 
SET role = 'admin', is_active = true
WHERE email = 'admin@netzor.com';  -- Replace with your email
```

---

## ⚙️ Step 4: Configure Environment Variables

### Admin Web Portal

1. Navigate to `admin-web` folder
2. Create `.env.local` file (copy from `.env.example` if exists)
3. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=NETZOR
NEXT_PUBLIC_COMPANY_LOGO=/logo.png
```

### Mobile App

1. Navigate to `mobile-app` folder
2. Create `.env` file
3. Add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 📦 Step 5: Install Dependencies

### Root Level
```bash
npm install
```

### Admin Web Portal
```bash
cd admin-web
npm install
```

### Mobile App
```bash
cd mobile-app
npm install
```

---

## 🚀 Step 6: Test Your Setup

### Test Admin Web Portal

1. Navigate to `admin-web` folder
2. Run:
   ```bash
   npm run dev
   ```
3. Open browser: http://localhost:3000
4. You should see the admin portal homepage

### Test Mobile App

1. Navigate to `mobile-app` folder
2. Run:
   ```bash
   npm start
   ```
3. Scan QR code with Expo Go app (or press `a` for Android, `i` for iOS)

---

## 📊 Step 7: Add Initial Data (Optional but Recommended)

Once your apps are running, you can add:

### 1. Create a Hub/Warehouse

```sql
-- In Supabase SQL Editor
INSERT INTO hubs (name, address, city, state, pincode, is_warehouse)
VALUES (
    'Main Warehouse',
    '123 Warehouse Street',
    'Mumbai',
    'Maharashtra',
    '400001',
    true
)
RETURNING id;
```

### 2. Create a Product

```sql
INSERT INTO products (sku, name, hsn_code, gst_rate, unit, pack_size)
VALUES (
    'PROD001',
    'Sample Product',
    '12345678',
    18.00,
    'PCS',
    1.00
);
```

### 3. Create a Price List

```sql
INSERT INTO price_lists (name, is_default)
VALUES ('Standard Price List', true)
RETURNING id;
```

---

## ✅ Verification Checklist

- [ ] RLS policies created and run
- [ ] API credentials copied
- [ ] Admin user created
- [ ] User role set to 'admin'
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Admin web portal runs (localhost:3000)
- [ ] Mobile app runs (Expo)
- [ ] Can connect to Supabase from apps

---

## 🎯 What's Next?

Now you're ready to build:

1. **Authentication System** - Login/logout for admin portal and mobile app
2. **Product Catalog** - Add, edit, manage products
3. **User Management** - Create users, assign roles
4. **Hub Management** - Set up warehouses and sub-hubs
5. **Customer Management** - Add shops/customers
6. **Order & Invoice System** - Create orders and generate invoices
7. **Stock Management** - Track inventory
8. **Route Management** - Create and assign routes
9. **Payment Collection** - Record payments
10. **Reports & Analytics** - View sales reports

---

## 🆘 Troubleshooting

### Can't connect to Supabase?
- Verify environment variables are set correctly
- Check Supabase project is active
- Verify API keys are correct

### RLS blocking queries?
- Make sure RLS policies are created
- Check user role is set correctly
- Verify authentication is working

### Apps not starting?
- Check Node.js version (should be 18+)
- Verify all dependencies installed
- Check for error messages in terminal

---

## 📚 Resources

- **Database Schema**: `docs/DATABASE_SCHEMA.md`
- **Setup Guide**: `docs/SETUP_GUIDE.md`
- **Quick Start**: `QUICK_START.md`
- **Supabase Docs**: https://supabase.com/docs

---

**You're all set! 🎉 Start building your Field Sales System!**

