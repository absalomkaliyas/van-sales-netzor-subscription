# Database Schema

This document describes the database schema for the Field Sales & Automatic Invoicing System.

## Tables

### users
Stores user accounts and authentication information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | User's full name |
| email | text | Email address (unique) |
| phone | text | Phone number (unique) |
| role | enum | User role (admin, hub_manager, salesman, finance, supervisor) |
| hub_id | uuid | Foreign key to hubs table |
| gps_enabled | boolean | Whether GPS tracking is enabled |
| is_active | boolean | Account status |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### hubs
Stores warehouse and sub-hub information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Hub name |
| address | text | Full address |
| city | text | City |
| state | text | State |
| pincode | text | PIN code |
| gstin | text | GSTIN (optional) |
| manager_id | uuid | Foreign key to users (hub manager) |
| parent_hub_id | uuid | Foreign key to hubs (for sub-hubs) |
| is_warehouse | boolean | Whether this is a main warehouse |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### customers
Stores customer/shop information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Customer name |
| address | text | Full address |
| city | text | City |
| state | text | State |
| pincode | text | PIN code |
| gstin | text | GSTIN (optional) |
| phone | text | Phone number |
| email | text | Email (optional) |
| price_list_id | uuid | Foreign key to price_lists |
| credit_limit | decimal | Credit limit amount |
| outstanding_amount | decimal | Current outstanding amount |
| route_id | uuid | Foreign key to routes |
| is_active | boolean | Active status |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### products
Stores product master data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| sku | text | SKU code (unique) |
| name | text | Product name |
| description | text | Product description |
| hsn_code | text | HSN code for GST |
| gst_rate | decimal | GST rate percentage |
| unit | text | Unit of measurement |
| pack_size | decimal | Pack size |
| category_id | uuid | Foreign key to categories |
| image_url | text | Product image URL |
| is_active | boolean | Active status |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### price_lists
Stores price list definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Price list name |
| description | text | Description |
| is_default | boolean | Default price list flag |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### price_list_items
Stores product prices for each price list.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| price_list_id | uuid | Foreign key to price_lists |
| product_id | uuid | Foreign key to products |
| mrp | decimal | Maximum Retail Price |
| trade_price | decimal | Trade price |
| promotional_price | decimal | Promotional price (optional) |
| effective_from | date | Effective from date |
| effective_to | date | Effective to date (optional) |

### inventory
Stores stock inventory at each hub.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| product_id | uuid | Foreign key to products |
| hub_id | uuid | Foreign key to hubs |
| batch_no | text | Batch number |
| expiry_date | date | Expiry date (optional) |
| quantity | decimal | Total quantity |
| reserved_quantity | decimal | Reserved quantity |
| available_quantity | decimal | Available quantity |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### stock_transfers
Stores stock transfer requests and history.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| from_hub_id | uuid | Foreign key to hubs (source) |
| to_hub_id | uuid | Foreign key to hubs (destination) |
| transfer_type | enum | Type: warehouse_to_hub, hub_to_hub, hub_to_salesman |
| status | enum | Status: pending, approved, in_transit, completed, cancelled |
| requested_by | uuid | Foreign key to users |
| approved_by | uuid | Foreign key to users (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### stock_transfer_items
Stores items in stock transfers.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| transfer_id | uuid | Foreign key to stock_transfers |
| product_id | uuid | Foreign key to products |
| batch_no | text | Batch number |
| quantity | decimal | Quantity to transfer |
| expiry_date | date | Expiry date (optional) |

### routes
Stores route definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Route name |
| description | text | Route description |
| assigned_user_id | uuid | Foreign key to users (salesman) |
| is_active | boolean | Active status |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### route_customers
Junction table for routes and customers.

| Column | Type | Description |
|--------|------|-------------|
| route_id | uuid | Foreign key to routes |
| customer_id | uuid | Foreign key to customers |

### orders
Stores sales orders.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| order_number | text | Order number (unique) |
| customer_id | uuid | Foreign key to customers |
| user_id | uuid | Foreign key to users (salesman) |
| hub_id | uuid | Foreign key to hubs |
| route_id | uuid | Foreign key to routes (optional) |
| status | enum | Status: draft, pending, confirmed, invoiced, cancelled |
| subtotal | decimal | Subtotal amount |
| discount_amount | decimal | Total discount |
| tax_amount | decimal | Total tax |
| total_amount | decimal | Total amount |
| payment_status | enum | Payment status: pending, partial, paid, overdue |
| is_offline | boolean | Created offline flag |
| synced_at | timestamp | Sync timestamp (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### order_items
Stores items in orders.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| order_id | uuid | Foreign key to orders |
| product_id | uuid | Foreign key to products |
| batch_no | text | Batch number (optional) |
| quantity | decimal | Quantity |
| unit_price | decimal | Unit price |
| discount_percent | decimal | Discount percentage |
| discount_amount | decimal | Discount amount |
| tax_rate | decimal | Tax rate |
| tax_amount | decimal | Tax amount |
| total_amount | decimal | Total amount for this item |

### invoices
Stores invoices generated from orders.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| invoice_number | text | Invoice number (unique) |
| order_id | uuid | Foreign key to orders |
| customer_id | uuid | Foreign key to customers |
| user_id | uuid | Foreign key to users (salesman) |
| hub_id | uuid | Foreign key to hubs |
| invoice_date | date | Invoice date |
| due_date | date | Due date (optional) |
| subtotal | decimal | Subtotal amount |
| discount_amount | decimal | Total discount |
| tax_amount | decimal | Total tax |
| total_amount | decimal | Total amount |
| payment_status | enum | Payment status: pending, partial, paid, overdue |
| paid_amount | decimal | Paid amount |
| pdf_url | text | PDF URL (optional) |
| einvoice_payload | jsonb | e-Invoice payload (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### invoice_items
Stores items in invoices.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| invoice_id | uuid | Foreign key to invoices |
| product_id | uuid | Foreign key to products |
| batch_no | text | Batch number (optional) |
| quantity | decimal | Quantity |
| unit_price | decimal | Unit price |
| discount_percent | decimal | Discount percentage |
| discount_amount | decimal | Discount amount |
| tax_rate | decimal | Tax rate |
| tax_amount | decimal | Tax amount |
| total_amount | decimal | Total amount for this item |

### payments
Stores payment records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| invoice_id | uuid | Foreign key to invoices (optional) |
| customer_id | uuid | Foreign key to customers |
| user_id | uuid | Foreign key to users (salesman) |
| hub_id | uuid | Foreign key to hubs |
| amount | decimal | Payment amount |
| mode | enum | Payment mode: cash, upi, card, cheque, credit_note |
| transaction_ref | text | Transaction reference (optional) |
| receipt_number | text | Receipt number (unique) |
| payment_date | date | Payment date |
| notes | text | Notes (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### attendance
Stores attendance records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users |
| hub_id | uuid | Foreign key to hubs (optional) |
| checkin_time | timestamp | Check-in timestamp |
| checkout_time | timestamp | Check-out timestamp (optional) |
| checkin_latitude | decimal | Check-in latitude |
| checkin_longitude | decimal | Check-in longitude |
| checkin_address | text | Check-in address (optional) |
| checkout_latitude | decimal | Check-out latitude (optional) |
| checkout_longitude | decimal | Check-out longitude (optional) |
| checkout_address | text | Check-out address (optional) |
| checkin_photo | text | Check-in photo URL (optional) |
| checkout_photo | text | Check-out photo URL (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### location_tracking
Stores GPS location tracking data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users |
| latitude | decimal | Latitude |
| longitude | decimal | Longitude |
| address | text | Address (optional) |
| timestamp | timestamp | Location timestamp |
| accuracy | decimal | GPS accuracy in meters (optional) |
| route_id | uuid | Foreign key to routes (optional) |
| customer_id | uuid | Foreign key to customers (optional) |

### product_returns
Stores product return records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| invoice_id | uuid | Foreign key to invoices (optional) |
| customer_id | uuid | Foreign key to customers |
| user_id | uuid | Foreign key to users (salesman) |
| hub_id | uuid | Foreign key to hubs |
| return_date | date | Return date |
| reason | enum | Return reason: damaged, expired, unsold, wrong_item, customer_request |
| status | enum | Status: pending, approved, rejected, processed |
| total_amount | decimal | Total return amount |
| credit_note_id | uuid | Foreign key to credit_notes (optional) |
| approved_by | uuid | Foreign key to users (optional) |
| notes | text | Notes (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### return_items
Stores items in product returns.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| return_id | uuid | Foreign key to product_returns |
| product_id | uuid | Foreign key to products |
| batch_no | text | Batch number (optional) |
| quantity | decimal | Return quantity |
| unit_price | decimal | Unit price |
| reason | enum | Return reason |
| condition | enum | Condition: good, damaged, expired |

### credit_notes
Stores credit notes issued for returns.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| credit_note_number | text | Credit note number (unique) |
| return_id | uuid | Foreign key to product_returns |
| invoice_id | uuid | Foreign key to invoices (optional) |
| customer_id | uuid | Foreign key to customers |
| amount | decimal | Credit note amount |
| issue_date | date | Issue date |
| pdf_url | text | PDF URL (optional) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### sync_queue
Stores offline operations waiting to sync.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users |
| entity_type | text | Entity type (order, invoice, payment, etc.) |
| entity_id | uuid | Entity ID |
| operation | enum | Operation: create, update, delete |
| payload | jsonb | Entity data |
| status | enum | Status: pending, syncing, completed, failed |
| error_message | text | Error message (optional) |
| retry_count | integer | Retry count |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### audit_logs
Stores audit trail for critical operations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users |
| entity_type | text | Entity type |
| entity_id | uuid | Entity ID |
| action | text | Action performed |
| old_values | jsonb | Old values (optional) |
| new_values | jsonb | New values (optional) |
| ip_address | text | IP address (optional) |
| created_at | timestamp | Creation timestamp |


