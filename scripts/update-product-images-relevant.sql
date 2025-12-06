-- Update Product Images with Relevant Product-Specific Images
-- Run this in Supabase SQL Editor
-- Each product now has an image that matches its actual type

-- Food & Beverages
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD001'; -- Rice
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD002'; -- Cooking Oil
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD003'; -- Wheat Flour
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD004'; -- Sugar
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD005'; -- Tea Leaves

-- Personal Care - Using product-specific images
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD006'; -- Soap Bar
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556228578-6192d21c3e93?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD007'; -- Shampoo
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD008'; -- Toothpaste
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD009'; -- Detergent Powder
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD010'; -- Hand Sanitizer

-- Snacks & Beverages
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD011'; -- Biscuits
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD012'; -- Chips
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD013'; -- Soft Drink
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD014'; -- Juice
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606312619070-d48b4cbc5f21?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD015'; -- Chocolate Bar

-- Household Items
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD016'; -- Matchbox
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606041011872-b77d3b1d8599?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD017'; -- Candle
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1605870443999-bf9c8e325d41?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD018'; -- Battery AA
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD019'; -- Plastic Bucket
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD020'; -- Broom Stick

-- Stationery
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD021'; -- Notebook
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1583484963886-cce2fcd58f88?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD022'; -- Pen
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1452860606245-08e2d5e83b8e?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD023'; -- Pencil
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD024'; -- Eraser
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD025'; -- Stapler

-- Health & Medicine
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD026'; -- Paracetamol
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD027'; -- Bandage
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD028'; -- Antiseptic Liquid
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD029'; -- Cotton Swabs
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&q=80' WHERE sku = 'PROD030'; -- Thermometer

-- Verify the update
SELECT 
  sku, 
  name, 
  CASE 
    WHEN image_url IS NULL THEN '❌ No Image'
    ELSE '✅ Has Image'
  END as image_status,
  LEFT(image_url, 60) || '...' as image_url_preview
FROM products 
ORDER BY sku;


