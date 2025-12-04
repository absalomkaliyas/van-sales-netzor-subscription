# Environment Variables Setup - Complete! ✅

## ✅ What's Been Configured

### Admin Web Portal (`admin-web/.env.local`)
- ✅ Supabase URL: `https://lhledsnjzovhamddrjas.supabase.co`
- ✅ Anon Public Key: Configured
- ⚠️ Service Role Key: **Needs to be added** (see below)

### Mobile App (`mobile-app/.env`)
- ✅ Supabase URL: `https://lhledsnjzovhamddrjas.supabase.co`
- ✅ Anon Public Key: Configured

---

## ⚠️ Action Required: Add Service Role Key

The **service_role key** is needed for admin operations. Here's how to get it:

### Step 1: Get the Key
1. Go to: https://app.supabase.com
2. Select your project
3. **Settings** (⚙️) → **API**
4. Find **"service_role"** key
5. Copy the entire key (starts with `eyJ...`)

### Step 2: Add to Admin Web
1. Open: `admin-web/.env.local`
2. Find the line: `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here`
3. Replace `your_service_role_key_here` with your actual service_role key
4. Save the file

**Example:**
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobGVkc25qem92aGFtZGRyamFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDg1Mjc1MywiZXhwIjoyMDgwNDI4NzUzfQ.xxxxx
```

---

## 🧪 Test Your Setup

### Test Admin Web Portal

1. Navigate to `admin-web` folder:
   ```bash
   cd admin-web
   ```

2. Install dependencies (if not done):
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser: http://localhost:3000

5. Check browser console for any connection errors

### Test Mobile App

1. Navigate to `mobile-app` folder:
   ```bash
   cd mobile-app
   ```

2. Install dependencies (if not done):
   ```bash
   npm install
   ```

3. Start Expo:
   ```bash
   npm start
   ```

4. Scan QR code with Expo Go app or press `a` for Android / `i` for iOS

---

## 🔍 Verify Connection

### Test Supabase Connection in Admin Portal

You can test the connection by checking the browser console. If you see no errors, the connection is working!

### Manual Test (Optional)

Create a test file `admin-web/app/test-connection/page.tsx`:

```typescript
'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from('users')
        .select('count')
      
      if (error) {
        console.error('Connection failed:', error)
      } else {
        console.log('✅ Connection successful!')
      }
    }
    test()
  }, [])

  return <div>Check browser console for connection status</div>
}
```

Then visit: http://localhost:3000/test-connection

---

## ✅ Checklist

- [x] Admin web `.env.local` created
- [x] Mobile app `.env` created
- [x] Supabase URL configured
- [x] Anon public key configured
- [ ] Service role key added (action required)
- [ ] Dependencies installed
- [ ] Admin portal tested
- [ ] Mobile app tested

---

## 🚀 Next Steps

Once environment variables are set:

1. **Create Admin User** (if not done):
   - Go to Supabase → Authentication → Users
   - Create user → Set role to 'admin' in database

2. **Start Building**:
   - Authentication system
   - Product catalog
   - User management
   - Order & invoicing
   - And more!

---

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"
- **Fix**: Make sure `.env.local` and `.env` files exist
- **Fix**: Restart your development server after creating env files

### Error: "Invalid API key"
- **Fix**: Verify keys are copied completely (they're very long)
- **Fix**: Check for extra spaces or line breaks

### Connection fails
- **Fix**: Verify Supabase project is active
- **Fix**: Check RLS policies are set up
- **Fix**: Verify network connection

---

**Your environment is almost ready! Just add the service_role key and you're good to go!** 🎉

