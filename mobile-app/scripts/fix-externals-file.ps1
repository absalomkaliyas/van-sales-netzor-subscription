# Fix externals.ts - Comprehensive Search and Fix
# Searches for the file and fixes node:sea issue

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIXING externals.ts FILE" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Search in multiple locations
$searchPaths = @(
    "B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "B:\VAN Sales Netzor Subscription\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "$PSScriptRoot\..\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "$PSScriptRoot\..\..\node_modules\@expo\cli\src\start\server\metro\externals.ts"
)

$filePath = $null

foreach ($path in $searchPaths) {
    if (Test-Path $path) {
        $filePath = $path
        Write-Host "✅ Found file: $path" -ForegroundColor Green
        break
    }
}

# If not found, search recursively
if (-not $filePath) {
    Write-Host "Searching recursively..." -ForegroundColor Yellow
    $rootPath = "B:\VAN Sales Netzor Subscription"
    
    if (Test-Path $rootPath) {
        $found = Get-ChildItem -Path $rootPath -Recurse -Filter "externals.ts" -ErrorAction SilentlyContinue | 
                 Where-Object { $_.FullName -like "*@expo\cli*" -and $_.FullName -like "*metro*" } | 
                 Select-Object -First 1
        
        if ($found) {
            $filePath = $found.FullName
            Write-Host "✅ Found file: $filePath" -ForegroundColor Green
        }
    }
}

if (-not $filePath) {
    Write-Host "❌ File not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please ensure:" -ForegroundColor Yellow
    Write-Host "  1. Dependencies are installed (npm install)" -ForegroundColor White
    Write-Host "  2. File exists at: node_modules\@expo\cli\src\start\server\metro\externals.ts" -ForegroundColor White
    Write-Host ""
    Write-Host "Or provide the exact path to the file." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Reading file..." -ForegroundColor Yellow
try {
    $content = Get-Content $filePath -Raw -ErrorAction Stop
    
    if ($content -match "node:sea") {
        Write-Host "✅ Found 'node:sea' in file" -ForegroundColor Green
        Write-Host "Fixing..." -ForegroundColor Yellow
        
        # Count occurrences
        $count = ([regex]::Matches($content, "node:sea")).Count
        Write-Host "  Found $count occurrence(s)" -ForegroundColor Gray
        
        # Replace all variations
        $content = $content -replace "'node:sea'", "'node-sea'"
        $content = $content -replace '"node:sea"', '"node-sea"'
        $content = $content -replace '`node:sea`', '`node-sea`'
        $content = $content -replace 'node:sea', 'node-sea'
        
        # Write back
        Set-Content -Path $filePath -Value $content -NoNewline -ErrorAction Stop
        
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
        Write-Host "✅ File doesn't contain 'node:sea' - already fixed!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIX COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "File fixed: $filePath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Now try: npm start" -ForegroundColor Yellow
Write-Host ""

