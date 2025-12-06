# Direct Fix for Expo Windows Bug
# Fixes the exact file path shown in the error

$filePath = "B:\VAN Sales Netzor Subscription\node_modules\@expo\cli\src\start\server\metro\externals.ts"

if (Test-Path $filePath) {
    Write-Host "Found file at: $filePath" -ForegroundColor Green
    
    # Read file
    $content = Get-Content $filePath -Raw
    
    if ($content -match "node:sea") {
        Write-Host "Fixing 'node:sea' to 'node-sea'..." -ForegroundColor Yellow
        
        # Create backup
        $backupPath = "$filePath.backup"
        Copy-Item $filePath $backupPath
        Write-Host "Backup created at: $backupPath" -ForegroundColor Green
        
        # Replace
        $content = $content -replace "'node:sea'", "'node-sea'"
        $content = $content -replace '"node:sea"', '"node-sea"'
        
        # Write back
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "File fixed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Now try: npx expo start --web" -ForegroundColor Cyan
    } else {
        Write-Host "File already fixed or 'node:sea' not found" -ForegroundColor Green
    }
} else {
    Write-Host "File not found at: $filePath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please manually find and fix:" -ForegroundColor Yellow
    Write-Host "1. Open VS Code" -ForegroundColor Yellow
    Write-Host "2. Press Ctrl + Shift + F" -ForegroundColor Yellow
    Write-Host "3. Search for: node:sea" -ForegroundColor Yellow
    Write-Host "4. Open the file shown" -ForegroundColor Yellow
    Write-Host "5. Replace 'node:sea' with 'node-sea'" -ForegroundColor Yellow
    Write-Host "6. Save and try again" -ForegroundColor Yellow
}


