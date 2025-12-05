# Build Android APK Locally
# Requires: Android Studio and Android SDK

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LOCAL ANDROID BUILD" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot | Split-Path -Parent
Set-Location $projectRoot

# Check if Android SDK is installed
$androidHome = $env:ANDROID_HOME
if (-not $androidHome) {
    Write-Host "❌ ANDROID_HOME not set!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Android Studio and set ANDROID_HOME:" -ForegroundColor Yellow
    Write-Host "  1. Install Android Studio" -ForegroundColor White
    Write-Host "  2. Open Android Studio > SDK Manager" -ForegroundColor White
    Write-Host "  3. Install Android SDK (API 33 or 34)" -ForegroundColor White
    Write-Host "  4. Set ANDROID_HOME environment variable" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ Android SDK found: $androidHome" -ForegroundColor Green
Write-Host ""

# Step 1: Prebuild (generate native Android project)
Write-Host "Step 1: Generating Android project..." -ForegroundColor Yellow
& npx -y expo prebuild --platform android --clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prebuild failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Android project generated" -ForegroundColor Green
Write-Host ""

# Step 2: Build APK
Write-Host "Step 2: Building APK..." -ForegroundColor Yellow
Write-Host "This may take 5-10 minutes..." -ForegroundColor Gray
Write-Host ""

$gradlePath = Join-Path $androidHome "gradle"
if (Test-Path "$projectRoot\android\gradlew.bat") {
    Set-Location "$projectRoot\android"
    & .\gradlew.bat assembleRelease
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  BUILD SUCCESSFUL!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        $apkPath = "$projectRoot\android\app\build\outputs\apk\release\app-release.apk"
        if (Test-Path $apkPath) {
            Write-Host "✅ APK location:" -ForegroundColor Green
            Write-Host $apkPath -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Install on device:" -ForegroundColor Yellow
            Write-Host "  adb install $apkPath" -ForegroundColor White
        }
    } else {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Gradle wrapper not found!" -ForegroundColor Red
    Write-Host "Run: npx expo prebuild --platform android" -ForegroundColor Yellow
    exit 1
}

