# 🧪 Complete Testing Guide

## 📋 Testing Checklist

### ✅ Pre-Testing Setup

1. **Verify Database Connection**
   - Admin web portal connects to Supabase
   - Mobile app connects to Supabase
   - Environment variables are set

2. **Verify Authentication**
   - Admin user exists in Supabase Auth
   - User record exists in `users` table with `role = 'admin'`

---

## 🌐 Admin Web Portal Testing

### Step 1: Access the Portal

1. **Start the server**:
   ```powershell
   cd admin-web
   npm run dev
   ```

2. **Open browser**: http://localhost:3000

3. **You should see**: Login page

### Step 2: Test Authentication

1. **Login**:
   - Email: `absalomkaliyas@gmail.com` (or your admin email)
   - Password: (your password)
   - Click "Sign in"

2. **Expected**: Redirect to dashboard

3. **Verify**: You see "Welcome Admin" and module cards

### Step 3: Test Each Module

#### ✅ Products Module
1. Click "Products" card
2. **View Products**: Should show product list
3. **Add Product**: Click "+ New Product"
   - Fill in: SKU, Name, HSN, GST, Unit, etc.
   - Add image URL
   - Click "Create Product"
4. **Edit Product**: Click "Edit" on any product
   - Modify details
   - Save changes
5. **Verify**: Product appears in list

#### ✅ Price Lists Module
1. Click "Price Lists" card
2. **Create Price List**: Click "+ New Price List"
   - Name: "Retail Price List"
   - Description: "Standard retail pricing"
   - Save
3. **Add Products**: Click on price list → "Add Products"
   - Select products
   - Set MRP, trade price, promotional price
   - Save
4. **Verify**: Products appear in price list

#### ✅ Customers Module
1. Click "Customers" card
2. **Create Customer**: Click "+ New Customer"
   - Fill in: Name, Phone, Address, City, State
   - Select price list
   - Set credit limit
   - Save
3. **View Customer**: Click on customer
   - Verify details
   - Check price list assignment
4. **Edit Customer**: Modify and save

#### ✅ Orders Module
1. Click "Orders" card
2. **Create Order**: Click "+ New Order"
   - Select customer
   - Add products (prices should auto-load from customer's price list)
   - Set quantities
   - Verify GST calculation
   - Save order
3. **View Order**: Click on order
   - Verify all details
   - Check totals
4. **Convert to Invoice**: Click "Convert to Invoice"
   - Verify invoice created
   - Check invoice number

#### ✅ Invoices Module
1. Click "Invoices" card
2. **View Invoice**: Click on any invoice
   - Verify GST-compliant format
   - Check all details
3. **Print Invoice**: Click "Print"
   - Verify print preview
4. **Record Payment**: Click "Record Payment"
   - Enter payment amount
   - Select payment mode
   - Save
   - Verify invoice status updates

#### ✅ Payments Module
1. Click "Payments" card
2. **View Payments**: Should show all payments
3. **Filter**: Test payment status filter
4. **Verify**: Payment details are correct

#### ✅ Inventory Module
1. Click "Inventory" card
2. **View Inventory**: Should show stock across hubs
3. **Add Stock**: Click "+ Add Stock"
   - Select product and hub
   - Enter batch number
   - Enter expiry date
   - Enter quantity
   - Save
4. **Verify**: Stock appears in inventory

#### ✅ Stock Transfers
1. Click "Inventory" → "Stock Transfers"
2. **Create Transfer**: Click "+ New Transfer"
   - Select from/to hubs
   - Add products
   - Set quantities
   - Save
3. **Verify**: Transfer appears in list

#### ✅ Routes Module
1. Click "Routes" card
2. **Create Route**: Click "+ New Route"
   - Enter route name
   - Assign to user
   - Save
3. **Add Customers**: Click route → "Add Customers"
   - Select customers
   - Save
4. **Verify**: Customers appear in route

#### ✅ Users Module
1. Click "Users" card
2. **Create User**: Click "+ New User"
   - Fill in: Name, Email, Phone, Role
   - Set password
   - Assign hub
   - Save
3. **Verify**: User appears in list
4. **Test Login**: Logout and login with new user

#### ✅ Returns Module
1. Click "Returns" card
2. **Create Return**: Click "+ New Return"
   - Select customer
   - Add return items
   - Set condition (good/damaged/expired)
   - Save
3. **Approve Return**: Click return → "Approve"
4. **Verify**: Status updates

#### ✅ Hubs Module
1. Click "Hubs" card
2. **Create Hub**: Click "+ New Hub"
   - Enter hub details
   - Assign manager
   - Save
3. **Verify**: Hub appears in list

#### ✅ Reports Module
1. Click "Reports" card
2. **View Dashboard**: Should show key metrics
3. **Test Filters**: Change date range
4. **Verify**: Data updates correctly
5. **Check Charts**: Top products, top customers

#### ✅ Attendance Module
1. Click "Attendance" card
2. **View Records**: Should show check-in/out records
3. **Test Filters**: Date and user filters
4. **Verify**: Records display correctly

#### ✅ Location Tracking
1. Click "Location Tracking" card
2. **View Locations**: Should show GPS data
3. **Test Filters**: Date and user filters
4. **Verify**: Map links work

---

## 📱 Mobile App Testing

### Step 1: Start the App

1. **Start Expo**:
   ```powershell
   cd mobile-app
   npm start
   ```

2. **Wait for QR code** (or fix Windows bug first)

3. **Scan QR code** with Expo Go app

### Step 2: Test Authentication

1. **Login Screen**:
   - Enter email and password
   - Click "Sign In"

2. **Expected**: Dashboard appears

### Step 3: Test Each Screen

#### ✅ Home/Dashboard
1. **Check-in**: Click "Check In"
   - Verify location captured
   - Status changes to "Checked In"
2. **Check-out**: Click "Check Out"
   - Verify location captured
   - Status changes to "Checked Out"
3. **Quick Actions**: Test navigation buttons

#### ✅ Products Screen
1. **View Products**: Scroll through list
2. **Verify**: Products load correctly
3. **Pull to Refresh**: Test refresh functionality

#### ✅ Customers Screen
1. **View Customers**: Scroll through list
2. **Click Customer**: Should navigate to order creation
3. **Verify**: Customer details display

#### ✅ Orders Screen
1. **View Orders**: See order list
2. **New Order**: Click "+ New Order"
   - Select customer
   - Add products
   - Set quantities
   - Create order
3. **Verify**: Order appears in list

#### ✅ Profile Screen
1. **View Profile**: Check user details
2. **Logout**: Test logout functionality
3. **Verify**: Returns to login screen

---

## 🧪 Integration Testing

### Test Complete Workflows

#### Workflow 1: Order to Invoice
1. Create order in admin portal
2. Convert to invoice
3. Record payment
4. Verify customer outstanding updates

#### Workflow 2: Stock Transfer
1. Add stock to hub A
2. Create transfer from hub A to hub B
3. Verify inventory updates

#### Workflow 3: Customer Order
1. Create customer in admin
2. Assign price list
3. Create order (verify prices)
4. Convert to invoice
5. Record payment

#### Workflow 4: Mobile Check-in
1. Check in on mobile app
2. View attendance in admin portal
3. Verify location tracking

---

## 🐛 Common Issues & Fixes

### Issue: Can't login
- **Fix**: Verify user exists in Supabase Auth and `users` table

### Issue: No data showing
- **Fix**: Check RLS policies, verify user has correct role

### Issue: Images not loading
- **Fix**: Check image URLs, verify internet connection

### Issue: Mobile app not connecting
- **Fix**: Check `.env` file, verify Supabase credentials

### Issue: QR code not appearing
- **Fix**: Fix Windows `node:sea` bug (see FIX_NOW.md)

---

## ✅ Testing Checklist

- [ ] Admin portal login works
- [ ] All modules accessible
- [ ] CRUD operations work
- [ ] Data displays correctly
- [ ] Forms validate input
- [ ] Navigation works
- [ ] Mobile app login works
- [ ] Mobile screens load
- [ ] Check-in/out works
- [ ] Orders can be created
- [ ] Data syncs between web and mobile

---

## 📊 Test Data Requirements

Create test data for:
- [ ] 10+ products
- [ ] 5+ customers
- [ ] 3+ price lists
- [ ] 5+ orders
- [ ] 3+ invoices
- [ ] 2+ hubs
- [ ] 3+ users (different roles)
- [ ] 2+ routes

---

**Start testing with the admin portal first, then test mobile app!**


