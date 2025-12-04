-- Add Sample Products for VAN Sales System
-- Run this in Supabase SQL Editor

-- Sample Products for Distribution/Manufacturing
INSERT INTO products (sku, name, description, hsn_code, gst_rate, unit, pack_size, is_active) VALUES
-- Food & Beverages
('PROD001', 'Premium Rice 5kg', 'High quality basmati rice, 5kg pack', '10063090', 5.00, 'KG', 5.00, true),
('PROD002', 'Cooking Oil 1L', 'Refined sunflower oil, 1 liter bottle', '15121100', 5.00, 'LTR', 1.00, true),
('PROD003', 'Wheat Flour 10kg', 'Premium wheat flour, 10kg bag', '11010000', 5.00, 'KG', 10.00, true),
('PROD004', 'Sugar 1kg', 'White crystal sugar, 1kg pack', '17011400', 5.00, 'KG', 1.00, true),
('PROD005', 'Tea Leaves 500g', 'Premium tea leaves, 500g pack', '09023000', 5.00, 'KG', 0.50, true),

-- Personal Care
('PROD006', 'Soap Bar 100g', 'Luxury soap bar, 100g each', '34011100', 18.00, 'PCS', 1.00, true),
('PROD007', 'Shampoo 200ml', 'Anti-dandruff shampoo, 200ml bottle', '33051000', 18.00, 'LTR', 0.20, true),
('PROD008', 'Toothpaste 100g', 'Fluoride toothpaste, 100g tube', '33061000', 18.00, 'PCS', 1.00, true),
('PROD009', 'Detergent Powder 1kg', 'Washing powder, 1kg pack', '34022000', 18.00, 'KG', 1.00, true),
('PROD010', 'Hand Sanitizer 500ml', 'Alcohol-based sanitizer, 500ml', '38089400', 18.00, 'LTR', 0.50, true),

-- Snacks & Beverages
('PROD011', 'Biscuits 200g', 'Glucose biscuits, 200g pack', '19053100', 12.00, 'PACK', 1.00, true),
('PROD012', 'Chips 50g', 'Potato chips, 50g pack', '20052000', 12.00, 'PACK', 1.00, true),
('PROD013', 'Soft Drink 750ml', 'Carbonated soft drink, 750ml bottle', '22021000', 12.00, 'LTR', 0.75, true),
('PROD014', 'Juice 1L', 'Fruit juice, 1 liter tetra pack', '20098900', 12.00, 'LTR', 1.00, true),
('PROD015', 'Chocolate Bar 100g', 'Milk chocolate bar, 100g', '18063100', 18.00, 'PCS', 1.00, true),

-- Household Items
('PROD016', 'Matchbox', 'Safety matches, standard size', '36050000', 18.00, 'BOX', 1.00, true),
('PROD017', 'Candle 100g', 'Paraffin wax candle, 100g', '34060000', 18.00, 'PCS', 1.00, true),
('PROD018', 'Battery AA', 'Alkaline battery, AA size, pack of 4', '85061000', 18.00, 'PACK', 1.00, true),
('PROD019', 'Plastic Bucket 10L', 'Plastic bucket with handle, 10 liters', '39241000', 18.00, 'PCS', 1.00, true),
('PROD020', 'Broom Stick', 'Household broom with wooden handle', '96031000', 18.00, 'PCS', 1.00, true),

-- Stationery
('PROD021', 'Notebook A4', 'Ruled notebook, A4 size, 200 pages', '48201000', 12.00, 'PCS', 1.00, true),
('PROD022', 'Pen Blue', 'Ballpoint pen, blue ink, pack of 10', '96081000', 18.00, 'PACK', 1.00, true),
('PROD023', 'Pencil HB', 'Graphite pencil, HB grade, pack of 12', '96091000', 18.00, 'PACK', 1.00, true),
('PROD024', 'Eraser', 'Rubber eraser, pack of 5', '40169200', 18.00, 'PACK', 1.00, true),
('PROD025', 'Stapler', 'Office stapler with 1000 staples', '83052000', 18.00, 'PCS', 1.00, true),

-- Health & Medicine (OTC)
('PROD026', 'Paracetamol 500mg', 'Pain relief tablets, 500mg, strip of 10', '30049099', 12.00, 'STRIP', 1.00, true),
('PROD027', 'Bandage 5cm', 'Medical bandage, 5cm width, roll', '30051000', 12.00, 'PCS', 1.00, true),
('PROD028', 'Antiseptic Liquid 100ml', 'Antiseptic solution, 100ml bottle', '30049099', 12.00, 'LTR', 0.10, true),
('PROD029', 'Cotton Swabs', 'Sterile cotton swabs, pack of 100', '30051000', 12.00, 'PACK', 1.00, true),
('PROD030', 'Thermometer Digital', 'Digital thermometer, battery operated', '90251910', 18.00, 'PCS', 1.00, true)

ON CONFLICT (sku) DO NOTHING;

-- Verify products were added
SELECT COUNT(*) as total_products FROM products;

