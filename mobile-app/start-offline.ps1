# PowerShell script to start Expo in offline mode (prevents update downloads)
$env:EXPO_NO_UPDATE_CHECK = "1"
$env:EXPO_OFFLINE = "1"

Write-Host "Starting Expo in offline mode (no update checks)..." -ForegroundColor Green
npx expo start --offline

