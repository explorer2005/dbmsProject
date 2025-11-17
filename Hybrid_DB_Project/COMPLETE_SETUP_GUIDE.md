# 🎯 Complete Setup & Run Guide

## 📋 Table of Contents

1. [Getting Firebase Service Account JSON](#getting-firebase-service-account-json)
2. [Running the Complete Application](#running-the-complete-application)
3. [Application Features](#application-features)
4. [Troubleshooting](#troubleshooting)

---

## 🔥 Getting Firebase Service Account JSON

### Quick Steps:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Select Your Project**
   - Click on: **dbms-f81b8**

3. **Open Project Settings**
   - Click the **⚙️ gear icon** (top left)
   - Select **Project settings**

4. **Go to Service Accounts Tab**
   - Click the **"Service accounts"** tab at the top

5. **Generate Private Key**
   - Scroll to **"Firebase Admin SDK"** section
   - Click **"Generate new private key"**
   - Click **"Generate key"** to confirm
   - A JSON file will download automatically

6. **Save the File**
   - Move it to: `Hybrid_DB_Project/scripts/`
   - Rename to: `firebase-service-account.json`
   - **⚠️ NEVER commit this file to git!**

### Detailed Instructions
See: `scripts/GET_FIREBASE_SERVICE_ACCOUNT.md`

---

## 🚀 Running the Complete Application

### Prerequisites Check ✅

```powershell
# Check Node.js
node --version  # Should be v18 or higher

# Check PostgreSQL
Get-Service postgresql-x64-18  # Should be Running
```

### Step-by-Step Instructions

#### **Step 1: Start Backend Server**

Open **Terminal 1** (PowerShell or Command Prompt):

```powershell
cd Hybrid_DB_Project\backend
node index.js
```

**✅ Expected Output:**
```
🚀 Server running on http://localhost:4000
📊 Health check: http://localhost:4000/health
📦 Products API: http://localhost:4000/api/products
✓ PostgreSQL connected
```

**⚠️ Keep this terminal open!**

---

#### **Step 2: Start Frontend Server**

Open **Terminal 2** (new window):

```powershell
cd Hybrid_DB_Project\frontend
npm run dev
```

**✅ Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**⚠️ Keep this terminal open too!**

---

#### **Step 3: Open in Browser**

Open your web browser and navigate to:

```
http://localhost:3000
```

**🎉 You should see the Hybrid DB Project dashboard!**

---

## 🎨 Application Features

### 1. Dashboard Tab
- **Real-time Statistics**
  - Total products count
  - Total inventory value
  - Low stock alerts
  - Out of stock items
- **Auto-refresh** button to update data

### 2. Products Tab
- **Product Catalog**
  - Browse all 14 products from PostgreSQL
  - Stock status indicators:
    - 🟢 In Stock
    - 🟡 Low Stock
    - 🔴 Out of Stock
  - Product details:
    - SKU, name, description
    - Price, stock quantity
    - Ratings and reviews

### 3. Inventory Tab
- **Cursor Procedure Results**
  - Shows results from `test_cursor_proc()`
  - Total products processed
  - Total stock value calculated
  - Low stock and out-of-stock counts
- **Latest Summary Record**
  - Timestamp of last calculation
  - Summary ID

### 4. System Health Tab
- **Backend Status**
  - Connection status
  - Uptime information
- **Service Status**
  - ✅ PostgreSQL: Online/Offline
  - ✅ Firebase: Online/Offline (if configured)
- **Troubleshooting** guide if services are down

---

## 🔧 Optional: Enable Firebase Features

### Step 1: Get Service Account JSON
Follow the instructions in the [Getting Firebase Service Account JSON](#getting-firebase-service-account-json) section above.

### Step 2: Seed Firestore

```powershell
cd Hybrid_DB_Project\scripts
node seed_firestore.js firebase-service-account.json
```

**✅ Expected Output:**
```
🚀 Starting Firestore seeding...
📁 Using service account: firebase-service-account.json
✓ Firebase Admin initialized successfully

📦 Seeding products_cache collection...
✓ Successfully seeded 6 products to products_cache

🔔 Seeding notifications collection...
✓ Successfully seeded 5 notifications

🔍 Verifying seeded data...
✓ products_cache: Found document with name "Wireless Bluetooth Headphones" and stock 45
✓ notifications: Found document with title "Order Confirmed"

✅ Firestore seeding completed successfully!
   - Products cached: 6
   - Notifications: 5
```

### Step 3: Configure Backend

Create `backend/.env` file:

```env
DB_USER=hybrid_user
DB_HOST=localhost
DB_NAME=hybrid_project_db
DB_PASSWORD=TQiPgZot281cV3bz
DB_PORT=5432
PORT=4000
FIREBASE_SERVICE_ACCOUNT_PATH=../scripts/firebase-service-account.json
```

### Step 4: Restart Backend

Stop the backend (Ctrl+C) and restart:

```powershell
cd Hybrid_DB_Project\backend
node index.js
```

You should now see:
```
✓ Firebase Admin initialized
```

---

## 🐛 Troubleshooting

### Problem: Backend won't start

**Symptoms:**
- Error: "Cannot connect to PostgreSQL"
- Error: "Port 4000 already in use"

**Solutions:**

1. **Check PostgreSQL Service:**
   ```powershell
   Get-Service postgresql-x64-18
   ```
   If not running:
   ```powershell
   Start-Service postgresql-x64-18
   ```

2. **Check Port 4000:**
   ```powershell
   netstat -ano | findstr :4000
   ```
   If in use, kill the process or change port in `backend/index.js`

3. **Verify Credentials:**
   - Check `scripts/postgres_credentials.txt`
   - Test connection:
     ```powershell
     $env:PGPASSWORD='TQiPgZot281cV3bz'
     & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U hybrid_user -d hybrid_project_db -c "SELECT 1;"
     ```

---

### Problem: Frontend can't connect to backend

**Symptoms:**
- "Backend not reachable" error
- CORS errors in browser console
- Network errors

**Solutions:**

1. **Verify Backend is Running:**
   - Check Terminal 1 shows server is running
   - Test: `curl http://localhost:4000/health`

2. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for error messages

3. **Verify Proxy Settings:**
   - Check `frontend/vite.config.js` has correct proxy:
     ```js
     proxy: {
       '/api': {
         target: 'http://localhost:4000',
         changeOrigin: true
       }
     }
     ```

---

### Problem: "Cannot find module" errors

**Symptoms:**
- Module not found errors
- Missing dependencies

**Solutions:**

1. **Install Backend Dependencies:**
   ```powershell
   cd Hybrid_DB_Project\backend
   npm install
   ```

2. **Install Frontend Dependencies:**
   ```powershell
   cd Hybrid_DB_Project\frontend
   npm install
   ```

---

### Problem: Firebase not working

**Symptoms:**
- Firebase status shows "Offline"
- Firestore endpoints return errors

**Solutions:**

1. **Verify Service Account File:**
   - Check file exists: `scripts/firebase-service-account.json`
   - Verify file is valid JSON

2. **Check Backend .env:**
   - Ensure `FIREBASE_SERVICE_ACCOUNT_PATH` is set correctly
   - Use relative path: `../scripts/firebase-service-account.json`

3. **Restart Backend:**
   - Stop backend (Ctrl+C)
   - Start again: `node index.js`
   - Look for: `✓ Firebase Admin initialized`

4. **Verify Firestore is Enabled:**
   - Go to Firebase Console
   - Check Firestore Database is created
   - Verify project ID: `dbms-f81b8`

---

## 📊 Testing the Application

### Test Backend API

```powershell
# Health check
curl http://localhost:4000/health

# Get all products
curl http://localhost:4000/api/products

# Get inventory summary
curl http://localhost:4000/api/inventory/summary

# Get specific product
curl http://localhost:4000/api/products/11111111-1111-4111-8111-111111111111
```

### Test Frontend

1. Open http://localhost:3000
2. Click through all tabs:
   - Dashboard
   - Products
   - Inventory
   - System Health
3. Verify data loads correctly
4. Check browser console (F12) for errors

---

## 📝 Quick Reference

### Start Application
```powershell
# Terminal 1 - Backend
cd Hybrid_DB_Project\backend
node index.js

# Terminal 2 - Frontend
cd Hybrid_DB_Project\frontend
npm run dev
```

### Stop Application
- Press `Ctrl + C` in both terminals

### URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Health Check:** http://localhost:4000/health

### Database
- **Host:** localhost
- **Port:** 5432
- **Database:** hybrid_project_db
- **User:** hybrid_user
- **Password:** See `scripts/postgres_credentials.txt`

---

## 🎓 What You've Built

✅ **Full-Stack Application**
- React frontend with modern UI
- Express backend with RESTful API
- PostgreSQL database with advanced schema
- Firebase integration for real-time features

✅ **Advanced Database Features**
- PL/pgSQL cursor-based stored procedures
- Triggers for auto-updates
- Views for common queries
- Comprehensive indexes

✅ **Production-Ready Structure**
- Environment variable configuration
- Error handling
- Security best practices
- Comprehensive documentation

---

## 📚 Additional Resources

- **Main README:** [README.md](README.md)
- **Quick Start:** [HOW_TO_RUN.md](HOW_TO_RUN.md)
- **Firebase Guide:** `scripts/GET_FIREBASE_SERVICE_ACCOUNT.md`
- **Setup Report:** [SETUP_REPORT.md](SETUP_REPORT.md)

---

## ✅ Success Checklist

- [ ] Backend server running on port 4000
- [ ] Frontend server running on port 3000
- [ ] Application opens in browser
- [ ] Dashboard shows statistics
- [ ] Products tab displays all products
- [ ] Inventory tab shows cursor procedure results
- [ ] System Health shows PostgreSQL online
- [ ] (Optional) Firebase configured and working

---

**🎉 Congratulations! Your Hybrid DB Project is fully operational!**

For questions or issues, refer to the troubleshooting section or check the setup log: `scripts/setup_log.txt`

