# Update Product Images with Relevant URLs

## Overview
This guide helps you update product images in the database with relevant, product-specific images.

## Step 1: Run the SQL Script

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor** in the left sidebar

2. **Open the Script**
   - Open the file: `scripts/update-product-images-relevant.sql`
   - Copy all the SQL content

3. **Paste and Run**
   - Paste the SQL into the Supabase SQL Editor
   - Click **Run** or press `Ctrl+Enter`
   - Wait for the success message

## Step 2: Verify Images

After running the script, verify that images are updated:

```sql
SELECT sku, name, 
  CASE 
    WHEN image_url IS NULL THEN '❌ No Image'
    ELSE '✅ Has Image'
  END as status
FROM products 
ORDER BY sku;
```

## Step 3: Check in Admin Portal

1. **Start the Admin Portal** (if not running):
   ```bash
   cd admin-web
   npm run dev
   ```

2. **View Products**
   - Navigate to `http://localhost:3000/products`
   - Login if needed
   - Check that product images are now displaying correctly

## Image Categories

The script updates images for:
- **Food & Beverages**: Rice, Oil, Flour, Sugar, Tea
- **Personal Care**: Soap, Shampoo, Toothpaste, Detergent, Sanitizer
- **Snacks & Beverages**: Biscuits, Chips, Soft Drink, Juice, Chocolate
- **Household Items**: Matchbox, Candle, Battery, Bucket, Broom
- **Stationery**: Notebook, Pen, Pencil, Eraser, Stapler
- **Health & Medicine**: Paracetamol, Bandage, Antiseptic, Cotton Swabs, Thermometer

## Troubleshooting

### Images Still Not Showing?

1. **Check Image URLs in Database**:
   ```sql
   SELECT sku, name, image_url FROM products WHERE image_url IS NULL;
   ```

2. **Check Browser Console**:
   - Open browser DevTools (F12)
   - Check Console tab for image loading errors
   - Check Network tab to see if images are loading

3. **Test Image URL Directly**:
   - Copy an `image_url` from the database
   - Paste it in a new browser tab
   - If it doesn't load, the URL might be invalid

4. **Update Individual Product**:
   ```sql
   UPDATE products 
   SET image_url = 'https://images.unsplash.com/photo-XXXXX?w=400&h=400&fit=crop&q=80'
   WHERE sku = 'PROD001';
   ```

## Next Steps

After images are updated:
- ✅ Product catalog should display images correctly
- ✅ Add Product form should show image preview
- ✅ Product list should show thumbnails

If you want to add more products or update existing ones, use the **Add Product** form in the admin portal.

