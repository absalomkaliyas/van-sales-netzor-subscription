# 📱 Mobile App - Dealer/Worker Workflow

## Overview

The mobile app is designed for **dealers/workers** who go in vans to deliver products and collect cash from stores/companies. The app is hub-specific and shows only data assigned to the user's hub.

---

## 🎯 Key Features

### 1. **Hub-Specific Inventory**
- Shows only stock assigned to the user's hub
- Displays batch numbers and expiry dates
- Highlights expiring/expired items
- Shows available quantities

### 2. **Route-Based Customers**
- Shows only customers assigned to the user's route
- Displays outstanding amounts
- Quick access to create orders

### 3. **Smart Order Creation**
- Checks stock availability before adding products
- Fetches prices from customer's price list
- Calculates GST per product (individual rates)
- Prevents ordering more than available stock
- Shows stock warnings

### 4. **Payment Collection**
- View all invoices with pending/partial payments
- Filter by payment status
- Collect payments (Cash, UPI, Card, Cheque)
- Automatic invoice status updates
- Customer outstanding amount updates

### 5. **Dashboard**
- Hub information display
- Inventory count
- Pending payments count
- Quick access to all modules

---

## 📋 App Structure

### Tabs Navigation

1. **Home** - Dashboard with stats and quick actions
2. **Products** - Product catalog with stock availability
3. **Inventory** - Hub-specific stock with batch/expiry tracking
4. **Customers** - Route-assigned customers only
5. **Orders** - Order history and creation
6. **Payments** - Invoice payment collection
7. **Profile** - User profile and logout

### Screens

- **Home** (`app/(tabs)/index.tsx`)
  - Check-in/Check-out with GPS
  - Hub information
  - Dashboard stats (inventory count, pending payments)
  - Quick action buttons

- **Inventory** (`app/(tabs)/inventory.tsx`)
  - Hub-specific stock list
  - Batch numbers and expiry dates
  - Expiry warnings
  - Stock quantities

- **Payments** (`app/(tabs)/payments.tsx`)
  - List of invoices
  - Filter by payment status
  - Outstanding amounts
  - Quick payment collection

- **Collect Payment** (`app/collect-payment.tsx`)
  - Invoice details
  - Payment amount input
  - Payment mode selection (Cash, UPI, Card, Cheque)
  - Transaction reference
  - Notes

- **New Order** (`app/new-order.tsx`)
  - Customer selection
  - Product selection with stock check
  - Price from customer's price list
  - Quantity with stock validation
  - GST calculation per product
  - Order creation

---

## 🔄 Workflow

### Daily Workflow

1. **Check In** (Home screen)
   - Worker checks in with GPS location
   - System records attendance

2. **View Inventory** (Inventory tab)
   - See available stock in hub
   - Check batch numbers and expiry dates

3. **View Customers** (Customers tab)
   - See assigned customers
   - Check outstanding amounts

4. **Create Orders** (Orders → New Order)
   - Select customer
   - Add products (with stock check)
   - Prices auto-loaded from customer's price list
   - Create order

5. **Collect Payments** (Payments tab)
   - View pending invoices
   - Collect payment (cash/UPI/card/cheque)
   - System updates invoice and customer outstanding

6. **Check Out** (Home screen)
   - Worker checks out with GPS location

---

## 🔐 Data Security

- All data is filtered by user's hub
- Customers shown only from assigned routes
- Stock checked before order creation
- Payments tracked with user ID

---

## 📊 Key Features

### Stock Management
- ✅ Hub-specific inventory
- ✅ Batch number tracking
- ✅ Expiry date tracking
- ✅ Low stock warnings
- ✅ Stock validation in orders

### Order Management
- ✅ Customer price list integration
- ✅ Stock availability check
- ✅ Individual GST rates per product
- ✅ Real-time price calculation
- ✅ Order history

### Payment Collection
- ✅ Multiple payment modes
- ✅ Transaction reference tracking
- ✅ Automatic status updates
- ✅ Customer outstanding tracking
- ✅ Payment history

### Route Management
- ✅ Route-based customer assignment
- ✅ Only assigned customers visible
- ✅ Quick customer access

---

## 🚀 Next Steps

1. **Offline Support** - Queue orders/payments when offline
2. **Barcode Scanning** - Scan products for faster entry
3. **Photo Capture** - Capture delivery photos
4. **GPS Tracking** - Real-time location tracking
5. **Notifications** - Push notifications for assignments

---

## 📝 Notes

- All data is hub-specific
- Customers are route-filtered
- Stock is validated before ordering
- Payments update invoice and customer records
- GPS tracking for attendance and location

---

**The mobile app is now ready for dealer/worker use!** 🎉

