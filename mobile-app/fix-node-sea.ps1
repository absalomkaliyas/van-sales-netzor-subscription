# Comprehensive fix for Windows node:sea bug
Write-Host "Fixing Windows node:sea bug..." -ForegroundColor Yellow

# Find all externals.ts files
$files = Get-ChildItem -Path "." -Filter "externals.ts" -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*@expo\cli*" }

if ($files.Count -eq 0) {
    # Also check parent directory
    $files = Get-ChildItem -Path ".." -Filter "externals.ts" -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*@expo\cli*" }
}

if ($files.Count -eq 0) {
    Write-Host "⚠️ externals.ts not found" -ForegroundColor Yellow
    Write-Host "Trying to find @expo/cli..." -ForegroundColor Yellow
    $expoCli = Get-ChildItem -Path "." -Filter "*expo*cli*" -Recurse -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($expoCli) {
        Write-Host "Found @expo/cli at: $($expoCli.FullName)" -ForegroundColor Green
    }
} else {
    foreach ($file in $files) {
        Write-Host "Processing: $($file.FullName)" -ForegroundColor Cyan
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        if ($content -and $content -match "node:sea") {
            Write-Host "Found node:sea, fixing..." -ForegroundColor Yellow
            $content = $content -replace "'node:sea'", "'node-sea'"
            $content = $content -replace '"node:sea"', '"node-sea"'
            $content = $content -replace '`node:sea`', '`node-sea`'
            $content = $content -replace 'node:sea', 'node-sea'
            Set-Content $file.FullName -Value $content -NoNewline
            Write-Host "✅ Fixed: $($file.FullName)" -ForegroundColor Green
        } else {
            Write-Host "⚠️ node:sea not found in file" -ForegroundColor Yellow
        }
    }
}

# Also create the directory structure manually to prevent the error
$expoDir = ".expo\metro\externals"
if (-not (Test-Path $expoDir)) {
    New-Item -ItemType Directory -Path $expoDir -Force | Out-Null
    Write-Host "✅ Created .expo directory structure" -ForegroundColor Green
}

Write-Host "`n✅ Fix complete!" -ForegroundColor Green

