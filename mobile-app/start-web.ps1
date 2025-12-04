# Start Expo in Web Mode (Bypasses Windows Bug)
# This works around the node:sea directory issue

Write-Host "Starting Expo in Web Mode..." -ForegroundColor Green
Write-Host "This bypasses the Windows directory bug" -ForegroundColor Yellow
Write-Host ""

npx expo start --web

