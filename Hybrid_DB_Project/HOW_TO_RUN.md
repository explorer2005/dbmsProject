# 🚀 How to Run Hybrid_DB_Project

## Quick Start Guide

Follow these steps to run the complete application:

---

## Step 1: Verify Prerequisites ✅

Make sure you have:
- ✅ Node.js installed (v18+)
- ✅ PostgreSQL running
- ✅ All dependencies installed

**Check PostgreSQL:**
```powershell
Get-Service postgresql-x64-18
```

If not running:
```powershell
Start-Service postgresql-x64-18
```

---

## Step 2: Start Backend Server 🖥️

### Open Terminal 1 (Backend)

```powershell
# Navigate to backend directory
cd Hybrid_DB_Project\backend

# Start the server
node index.js
```

**Expected Output:**
```
🚀 Server running on http://localhost:4000
📊 Health check: http://localhost:4000/health
📦 Products API: http://localhost:4000/api/products
✓ PostgreSQL connected
```

**✅ Keep this terminal open!** The backend must stay running.

---

## Step 3: Start Frontend Server 🎨

### Open Terminal 2 (Frontend)

```powershell
# Navigate to frontend directory
cd Hybrid_DB_Project\frontend

# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**✅ Keep this terminal open too!**

---

## Step 4: Open in Browser 🌐

Open your web browser and go to:

```
http://localhost:3000
```

You should see the **Hybrid DB Project** dashboard! 🎉

---

## What You'll See

### Dashboard Tab
- Total products count
- Inventory value
- Low stock alerts
- Out of stock items

### Products Tab
- Browse all 14 products
- See stock status
- View product details

### Inventory Tab
- Cursor procedure results
- Inventory summary statistics
- Latest summary records

### System Health Tab
- Backend connectivity
- PostgreSQL status
- Firebase status (if configured)

---

## Stopping the Application

### To Stop Frontend:
- Press `Ctrl + C` in the frontend terminal

### To Stop Backend:
- Press `Ctrl + C` in the backend terminal

---

## Troubleshooting

### ❌ "Backend not reachable" error

**Solution:**
1. Make sure backend is running in Terminal 1
2. Check it's on port 4000: `http://localhost:4000/health`
3. Verify PostgreSQL is running

### ❌ "Cannot find module" errors

**Solution:**
```powershell
# Install backend dependencies
cd Hybrid_DB_Project\backend
npm install

# Install frontend dependencies
cd Hybrid_DB_Project\frontend
npm install
```

### ❌ Port already in use

**Solution:**
- Backend (port 4000): Change `PORT` in `backend/.env` or `backend/index.js`
- Frontend (port 3000): Change `port` in `frontend/vite.config.js`

### ❌ PostgreSQL connection error

**Solution:**
1. Check PostgreSQL service: `Get-Service postgresql-x64-18`
2. Verify credentials in `scripts/postgres_credentials.txt`
3. Test connection manually:
   ```powershell
   $env:PGPASSWORD='TQiPgZot281cV3bz'
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U hybrid_user -d hybrid_project_db -c "SELECT 1;"
   ```

---

## Optional: Enable Firebase

### Step 1: Get Service Account JSON
See: `scripts/GET_FIREBASE_SERVICE_ACCOUNT.md`

### Step 2: Seed Firestore
```powershell
cd Hybrid_DB_Project\scripts
node seed_firestore.js firebase-service-account.json
```

### Step 3: Update Backend .env
Add to `backend/.env`:
```
FIREBASE_SERVICE_ACCOUNT_PATH=../scripts/firebase-service-account.json
```

### Step 4: Restart Backend
Stop and restart the backend server to load Firebase.

---

## Testing the Application

### Test Backend API
```powershell
# Health check
curl http://localhost:4000/health

# Get products
curl http://localhost:4000/api/products

# Get inventory summary
curl http://localhost:4000/api/inventory/summary
```

### Test Frontend
1. Open http://localhost:3000
2. Click through all tabs
3. Verify data is loading
4. Check browser console for errors (F12)

---

## Development Workflow

### Making Changes

**Backend Changes:**
1. Edit `backend/index.js`
2. Save the file
3. Restart backend (Ctrl+C, then `node index.js`)

**Frontend Changes:**
1. Edit files in `frontend/src/`
2. Save the file
3. Vite will auto-reload (hot module replacement)

---

## Production Build

### Build Frontend
```powershell
cd Hybrid_DB_Project\frontend
npm run build
```

Built files will be in `frontend/dist/`

### Serve Production Build
```powershell
cd Hybrid_DB_Project\frontend
npm run preview
```

---

## Summary

**To run the application:**

1. ✅ **Terminal 1:** `cd backend && node index.js`
2. ✅ **Terminal 2:** `cd frontend && npm run dev`
3. ✅ **Browser:** Open http://localhost:3000

**That's it!** 🎉

For more details, see the main [README.md](README.md)

