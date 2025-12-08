# Fix Windows node:sea bug
$expoCliPath = "node_modules\@expo\cli\src\start\server\metro\externals.ts"
if (Test-Path $expoCliPath) {
    Write-Host "Fixing node:sea bug..."
    $content = Get-Content $expoCliPath -Raw
    $content = $content -replace "'node:sea'", "'node-sea'"
    $content = $content -replace '"node:sea"', '"node-sea"'
    Set-Content $expoCliPath -Value $content -NoNewline
    Write-Host "✅ Fixed node:sea bug"
} else {
    Write-Host "⚠️ externals.ts not found"
}

