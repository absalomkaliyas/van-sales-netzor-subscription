-- Add Sample Order
-- Run this in Supabase SQL Editor
-- This creates a sample order with multiple items

DO $$
DECLARE
    customer_id_var UUID;
    user_id_var UUID;
    hub_id_var UUID;
    order_id_var UUID;
    product1_id UUID;
    product2_id UUID;
    product3_id UUID;
    order_number_var TEXT;
    subtotal_var DECIMAL(15, 2) := 0;
    tax_amount_var DECIMAL(15, 2) := 0;
    total_amount_var DECIMAL(15, 2) := 0;
BEGIN
    -- Get first active customer
    SELECT id INTO customer_id_var 
    FROM customers 
    WHERE is_active = true 
    LIMIT 1;
    
    IF customer_id_var IS NULL THEN
        RAISE EXCEPTION 'No active customers found. Please add customers first.';
    END IF;
    
    -- Get first active user (admin or salesman)
    SELECT id, hub_id INTO user_id_var, hub_id_var
    FROM users 
    WHERE is_active = true 
    LIMIT 1;
    
    IF user_id_var IS NULL THEN
        RAISE EXCEPTION 'No active users found. Please add users first.';
    END IF;
    
    -- If no hub_id, get first hub
    IF hub_id_var IS NULL THEN
        SELECT id INTO hub_id_var FROM hubs LIMIT 1;
    END IF;
    
    -- Get sample products
    SELECT id INTO product1_id FROM products WHERE sku = 'PROD001' LIMIT 1; -- Rice
    SELECT id INTO product2_id FROM products WHERE sku = 'PROD008' LIMIT 1; -- Toothpaste
    SELECT id INTO product3_id FROM products WHERE sku = 'PROD011' LIMIT 1; -- Biscuits
    
    -- Generate order number
    order_number_var := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Create order
    INSERT INTO orders (
        order_number,
        customer_id,
        user_id,
        hub_id,
        status,
        subtotal,
        discount_amount,
        tax_amount,
        total_amount,
        payment_status
    ) VALUES (
        order_number_var,
        customer_id_var,
        user_id_var,
        hub_id_var,
        'confirmed',
        0, -- Will be calculated
        0,
        0, -- Will be calculated
        0, -- Will be calculated
        'pending'
    ) RETURNING id INTO order_id_var;
    
    -- Add order items and calculate totals
    IF product1_id IS NOT NULL THEN
        -- Item 1: Rice - 10 units @ ₹500, 5% GST, 2% discount
        DECLARE
            item1_qty DECIMAL := 10;
            item1_price DECIMAL := 500.00;
            item1_discount_pct DECIMAL := 2.00;
            item1_gst_rate DECIMAL := 5.00;
            item1_subtotal DECIMAL;
            item1_discount DECIMAL;
            item1_after_discount DECIMAL;
            item1_tax DECIMAL;
            item1_total DECIMAL;
        BEGIN
            item1_subtotal := item1_qty * item1_price;
            item1_discount := (item1_subtotal * item1_discount_pct) / 100;
            item1_after_discount := item1_subtotal - item1_discount;
            item1_tax := (item1_after_discount * item1_gst_rate) / 100;
            item1_total := item1_after_discount + item1_tax;
            
            INSERT INTO order_items (
                order_id,
                product_id,
                quantity,
                unit_price,
                discount_percent,
                discount_amount,
                tax_rate,
                tax_amount,
                total_amount
            ) VALUES (
                order_id_var,
                product1_id,
                item1_qty,
                item1_price,
                item1_discount_pct,
                item1_discount,
                item1_gst_rate,
                item1_tax,
                item1_total
            );
            
            subtotal_var := subtotal_var + item1_after_discount;
            tax_amount_var := tax_amount_var + item1_tax;
        END;
    END IF;
    
    IF product2_id IS NOT NULL THEN
        -- Item 2: Toothpaste - 5 units @ ₹80, 18% GST, 0% discount
        DECLARE
            item2_qty DECIMAL := 5;
            item2_price DECIMAL := 80.00;
            item2_discount_pct DECIMAL := 0.00;
            item2_gst_rate DECIMAL := 18.00;
            item2_subtotal DECIMAL;
            item2_discount DECIMAL;
            item2_after_discount DECIMAL;
            item2_tax DECIMAL;
            item2_total DECIMAL;
        BEGIN
            item2_subtotal := item2_qty * item2_price;
            item2_discount := (item2_subtotal * item2_discount_pct) / 100;
            item2_after_discount := item2_subtotal - item2_discount;
            item2_tax := (item2_after_discount * item2_gst_rate) / 100;
            item2_total := item2_after_discount + item2_tax;
            
            INSERT INTO order_items (
                order_id,
                product_id,
                quantity,
                unit_price,
                discount_percent,
                discount_amount,
                tax_rate,
                tax_amount,
                total_amount
            ) VALUES (
                order_id_var,
                product2_id,
                item2_qty,
                item2_price,
                item2_discount_pct,
                item2_discount,
                item2_gst_rate,
                item2_tax,
                item2_total
            );
            
            subtotal_var := subtotal_var + item2_after_discount;
            tax_amount_var := tax_amount_var + item2_tax;
        END;
    END IF;
    
    IF product3_id IS NOT NULL THEN
        -- Item 3: Biscuits - 20 units @ ₹30, 12% GST, 5% discount
        DECLARE
            item3_qty DECIMAL := 20;
            item3_price DECIMAL := 30.00;
            item3_discount_pct DECIMAL := 5.00;
            item3_gst_rate DECIMAL := 12.00;
            item3_subtotal DECIMAL;
            item3_discount DECIMAL;
            item3_after_discount DECIMAL;
            item3_tax DECIMAL;
            item3_total DECIMAL;
        BEGIN
            item3_subtotal := item3_qty * item3_price;
            item3_discount := (item3_subtotal * item3_discount_pct) / 100;
            item3_after_discount := item3_subtotal - item3_discount;
            item3_tax := (item3_after_discount * item3_gst_rate) / 100;
            item3_total := item3_after_discount + item3_tax;
            
            INSERT INTO order_items (
                order_id,
                product_id,
                quantity,
                unit_price,
                discount_percent,
                discount_amount,
                tax_rate,
                tax_amount,
                total_amount
            ) VALUES (
                order_id_var,
                product3_id,
                item3_qty,
                item3_price,
                item3_discount_pct,
                item3_discount,
                item3_gst_rate,
                item3_tax,
                item3_total
            );
            
            subtotal_var := subtotal_var + item3_after_discount;
            tax_amount_var := tax_amount_var + item3_tax;
        END;
    END IF;
    
    -- Calculate final total
    total_amount_var := subtotal_var + tax_amount_var;
    
    -- Update order with calculated totals
    UPDATE orders
    SET 
        subtotal = subtotal_var,
        tax_amount = tax_amount_var,
        total_amount = total_amount_var
    WHERE id = order_id_var;
    
    RAISE NOTICE 'Order created successfully!';
    RAISE NOTICE 'Order Number: %', order_number_var;
    RAISE NOTICE 'Order ID: %', order_id_var;
    RAISE NOTICE 'Subtotal: ₹%', subtotal_var;
    RAISE NOTICE 'Tax: ₹%', tax_amount_var;
    RAISE NOTICE 'Total: ₹%', total_amount_var;
END $$;

-- Verify the order was created
SELECT 
    o.order_number,
    c.name as customer_name,
    o.status,
    o.subtotal,
    o.discount_amount,
    o.tax_amount,
    o.total_amount,
    o.payment_status,
    o.created_at,
    COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_number, c.name, o.status, o.subtotal, o.discount_amount, o.tax_amount, o.total_amount, o.payment_status, o.created_at
ORDER BY o.created_at DESC
LIMIT 1;

-- Show order items
SELECT 
    oi.id,
    p.sku,
    p.name as product_name,
    oi.quantity,
    oi.unit_price,
    oi.discount_percent,
    oi.discount_amount,
    oi.tax_rate,
    oi.tax_amount,
    oi.total_amount
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.order_number = (
    SELECT order_number FROM orders ORDER BY created_at DESC LIMIT 1
)
ORDER BY oi.created_at;

