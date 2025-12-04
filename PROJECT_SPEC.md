# Field Sales & Automatic Invoicing System - Complete Specification

## Purpose

A mobile + web admin module, offline-capable Field Sales and Invoicing platform that enables distributors and manufacturers to manage digital product catalogs, generate automatic invoices on the field, take orders, collect payments, track location & attendance, assign/optimize routes, and integrate smoothly with existing ERPs (Tally, SAP, Oracle, etc.).

## Core Capabilities (MUST HAVE)

- ✅ Digital Product Catalogue (with images, HSN, GST, batch & expiry, price lists)
- ✅ Field Sales Order (create orders on-device, convert to invoice and share via whatsapp)
- ✅ Automatic Invoicing (GST-compliant PDF & e-invoice support where applicable)
- ✅ Payment Collection (cash, UPI, card readers / POS, credit notes)
- ✅ Location Tracking (GPS with timestamped check-ins, geo-fencing options)
- ✅ Attendance Management (salesman check-in/out, shift logging)
- ✅ Route Management (create, assign, and optimize routes; route-wise reporting)
- ✅ ERP Integration (sync invoices, ledgers, stock with Tally/other ERPs)

## Stock Module

### I. Admin Records Total Stock
- Admin records the total numbers of stocks in main hub or warehouse.

### II. Admin Assigns Stock to Sub-Hubs
- Admin can allocate stock to various sub-hubs on a daily or on-demand basis.
- Real-time tracking of stock movement from warehouse to each sub-hub.

### III. Hubs Assign Stock to Salesmen / Van Dealers
- Hub managers distribute stock to van salesmen or dealers as needed.
- System maintains batch, quantity, and product-level traceability.

### IV. Salesmen / Van Dealers Sell Products to Stores
- Salespersons sell products directly to shops or customers during their route.
- Stock automatically updates based on billing and returns.

### V. Admin Panel
- A centralized management portal where administrators can configure the entire system, manage users, control stock flow, generate reports, and monitor sales activities in real time.

## Billing Module

- On-the-spot invoice generation.
- Supports item-wise, route-wise, and salesman-wise billing.
- Ability to handle cash sales, credit sales, and returns

## Cash & Collection Module

- Salesman collections recorded daily.
- Cash settlement between Salesman ↔ Hub ↔ Admin.
- Automatic reconciliation with billing data.

## Route Management

- Create and manage routes for each van/salesman.
- Assign shops to specific routes.
- Optimize daily van movement and delivery planning.
- Route-wise sales reporting.

## Daily Report Module

- Daily Sales report
- Stock report

## Tally Integration

- Two-way sync with Tally ERP
- Automatic voucher creation
- Ledger mapping and reconciliation

## Product Return Management

- Manually Track returned damaged/expired/unsold items
- Adjust inventory and reports
- Generate credit notes

## Primary User Roles

1. **Administrator** — system configuration, user & hub management, ERP mapping, reports
2. **Hub Manager** — assign stock, verify collections, approve settlements
3. **Salesman / Van Dealer** — mobile app for orders, invoicing, collections, attendance
4. **Finance / Accounts** — reconcile payments, manage returns, export data to ERP
5. **Supervisor / Field Manager** — route planning, performance monitoring

## Modules and Feature Breakdown

### 1. Product Catalog
- Product master (SKU, name, description, HSN, GST %, unit, pack size)
- Multiple price-lists (MRP, trade price, promotional price)
- Batch & expiry management
- Product images and rich descriptions
- Search, filter, and category navigation
- Offline caching for field access

### 2. Field Sales Order & Invoicing
- Create orders with item-level discounts, taxes, and rounding rules
- Convert order → invoice with a single tap
- Auto-generate sequential invoice numbers (configurable series per hub)
- GST-compliant invoice layout + PDF generation
- e-Invoice payload support (for businesses required to report e-invoice)
- Support for credit notes & partial returns
- Auto-sync to central server when online

### 3. Automatic Invoicing Engine
- Business rules: tax slabs, cess, reverse charge, export rules
- Auto-apply customer price list, discounts, credit limits
- Auto-create ledger entries for ERP sync
- Scheduled batch invoicing (for offline orders that need central approval)

### 4. Payment Collection
- Record cash collections with receipt numbers
- Accept UPI/QR payments via deep-link + store transaction reference
- Integrate with mobile POS SDKs / Bluetooth card readers for card payments
- Create payment receipts & link to invoices
- Auto-reconciliation engine matching payments to invoices

### 5. Location & Attendance
- GPS check-in/check-out with photo proof (optional)
- Background location tracking with configurable intervals (respect battery & privacy)
- Route playback and visit verification (time spent at shop)
- Attendance reports (daily/weekly/monthly)

### 6. Route Management
- Create routes and assign shops/customers
- Assign routes to salesmen (daily/weekly/monthly)
- Optimize routes using simple heuristics (nearest neighbor) or integrate with routing APIs for advanced optimization
- Route completion status and route-wise sales metrics

### 7. Stock & Hub Flow
- Warehouse stock master + sub-hub allocations
- Hub → Salesman stock issue with batch tracking
- Real-time stock adjustments upon invoicing & returns
- Stock transfer requests and receipts

### 8. Returns & Damages
- Return entry with reason codes (damaged/expired/unsold)
- Inspect & approve flow (hub manager/admin)
- Auto-adjust inventory & generate credit notes

### 9. ERP / Tally Integration
- Two-way sync using secure APIs, SFTP, or middleware
- Map ledger accounts, tax ledgers, stock ledgers, and customers
- Automatic voucher creation in Tally (or export as CSV/XML)
- Scheduled sync jobs with retry & conflict resolution

### 10. Reporting & Analytics
- Standard reports: Daily Sales, Route-wise Sales, Salesman Performance, Collection Reports, Stock Position
- Customizable dashboards for Admin & Managers
- Export to CSV/PDF & scheduled email reports

## Non-functional Requirements

- **Offline-first**: tolerate network loss and sync reliably when online
- **Scalable**: multi-tenant ready (support multiple distributors/hubs)
- **Secure**: TLS in transit, encrypted sensitive data at rest, role-based access control
- **Audit trails**: record who changed what and when (critical for invoices & payments)
- **Performance**: mobile app startup under 3s, invoice generation under 2s on average device

## Data Model (High-level Entities)

- **User** (id, name, role, hub_id, phone, email, gps_enabled)
- **Customer** (id, name, address, GSTIN, price_list_id, credit_limit)
- **Product** (sku, name, HSN, gst_rate, pack_size)
- **Inventory** (product_id, hub_id, batch_no, qty, expiry_date)
- **Route** (id, name, list_of_customer_ids, assigned_user_id)
- **Order** (id, customer_id, user_id, items[], total, status)
- **Invoice** (id, order_id, invoice_no, pdf_link, payment_status)
- **Payment** (id, invoice_id, mode, amount, txn_ref)
- **Attendance** (user_id, checkin_time, checkout_time, location)

## Integration Points

- ERP connector (Tally) for ledger, stock & invoice sync
- Payment gateways & POS SDKs for card/UPI
- SMS/Email gateway for OTPs & invoice delivery
- Mapping & routing APIs

## UX / UI Considerations

- Simple, large UI elements for field users (one-handed use)
- Include company logo
- Offline queue view & unsynced items indicator
- Quick invoice template with prefilled customer data & suggestions
- Camera integration for proofs (delivery photo, cash receipt photo)
- Supervisory dashboard for route & collection monitoring

## Compliance & Indian GST Considerations

- Support for GSTIN validation, HSN codes, and e-invoicing (if required)
- Invoice templates matching tax invoice rules in India
- Audit-friendly ledgers and exportable GST returns (GSTR-1 mapping aid)

## MVP Recommendation (Phase 1)

Goal: Rapidly deploy a working system for field sales teams.

- Mobile app (offline orders, invoicing, basic catalog)
- Admin web panel (user, product, route, hub management)
- Payment capture (manual & UPI link)
- Stock sync & basic ERP export (CSV)
- Reporting: Daily Sales, Collections, Stock

## Phase 2 (Post-MVP Enhancements)

- Full bi-directional ERP integration (Tally auto-vouchers)
- Advanced route optimization & ETAs
- Card reader integration and auto reconciliation
- e-Invoicing integration and automated GSTR exports
- Machine learning suggestions (next-best-product, credit risk)

## Deliverables

1. Functional specification & wireframes
2. Mobile app (Android + iOS) — production ready
3. Admin web portal — responsive
4. Integration scripts & documentation for ERP
5. Deployment scripts, CI/CD, and runbook
6. User manual & training session

