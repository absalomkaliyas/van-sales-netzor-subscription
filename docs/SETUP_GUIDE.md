# Setup Guide - Field Sales & Automatic Invoicing System

This guide will help you set up the complete system for development and deployment.

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **Supabase Account** (Free tier) - [Sign up](https://supabase.com)
4. **Expo CLI** (for mobile app) - Install with `npm install -g expo-cli`
5. **Vercel Account** (for web deployment) - [Sign up](https://vercel.com) (optional)

## Step 1: Clone and Install Dependencies

```bash
# Clone the repository (if not already done)
git clone https://github.com/absalomkaliyas/van-sales-netzor-subscription.git
cd van-sales-netzor-subscription

# Install root dependencies
npm install

# Install admin web dependencies
cd admin-web
npm install

# Install mobile app dependencies
cd ../mobile-app
npm install
```

## Step 2: Set Up Supabase Database

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for project to be created

2. **Run Database Migration**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Open `scripts/setup-database.sql`
   - Copy and paste the entire SQL script
   - Click "Run" to execute

3. **Get Supabase Credentials**
   - Go to Project Settings → API
   - Copy the following:
     - Project URL (e.g., `https://xxxxx.supabase.co`)
     - `anon` public key
     - `service_role` key (keep this secret!)

## Step 3: Configure Environment Variables

### Admin Web Portal

1. Navigate to `admin-web` directory
2. Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=NETZOR
NEXT_PUBLIC_COMPANY_LOGO=/logo.png
```

### Mobile App

1. Navigate to `mobile-app` directory
2. Create `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Set Up Row Level Security (RLS) Policies

In Supabase SQL Editor, create policies for data access. Example policies:

```sql
-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Allow admins to read all users
CREATE POLICY "Admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Similar policies for other tables...
```

## Step 5: Run Development Servers

### Admin Web Portal

```bash
cd admin-web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Mobile App

```bash
cd mobile-app
npm start
```

Scan the QR code with Expo Go app on your phone, or press `a` for Android emulator, `i` for iOS simulator.

## Step 6: Create Initial Admin User

1. Go to Supabase Dashboard → Authentication
2. Click "Add User" → "Create new user"
3. Set email and password
4. Go to SQL Editor and run:

```sql
-- Update the user's role to admin (replace email with your admin email)
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@netzor.com';
```

## Deployment

### Admin Web Portal (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `admin-web` directory
3. Run `vercel`
4. Follow the prompts
5. Add environment variables in Vercel dashboard

### Mobile App (Expo)

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build: `eas build --platform android` or `eas build --platform ios`

## Next Steps

1. **Configure Company Logo**: Add your company logo to `admin-web/public/logo.png`
2. **Set Up Authentication**: Configure Supabase Auth settings
3. **Create Initial Data**: Add products, customers, hubs, etc.
4. **Test Offline Functionality**: Test mobile app offline sync
5. **Configure Tally Integration**: Set up ERP integration (Phase 2)

## Troubleshooting

### Database Connection Issues
- Verify Supabase credentials in `.env` files
- Check Supabase project is active
- Ensure RLS policies are set correctly

### Mobile App Issues
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Expo Go app is updated

### Build Issues
- Ensure all environment variables are set
- Check Node.js version (should be 18+)
- Review error logs in terminal

## Support

For issues and questions, please refer to:
- Project documentation in `/docs`
- Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Expo documentation: [docs.expo.dev](https://docs.expo.dev)

