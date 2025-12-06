-- Test Data Creation Script
-- Run this in Supabase SQL Editor to create comprehensive test data

-- 1. Create Test Hubs
INSERT INTO hubs (name, address, city, state, pincode, is_warehouse)
VALUES 
    ('Main Warehouse', '123 Industrial Area', 'Mumbai', 'Maharashtra', '400001', true),
    ('North Hub', '456 Business Park', 'Delhi', 'Delhi', '110001', false),
    ('South Hub', '789 Trade Center', 'Bangalore', 'Karnataka', '560001', false)
ON CONFLICT DO NOTHING;

-- 2. Create Test Users (if not exists)
-- Note: These users need to be created in Supabase Auth first
-- Then update their records in users table

-- 3. Create Test Products (if not already created)
-- Products should already exist from previous scripts

-- 4. Create Test Price Lists
INSERT INTO price_lists (name, description, is_default)
VALUES 
    ('Retail Price List', 'Standard retail pricing for all customers', true),
    ('Wholesale Price List', 'Wholesale pricing for bulk buyers', false),
    ('Promotional Price List', 'Special promotional pricing', false)
ON CONFLICT DO NOTHING;

-- 5. Add Products to Price Lists
-- Get first price list ID
DO $$
DECLARE
    retail_price_list_id UUID;
    product_ids UUID[];
BEGIN
    -- Get retail price list
    SELECT id INTO retail_price_list_id FROM price_lists WHERE name = 'Retail Price List' LIMIT 1;
    
    -- Get first 10 products
    SELECT ARRAY_AGG(id) INTO product_ids FROM products WHERE is_active = true LIMIT 10;
    
    -- Add products to price list
    IF retail_price_list_id IS NOT NULL AND product_ids IS NOT NULL THEN
        INSERT INTO price_list_items (price_list_id, product_id, mrp, trade_price, promotional_price, effective_from)
        SELECT 
            retail_price_list_id,
            unnest(product_ids),
            100.00,
            80.00,
            75.00,
            CURRENT_DATE
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- 6. Create Test Customers
INSERT INTO customers (
    name, phone, email, address, city, state, pincode, 
    gstin, price_list_id, credit_limit, is_active
)
SELECT 
    'Test Customer ' || generate_series(1, 5),
    '+919999999' || generate_series(10, 14),
    'customer' || generate_series(1, 5) || '@test.com',
    'Test Address ' || generate_series(1, 5),
    'Mumbai',
    'Maharashtra',
    '400001',
    '27AAAAA0000A' || generate_series(1, 5) || 'Z' || generate_series(1, 5),
    (SELECT id FROM price_lists WHERE name = 'Retail Price List' LIMIT 1),
    50000.00,
    true
ON CONFLICT (phone) DO NOTHING;

-- 7. Create Test Routes
INSERT INTO routes (name, description, is_active)
VALUES 
    ('Route A - North Zone', 'Covers northern areas of the city', true),
    ('Route B - South Zone', 'Covers southern areas of the city', true),
    ('Route C - Central Zone', 'Covers central business district', true)
ON CONFLICT DO NOTHING;

-- 8. Assign Customers to Routes
DO $$
DECLARE
    route_a_id UUID;
    route_b_id UUID;
    customer_ids UUID[];
BEGIN
    -- Get route IDs
    SELECT id INTO route_a_id FROM routes WHERE name = 'Route A - North Zone' LIMIT 1;
    SELECT id INTO route_b_id FROM routes WHERE name = 'Route B - South Zone' LIMIT 1;
    
    -- Get customer IDs
    SELECT ARRAY_AGG(id) INTO customer_ids FROM customers WHERE is_active = true LIMIT 5;
    
    -- Assign to routes
    IF route_a_id IS NOT NULL AND customer_ids IS NOT NULL THEN
        INSERT INTO route_customers (route_id, customer_id)
        SELECT route_a_id, unnest(customer_ids[1:3])
        ON CONFLICT DO NOTHING;
    END IF;
    
    IF route_b_id IS NOT NULL AND customer_ids IS NOT NULL THEN
        INSERT INTO route_customers (route_id, customer_id)
        SELECT route_b_id, unnest(customer_ids[4:5])
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- 9. Verify Test Data
SELECT 
    'Hubs' as table_name, COUNT(*) as count FROM hubs
UNION ALL
SELECT 'Products', COUNT(*) FROM products WHERE is_active = true
UNION ALL
SELECT 'Price Lists', COUNT(*) FROM price_lists
UNION ALL
SELECT 'Customers', COUNT(*) FROM customers WHERE is_active = true
UNION ALL
SELECT 'Routes', COUNT(*) FROM routes WHERE is_active = true;


