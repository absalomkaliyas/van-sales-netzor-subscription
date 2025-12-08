# VAN Sales NETZOR - Supplier Mobile App

Mobile application for suppliers to manage stock assignments, collections, and deliveries.

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn
- Expo CLI (installed globally or via npx)

### Installation

1. **Navigate to the mobile-app directory:**
   ```bash
   cd mobile-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   Or use:
   ```bash
   npx expo start
   ```

### Running on Device

1. **Install Expo Go** on your Android/iOS device
2. **Scan the QR code** that appears in the terminal
3. The app will load on your device

### Running on Android Emulator

```bash
npm run android
```

### Running on iOS Simulator (macOS only)

```bash
npm run ios
```

### Running on Web

```bash
npm run web
```

## 📱 App Features

- **Dashboard**: Overview of assignments, collections, and deliveries
- **Assignments**: View stock assigned by admin for the day
- **Collections**: Collect stock from hub stock room
- **Deliveries**: Deliver to designated places

## 🏗️ Project Structure

```
mobile-app/
├── app/
│   ├── _layout.tsx          # Root layout
│   └── (tabs)/
│       ├── _layout.tsx      # Tab navigation
│       ├── index.tsx         # Dashboard
│       ├── assignments.tsx  # Stock Assignments
│       ├── collections.tsx  # Stock Collections
│       └── deliveries.tsx   # Deliveries
├── app.config.js            # Expo configuration
└── package.json             # Dependencies
```

## 🔧 Configuration

The app uses `app.config.js` for configuration. Key settings:
- Android SDK: 34
- Java: 17
- Permissions: Location, Camera

## 📦 Building for Production

### Using Codemagic (Recommended)

The project includes `codemagic.yaml` for automated builds. Just push to your repository and trigger a build in Codemagic.

### Using EAS Build

```bash
eas build --platform android
```

## 🔐 Environment Variables

Create a `.env` file in the `mobile-app` directory:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Notes

- This is a fresh app built with Expo SDK 54
- Uses Expo Router for navigation
- Configured for supplier workflow

