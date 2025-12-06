# Quick Fix Script for node:sea Error
# Run this from mobile-app directory

Write-Host "🔍 Searching for externals.ts file..." -ForegroundColor Cyan

# Check common locations
$possiblePaths = @(
    "node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "..\node_modules\@expo\cli\src\start\server\metro\externals.ts"
)

$fileFound = $null

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $fileFound = $path
        Write-Host "✅ Found file: $path" -ForegroundColor Green
        break
    }
}

if (-not $fileFound) {
    Write-Host "❌ File not found in expected locations. Searching..." -ForegroundColor Yellow
    $found = Get-ChildItem -Path ".." -Recurse -Filter "externals.ts" -ErrorAction SilentlyContinue | 
             Where-Object { $_.FullName -match "expo.*metro" } | 
             Select-Object -First 1
    
    if ($found) {
        $fileFound = $found.FullName
        Write-Host "✅ Found file: $fileFound" -ForegroundColor Green
    } else {
        Write-Host "❌ File not found. You may need to:" -ForegroundColor Red
        Write-Host "   1. Run: npm install" -ForegroundColor Yellow
        Write-Host "   2. Or manually search for 'node:sea' in VS Code" -ForegroundColor Yellow
        exit 1
    }
}

# Read and fix the file
Write-Host "📖 Reading file..." -ForegroundColor Cyan
$content = Get-Content $fileFound -Raw -ErrorAction Stop

if ($content -match "node:sea") {
    Write-Host "🔧 Fixing 'node:sea' to 'node-sea'..." -ForegroundColor Yellow
    
    # Replace all variations
    $content = $content -replace "'node:sea'", "'node-sea'"
    $content = $content -replace '"node:sea"', '"node-sea"'
    $content = $content -replace '`node:sea`', '`node-sea`'
    $content = $content -replace 'node:sea', 'node-sea'
    
    # Write back
    Set-Content -Path $fileFound -Value $content -NoNewline
    Write-Host "✅ Fixed! File updated successfully." -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Now try: npm start" -ForegroundColor Cyan
} else {
    Write-Host "✅ File doesn't contain 'node:sea' - may already be fixed!" -ForegroundColor Green
}


