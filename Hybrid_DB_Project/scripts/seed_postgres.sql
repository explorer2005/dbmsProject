-- =====================================================
-- Seed Data for Hybrid_DB_Project
-- =====================================================
-- This file contains sample data for testing the database
-- =====================================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE order_items, orders, product_reviews, inventory_transactions, 
--              notifications, products, categories, users, inventory_summary CASCADE;

-- =====================================================
-- SEED USERS
-- =====================================================
INSERT INTO users (user_id, username, email, password_hash, full_name, phone, role, is_active, email_verified) VALUES
('a1b2c3d4-e5f6-4789-a012-345678901234', 'admin_user', 'admin@hybriddb.com', '$2b$10$example_hash_admin', 'Admin User', '+1234567890', 'admin', TRUE, TRUE),
('b2c3d4e5-f6a7-4890-b123-456789012345', 'john_doe', 'john.doe@email.com', '$2b$10$example_hash_john', 'John Doe', '+1234567891', 'customer', TRUE, TRUE),
('c3d4e5f6-a7b8-4901-c234-567890123456', 'jane_smith', 'jane.smith@email.com', '$2b$10$example_hash_jane', 'Jane Smith', '+1234567892', 'customer', TRUE, TRUE),
('d4e5f6a7-b8c9-4012-d345-678901234567', 'manager1', 'manager@hybriddb.com', '$2b$10$example_hash_manager', 'Manager One', '+1234567893', 'manager', TRUE, TRUE);

-- =====================================================
-- SEED CATEGORIES
-- =====================================================
INSERT INTO categories (category_id, name, description, is_active) VALUES
('e5f6a7b8-c9d0-4123-e456-789012345678', 'Electronics', 'Electronic devices and gadgets', TRUE),
('f6a7b8c9-d0e1-4234-f567-890123456789', 'Clothing', 'Apparel and fashion items', TRUE),
('a7b8c9d0-e1f2-4345-a678-901234567890', 'Books', 'Books and publications', TRUE),
('b8c9d0e1-f2a3-4456-b789-012345678901', 'Home & Garden', 'Home improvement and garden supplies', TRUE),
('c9d0e1f2-a3b4-4567-c890-123456789012', 'Sports', 'Sports equipment and accessories', TRUE);

-- =====================================================
-- SEED PRODUCTS
-- =====================================================
INSERT INTO products (product_id, sku, name, description, category_id, price, cost_price, stock_quantity, min_stock_level, max_stock_level, weight_kg, is_active, is_featured, created_by) VALUES
-- Electronics
('11111111-1111-4111-8111-111111111111', 'ELEC-001', 'Wireless Bluetooth Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 'e5f6a7b8-c9d0-4123-e456-789012345678', 199.99, 120.00, 45, 10, 100, 0.35, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('22222222-2222-4222-8222-222222222222', 'ELEC-002', 'Smart Watch Pro', 'Advanced smartwatch with health tracking and GPS', 'e5f6a7b8-c9d0-4123-e456-789012345678', 349.99, 200.00, 28, 15, 80, 0.05, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('33333333-3333-4333-8333-333333333333', 'ELEC-003', 'USB-C Charging Cable', 'Fast charging USB-C cable, 6ft length', 'e5f6a7b8-c9d0-4123-e456-789012345678', 19.99, 8.00, 5, 20, 200, 0.02, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('44444444-4444-4444-8444-444444444444', 'ELEC-004', 'Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 'e5f6a7b8-c9d0-4123-e456-789012345678', 29.99, 15.00, 0, 10, 150, 0.08, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),

-- Clothing
('55555555-5555-4555-8555-555555555555', 'CLTH-001', 'Cotton T-Shirt', '100% organic cotton t-shirt, various colors', 'f6a7b8c9-d0e1-4234-f567-890123456789', 24.99, 12.00, 120, 30, 300, 0.15, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('66666666-6666-4666-8666-666666666666', 'CLTH-002', 'Denim Jeans', 'Classic fit denim jeans, multiple sizes', 'f6a7b8c9-d0e1-4234-f567-890123456789', 79.99, 40.00, 8, 20, 200, 0.60, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('77777777-7777-4777-8777-777777777777', 'CLTH-003', 'Winter Jacket', 'Warm winter jacket with insulation', 'f6a7b8c9-d0e1-4234-f567-890123456789', 149.99, 75.00, 35, 15, 100, 1.20, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),

-- Books
('88888888-8888-4888-8888-888888888888', 'BOOK-001', 'Database Design Fundamentals', 'Comprehensive guide to database design principles', 'a7b8c9d0-e1f2-4345-a678-901234567890', 49.99, 20.00, 25, 10, 100, 0.80, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('99999999-9999-4999-8999-999999999999', 'BOOK-002', 'PostgreSQL Advanced Techniques', 'Advanced PostgreSQL programming and optimization', 'a7b8c9d0-e1f2-4345-a678-901234567890', 59.99, 25.00, 15, 10, 80, 0.85, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'BOOK-003', 'Web Development Guide', 'Complete guide to modern web development', 'a7b8c9d0-e1f2-4345-a678-901234567890', 39.99, 18.00, 0, 10, 100, 0.75, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),

-- Home & Garden
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'HOME-001', 'Garden Tool Set', 'Complete set of gardening tools', 'b8c9d0e1-f2a3-4456-b789-012345678901', 89.99, 45.00, 18, 10, 50, 2.50, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'HOME-002', 'Indoor Plant Pot', 'Decorative ceramic plant pot, 12 inch', 'b8c9d0e1-f2a3-4456-b789-012345678901', 34.99, 15.00, 42, 20, 100, 1.00, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),

-- Sports
('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'SPRT-001', 'Yoga Mat', 'Premium non-slip yoga mat, 6mm thickness', 'c9d0e1f2-a3b4-4567-c890-123456789012', 44.99, 22.00, 30, 15, 80, 1.50, TRUE, TRUE, 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 'SPRT-002', 'Running Shoes', 'Professional running shoes with cushioning', 'c9d0e1f2-a3b4-4567-c890-123456789012', 129.99, 65.00, 12, 20, 150, 0.30, TRUE, FALSE, 'a1b2c3d4-e5f6-4789-a012-345678901234');

-- =====================================================
-- SEED ORDERS
-- =====================================================
INSERT INTO orders (order_id, user_id, order_number, status, subtotal, tax_amount, shipping_cost, discount_amount, total_amount, payment_method, payment_status, shipping_address) VALUES
('f1f1f1f1-f1f1-4f1f-8f1f-f1f1f1f1f1f1', 'b2c3d4e5-f6a7-4890-b123-456789012345', 'ORD-2024-001', 'delivered', 199.99, 16.00, 10.00, 0.00, 225.99, 'credit_card', 'paid', '123 Main St, City, State 12345'),
('f2f2f2f2-f2f2-4f2f-8f2f-f2f2f2f2f2f2', 'c3d4e5f6-a7b8-4901-c234-567890123456', 'ORD-2024-002', 'shipped', 349.99, 28.00, 15.00, 20.00, 372.99, 'paypal', 'paid', '456 Oak Ave, City, State 12346'),
('f3f3f3f3-f3f3-4f3f-8f3f-f3f3f3f3f3f3', 'b2c3d4e5-f6a7-4890-b123-456789012345', 'ORD-2024-003', 'processing', 149.99, 12.00, 10.00, 0.00, 171.99, 'credit_card', 'paid', '123 Main St, City, State 12345'),
('f4f4f4f4-f4f4-4f4f-8f4f-f4f4f4f4f4f4', 'c3d4e5f6-a7b8-4901-c234-567890123456', 'ORD-2024-004', 'pending', 79.99, 6.40, 8.00, 0.00, 94.39, 'credit_card', 'pending', '456 Oak Ave, City, State 12346');

-- =====================================================
-- SEED ORDER ITEMS
-- =====================================================
INSERT INTO order_items (order_id, product_id, quantity, unit_price, discount_percent, line_total) VALUES
('f1f1f1f1-f1f1-4f1f-8f1f-f1f1f1f1f1f1', '11111111-1111-4111-8111-111111111111', 1, 199.99, 0, 199.99),
('f2f2f2f2-f2f2-4f2f-8f2f-f2f2f2f2f2f2', '22222222-2222-4222-8222-222222222222', 1, 349.99, 5.71, 329.99),
('f3f3f3f3-f3f3-4f3f-8f3f-f3f3f3f3f3f3', '77777777-7777-4777-8777-777777777777', 1, 149.99, 0, 149.99),
('f4f4f4f4-f4f4-4f4f-8f4f-f4f4f4f4f4f4', '66666666-6666-4666-8666-666666666666', 1, 79.99, 0, 79.99);

-- =====================================================
-- SEED PRODUCT REVIEWS
-- =====================================================
INSERT INTO product_reviews (product_id, user_id, order_id, rating, title, comment, is_verified_purchase, is_approved, helpful_count) VALUES
('11111111-1111-4111-8111-111111111111', 'b2c3d4e5-f6a7-4890-b123-456789012345', 'f1f1f1f1-f1f1-4f1f-8f1f-f1f1f1f1f1f1', 5, 'Excellent headphones!', 'Great sound quality and battery life. Highly recommend!', TRUE, TRUE, 12),
('22222222-2222-4222-8222-222222222222', 'c3d4e5f6-a7b8-4901-c234-567890123456', 'f2f2f2f2-f2f2-4f2f-8f2f-f2f2f2f2f2f2', 4, 'Good smartwatch', 'Nice features but battery could be better', TRUE, TRUE, 8),
('77777777-7777-4777-8777-777777777777', 'b2c3d4e5-f6a7-4890-b123-456789012345', 'f3f3f3f3-f3f3-4f3f-8f3f-f3f3f3f3f3f3', 5, 'Warm and comfortable', 'Perfect for winter, very warm and well-made', TRUE, TRUE, 5),
('88888888-8888-4888-8888-888888888888', 'c3d4e5f6-a7b8-4901-c234-567890123456', NULL, 5, 'Great reference book', 'Comprehensive and well-written', FALSE, TRUE, 3);

-- =====================================================
-- SEED INVENTORY TRANSACTIONS
-- =====================================================
INSERT INTO inventory_transactions (product_id, transaction_type, quantity_change, previous_quantity, new_quantity, unit_cost, reference_type, created_by) VALUES
('11111111-1111-4111-8111-111111111111', 'purchase', 50, 0, 50, 120.00, 'purchase_order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('11111111-1111-4111-8111-111111111111', 'sale', -5, 50, 45, 120.00, 'order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('22222222-2222-4222-8222-222222222222', 'purchase', 30, 0, 30, 200.00, 'purchase_order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('22222222-2222-4222-8222-222222222222', 'sale', -2, 30, 28, 200.00, 'order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('33333333-3333-4333-8333-333333333333', 'purchase', 25, 0, 25, 8.00, 'purchase_order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('33333333-3333-4333-8333-333333333333', 'sale', -20, 25, 5, 8.00, 'order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('44444444-4444-4444-8444-444444444444', 'purchase', 15, 0, 15, 15.00, 'purchase_order', 'a1b2c3d4-e5f6-4789-a012-345678901234'),
('44444444-4444-4444-8444-444444444444', 'sale', -15, 15, 0, 15.00, 'order', 'a1b2c3d4-e5f6-4789-a012-345678901234');

-- =====================================================
-- SEED NOTIFICATIONS
-- =====================================================
INSERT INTO notifications (user_id, type, title, message, is_read, link_url) VALUES
('b2c3d4e5-f6a7-4890-b123-456789012345', 'order_confirmed', 'Order Confirmed', 'Your order ORD-2024-001 has been confirmed and is being processed.', TRUE, '/orders/ORD-2024-001'),
('b2c3d4e5-f6a7-4890-b123-456789012345', 'order_shipped', 'Order Shipped', 'Your order ORD-2024-001 has been shipped!', TRUE, '/orders/ORD-2024-001'),
('b2c3d4e5-f6a7-4890-b123-456789012345', 'order_delivered', 'Order Delivered', 'Your order ORD-2024-001 has been delivered.', FALSE, '/orders/ORD-2024-001'),
('c3d4e5f6-a7b8-4901-c234-567890123456', 'order_confirmed', 'Order Confirmed', 'Your order ORD-2024-002 has been confirmed.', TRUE, '/orders/ORD-2024-002'),
('c3d4e5f6-a7b8-4901-c234-567890123456', 'order_shipped', 'Order Shipped', 'Your order ORD-2024-002 has been shipped!', FALSE, '/orders/ORD-2024-002');

-- =====================================================
-- VERIFY DATA
-- =====================================================
-- Run these queries to verify the seed data:
-- SELECT COUNT(*) FROM users;          -- Should return 4
-- SELECT COUNT(*) FROM categories;    -- Should return 5
-- SELECT COUNT(*) FROM products;       -- Should return 14
-- SELECT COUNT(*) FROM orders;         -- Should return 4
-- SELECT COUNT(*) FROM order_items;    -- Should return 4
-- SELECT COUNT(*) FROM product_reviews; -- Should return 4
-- SELECT COUNT(*) FROM inventory_transactions; -- Should return 8
-- SELECT COUNT(*) FROM notifications;  -- Should return 5

