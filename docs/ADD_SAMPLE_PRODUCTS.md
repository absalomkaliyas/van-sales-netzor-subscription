# Add Sample Products to Database

## Quick Steps

1. **Go to Supabase SQL Editor**
   - Open: https://app.supabase.com
   - Select your project
   - Click **SQL Editor** (left sidebar)

2. **Open the Script**
   - Open file: `scripts/add-sample-products.sql`
   - Copy ALL content (Ctrl+A, Ctrl+C)

3. **Paste and Run**
   - Paste in SQL Editor
   - Click **"Run"** button
   - Wait for success message

4. **Verify**
   - Go to Products page: http://localhost:3000/products
   - You should see 30 sample products!

## What Products Are Added?

The script adds **30 sample products** across categories:

- **Food & Beverages** (5 products): Rice, Oil, Flour, Sugar, Tea
- **Personal Care** (5 products): Soap, Shampoo, Toothpaste, Detergent, Sanitizer
- **Snacks & Beverages** (5 products): Biscuits, Chips, Soft Drinks, Juice, Chocolate
- **Household Items** (5 products): Matchbox, Candle, Battery, Bucket, Broom
- **Stationery** (5 products): Notebook, Pen, Pencil, Eraser, Stapler
- **Health & Medicine** (5 products): Paracetamol, Bandage, Antiseptic, Cotton Swabs, Thermometer

All products have:
- ✅ SKU codes (PROD001-PROD030)
- ✅ HSN codes
- ✅ GST rates (5%, 12%, 18%)
- ✅ Units (PCS, KG, LTR, PACK, etc.)
- ✅ Pack sizes
- ✅ Active status

## After Adding

Once you run the script:
1. Refresh your Products page
2. You'll see all 30 products in the table
3. You can edit, delete, or add more products

---

**Ready to add them?** Just run the SQL script in Supabase!


