# Comprehensive fix for Windows node:sea bug
Write-Host "Fixing Windows node:sea bug..." -ForegroundColor Yellow

# Method 1: Find and patch externals.ts in root node_modules
$rootFile = "..\node_modules\@expo\cli\src\start\server\metro\externals.ts"
if (Test-Path $rootFile) {
    Write-Host "Found externals.ts in root node_modules" -ForegroundColor Green
    $content = [System.IO.File]::ReadAllText((Resolve-Path $rootFile))
    if ($content.Contains("node:sea")) {
        Write-Host "Replacing node:sea..." -ForegroundColor Yellow
        $content = $content.Replace("'node:sea'", "'node-sea'")
        $content = $content.Replace('"node:sea"', '"node-sea"')
        $content = $content.Replace('`node:sea`', '`node-sea`')
        $content = $content.Replace('node:sea', 'node-sea')
        [System.IO.File]::WriteAllText((Resolve-Path $rootFile), $content)
        Write-Host "✅ Fixed externals.ts in root" -ForegroundColor Green
    }
}

# Method 2: Find and patch in mobile-app node_modules
$localFile = "node_modules\@expo\cli\src\start\server\metro\externals.ts"
if (Test-Path $localFile) {
    Write-Host "Found externals.ts in mobile-app node_modules" -ForegroundColor Green
    $content = [System.IO.File]::ReadAllText((Resolve-Path $localFile))
    if ($content.Contains("node:sea")) {
        Write-Host "Replacing node:sea..." -ForegroundColor Yellow
        $content = $content.Replace("'node:sea'", "'node-sea'")
        $content = $content.Replace('"node:sea"', '"node-sea"')
        $content = $content.Replace('`node:sea`', '`node-sea`')
        $content = $content.Replace('node:sea', 'node-sea')
        [System.IO.File]::WriteAllText((Resolve-Path $localFile), $content)
        Write-Host "✅ Fixed externals.ts in mobile-app" -ForegroundColor Green
    }
}

# Method 3: Create the directory structure manually
$expoDir = ".expo\metro\externals\node-sea"
if (-not (Test-Path $expoDir)) {
    New-Item -ItemType Directory -Path $expoDir -Force | Out-Null
    Write-Host "✅ Created .expo\metro\externals\node-sea directory" -ForegroundColor Green
}

Write-Host "`n✅ Fix complete!" -ForegroundColor Green

