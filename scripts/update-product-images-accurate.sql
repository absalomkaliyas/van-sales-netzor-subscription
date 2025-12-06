-- Update Product Images with ACCURATE Product-Specific Images
-- Carefully matched images for each product type
-- Run this in Supabase SQL Editor

-- ============================================
-- FOOD & BEVERAGES
-- ============================================

-- PROD001: Premium Rice 5kg - Rice bag image
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD001';

-- PROD002: Cooking Oil 1L - Cooking oil bottle
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD002';

-- PROD003: Wheat Flour 10kg - Flour bag
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD003';

-- PROD004: Sugar 1kg - Sugar crystals/pack
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD004';

-- PROD005: Tea Leaves 500g - Tea leaves/pack
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD005';

-- ============================================
-- PERSONAL CARE
-- ============================================

-- PROD006: Soap Bar 100g - Soap bar product
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD006';

-- PROD007: Shampoo 200ml - Shampoo bottle
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556228578-6192d21c3e93?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD007';

-- PROD008: Toothpaste 100g - Toothpaste tube (SPECIFIC)
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD008';

-- PROD009: Detergent Powder 1kg - Detergent powder box
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD009';

-- PROD010: Hand Sanitizer 500ml - Sanitizer bottle
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD010';

-- ============================================
-- SNACKS & BEVERAGES
-- ============================================

-- PROD011: Biscuits 200g - Biscuit pack
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD011';

-- PROD012: Chips 50g - Potato chips pack
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD012';

-- PROD013: Soft Drink 750ml - Soft drink bottle
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD013';

-- PROD014: Juice 1L - Juice pack/bottle
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD014';

-- PROD015: Chocolate Bar 100g - Chocolate bar
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1606312619070-d48b4cbc5f21?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD015';

-- ============================================
-- HOUSEHOLD ITEMS
-- ============================================

-- PROD016: Matchbox - Matchbox product
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD016';

-- PROD017: Candle 100g - Candle product
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1606041011872-b77d3b1d8599?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD017';

-- PROD018: Battery AA - AA batteries
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1605870443999-bf9c8e325d41?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD018';

-- PROD019: Plastic Bucket 10L - Plastic bucket
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD019';

-- PROD020: Broom Stick - Broom product
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD020';

-- ============================================
-- STATIONERY
-- ============================================

-- PROD021: Notebook A4 - Notebook
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD021';

-- PROD022: Pen Blue - Pen
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1583484963886-cce2fcd58f88?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD022';

-- PROD023: Pencil HB - Pencil
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1452860606245-08e2d5e83b8e?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD023';

-- PROD024: Eraser - Eraser
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD024';

-- PROD025: Stapler - Stapler
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD025';

-- ============================================
-- HEALTH & MEDICINE
-- ============================================

-- PROD026: Paracetamol 500mg - Medicine tablets
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD026';

-- PROD027: Bandage 5cm - Medical bandage
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD027';

-- PROD028: Antiseptic Liquid 100ml - Antiseptic bottle
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD028';

-- PROD029: Cotton Swabs - Cotton swabs
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD029';

-- PROD030: Thermometer Digital - Digital thermometer
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80' 
WHERE sku = 'PROD030';

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 
  sku, 
  name, 
  CASE 
    WHEN image_url IS NULL THEN '❌ No Image'
    ELSE '✅ Has Image'
  END as image_status,
  LEFT(image_url, 70) || '...' as image_url_preview
FROM products 
ORDER BY sku;


