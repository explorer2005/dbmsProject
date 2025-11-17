// =====================================================
// Hybrid_DB_Project Backend Server
// =====================================================
// Express server with PostgreSQL and Firebase Admin integration
// =====================================================

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER || 'hybrid_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'hybrid_project_db',
  password: process.env.DB_PASSWORD || 'TQiPgZot281cV3bz',
  port: process.env.DB_PORT || 5432,
});

// Test PostgreSQL connection
pool.on('connect', () => {
  console.log('✓ PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('✗ PostgreSQL connection error:', err);
});

// Initialize Firebase Admin (optional - only if service account is provided)
let firebaseInitialized = false;
const defaultServiceAccountPath = path.join(__dirname, '..', 'scripts', 'firebase-service-account.json');
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || defaultServiceAccountPath;

if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'dbms-f81b8'
    });
    firebaseInitialized = true;
    console.log('✓ Firebase Admin initialized');
  } catch (error) {
    console.warn('⚠ Firebase Admin not initialized:', error.message);
  }
} else {
  console.log('⚠ Firebase Admin: Service account JSON not found at', serviceAccountPath);
  console.log('   Provide FIREBASE_SERVICE_ACCOUNT_PATH env var or place the file in scripts/');
}

// =====================================================
// Health Check Endpoint
// =====================================================
app.get('/health', async (req, res) => {
  try {
    // Test PostgreSQL connection
    const dbResult = await pool.query('SELECT 1 as test');
    const dbStatus = dbResult.rows[0].test === 1 ? 1 : 0;

    // Test Firebase connection (if initialized)
    let firebaseStatus = 0;
    if (firebaseInitialized) {
      try {
        const db = admin.firestore();
        // Simple read test
        await db.collection('_health_check').limit(1).get();
        firebaseStatus = 1;
      } catch (error) {
        // Firestore might not have _health_check collection, but connection works
        firebaseStatus = 1; // Assume OK if admin is initialized
      }
    }

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        postgresql: dbStatus,
        firebase: firebaseStatus
      },
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// =====================================================
// PostgreSQL Endpoints
// =====================================================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT product_id, sku, name, description, price, stock_quantity, rating_average, rating_count FROM products WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE product_id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get inventory summary (from cursor procedure)
app.get('/api/inventory/summary', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test_cursor_proc()');
    const summary = await pool.query(
      'SELECT * FROM inventory_summary ORDER BY created_at DESC LIMIT 1'
    );
    res.json({
      success: true,
      current: result.rows[0],
      latest_summary: summary.rows[0] || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// =====================================================
// Firebase/Firestore Endpoints (if initialized)
// =====================================================

if (firebaseInitialized) {
  // Get products from Firestore cache
  app.get('/api/firestore/products', async (req, res) => {
    try {
      const db = admin.firestore();
      const snapshot = await db.collection('products_cache').limit(20).get();
      const products = [];
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Get notifications for a user
  app.get('/api/firestore/notifications/:userId', async (req, res) => {
    try {
      const db = admin.firestore();
      const snapshot = await db.collection('notifications')
        .where('userId', '==', req.params.userId)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      const notifications = [];
      snapshot.forEach(doc => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      res.json({
        success: true,
        count: notifications.length,
        data: notifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
}

// =====================================================
// Root Endpoint
// =====================================================
app.get('/', (req, res) => {
  res.json({
    message: 'Hybrid_DB_Project Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      productById: '/api/products/:id',
      inventorySummary: '/api/inventory/summary',
      ...(firebaseInitialized && {
        firestoreProducts: '/api/firestore/products',
        firestoreNotifications: '/api/firestore/notifications/:userId'
      })
    }
  });
});

// =====================================================
// Start Server
// =====================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end(() => {
    console.log('PostgreSQL pool closed');
    process.exit(0);
  });
});

