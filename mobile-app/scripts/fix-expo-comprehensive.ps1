# Comprehensive Fix for Expo Windows Bug
# Searches all possible locations

Write-Host "Searching for externals.ts file in all locations..." -ForegroundColor Yellow

$searchPaths = @(
    ".\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    ".\mobile-app\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "$env:USERPROFILE\.npm\node_modules\@expo\cli\src\start\server\metro\externals.ts",
    "$env:APPDATA\npm\node_modules\@expo\cli\src\start\server\metro\externals.ts"
)

$found = $false

foreach ($path in $searchPaths) {
    $fullPath = Resolve-Path $path -ErrorAction SilentlyContinue
    if ($fullPath -and (Test-Path $fullPath)) {
        Write-Host "Found file at: $fullPath" -ForegroundColor Green
        $filePath = $fullPath.Path
        
        $content = Get-Content $filePath -Raw
        
        if ($content -match "node:sea") {
            Write-Host "Fixing 'node:sea' to 'node-sea'..." -ForegroundColor Yellow
            
            # Backup
            Copy-Item $filePath "$filePath.backup"
            Write-Host "Backup created" -ForegroundColor Green
            
            # Fix
            $content = $content -replace "'node:sea'", "'node-sea'"
            $content = $content -replace '"node:sea"', '"node-sea"'
            $content = $content -replace 'node:sea', 'node-sea'
            
            Set-Content -Path $filePath -Value $content -NoNewline
            Write-Host "File fixed successfully!" -ForegroundColor Green
            $found = $true
            break
        } else {
            Write-Host "File already fixed!" -ForegroundColor Green
            $found = $true
            break
        }
    }
}

if (-not $found) {
    Write-Host ""
    Write-Host "File not found automatically. Please fix manually:" -ForegroundColor Red
    Write-Host ""
    Write-Host "METHOD 1: VS Code Search (Easiest)" -ForegroundColor Yellow
    Write-Host "1. Open VS Code in this project" -ForegroundColor White
    Write-Host "2. Press Ctrl + Shift + F (Search in files)" -ForegroundColor White
    Write-Host "3. Search for: node:sea" -ForegroundColor White
    Write-Host "4. Click on the file shown" -ForegroundColor White
    Write-Host "5. Press Ctrl + H (Find & Replace)" -ForegroundColor White
    Write-Host "6. Find: 'node:sea'" -ForegroundColor White
    Write-Host "7. Replace: 'node-sea'" -ForegroundColor White
    Write-Host "8. Click Replace All" -ForegroundColor White
    Write-Host "9. Save (Ctrl + S)" -ForegroundColor White
    Write-Host ""
    Write-Host "METHOD 2: Direct PowerShell Command" -ForegroundColor Yellow
    Write-Host "Run this command (replace PATH with actual file path):" -ForegroundColor White
    Write-Host '(Get-Content "PATH\externals.ts") -replace "node:sea", "node-sea" | Set-Content "PATH\externals.ts"' -ForegroundColor Cyan
}

