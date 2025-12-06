-- Check if products have image URLs
-- Run this in Supabase SQL Editor to diagnose

SELECT 
  sku, 
  name, 
  CASE 
    WHEN image_url IS NULL THEN '❌ NULL'
    WHEN image_url = '' THEN '❌ EMPTY'
    ELSE '✅ HAS URL'
  END as image_status,
  image_url
FROM products 
ORDER BY created_at DESC
LIMIT 10;

-- Count products with/without images
SELECT 
  COUNT(*) as total_products,
  COUNT(image_url) as products_with_images,
  COUNT(*) - COUNT(image_url) as products_without_images
FROM products;


