-- Add Sample Price Lists and Customers
-- Run this in Supabase SQL Editor
-- This script adds 5 price lists and 5 customers

-- ============================================
-- STEP 1: Add Price Lists
-- ============================================
INSERT INTO price_lists (name, description, is_default) VALUES
('Standard Price List', 'Default pricing for regular customers', true),
('Wholesale Price List', 'Special pricing for wholesale customers with bulk orders', false),
('Retail Price List', 'Pricing for retail customers and small shops', false),
('Premium Price List', 'Premium pricing for high-value customers', false),
('Promotional Price List', 'Special promotional pricing for limited time offers', false)
ON CONFLICT DO NOTHING;

-- ============================================
-- STEP 2: Add Customers (using price list IDs)
-- ============================================
INSERT INTO customers (
    name, address, city, state, pincode, gstin, phone, email, 
    price_list_id, credit_limit, outstanding_amount, is_active
) 
SELECT 
    'ABC Trading Company',
    '123 Main Street, Market Area',
    'Mumbai',
    'Maharashtra',
    '400001',
    '27ABCDE1234F1Z5',
    '9876543210',
    'abc@trading.com',
    (SELECT id FROM price_lists WHERE name = 'Standard Price List' LIMIT 1),
    500000.00,
    125000.00,
    true
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE phone = '9876543210')

UNION ALL

SELECT 
    'XYZ Wholesale Distributors',
    '456 Industrial Road, MIDC',
    'Pune',
    'Maharashtra',
    '411001',
    '27FGHIJ5678K2L6',
    '9876543211',
    'xyz@wholesale.com',
    (SELECT id FROM price_lists WHERE name = 'Wholesale Price List' LIMIT 1),
    1000000.00,
    250000.00,
    true
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE phone = '9876543211')

UNION ALL

SELECT 
    'City Retail Store',
    '789 Shopping Complex, MG Road',
    'Bangalore',
    'Karnataka',
    '560001',
    '29MNOPQ9012R3S7',
    '9876543212',
    'city@retail.com',
    (SELECT id FROM price_lists WHERE name = 'Retail Price List' LIMIT 1),
    200000.00,
    50000.00,
    true
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE phone = '9876543212')

UNION ALL

SELECT 
    'Premium Enterprises Ltd',
    '321 Business Tower, Corporate Park',
    'Delhi',
    'Delhi',
    '110001',
    '07TUVWX3456Y4T8',
    '9876543213',
    'premium@enterprises.com',
    (SELECT id FROM price_lists WHERE name = 'Premium Price List' LIMIT 1),
    2000000.00,
    500000.00,
    true
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE phone = '9876543213')

UNION ALL

SELECT 
    'Quick Mart',
    '654 Local Market, High Street',
    'Chennai',
    'Tamil Nadu',
    '600001',
    '33ZABCD7890E5U9',
    '9876543214',
    'quick@mart.com',
    (SELECT id FROM price_lists WHERE name = 'Promotional Price List' LIMIT 1),
    100000.00,
    0.00,
    true
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE phone = '9876543214');

-- ============================================
-- VERIFICATION
-- ============================================
-- Check Price Lists
SELECT 'Price Lists' as type, COUNT(*) as count FROM price_lists
UNION ALL
-- Check Customers
SELECT 'Customers' as type, COUNT(*) as count FROM customers;

-- Show all price lists
SELECT id, name, description, is_default, created_at 
FROM price_lists 
ORDER BY is_default DESC, created_at;

-- Show all customers with their price lists
SELECT 
    c.name,
    c.city,
    c.state,
    c.phone,
    c.gstin,
    pl.name as price_list_name,
    c.credit_limit,
    c.outstanding_amount,
    CASE 
        WHEN c.is_active THEN 'Active' 
        ELSE 'Inactive' 
    END as status
FROM customers c
LEFT JOIN price_lists pl ON c.price_list_id = pl.id
ORDER BY c.created_at;

