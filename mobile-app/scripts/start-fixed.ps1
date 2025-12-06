# Fixed Expo Start Script for Windows
# This script works around the node-sea directory creation issue

Write-Host "Starting Expo with Windows workaround..." -ForegroundColor Green

# Set environment variable to skip problematic directory creation
$env:EXPO_NO_METRO_EXTERNALS = "1"

# Start Expo
npx expo start


