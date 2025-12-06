#!/bin/bash
# Fix expo-module-gradle-plugin not found error

echo "Fixing expo-module-gradle-plugin configuration..."

cd "$(dirname "$0")/.."

# Check if android directory exists
if [ ! -d "android" ]; then
  echo "Android directory not found. Run 'npx expo prebuild --platform android' first."
  exit 1
fi

# Fix settings.gradle to include expo-modules-core
if [ -f "android/settings.gradle" ]; then
  echo "Updating settings.gradle..."
  
  # Check if expo-modules-core autolinking is present
  if ! grep -q "expo-modules-core" android/settings.gradle; then
    # Add expo-modules-core autolinking
    cat >> android/settings.gradle << 'EOF'

// Expo modules autolinking
apply from: new File(["node", "--print", "require.resolve(\"expo-modules-core/package.json\")"].execute(null, rootDir).text.trim(), "../scripts/autolinking.gradle");
EOF
    echo "✅ Added expo-modules-core to settings.gradle"
  else
    echo "✅ expo-modules-core already in settings.gradle"
  fi
fi

# Ensure expo-modules-core is installed
if [ ! -d "node_modules/expo-modules-core" ]; then
  echo "Installing expo-modules-core..."
  npm install expo-modules-core
fi

echo "✅ Android plugin configuration fixed!"

