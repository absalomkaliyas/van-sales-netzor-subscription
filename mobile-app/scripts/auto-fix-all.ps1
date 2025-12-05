# Comprehensive Auto-Fix Script
# Fixes all known build issues automatically

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTO-FIXING ALL BUILD ISSUES" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Ensure we're in the right directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
Set-Location $projectRoot

Write-Host "Working directory: $projectRoot" -ForegroundColor Gray
Write-Host ""

# Step 2: Read and fix package.json
Write-Host "Step 1: Fixing package.json..." -ForegroundColor Yellow
$packagePath = Join-Path $projectRoot "package.json"
$packageContent = Get-Content $packagePath -Raw
$packageJson = $packageContent | ConvertFrom-Json

# Ensure Expo SDK 49
if ($packageJson.dependencies.expo -ne "~49.0.0") {
    Write-Host "  → Setting Expo to SDK 49" -ForegroundColor Cyan
    $packageJson.dependencies.expo = "~49.0.0"
}

# Remove @expo/config-plugins if it exists
if ($packageJson.dependencies.PSObject.Properties.Name -contains '@expo/config-plugins') {
    Write-Host "  → Removing @expo/config-plugins" -ForegroundColor Cyan
    $packageJson.dependencies.PSObject.Properties.Remove('@expo/config-plugins')
}

# Save package.json
$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packagePath
Write-Host "  ✓ package.json fixed" -ForegroundColor Green
Write-Host ""

# Step 3: Fix app.config.js - ensure minimal config
Write-Host "Step 2: Fixing app.config.js..." -ForegroundColor Yellow
$configPath = Join-Path $projectRoot "app.config.js"
$configContent = @"
// app.config.js - Minimal working configuration
module.exports = {
  expo: {
    name: "VAN Sales NETZOR",
    slug: "van-sales-netzor",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.netzor.vansales"
    },
    android: {
      package: "com.netzor.vansales",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA"
      ]
    },
    plugins: [
      "expo-router"
    ],
    scheme: "vansales",
    extra: {
      eas: {
        projectId: "307a5b40-8250-4e97-80e8-25bef212bd6e"
      }
    }
  }
}
"@
Set-Content -Path $configPath -Value $configContent
Write-Host "  ✓ app.config.js fixed" -ForegroundColor Green
Write-Host ""

# Step 4: Remove app.json if it exists
Write-Host "Step 3: Checking for app.json..." -ForegroundColor Yellow
$appJsonPath = Join-Path $projectRoot "app.json"
if (Test-Path $appJsonPath) {
    Write-Host "  → Removing app.json (using app.config.js)" -ForegroundColor Cyan
    Remove-Item $appJsonPath
}
Write-Host "  ✓ app.json check complete" -ForegroundColor Green
Write-Host ""

# Step 5: Fix dependencies
Write-Host "Step 4: Fixing dependencies with npx expo install --fix..." -ForegroundColor Yellow
Write-Host "  (This may take a few minutes...)" -ForegroundColor Gray
$fixResult = & npx -y expo install --fix 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencies fixed" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Dependencies fix had warnings (continuing...)" -ForegroundColor Yellow
}
Write-Host ""

# Step 6: Verify EAS environment variables
Write-Host "Step 5: Checking EAS environment variables..." -ForegroundColor Yellow
$envCheck = & npx -y eas env:list 2>&1
if ($envCheck -match "EXPO_PUBLIC_SUPABASE_URL" -and $envCheck -match "EXPO_PUBLIC_SUPABASE_ANON_KEY") {
    Write-Host "  ✓ Environment variables are set" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Environment variables may not be set" -ForegroundColor Yellow
    Write-Host "  → Run: eas env:create --name EXPO_PUBLIC_SUPABASE_URL --value 'YOUR_URL' --scope project --type string --environment preview" -ForegroundColor Cyan
    Write-Host "  → Run: eas env:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value 'YOUR_KEY' --scope project --type string --environment preview" -ForegroundColor Cyan
}
Write-Host ""

# Step 7: Run expo doctor
Write-Host "Step 6: Running expo doctor..." -ForegroundColor Yellow
$doctorResult = & npx -y expo-doctor 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ expo doctor passed" -ForegroundColor Green
} else {
    Write-Host "  ⚠ expo doctor found issues (but continuing...)" -ForegroundColor Yellow
}
Write-Host ""

# Step 8: Build
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STARTING BUILD" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "All fixes applied. Starting build..." -ForegroundColor Green
Write-Host "This will take 10-15 minutes..." -ForegroundColor Cyan
Write-Host ""

& npx -y eas-cli build --platform android --profile preview

