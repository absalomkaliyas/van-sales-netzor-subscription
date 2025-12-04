-- Add Sample Products for VAN Sales System
-- Run this in Supabase SQL Editor

-- Sample Products for Distribution/Manufacturing
INSERT INTO products (sku, name, description, hsn_code, gst_rate, unit, pack_size, image_url, is_active) VALUES
-- Food & Beverages
('PROD001', 'Premium Rice 5kg', 'High quality basmati rice, 5kg pack', '10063090', 5.00, 'KG', 5.00, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', true),
('PROD002', 'Cooking Oil 1L', 'Refined sunflower oil, 1 liter bottle', '15121100', 5.00, 'LTR', 1.00, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', true),
('PROD003', 'Wheat Flour 10kg', 'Premium wheat flour, 10kg bag', '11010000', 5.00, 'KG', 10.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', true),
('PROD004', 'Sugar 1kg', 'White crystal sugar, 1kg pack', '17011400', 5.00, 'KG', 1.00, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', true),
('PROD005', 'Tea Leaves 500g', 'Premium tea leaves, 500g pack', '09023000', 5.00, 'KG', 0.50, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', true),

-- Personal Care
('PROD006', 'Soap Bar 100g', 'Luxury soap bar, 100g each', '34011100', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', true),
('PROD007', 'Shampoo 200ml', 'Anti-dandruff shampoo, 200ml bottle', '33051000', 18.00, 'LTR', 0.20, 'https://images.unsplash.com/photo-1556228578-6192d21c3e93?w=400', true),
('PROD008', 'Toothpaste 100g', 'Fluoride toothpaste, 100g tube', '33061000', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', true),
('PROD009', 'Detergent Powder 1kg', 'Washing powder, 1kg pack', '34022000', 18.00, 'KG', 1.00, 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', true),
('PROD010', 'Hand Sanitizer 500ml', 'Alcohol-based sanitizer, 500ml', '38089400', 18.00, 'LTR', 0.50, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', true),

-- Snacks & Beverages
('PROD011', 'Biscuits 200g', 'Glucose biscuits, 200g pack', '19053100', 12.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', true),
('PROD012', 'Chips 50g', 'Potato chips, 50g pack', '20052000', 12.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', true),
('PROD013', 'Soft Drink 750ml', 'Carbonated soft drink, 750ml bottle', '22021000', 12.00, 'LTR', 0.75, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', true),
('PROD014', 'Juice 1L', 'Fruit juice, 1 liter tetra pack', '20098900', 12.00, 'LTR', 1.00, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', true),
('PROD015', 'Chocolate Bar 100g', 'Milk chocolate bar, 100g', '18063100', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1606312619070-d48b4cbc5f21?w=400', true),

-- Household Items
('PROD016', 'Matchbox', 'Safety matches, standard size', '36050000', 18.00, 'BOX', 1.00, 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400', true),
('PROD017', 'Candle 100g', 'Paraffin wax candle, 100g', '34060000', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1606041011872-b77d3b1d8599?w=400', true),
('PROD018', 'Battery AA', 'Alkaline battery, AA size, pack of 4', '85061000', 18.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1605870443999-bf9c8e325d41?w=400', true),
('PROD019', 'Plastic Bucket 10L', 'Plastic bucket with handle, 10 liters', '39241000', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', true),
('PROD020', 'Broom Stick', 'Household broom with wooden handle', '96031000', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', true),

-- Stationery
('PROD021', 'Notebook A4', 'Ruled notebook, A4 size, 200 pages', '48201000', 12.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', true),
('PROD022', 'Pen Blue', 'Ballpoint pen, blue ink, pack of 10', '96081000', 18.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1583484963886-cce2fcd58f88?w=400', true),
('PROD023', 'Pencil HB', 'Graphite pencil, HB grade, pack of 12', '96091000', 18.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1452860606245-08e2d5e83b8e?w=400', true),
('PROD024', 'Eraser', 'Rubber eraser, pack of 5', '40169200', 18.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', true),
('PROD025', 'Stapler', 'Office stapler with 1000 staples', '83052000', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', true),

-- Health & Medicine (OTC)
('PROD026', 'Paracetamol 500mg', 'Pain relief tablets, 500mg, strip of 10', '30049099', 12.00, 'STRIP', 1.00, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', true),
('PROD027', 'Bandage 5cm', 'Medical bandage, 5cm width, roll', '30051000', 12.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', true),
('PROD028', 'Antiseptic Liquid 100ml', 'Antiseptic solution, 100ml bottle', '30049099', 12.00, 'LTR', 0.10, 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', true),
('PROD029', 'Cotton Swabs', 'Sterile cotton swabs, pack of 100', '30051000', 12.00, 'PACK', 1.00, 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400', true),
('PROD030', 'Thermometer Digital', 'Digital thermometer, battery operated', '90251910', 18.00, 'PCS', 1.00, 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400', true)

ON CONFLICT (sku) DO NOTHING;

-- Verify products were added
SELECT COUNT(*) as total_products FROM products;
