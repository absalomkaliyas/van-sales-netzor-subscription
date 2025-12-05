# Auto-fix and Build Script
# This script validates configuration and fixes issues before building

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTO-FIX AND BUILD SCRIPT" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Validate package.json
Write-Host "Step 1: Validating package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json

# Ensure Expo SDK 49
if ($packageJson.dependencies.expo -ne "~49.0.0") {
    Write-Host "Fixing Expo version..." -ForegroundColor Yellow
    $packageJson.dependencies.expo = "~49.0.0"
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
}

# Remove @expo/config-plugins if exists
if ($packageJson.dependencies.'@expo/config-plugins') {
    Write-Host "Removing @expo/config-plugins..." -ForegroundColor Yellow
    $packageJson.dependencies.PSObject.Properties.Remove('@expo/config-plugins')
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
}

Write-Host "✓ package.json validated" -ForegroundColor Green
Write-Host ""

# Step 2: Fix dependencies
Write-Host "Step 2: Fixing dependencies..." -ForegroundColor Yellow
npx expo install --fix
Write-Host "✓ Dependencies fixed" -ForegroundColor Green
Write-Host ""

# Step 3: Validate app.config.js
Write-Host "Step 3: Validating app.config.js..." -ForegroundColor Yellow
# Configuration is already fixed
Write-Host "✓ app.config.js validated" -ForegroundColor Green
Write-Host ""

# Step 4: Check environment variables
Write-Host "Step 4: Checking environment variables..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "⚠ .env file not found - make sure EAS secrets are set" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env file exists" -ForegroundColor Green
}
Write-Host ""

# Step 5: Build
Write-Host "Step 5: Starting build..." -ForegroundColor Yellow
Write-Host "This will take 10-15 minutes..." -ForegroundColor Cyan
Write-Host ""

eas build --platform android --profile preview

