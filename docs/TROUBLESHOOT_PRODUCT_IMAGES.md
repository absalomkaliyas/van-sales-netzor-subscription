# Troubleshooting: Product Images Not Showing

## Quick Checks

### 1. Verify Products Have Image URLs

Run this in Supabase SQL Editor:

```sql
SELECT sku, name, image_url 
FROM products 
LIMIT 5;
```

**Expected**: Should show image URLs like `https://images.unsplash.com/...`

**If NULL or empty**: Products don't have image URLs yet.

### 2. Check if SQL Script Was Run

- Did you run `scripts/add-sample-products.sql` in Supabase?
- If not, run it now to add products with images

### 3. Check Browser Console

1. Open Products page: http://localhost:3000/products
2. Press F12 → Console tab
3. Look for:
   - "Products loaded:" - should show products with image_url
   - "Image load error:" - if images fail to load
   - "Image loaded successfully:" - if images load

### 4. Test Image URLs Directly

Try opening an image URL in browser:
```
https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400
```

If it doesn't open, the URL might be blocked or invalid.

---

## Solutions

### Solution 1: Run SQL Script Again

If products don't have image URLs:

1. Go to Supabase SQL Editor
2. Run `scripts/add-sample-products.sql`
3. This will add/update products with image URLs

### Solution 2: Update Existing Products

If products exist but don't have images:

```sql
-- Update first product as test
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
WHERE sku = 'PROD001';
```

### Solution 3: Use Different Image URLs

If Unsplash is blocked, use placeholder images:

```sql
UPDATE products 
SET image_url = 'https://via.placeholder.com/400?text=Product'
WHERE image_url IS NULL;
```

### Solution 4: Check CORS/Network Issues

- Check browser Network tab (F12)
- Look for failed image requests
- Check if images are blocked by CORS

---

## Quick Test Query

Run this to see what's in your database:

```sql
SELECT 
  sku, 
  name, 
  CASE 
    WHEN image_url IS NULL THEN 'NULL'
    WHEN image_url = '' THEN 'EMPTY'
    ELSE image_url
  END as image_status
FROM products 
LIMIT 10;
```

This will show you if products have image URLs or not.

---

## Common Issues

1. **SQL script not run**: Products exist but no image_url
2. **CORS blocking**: Images blocked by browser security
3. **Invalid URLs**: Image URLs are malformed
4. **Network issues**: Can't reach image servers

---

**Check the browser console first** - it will tell you exactly what's happening!


