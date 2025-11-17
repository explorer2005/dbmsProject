// =====================================================
// Firestore Seeding Script for Hybrid_DB_Project
// =====================================================
// This script seeds Firestore with sample data for products_cache and notifications
// Usage: node seed_firestore.js <path-to-service-account.json>
// =====================================================

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Get service account path from command line argument
const serviceAccountPath = process.argv[2];

if (!serviceAccountPath) {
    console.error('ERROR: Service account JSON path is required!');
    console.log('Usage: node seed_firestore.js <path-to-service-account.json>');
    process.exit(1);
}

// Check if file exists
if (!fs.existsSync(serviceAccountPath)) {
    console.error(`ERROR: Service account file not found: ${serviceAccountPath}`);
    process.exit(1);
}

// Initialize Firebase Admin SDK
try {
    const serviceAccount = require(path.resolve(serviceAccountPath));
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'dbms-f81b8'
    });
    
    console.log('✓ Firebase Admin initialized successfully');
} catch (error) {
    console.error('ERROR: Failed to initialize Firebase Admin:', error.message);
    process.exit(1);
}

const db = admin.firestore();

// =====================================================
// Sample Data for Firestore
// =====================================================

const productsCacheData = [
    {
        productId: '11111111-1111-4111-8111-111111111111',
        sku: 'ELEC-001',
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        category: 'Electronics',
        price: 199.99,
        stock: 45,
        rating: 4.8,
        reviewCount: 127,
        imageUrl: 'https://example.com/images/headphones.jpg',
        isActive: true,
        isFeatured: true,
        lastSynced: admin.firestore.FieldValue.serverTimestamp(),
        syncedFrom: 'postgresql'
    },
    {
        productId: '22222222-2222-4222-8222-222222222222',
        sku: 'ELEC-002',
        name: 'Smart Watch Pro',
        description: 'Advanced smartwatch with health tracking and GPS',
        category: 'Electronics',
        price: 349.99,
        stock: 28,
        rating: 4.6,
        reviewCount: 89,
        imageUrl: 'https://example.com/images/smartwatch.jpg',
        isActive: true,
        isFeatured: true,
        lastSynced: admin.firestore.FieldValue.serverTimestamp(),
        syncedFrom: 'postgresql'
    },
    {
        productId: '55555555-5555-4555-8555-555555555555',
        sku: 'CLTH-001',
        name: 'Cotton T-Shirt',
        description: '100% organic cotton t-shirt, various colors',
        category: 'Clothing',
        price: 24.99,
        stock: 120,
        rating: 4.5,
        reviewCount: 234,
        imageUrl: 'https://example.com/images/tshirt.jpg',
        isActive: true,
        isFeatured: true,
        lastSynced: admin.firestore.FieldValue.serverTimestamp(),
        syncedFrom: 'postgresql'
    },
    {
        productId: '77777777-7777-4777-8777-777777777777',
        sku: 'CLTH-003',
        name: 'Winter Jacket',
        description: 'Warm winter jacket with insulation',
        category: 'Clothing',
        price: 149.99,
        stock: 35,
        rating: 4.9,
        reviewCount: 56,
        imageUrl: 'https://example.com/images/jacket.jpg',
        isActive: true,
        isFeatured: true,
        lastSynced: admin.firestore.FieldValue.serverTimestamp(),
        syncedFrom: 'postgresql'
    },
    {
        productId: '88888888-8888-4888-8888-888888888888',
        sku: 'BOOK-001',
        name: 'Database Design Fundamentals',
        description: 'Comprehensive guide to database design principles',
        category: 'Books',
        price: 49.99,
        stock: 25,
        rating: 4.7,
        reviewCount: 312,
        imageUrl: 'https://example.com/images/book1.jpg',
        isActive: true,
        isFeatured: true,
        lastSynced: admin.firestore.FieldValue.serverTimestamp(),
        syncedFrom: 'postgresql'
    },
    {
        productId: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
        sku: 'SPRT-001',
        name: 'Yoga Mat',
        description: 'Premium non-slip yoga mat, 6mm thickness',
        category: 'Sports',
        price: 44.99,
        stock: 30,
        rating: 4.6,
        reviewCount: 178,
        imageUrl: 'https://example.com/images/yogamat.jpg',
        isActive: true,
        isFeatured: true,
        lastSynced: admin.firestore.FieldValue.serverTimestamp(),
        syncedFrom: 'postgresql'
    }
];

const notificationsData = [
    {
        userId: 'b2c3d4e5-f6a7-4890-b123-456789012345',
        type: 'order_confirmed',
        title: 'Order Confirmed',
        message: 'Your order ORD-2024-001 has been confirmed and is being processed.',
        isRead: false,
        linkUrl: '/orders/ORD-2024-001',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        priority: 'normal'
    },
    {
        userId: 'b2c3d4e5-f6a7-4890-b123-456789012345',
        type: 'low_stock_alert',
        title: 'Low Stock Alert',
        message: 'Product "USB-C Charging Cable" is running low on stock (5 remaining).',
        isRead: false,
        linkUrl: '/products/ELEC-003',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        priority: 'high'
    },
    {
        userId: 'c3d4e5f6-a7b8-4901-c234-567890123456',
        type: 'order_shipped',
        title: 'Order Shipped',
        message: 'Your order ORD-2024-002 has been shipped! Track your package now.',
        isRead: false,
        linkUrl: '/orders/ORD-2024-002',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        priority: 'normal'
    },
    {
        userId: 'b2c3d4e5-f6a7-4890-b123-456789012345',
        type: 'product_review',
        title: 'New Review',
        message: 'You have a new review on "Wireless Bluetooth Headphones"',
        isRead: false,
        linkUrl: '/products/ELEC-001/reviews',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        priority: 'low'
    },
    {
        userId: 'a1b2c3d4-e5f6-4789-a012-345678901234',
        type: 'system_alert',
        title: 'Inventory Summary Updated',
        message: 'Inventory summary has been updated. 5 products are low on stock.',
        isRead: false,
        linkUrl: '/admin/inventory',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        priority: 'high'
    }
];

// =====================================================
// Seeding Functions
// =====================================================

async function seedProductsCache() {
    console.log('\n📦 Seeding products_cache collection...');
    const batch = db.batch();
    let count = 0;
    
    for (const product of productsCacheData) {
        const docRef = db.collection('products_cache').doc(product.productId);
        batch.set(docRef, product);
        count++;
    }
    
    await batch.commit();
    console.log(`✓ Successfully seeded ${count} products to products_cache`);
    return count;
}

async function seedNotifications() {
    console.log('\n🔔 Seeding notifications collection...');
    const batch = db.batch();
    let count = 0;
    
    for (const notification of notificationsData) {
        const docRef = db.collection('notifications').doc();
        batch.set(docRef, notification);
        count++;
    }
    
    await batch.commit();
    console.log(`✓ Successfully seeded ${count} notifications`);
    return count;
}

async function verifySeeding() {
    console.log('\n🔍 Verifying seeded data...');
    
    // Verify products_cache
    const productsSnapshot = await db.collection('products_cache').limit(1).get();
    if (!productsSnapshot.empty) {
        const product = productsSnapshot.docs[0].data();
        console.log(`✓ products_cache: Found document with name "${product.name}" and stock ${product.stock}`);
    } else {
        console.log('✗ products_cache: No documents found');
    }
    
    // Verify notifications
    const notificationsSnapshot = await db.collection('notifications').limit(1).get();
    if (!notificationsSnapshot.empty) {
        const notification = notificationsSnapshot.docs[0].data();
        console.log(`✓ notifications: Found document with title "${notification.title}"`);
    } else {
        console.log('✗ notifications: No documents found');
    }
}

// =====================================================
// Main Execution
// =====================================================

async function main() {
    try {
        console.log('🚀 Starting Firestore seeding...');
        console.log(`📁 Using service account: ${serviceAccountPath}`);
        
        const productsCount = await seedProductsCache();
        const notificationsCount = await seedNotifications();
        
        await verifySeeding();
        
        console.log('\n✅ Firestore seeding completed successfully!');
        console.log(`   - Products cached: ${productsCount}`);
        console.log(`   - Notifications: ${notificationsCount}`);
        
        process.exit(0);
    } catch (error) {
        console.error('\n❌ ERROR during Firestore seeding:', error);
        process.exit(1);
    }
}

// Run the seeding
main();

