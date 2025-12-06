-- Add Sample Customers
-- Run this in Supabase SQL Editor
-- Note: Make sure price lists exist first (run add-sample-price-lists.sql)

-- Get price list IDs (assuming they exist)
DO $$
DECLARE
    standard_price_list_id UUID;
    wholesale_price_list_id UUID;
    retail_price_list_id UUID;
    premium_price_list_id UUID;
    promotional_price_list_id UUID;
BEGIN
    -- Get price list IDs
    SELECT id INTO standard_price_list_id FROM price_lists WHERE name = 'Standard Price List' LIMIT 1;
    SELECT id INTO wholesale_price_list_id FROM price_lists WHERE name = 'Wholesale Price List' LIMIT 1;
    SELECT id INTO retail_price_list_id FROM price_lists WHERE name = 'Retail Price List' LIMIT 1;
    SELECT id INTO premium_price_list_id FROM price_lists WHERE name = 'Premium Price List' LIMIT 1;
    SELECT id INTO promotional_price_list_id FROM price_lists WHERE name = 'Promotional Price List' LIMIT 1;

    -- Insert 5 sample customers
    INSERT INTO customers (
        name, address, city, state, pincode, gstin, phone, email, 
        price_list_id, credit_limit, outstanding_amount, is_active
    ) VALUES
    (
        'ABC Trading Company',
        '123 Main Street, Market Area',
        'Mumbai',
        'Maharashtra',
        '400001',
        '27ABCDE1234F1Z5',
        '9876543210',
        'abc@trading.com',
        standard_price_list_id,
        500000.00,
        125000.00,
        true
    ),
    (
        'XYZ Wholesale Distributors',
        '456 Industrial Road, MIDC',
        'Pune',
        'Maharashtra',
        '411001',
        '27FGHIJ5678K2L6',
        '9876543211',
        'xyz@wholesale.com',
        wholesale_price_list_id,
        1000000.00,
        250000.00,
        true
    ),
    (
        'City Retail Store',
        '789 Shopping Complex, MG Road',
        'Bangalore',
        'Karnataka',
        '560001',
        '29MNOPQ9012R3S7',
        '9876543212',
        'city@retail.com',
        retail_price_list_id,
        200000.00,
        50000.00,
        true
    ),
    (
        'Premium Enterprises Ltd',
        '321 Business Tower, Corporate Park',
        'Delhi',
        'Delhi',
        '110001',
        '07TUVWX3456Y4T8',
        '9876543213',
        'premium@enterprises.com',
        premium_price_list_id,
        2000000.00,
        500000.00,
        true
    ),
    (
        'Quick Mart',
        '654 Local Market, High Street',
        'Chennai',
        'Tamil Nadu',
        '600001',
        '33ZABCD7890E5U9',
        '9876543214',
        'quick@mart.com',
        promotional_price_list_id,
        100000.00,
        0.00,
        true
    )
    ON CONFLICT DO NOTHING;
END $$;

-- Verify customers were added
SELECT 
    c.id,
    c.name,
    c.city,
    c.state,
    c.phone,
    c.gstin,
    pl.name as price_list_name,
    c.credit_limit,
    c.outstanding_amount,
    c.is_active
FROM customers c
LEFT JOIN price_lists pl ON c.price_list_id = pl.id
ORDER BY c.created_at;


