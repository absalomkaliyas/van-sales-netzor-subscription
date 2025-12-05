# Build with React Native CLI (Eject from Expo)
# This creates a bare React Native project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  REACT NATIVE CLI BUILD" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  WARNING: This will eject from Expo!" -ForegroundColor Yellow
Write-Host "You won't be able to use Expo managed workflow after this." -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Continue? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Cancelled." -ForegroundColor Gray
    exit 0
}

$projectRoot = $PSScriptRoot | Split-Path -Parent
Set-Location $projectRoot

# Step 1: Prebuild (creates android/ios folders)
Write-Host ""
Write-Host "Step 1: Creating native projects..." -ForegroundColor Yellow
& npx -y expo prebuild --clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prebuild failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Native projects created" -ForegroundColor Green
Write-Host ""

# Step 2: Install React Native CLI
Write-Host "Step 2: Installing React Native CLI..." -ForegroundColor Yellow
& npm install -g react-native-cli
Write-Host "✅ React Native CLI installed" -ForegroundColor Green
Write-Host ""

# Step 3: Build Android
Write-Host "Step 3: Building Android APK..." -ForegroundColor Yellow
Set-Location "$projectRoot\android"
& .\gradlew.bat assembleRelease

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    $apkPath = "$projectRoot\android\app\build\outputs\apk\release\app-release.apk"
    Write-Host "✅ APK: $apkPath" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

