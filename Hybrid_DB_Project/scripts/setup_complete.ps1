# =====================================================
# Hybrid_DB_Project Setup Script
# =====================================================
# This script contains all commands used during setup
# Run this script to verify or repeat setup steps
# =====================================================

Write-Host "Hybrid_DB_Project Setup Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# PostgreSQL Connection Info
$DB_USER = "hybrid_user"
$DB_NAME = "hybrid_project_db"
$DB_PASSWORD = "TQiPgZot281cV3bz"
$PSQL_PATH = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

# Set environment variable for psql
$env:PGPASSWORD = $DB_PASSWORD

Write-Host "`n1. Verifying PostgreSQL Connection..." -ForegroundColor Yellow
& $PSQL_PATH -U $DB_USER -d $DB_NAME -c "SELECT version();"

Write-Host "`n2. Listing Tables..." -ForegroundColor Yellow
& $PSQL_PATH -U $DB_USER -d $DB_NAME -c "\dt"

Write-Host "`n3. Counting Products..." -ForegroundColor Yellow
& $PSQL_PATH -U $DB_USER -d $DB_NAME -c "SELECT COUNT(*) as product_count FROM products;"

Write-Host "`n4. Testing Cursor Procedure..." -ForegroundColor Yellow
& $PSQL_PATH -U $DB_USER -d $DB_NAME -c "SELECT * FROM test_cursor_proc();"

Write-Host "`n5. Getting Latest Inventory Summary..." -ForegroundColor Yellow
& $PSQL_PATH -U $DB_USER -d $DB_NAME -c "SELECT * FROM inventory_summary ORDER BY created_at DESC LIMIT 1;"

Write-Host "`n6. Testing Backend Health Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/health" -UseBasicParsing
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "Backend not running. Start it with: cd backend && node index.js" -ForegroundColor Red
}

Write-Host "`n7. Testing Products API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/products" -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Products returned: $($data.count)" -ForegroundColor Green
} catch {
    Write-Host "Backend not running or endpoint unavailable" -ForegroundColor Red
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Setup verification complete!" -ForegroundColor Green
Write-Host "`nTo start backend server:" -ForegroundColor Yellow
Write-Host "  cd Hybrid_DB_Project\backend" -ForegroundColor Gray
Write-Host "  node index.js" -ForegroundColor Gray
Write-Host "`nTo seed Firestore:" -ForegroundColor Yellow
Write-Host "  cd Hybrid_DB_Project\scripts" -ForegroundColor Gray
Write-Host "  node seed_firestore.js <path-to-service-account.json>" -ForegroundColor Gray

