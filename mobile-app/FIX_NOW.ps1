# One-Command Fix for Expo Windows Bug
# Run this from the project root

Write-Host "Searching for externals.ts file..." -ForegroundColor Yellow

# Search for the file
$file = Get-ChildItem -Path "B:\VAN Sales Netzor Subscription" -Filter "externals.ts" -Recurse -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -like "*@expo*cli*metro*externals.ts" } | 
    Select-Object -First 1

if ($file) {
    Write-Host "Found file at: $($file.FullName)" -ForegroundColor Green
    
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "node:sea") {
        Write-Host "Fixing 'node:sea' to 'node-sea'..." -ForegroundColor Yellow
        
        # Backup
        Copy-Item $file.FullName "$($file.FullName).backup"
        
        # Fix
        $content = $content -replace "'node:sea'", "'node-sea'"
        $content = $content -replace '"node:sea"', '"node-sea"'
        
        Set-Content -Path $file.FullName -Value $content -NoNewline
        
        Write-Host "Fixed successfully!" -ForegroundColor Green
        Write-Host "Now run: cd mobile-app && npx expo start --web" -ForegroundColor Cyan
    } else {
        Write-Host "File already fixed!" -ForegroundColor Green
    }
} else {
    Write-Host "File not found. Please fix manually:" -ForegroundColor Red
    Write-Host "1. Open VS Code" -ForegroundColor Yellow
    Write-Host "2. Press Ctrl+Shift+F" -ForegroundColor Yellow
    Write-Host "3. Search for: node:sea" -ForegroundColor Yellow
    Write-Host "4. Replace with: node-sea" -ForegroundColor Yellow
}

