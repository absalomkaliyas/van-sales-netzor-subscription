# Field Sales & Automatic Invoicing System

**For: Distributor / Manufacturer (NETZOR)**

A mobile + web admin module, offline-capable Field Sales and Invoicing platform that enables distributors and manufacturers to manage digital product catalogs, generate automatic invoices on the field, take orders, collect payments, track location & attendance, assign/optimize routes, and integrate smoothly with existing ERPs (Tally, SAP, Oracle, etc.).

## 🚀 Tech Stack (Free Hosting Optimized)

- **Admin Web Portal**: Next.js 14 (deploy to Vercel - free tier)
- **Mobile App**: React Native with Expo (free deployment)
- **Backend API**: Next.js API Routes + Supabase (free tier)
- **Database**: Supabase PostgreSQL (free tier)
- **File Storage**: Supabase Storage (free tier)
- **Authentication**: Supabase Auth (free tier)
- **Real-time Sync**: Supabase Realtime (free tier)

## 📁 Project Structure

```
├── admin-web/              # Next.js Admin Portal
├── mobile-app/             # React Native Mobile App (Expo)
├── shared/                 # Shared types and utilities
├── docs/                   # Documentation
└── scripts/                # Deployment and utility scripts
```

## ✨ Core Capabilities

- ✅ Digital Product Catalogue (with images, HSN, GST, batch & expiry, price lists)
- ✅ Field Sales Order (create orders on-device, convert to invoice and share via WhatsApp)
- ✅ Automatic Invoicing (GST-compliant PDF & e-invoice support)
- ✅ Payment Collection (cash, UPI, card readers / POS, credit notes)
- ✅ Location Tracking (GPS with timestamped check-ins, geo-fencing options)
- ✅ Attendance Management (salesman check-in/out, shift logging)
- ✅ Route Management (create, assign, and optimize routes; route-wise reporting)
- ✅ ERP Integration (sync invoices, ledgers, stock with Tally/other ERPs)
- ✅ Stock Module (Warehouse → Hub → Salesman flow)
- ✅ Returns & Damages Management
- ✅ Comprehensive Reporting & Analytics

## 👥 User Roles

1. **Administrator** — system configuration, user & hub management, ERP mapping, reports
2. **Hub Manager** — assign stock, verify collections, approve settlements
3. **Salesman / Van Dealer** — mobile app for orders, invoicing, collections, attendance
4. **Finance / Accounts** — reconcile payments, manage returns, export data to ERP
5. **Supervisor / Field Manager** — route planning, performance monitoring

## 🏗️ Modules

1. **Product Catalog** - Product master with HSN, GST, batch/expiry, multiple price lists
2. **Field Sales Order & Invoicing** - Create orders, convert to invoices, GST-compliant PDFs
3. **Automatic Invoicing Engine** - Business rules, tax calculations, ERP sync
4. **Payment Collection** - Cash, UPI, Card payments with reconciliation
5. **Location & Attendance** - GPS tracking, check-in/out, route playback
6. **Route Management** - Create routes, assign shops, optimize delivery
7. **Stock & Hub Flow** - Warehouse → Hub → Salesman stock tracking
8. **Returns & Damages** - Return entry, approval flow, inventory adjustment
9. **ERP / Tally Integration** - Two-way sync, ledger mapping, voucher creation
10. **Reporting & Analytics** - Daily sales, route-wise, salesman performance, stock reports

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI for mobile development
- Supabase account (free tier)

### Installation

```bash
# Install dependencies for admin web
cd admin-web
npm install

# Install dependencies for mobile app
cd ../mobile-app
npm install
```

### Environment Setup

1. Create a Supabase project at https://supabase.com
2. Copy `.env.example` to `.env` in both `admin-web` and `mobile-app`
3. Fill in your Supabase credentials

### Development

```bash
# Run admin web portal
cd admin-web
npm run dev

# Run mobile app
cd mobile-app
npm start
```

## 📱 Deployment

### Admin Web Portal (Vercel)
```bash
cd admin-web
vercel deploy
```

### Mobile App (Expo)
```bash
cd mobile-app
expo build:android
expo build:ios
```

## 📄 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines]
