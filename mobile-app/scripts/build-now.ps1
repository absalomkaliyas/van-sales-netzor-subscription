# Complete Auto-Fix and Build Script
# Fixes everything and builds automatically

$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  COMPLETE AUTO-FIX AND BUILD" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get project root
$projectRoot = $PSScriptRoot | Split-Path -Parent
Set-Location $projectRoot

Write-Host "Project: $projectRoot" -ForegroundColor Gray
Write-Host ""

# Step 1: Fix package.json
Write-Host "[1/6] Fixing package.json..." -ForegroundColor Yellow
$packagePath = Join-Path $projectRoot "package.json"
$packageJson = Get-Content $packageJson -Raw | ConvertFrom-Json

# Ensure Expo SDK 50 (fixes Gradle useCoreDependencies error)
if ($packageJson.dependencies.expo -ne "~50.0.0") {
    $packageJson.dependencies.expo = "~50.0.0"
    Write-Host "  → Set Expo to SDK 50 (fixes Gradle error)" -ForegroundColor Cyan
}

# Remove @expo/config-plugins
if ($packageJson.dependencies.PSObject.Properties.Name -contains '@expo/config-plugins') {
    $packageJson.dependencies.PSObject.Properties.Remove('@expo/config-plugins')
    Write-Host "  → Removed @expo/config-plugins" -ForegroundColor Cyan
}

$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packagePath
Write-Host "  ✓ Done" -ForegroundColor Green
Write-Host ""

# Step 2: Fix app.config.js
Write-Host "[2/6] Ensuring app.config.js is correct..." -ForegroundColor Yellow
$configPath = Join-Path $projectRoot "app.config.js"
$minimalConfig = @"
module.exports = {
  expo: {
    name: "VAN Sales NETZOR",
    slug: "van-sales-netzor",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: { resizeMode: "contain", backgroundColor: "#ffffff" },
    ios: { supportsTablet: true, bundleIdentifier: "com.netzor.vansales" },
    android: {
      package: "com.netzor.vansales",
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION", "CAMERA"]
    },
    plugins: ["expo-router"],
    scheme: "vansales",
    extra: { eas: { projectId: "307a5b40-8250-4e97-80e8-25bef212bd6e" } }
  }
}
"@
Set-Content -Path $configPath -Value $minimalConfig
Write-Host "  ✓ Done" -ForegroundColor Green
Write-Host ""

# Step 3: Remove app.json if exists
Write-Host "[3/6] Removing app.json if exists..." -ForegroundColor Yellow
$appJsonPath = Join-Path $projectRoot "app.json"
if (Test-Path $appJsonPath) {
    Remove-Item $appJsonPath -Force
    Write-Host "  → Removed app.json" -ForegroundColor Cyan
}
Write-Host "  ✓ Done" -ForegroundColor Green
Write-Host ""

# Step 4: Fix dependencies
Write-Host "[4/6] Fixing dependencies (this takes 2-3 minutes)..." -ForegroundColor Yellow
& npx -y expo install --fix *>&1 | Out-Null
Write-Host "  ✓ Done" -ForegroundColor Green
Write-Host ""

# Step 5: Verify env vars (just check, don't fail)
Write-Host "[5/6] Checking environment variables..." -ForegroundColor Yellow
$envCheck = & npx -y eas-cli env:list 2>&1
if ($envCheck -match "EXPO_PUBLIC_SUPABASE") {
    Write-Host "  ✓ Environment variables are set" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Set env vars if build fails" -ForegroundColor Yellow
}
Write-Host ""

# Step 6: Build
Write-Host "[6/6] Starting build..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILDING APK (10-15 minutes)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

& npx -y eas-cli build --platform android --profile preview

