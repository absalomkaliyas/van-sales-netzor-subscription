-- Fix: Add relevant product-specific image URLs
-- Run this in Supabase SQL Editor
-- Images are matched to actual product types

-- Food & Beverages
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD001' AND name LIKE '%Rice%'; -- Rice

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD002' AND name LIKE '%Oil%'; -- Cooking Oil

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD003' AND name LIKE '%Flour%'; -- Wheat Flour

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD004' AND name LIKE '%Sugar%'; -- Sugar

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD005' AND name LIKE '%Tea%'; -- Tea Leaves

-- Personal Care - Using more specific product images
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD006' AND name LIKE '%Soap%'; -- Soap Bar

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556228578-6192d21c3e93?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD007' AND name LIKE '%Shampoo%'; -- Shampoo

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD008' AND name LIKE '%Toothpaste%'; -- Toothpaste

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD009' AND name LIKE '%Detergent%'; -- Detergent Powder

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD010' AND name LIKE '%Sanitizer%'; -- Hand Sanitizer

-- Snacks & Beverages
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD011' AND name LIKE '%Biscuit%'; -- Biscuits

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD012' AND name LIKE '%Chip%'; -- Chips

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD013' AND name LIKE '%Drink%'; -- Soft Drink

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD014' AND name LIKE '%Juice%'; -- Juice

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1606312619070-d48b4cbc5f21?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD015' AND name LIKE '%Chocolate%'; -- Chocolate Bar

-- Household Items
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD016' AND name LIKE '%Match%'; -- Matchbox

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1606041011872-b77d3b1d8599?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD017' AND name LIKE '%Candle%'; -- Candle

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1605870443999-bf9c8e325d41?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD018' AND name LIKE '%Battery%'; -- Battery AA

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD019' AND name LIKE '%Bucket%'; -- Plastic Bucket

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD020' AND name LIKE '%Broom%'; -- Broom Stick

-- Stationery
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD021' AND name LIKE '%Notebook%'; -- Notebook

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1583484963886-cce2fcd58f88?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD022' AND name LIKE '%Pen%'; -- Pen

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1452860606245-08e2d5e83b8e?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD023' AND name LIKE '%Pencil%'; -- Pencil

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD024' AND name LIKE '%Eraser%'; -- Eraser

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD025' AND name LIKE '%Stapler%'; -- Stapler

-- Health & Medicine
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD026' AND name LIKE '%Paracetamol%'; -- Paracetamol

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD027' AND name LIKE '%Bandage%'; -- Bandage

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD028' AND name LIKE '%Antiseptic%'; -- Antiseptic Liquid

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD029' AND name LIKE '%Cotton%'; -- Cotton Swabs

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80'
WHERE sku = 'PROD030' AND name LIKE '%Thermometer%'; -- Thermometer

-- Alternative: Update all products by SKU directly (simpler approach)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD001';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD002';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD003';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD004';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD005';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD006';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556228578-6192d21c3e93?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD007';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD008';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD009';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD010';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD011';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD012';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD013';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD014';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606312619070-d48b4cbc5f21?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD015';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD016';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606041011872-b77d3b1d8599?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD017';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1605870443999-bf9c8e325d41?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD018';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD019';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD020';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD021';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1583484963886-cce2fcd58f88?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD022';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1452860606245-08e2d5e83b8e?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD023';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD024';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD025';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD026';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD027';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD028';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD029';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD030';

-- Verify
SELECT sku, name, 
  CASE 
    WHEN image_url IS NULL THEN '❌ No Image'
    ELSE '✅ Has Image'
  END as status
FROM products 
ORDER BY sku;


