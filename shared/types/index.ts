// Shared TypeScript types for both admin-web and mobile-app

export enum UserRole {
  ADMIN = 'admin',
  HUB_MANAGER = 'hub_manager',
  SALESMAN = 'salesman',
  FINANCE = 'finance',
  SUPERVISOR = 'supervisor',
}

export enum OrderStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  INVOICED = 'invoiced',
  CANCELLED = 'cancelled',
}

export enum PaymentMode {
  CASH = 'cash',
  UPI = 'upi',
  CARD = 'card',
  CHEQUE = 'cheque',
  CREDIT_NOTE = 'credit_note',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

export enum ReturnReason {
  DAMAGED = 'damaged',
  EXPIRED = 'expired',
  UNSOLD = 'unsold',
  WRONG_ITEM = 'wrong_item',
  CUSTOMER_REQUEST = 'customer_request',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  hub_id?: string;
  gps_enabled: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Hub {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstin?: string;
  manager_id?: string;
  parent_hub_id?: string; // For sub-hubs
  is_warehouse: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstin?: string;
  phone: string;
  email?: string;
  price_list_id: string;
  credit_limit: number;
  outstanding_amount: number;
  route_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  hsn_code: string;
  gst_rate: number;
  unit: string;
  pack_size: number;
  category_id?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PriceList {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface PriceListItem {
  id: string;
  price_list_id: string;
  product_id: string;
  mrp: number;
  trade_price: number;
  promotional_price?: number;
  effective_from: string;
  effective_to?: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  hub_id: string;
  batch_no: string;
  expiry_date?: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface StockTransfer {
  id: string;
  from_hub_id: string;
  to_hub_id: string;
  transfer_type: 'warehouse_to_hub' | 'hub_to_hub' | 'hub_to_salesman';
  status: 'pending' | 'approved' | 'in_transit' | 'completed' | 'cancelled';
  requested_by: string;
  approved_by?: string;
  items: StockTransferItem[];
  created_at: string;
  updated_at: string;
}

export interface StockTransferItem {
  id: string;
  transfer_id: string;
  product_id: string;
  batch_no: string;
  quantity: number;
  expiry_date?: string;
}

export interface Route {
  id: string;
  name: string;
  description?: string;
  assigned_user_id?: string;
  customer_ids: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  batch_no?: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  user_id: string;
  hub_id: string;
  route_id?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  payment_status: PaymentStatus;
  is_offline: boolean;
  synced_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  order_id: string;
  customer_id: string;
  user_id: string;
  hub_id: string;
  invoice_date: string;
  due_date?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  payment_status: PaymentStatus;
  paid_amount: number;
  pdf_url?: string;
  einvoice_payload?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id: string;
  batch_no?: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
}

export interface Payment {
  id: string;
  invoice_id?: string;
  customer_id: string;
  user_id: string;
  hub_id: string;
  amount: number;
  mode: PaymentMode;
  transaction_ref?: string;
  receipt_number: string;
  payment_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  hub_id?: string;
  checkin_time: string;
  checkout_time?: string;
  checkin_location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  checkout_location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  checkin_photo?: string;
  checkout_photo?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductReturn {
  id: string;
  invoice_id?: string;
  customer_id: string;
  user_id: string;
  hub_id: string;
  return_date: string;
  reason: ReturnReason;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  items: ReturnItem[];
  total_amount: number;
  credit_note_id?: string;
  approved_by?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ReturnItem {
  id: string;
  return_id: string;
  product_id: string;
  batch_no?: string;
  quantity: number;
  unit_price: number;
  reason: ReturnReason;
  condition: 'good' | 'damaged' | 'expired';
}

export interface CreditNote {
  id: string;
  credit_note_number: string;
  return_id: string;
  invoice_id?: string;
  customer_id: string;
  amount: number;
  issue_date: string;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

export interface LocationTracking {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: string;
  accuracy?: number;
  route_id?: string;
  customer_id?: string;
}

