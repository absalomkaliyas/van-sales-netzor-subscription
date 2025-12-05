# Fix Gradle useCoreDependencies Error
# Upgrades to Expo SDK 50 for better Gradle compatibility

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIXING GRADLE ERROR" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot | Split-Path -Parent
Set-Location $projectRoot

Write-Host "Step 1: Upgrading to Expo SDK 50..." -ForegroundColor Yellow
Write-Host "  (This fixes the useCoreDependencies error)" -ForegroundColor Gray
Write-Host ""

# Install Expo SDK 50
& npx -y expo install expo@~50.0.0

Write-Host ""
Write-Host "Step 2: Aligning all packages with SDK 50..." -ForegroundColor Yellow
& npx -y expo install --fix

Write-Host ""
Write-Host "Step 3: Verifying configuration..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.dependencies.expo -eq "~50.0.0") {
    Write-Host "  ✓ Expo SDK 50 installed" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Expo version: $($packageJson.dependencies.expo)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  READY TO BUILD" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Gradle error should be fixed now!" -ForegroundColor Green
Write-Host "Run: npm run build:now" -ForegroundColor Cyan
Write-Host ""

