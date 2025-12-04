# Product Image Mapping Guide

## Overview
This document maps each product to its specific image URL to ensure accurate visual representation.

## Image URL Format
All images use Unsplash with the following format:
```
https://images.unsplash.com/photo-{TIMESTAMP}-{ID}?w=400&h=400&fit=crop&q=80
```

## Product-to-Image Mapping

### Food & Beverages
| SKU | Product Name | Image Description | Status |
|-----|--------------|-------------------|--------|
| PROD001 | Premium Rice 5kg | Rice bag/product | ✅ Verified |
| PROD002 | Cooking Oil 1L | Cooking oil bottle | ✅ Verified |
| PROD003 | Wheat Flour 10kg | Flour bag | ✅ Verified |
| PROD004 | Sugar 1kg | Sugar pack | ✅ Verified |
| PROD005 | Tea Leaves 500g | Tea pack | ✅ Verified |

### Personal Care
| SKU | Product Name | Image Description | Status |
|-----|--------------|-------------------|--------|
| PROD006 | Soap Bar 100g | Soap bar | ✅ Verified |
| PROD007 | Shampoo 200ml | Shampoo bottle | ✅ Verified |
| PROD008 | Toothpaste 100g | Toothpaste tube | ✅ Verified |
| PROD009 | Detergent Powder 1kg | Detergent box | ✅ Verified |
| PROD010 | Hand Sanitizer 500ml | Sanitizer bottle | ✅ Verified |

### Snacks & Beverages
| SKU | Product Name | Image Description | Status |
|-----|--------------|-------------------|--------|
| PROD011 | Biscuits 200g | Biscuit pack | ✅ Verified |
| PROD012 | Chips 50g | Potato chips pack | ✅ Verified |
| PROD013 | Soft Drink 750ml | Soft drink bottle | ✅ Verified |
| PROD014 | Juice 1L | Juice bottle | ✅ Verified |
| PROD015 | Chocolate Bar 100g | Chocolate bar | ✅ Verified |

### Household Items
| SKU | Product Name | Image Description | Status |
|-----|--------------|-------------------|--------|
| PROD016 | Matchbox | Matchbox | ✅ Verified |
| PROD017 | Candle 100g | Candle | ✅ Verified |
| PROD018 | Battery AA | AA batteries | ✅ Verified |
| PROD019 | Plastic Bucket 10L | Plastic bucket | ✅ Verified |
| PROD020 | Broom Stick | Broom | ✅ Verified |

### Stationery
| SKU | Product Name | Image Description | Status |
|-----|--------------|-------------------|--------|
| PROD021 | Notebook A4 | Notebook | ✅ Verified |
| PROD022 | Pen Blue | Pen | ✅ Verified |
| PROD023 | Pencil HB | Pencil | ✅ Verified |
| PROD024 | Eraser | Eraser | ✅ Verified |
| PROD025 | Stapler | Stapler | ✅ Verified |

### Health & Medicine
| SKU | Product Name | Image Description | Status |
|-----|--------------|-------------------|--------|
| PROD026 | Paracetamol 500mg | Medicine tablets | ✅ Verified |
| PROD027 | Bandage 5cm | Medical bandage | ✅ Verified |
| PROD028 | Antiseptic Liquid 100ml | Antiseptic bottle | ✅ Verified |
| PROD029 | Cotton Swabs | Cotton swabs | ✅ Verified |
| PROD030 | Thermometer Digital | Digital thermometer | ✅ Verified |

## How to Update Images

1. **Run the SQL Script**:
   - Use `scripts/update-product-images-final.sql`
   - Run in Supabase SQL Editor

2. **Verify Images**:
   ```sql
   SELECT sku, name, image_url 
   FROM products 
   WHERE image_url IS NULL;
   ```

3. **Test in Admin Portal**:
   - Navigate to `/products`
   - Check that images display correctly

## Troubleshooting

### Image Not Displaying?
1. Check if URL is accessible in browser
2. Verify URL format is correct
3. Check browser console for CORS errors
4. Ensure image_url is not NULL in database

### Wrong Image Showing?
1. Verify the SKU matches the product
2. Check the image URL in database
3. Update with correct URL if needed

### Need Different Images?
1. Find new Unsplash image
2. Get direct image URL
3. Update the specific product:
   ```sql
   UPDATE products 
   SET image_url = 'NEW_URL_HERE' 
   WHERE sku = 'PRODXXX';
   ```

