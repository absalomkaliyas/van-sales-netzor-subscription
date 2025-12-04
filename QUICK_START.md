# Quick Start Guide

Get up and running with the Field Sales & Automatic Invoicing System in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
# Root level
npm install

# Admin Web
cd admin-web && npm install && cd ..

# Mobile App
cd mobile-app && npm install && cd ..
```

### 2. Set Up Supabase (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run `scripts/setup-database.sql`
4. Copy your project URL and API keys from Settings → API

### 3. Configure Environment

**Admin Web** (`admin-web/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_COMPANY_NAME=NETZOR
```

**Mobile App** (`mobile-app/.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development Servers

**Admin Portal:**
```bash
cd admin-web
npm run dev
# Open http://localhost:3000
```

**Mobile App:**
```bash
cd mobile-app
npm start
# Scan QR code with Expo Go app
```

## ✅ What's Included

- ✅ Complete database schema (PostgreSQL/Supabase)
- ✅ Admin web portal foundation (Next.js 14)
- ✅ Mobile app foundation (React Native/Expo)
- ✅ Shared TypeScript types
- ✅ Offline-first architecture setup
- ✅ Free hosting configuration (Vercel + Supabase)

## 📋 Next Steps

1. **Create Admin User**: Use Supabase Auth to create first admin user
2. **Add Company Logo**: Place logo at `admin-web/public/logo.png`
3. **Configure RLS Policies**: Set up Row Level Security in Supabase
4. **Add Initial Data**: Products, customers, hubs, routes
5. **Test Offline Sync**: Verify mobile app offline functionality

## 📚 Documentation

- Full setup guide: `docs/SETUP_GUIDE.md`
- Database schema: `docs/DATABASE_SCHEMA.md`
- Project specification: `PROJECT_SPEC.md`

## 🆘 Need Help?

- Check `docs/SETUP_GUIDE.md` for detailed instructions
- Review error messages in terminal
- Verify environment variables are set correctly

## 🎯 Features Ready to Build

The foundation is set! You can now build:
- Product catalog management
- Order & invoice generation
- Stock management
- Route planning
- Payment collection
- Location tracking
- Reports & analytics
- Tally ERP integration

Happy coding! 🚀

