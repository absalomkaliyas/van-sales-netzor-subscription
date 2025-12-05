# Fix node:sea Error - Direct Fix
# Fixes the externals.ts file in node_modules

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIXING node:sea ERROR" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$filePath = Join-Path $projectRoot "node_modules\@expo\cli\src\start\server\metro\externals.ts"

Write-Host "Looking for file: $filePath" -ForegroundColor Gray
Write-Host ""

if (-not (Test-Path $filePath)) {
    Write-Host "❌ File not found at expected location!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Searching for externals.ts..." -ForegroundColor Yellow
    
    # Search in node_modules
    $foundFiles = Get-ChildItem -Path $projectRoot -Recurse -Filter "externals.ts" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*@expo\cli*" -and $_.FullName -like "*metro*" }
    
    if ($foundFiles.Count -eq 0) {
        Write-Host "❌ Could not find externals.ts file!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please run: npm install" -ForegroundColor Yellow
        exit 1
    }
    
    $filePath = $foundFiles[0].FullName
    Write-Host "✅ Found file: $filePath" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Reading file..." -ForegroundColor Yellow
$content = Get-Content $filePath -Raw -ErrorAction Stop

if ($content -match "node:sea") {
    Write-Host "✅ Found 'node:sea' in file" -ForegroundColor Green
    Write-Host "Fixing..." -ForegroundColor Yellow
    
    # Replace all variations
    $content = $content -replace "'node:sea'", "'node-sea'"
    $content = $content -replace '"node:sea"', '"node-sea"'
    $content = $content -replace '`node:sea`', '`node-sea`'
    $content = $content -replace 'node:sea', 'node-sea'
    
    # Write back
    Set-Content -Path $filePath -Value $content -NoNewline
    
    Write-Host "✅ Fixed! Replaced 'node:sea' with 'node-sea'" -ForegroundColor Green
    Write-Host ""
    
    # Verify
    $verify = Get-Content $filePath -Raw
    if ($verify -match "node:sea") {
        Write-Host "⚠️  Warning: Still found 'node:sea' - may need manual fix" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Verified: No 'node:sea' found in file" -ForegroundColor Green
    }
} else {
    Write-Host "✅ File doesn't contain 'node:sea' - may already be fixed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIX COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Now try: npm start" -ForegroundColor Cyan
Write-Host ""

