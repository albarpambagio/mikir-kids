# Helper script to ensure uv is available in PATH
# Run this if uv is not recognized: . .\ensure_uv.ps1

# Refresh PATH from environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Check if uv exists in expected location
$uvPath = "$env:USERPROFILE\.local\bin\uv.exe"
if (Test-Path $uvPath) {
    Write-Host "✓ Found uv at: $uvPath" -ForegroundColor Green
    
    # Add to PATH if not already there
    if ($env:Path -notlike "*$env:USERPROFILE\.local\bin*") {
        $env:Path = "$env:USERPROFILE\.local\bin;$env:Path"
        Write-Host "✓ Added to PATH for this session" -ForegroundColor Green
    }
    
    # Test uv
    try {
        $version = & $uvPath --version 2>&1
        Write-Host "✓ uv is working: $version" -ForegroundColor Green
    } catch {
        Write-Host "✗ uv found but not working" -ForegroundColor Red
    }
} else {
    Write-Host "✗ uv not found at expected location: $uvPath" -ForegroundColor Red
    Write-Host "Please install uv first:" -ForegroundColor Yellow
    Write-Host "  powershell -ExecutionPolicy ByPass -c `"irm https://astral.sh/uv/install.ps1 | iex`"" -ForegroundColor Cyan
}

