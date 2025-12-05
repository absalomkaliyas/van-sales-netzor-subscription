#!/bin/bash
# Patch Gradle files to fix compatibility issues

echo "Patching Gradle files..."

# Fix expo-asset build.gradle
if [ -f "node_modules/expo-asset/android/build.gradle" ]; then
    echo "Fixing expo-asset/build.gradle..."
    sed -i 's/useDefaultAndroidSdkVersions()/\/\/ useDefaultAndroidSdkVersions() - removed for compatibility/g' node_modules/expo-asset/android/build.gradle
    
    # Add SDK versions manually if not present
    if ! grep -q "compileSdkVersion" node_modules/expo-asset/android/build.gradle; then
        sed -i '/android {/a\    compileSdkVersion 34\n    buildToolsVersion "34.0.0"' node_modules/expo-asset/android/build.gradle
    fi
fi

# Fix expo-modules-core plugin
if [ -f "node_modules/expo-modules-core/android/ExpoModulesCorePlugin.gradle" ]; then
    echo "Fixing ExpoModulesCorePlugin.gradle..."
    # Comment out the problematic release property access
    sed -i 's/components\.release/components.getByName("release")/g' node_modules/expo-modules-core/android/ExpoModulesCorePlugin.gradle || true
fi

echo "Gradle files patched!"

