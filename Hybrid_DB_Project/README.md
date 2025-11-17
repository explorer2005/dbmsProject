# 🔄 Hybrid_DB_Project

A full-stack web application demonstrating hybrid database architecture using **PostgreSQL** and **Firebase (Firestore)**.

## 🎯 Features

- ✅ **PostgreSQL Database** - Advanced schema with 9 tables, indexes, triggers, and stored procedures
- ✅ **PL/pgSQL Cursor Procedure** - Demonstrates cursor-based inventory calculations
- ✅ **Firebase Integration** - Firestore for real-time data caching
- ✅ **Express Backend** - RESTful API with PostgreSQL and Firebase Admin SDK
- ✅ **React Frontend** - Modern UI with Vite, displaying real-time data
- ✅ **Full-Stack Integration** - Complete end-to-end application
- ✅ **Notifications Center** - Firestore-backed alerts viewer

## 📋 Prerequisites

Before running the application, ensure you have:

- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ PostgreSQL 18+ - [Download](https://www.postgresql.org/download/)
- ✅ npm (comes with Node.js)
- ✅ Git (optional, for version control)

## 🚀 Quick Start

### 1. Verify PostgreSQL is Running

```powershell
# Check PostgreSQL service status
Get-Service postgresql-x64-18

# If not running, start it:
Start-Service postgresql-x64-18
```

### 2. Start the Backend Server

Open a **new terminal window** and run:

```powershell
cd Hybrid_DB_Project\backend
node index.js
```

You should see:
```
🚀 Server running on http://localhost:4000
📊 Health check: http://localhost:4000/health
📦 Products API: http://localhost:4000/api/products
✓ PostgreSQL connected
```

**Keep this terminal open!** The backend must be running for the frontend to work.

### 3. Start the Frontend Development Server

Open **another new terminal window** and run:

```powershell
cd Hybrid_DB_Project\frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 4. Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the **Hybrid DB Project** dashboard! 🎉

## 📁 Project Structure

```
Hybrid_DB_Project/
├── backend/              # Express.js backend server
│   ├── index.js         # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
│
├── frontend/            # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
│
└── scripts/             # Setup and utility scripts
    ├── schema.sql       # PostgreSQL schema
    ├── seed_postgres.sql # Sample data
    ├── cursor_procedure.sql # PL/pgSQL procedure
    ├── seed_firestore.js # Firestore seeding script
    └── postgres_credentials.txt # Database credentials
```

## 🔧 Configuration

### Backend Configuration

The backend uses environment variables. Create a `.env` file in the `backend/` directory:

```env
# PostgreSQL Configuration
DB_USER=hybrid_user
DB_HOST=localhost
DB_NAME=hybrid_project_db
DB_PASSWORD=TQiPgZot281cV3bz
DB_PORT=5432

# Server Configuration
PORT=4000

# Firebase Admin (optional)
# FIREBASE_SERVICE_ACCOUNT_PATH=../scripts/firebase-service-account.json
```

**Note:** If you don't create a `.env` file, the backend will use default values from the code.

### Firebase Configuration

Firebase web configuration is already set up in:
- `frontend/src/firebase-config.js` (if you need to update it)

## 🔥 Setting Up Firebase (Optional)

### Step 1: Get Service Account JSON

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **dbms-f81b8**
3. Click **⚙️ Settings** → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Save the downloaded JSON file as `firebase-service-account.json` in `scripts/` folder

**Detailed instructions:** See `scripts/GET_FIREBASE_SERVICE_ACCOUNT.md`

### Step 2: Seed Firestore

```powershell
cd Hybrid_DB_Project\scripts
node seed_firestore.js firebase-service-account.json
```

### Step 3: Enable Firebase in Backend

1. Add to `backend/.env`:
   ```
   FIREBASE_SERVICE_ACCOUNT_PATH=../scripts/firebase-service-account.json
   ```

2. Restart the backend server

## 📡 API Endpoints

### Health Check
```
GET http://localhost:4000/health
```

### Products
```
GET http://localhost:4000/api/products
GET http://localhost:4000/api/products/:id
```

### Inventory
```
GET http://localhost:4000/api/inventory/summary
```

### Firestore (if Firebase is configured)
```
GET http://localhost:4000/api/firestore/products
GET http://localhost:4000/api/firestore/notifications/:userId
```

## 🎨 Frontend Features

### Dashboard
- Real-time statistics from PostgreSQL
- Total products, inventory value, stock alerts
- Auto-refresh capability

### Products Catalog
- Browse all products from database
- Stock status indicators (In Stock, Low Stock, Out of Stock)
- Product details with ratings and descriptions

### Inventory Summary
- Cursor procedure results
- Total stock value calculations
- Low stock and out-of-stock alerts

### System Health
- Backend connectivity status
- PostgreSQL connection status
- Firebase connection status (if configured)

### Notifications Center
- Reads notifications from Firestore via `/api/firestore/notifications/:userId`
- Default user ID (seed data): `b2c3d4e5-f6a7-4890-b123-456789012345`
- Enter any other user ID to filter alerts dynamically

## 🗄️ Database Information

### Connection Details
- **Host:** localhost
- **Port:** 5432
- **Database:** hybrid_project_db
- **Username:** hybrid_user
- **Password:** See `scripts/postgres_credentials.txt`

### Connect via psql
```powershell
$env:PGPASSWORD='TQiPgZot281cV3bz'
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U hybrid_user -d hybrid_project_db
```

### Database Schema
- **9 Tables:** users, categories, products, orders, order_items, product_reviews, inventory_transactions, inventory_summary, notifications
- **25+ Indexes** for performance
- **5 Triggers** for auto-updates
- **3 Functions** including cursor procedure
- **3 Views** for common queries

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check PostgreSQL service is running: `Get-Service postgresql-x64-18`
- ✅ Verify credentials in `scripts/postgres_credentials.txt`
- ✅ Check port 4000 is not in use: `netstat -ano | findstr :4000`

### Frontend can't connect to backend
- ✅ Make sure backend is running on port 4000
- ✅ Check browser console for CORS errors
- ✅ Verify `vite.config.js` proxy settings

### PostgreSQL connection errors
- ✅ Verify PostgreSQL service is running
- ✅ Check credentials are correct
- ✅ Test connection: `psql -U hybrid_user -d hybrid_project_db`

### Firebase errors
- ✅ Verify service account JSON path is correct
- ✅ Check Firestore is enabled in Firebase Console
- ✅ Ensure project ID matches: `dbms-f81b8`

## 📚 Additional Documentation

- **Setup Report:** `SETUP_REPORT.md` - Complete setup documentation
- **Firebase Guide:** `scripts/GET_FIREBASE_SERVICE_ACCOUNT.md` - How to get service account
- **Setup Log:** `scripts/setup_log.txt` - Detailed setup log
- **Firebase Instructions:** `scripts/FIREBASE_SETUP_INSTRUCTIONS.md`

## 🛠️ Development

### Backend Development
```powershell
cd backend
node index.js
```

### Frontend Development
```powershell
cd frontend
npm run dev
```

### Build Frontend for Production
```powershell
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## 📝 Scripts

### Verify Setup
```powershell
cd Hybrid_DB_Project\scripts
.\setup_complete.ps1
```

### Seed Firestore
```powershell
cd Hybrid_DB_Project\scripts
node seed_firestore.js <path-to-service-account.json>
```

## 🔒 Security Notes

- ⚠️ **Never commit** `postgres_credentials.txt` to git
- ⚠️ **Never commit** Firebase service account JSON files
- ⚠️ **Use `.env` files** for sensitive configuration
- ⚠️ **Keep credentials secure** and private

The `.gitignore` file is already configured to exclude sensitive files.

## 📊 Sample Data

The database comes pre-seeded with:
- 4 users (admin, manager, 2 customers)
- 5 categories (Electronics, Clothing, Books, Home & Garden, Sports)
- 14 products with varied stock levels
- 4 orders with order items
- Product reviews and inventory transactions

## 🎓 Learning Resources

- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Firebase Docs:** https://firebase.google.com/docs
- **React Docs:** https://react.dev/
- **Express Docs:** https://expressjs.com/

## 📄 License

This project is for educational purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the setup log: `scripts/setup_log.txt`
3. Check backend and frontend console logs

---

**Happy Coding! 🚀**

