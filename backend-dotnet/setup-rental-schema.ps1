# Quick Setup Script for Rental Building Schema Update
# Run this in PowerShell from the project root

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rental Building Schema Update Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set UTF-8 encoding
Write-Host "Setting UTF-8 encoding..." -ForegroundColor Yellow
chcp 65001 | Out-Null

# Navigate to backend-dotnet folder
Set-Location "d:\repos\angular-project\backend-dotnet"

# Step 1: Run Migration
Write-Host ""
Write-Host "Step 1: Running migration script..." -ForegroundColor Green
Write-Host "Adding new columns to RentalBuildings table..." -ForegroundColor Yellow
sqlcmd -S ANDREW-SAMY\MSSQLSERVER2 -d AngularProjectDB -i add-rental-building-columns.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migration completed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Migration failed! Check error messages above." -ForegroundColor Red
    exit 1
}

# Step 2: Re-populate Data
Write-Host ""
Write-Host "Step 2: Re-populating database with complete data..." -ForegroundColor Green
sqlcmd -S ANDREW-SAMY\MSSQLSERVER2 -d AngularProjectDB -i seed-database.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Data populated successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Data population failed! Check error messages above." -ForegroundColor Red
    exit 1
}

# Step 3: Instructions for API restart
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Restart your .NET API (Ctrl+C then 'dotnet run')" -ForegroundColor White
Write-Host "2. Navigate to: http://localhost:4200/rental-inquiry-building" -ForegroundColor White
Write-Host "3. Search using ID: 801234, 802456, or 803789" -ForegroundColor White
Write-Host "4. Click 'ℹ️ استعلام عن المبنى' to see all 33 fields!" -ForegroundColor White
Write-Host ""
Write-Host "Test Credentials:" -ForegroundColor Yellow
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "Sample Building IDs:" -ForegroundColor Yellow
Write-Host "  801234 - مدرسة عمر بن الخطاب الابتدائية" -ForegroundColor White
Write-Host "  802456 - مدرسة طلعت حرب الإعدادية" -ForegroundColor White
Write-Host "  803789 - مدرسة الإسكندرية الثانوية بنات" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
