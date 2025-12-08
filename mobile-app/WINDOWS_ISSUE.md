# Windows node:sea Bug - Workaround

## The Problem

Windows cannot create directories with `:` in the name. Expo tries to create `.expo\metro\externals\node:sea` which fails on Windows.

## Solutions

### Option 1: Use Codemagic (Recommended) ✅

The best solution is to use Codemagic for building, which runs on macOS and doesn't have this issue.

1. Push your code to GitHub
2. Connect your repo to Codemagic
3. Add environment variables (EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY)
4. Start a build

The `codemagic.yaml` file is already configured in the root directory.

### Option 2: Use WSL (Windows Subsystem for Linux)

If you have WSL installed:

```bash
cd /mnt/b/VAN\ Sales\ Netzor\ Subscription/mobile-app
npm start
```

### Option 3: Use EAS Build

```bash
cd mobile-app
eas build --platform android --profile preview
```

### Option 4: Manual Directory Creation (Temporary Workaround)

Before running `npm start`, manually create the directory:

```powershell
New-Item -ItemType Directory -Path ".expo\metro\externals\node-sea" -Force
```

Then try starting again. This may not work if Expo still tries to create `node:sea`.

## Current Status

- ✅ Fresh app created with Expo SDK 50
- ✅ Supplier workflow screens added
- ✅ Clean codemagic.yaml configuration
- ⚠️ Windows node:sea bug prevents local development server

## Recommendation

**Use Codemagic for building** - it's the most reliable solution and avoids all Windows-specific issues.

