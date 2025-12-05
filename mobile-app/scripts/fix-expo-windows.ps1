# Fix Expo Windows Bug - Auto Patch Script
# This script finds and fixes the node:sea issue in Expo CLI

Write-Host "Searching for Expo externals.ts file..." -ForegroundColor Yellow

# Possible locations
$possiblePaths = @(
    "$PSScriptRoot\..\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "$PSScriptRoot\..\..\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "$env:USERPROFILE\.npm\node_modules\@expo\cli\src\start\server\metro\externals.ts"
)

$filePath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $filePath = $path
        Write-Host "Found file at: $path" -ForegroundColor Green
        break
    }
}

if (-not $filePath) {
    Write-Host "File not found in common locations. Searching..." -ForegroundColor Yellow
    
    # Search in node_modules
    $searchPaths = @(
        "$PSScriptRoot\..\node_modules",
        "$PSScriptRoot\..\..\node_modules"
    )
    
    foreach ($searchPath in $searchPaths) {
        if (Test-Path $searchPath) {
            $found = Get-ChildItem -Path $searchPath -Filter "externals.ts" -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*metro*externals.ts" } | Select-Object -First 1
            if ($found) {
                $filePath = $found.FullName
                Write-Host "Found file at: $filePath" -ForegroundColor Green
                break
            }
        }
    }
}

if (-not $filePath) {
    Write-Host "ERROR: Could not find externals.ts file" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please manually find and fix the file:" -ForegroundColor Yellow
    Write-Host "1. Search for: node_modules\@expo\cli\src\start\server\metro\externals.ts" -ForegroundColor Yellow
    Write-Host "2. Open in VS Code" -ForegroundColor Yellow
    Write-Host "3. Find: 'node:sea'" -ForegroundColor Yellow
    Write-Host "4. Replace with: 'node-sea'" -ForegroundColor Yellow
    Write-Host "5. Save and try again" -ForegroundColor Yellow
    exit 1
}

Write-Host "Reading file..." -ForegroundColor Yellow
$content = Get-Content $filePath -Raw

if ($content -match "node:sea") {
    Write-Host "Found 'node:sea' - replacing with 'node-sea'..." -ForegroundColor Yellow
    $content = $content -replace "'node:sea'", "'node-sea'"
    $content = $content -replace '"node:sea"', '"node-sea"'
    
    # Backup original
    $backupPath = "$filePath.backup"
    Copy-Item $filePath $backupPath
    Write-Host "Backup created at: $backupPath" -ForegroundColor Green
    
    # Write fixed content
    Set-Content -Path $filePath -Value $content -NoNewline
    Write-Host "File fixed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run: npm start" -ForegroundColor Cyan
} else {
    Write-Host "File already fixed or 'node:sea' not found" -ForegroundColor Green
}

