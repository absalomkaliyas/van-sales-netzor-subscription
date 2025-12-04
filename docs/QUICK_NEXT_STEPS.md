# Quick Next Steps - After RLS Policies ✅

Great! You've completed:
- ✅ Database tables created
- ✅ RLS policies set up

## 🎯 What's Next (5 Steps)

### Step 1: Get API Credentials (2 minutes)

1. In Supabase Dashboard → **Settings** (⚙️) → **API**
2. Copy these 3 values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 2: Create Admin User (3 minutes)

1. Go to **Authentication** → **Users** → **Add user**
2. Fill:
   - Email: `admin@netzor.com`
   - Password: [your password]
   - ✅ Auto Confirm User
3. Click **Create user**
4. Copy the **User UID** (you'll see it)

5. Go to **SQL Editor** and run:
```sql
UPDATE users 
SET role = 'admin', is_active = true
WHERE email = 'admin@netzor.com';
```

### Step 3: Configure Environment Variables (5 minutes)

#### Admin Web (`admin-web/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_COMPANY_NAME=NETZOR
```

#### Mobile App (`mobile-app/.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=your_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Install Dependencies (5 minutes)

```bash
# Root
npm install

# Admin Web
cd admin-web
npm install

# Mobile App
cd ../mobile-app
npm install
```

### Step 5: Test Applications (2 minutes)

#### Test Admin Portal:
```bash
cd admin-web
npm run dev
```
Open: http://localhost:3000

#### Test Mobile App:
```bash
cd mobile-app
npm start
```
Scan QR with Expo Go app

---

## ✅ Checklist

- [ ] API credentials copied
- [ ] Admin user created
- [ ] User role set to 'admin'
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Admin portal runs
- [ ] Mobile app runs

---

## 🚀 Ready to Build!

Once these are done, you can start building:
- Authentication system
- Product catalog
- User management
- Order & invoicing
- Stock management
- And more!

---

**Need help?** Check `docs/NEXT_STEPS_AFTER_DATABASE.md` for detailed instructions.

