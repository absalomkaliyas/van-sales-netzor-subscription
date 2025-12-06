# VAN Sales NETZOR - Mobile App

## 📱 Mobile Application for Field Sales

React Native mobile app built with Expo for field sales team to manage orders, customers, products, and attendance.

## 🚀 Features

### ✅ Implemented
- **Authentication**: Login with Supabase Auth
- **Home Screen**: Dashboard with check-in/check-out
- **Products**: View product catalog
- **Customers**: View customer list
- **Orders**: View and create orders
- **Profile**: User profile and logout
- **Location Tracking**: GPS-based check-in/check-out
- **Attendance**: Daily attendance management

### ⏳ To Be Implemented
- Offline-first architecture
- Sync queue for offline data
- Order to invoice conversion
- Payment collection
- Product search and filters
- Customer search
- Route assignment
- Stock management
- Returns management

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)

### Installation

1. **Install dependencies**:
   ```bash
   cd mobile-app
   npm install
   ```

2. **Configure environment variables**:
   Create `.env` file:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Start the app**:
   ```bash
   npm start
   # Or for Windows:
   npm run start:windows
   ```

4. **Run on device**:
   - Scan QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 📁 Project Structure

```
mobile-app/
├── app/
│   ├── _layout.tsx          # Root layout with auth
│   ├── login.tsx            # Login screen
│   ├── new-order.tsx        # Create new order
│   └── (tabs)/              # Tab navigation
│       ├── _layout.tsx      # Tab layout
│       ├── index.tsx        # Home/Dashboard
│       ├── products.tsx     # Products list
│       ├── customers.tsx    # Customers list
│       ├── orders.tsx       # Orders list
│       └── profile.tsx      # User profile
├── components/              # Reusable components
├── hooks/                   # Custom hooks
├── lib/
│   └── supabase.ts         # Supabase client
└── utils/                   # Utility functions
```

## 🔐 Authentication

The app uses Supabase Auth for authentication. Users must:
1. Have an account in Supabase Auth
2. Have a corresponding record in the `users` table
3. Have `is_active = true`

## 📍 Location & Permissions

The app requires:
- **Location Permission**: For check-in/check-out and route tracking
- **Camera Permission**: For taking photos (future feature)

## 🗄️ Database Integration

The mobile app connects to the same Supabase database as the admin web portal:
- Products
- Customers
- Orders
- Attendance
- Location tracking

## 🐛 Known Issues

### Windows Development
- Expo has a known bug on Windows with `node:sea` directory
- **Workaround**: Use `npm run start:windows` or test on physical device
- The app works fine on physical devices despite this development issue

## 📝 Next Steps

1. **Offline Support**: Implement offline-first architecture
2. **Sync Queue**: Add sync queue for offline data
3. **Enhanced Features**: 
   - Order to invoice conversion
   - Payment collection
   - Advanced search
   - Route optimization
4. **Testing**: Comprehensive testing on iOS and Android
5. **Build**: Create production builds with EAS

## 🔗 Related

- Admin Web Portal: See `admin-web/` directory
- Database Schema: See `scripts/setup-database.sql`
- Shared Types: See `shared/types/`

---

**Status**: Foundation Complete | Core Features Implemented
**Last Updated**: December 2024


