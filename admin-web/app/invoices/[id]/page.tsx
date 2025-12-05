'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'

interface InvoiceItem {
  id: string
  product_id: string
  product?: {
    sku: string
    name: string
    image_url?: string
    hsn_code: string
  }
  quantity: number
  unit_price: number
  discount_percent: number
  discount_amount: number
  tax_rate: number
  tax_amount: number
  total_amount: number
}

interface Invoice {
  id: string
  invoice_number: string
  customer_id: string
  customer?: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
    gstin?: string
  }
  invoice_date: string
  due_date?: string
  subtotal: number
  discount_amount: number
  tax_amount: number
  total_amount: number
  payment_status: string
  paid_amount: number
  created_at: string
  items: InvoiceItem[]
}

export default function InvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const invoiceId = params.id as string

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadInvoice()
  }, [invoiceId])

  async function loadInvoice() {
    try {
      setLoading(true)
      // Fetch invoice
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', invoiceId)
        .single()

      if (invoiceError) throw invoiceError

      // Fetch customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', invoiceData.customer_id)
        .single()

      if (customerError) throw customerError

      // Fetch invoice items
      const { data: itemsData, error: itemsError } = await supabase
        .from('invoice_items')
        .select('*')
        .eq('invoice_id', invoiceId)
        .order('created_at')

      if (itemsError) throw itemsError

      // Fetch products
      const productIds = [...new Set((itemsData || []).map(item => item.product_id))]
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, sku, name, image_url, hsn_code')
        .in('id', productIds)

      if (productsError) throw productsError

      const productMap = new Map(
        (productsData || []).map(p => [p.id, p])
      )

      const itemsWithProducts = (itemsData || []).map(item => ({
        ...item,
        product: productMap.get(item.product_id)
      }))

      setInvoice({
        ...invoiceData,
        customer: customerData,
        items: itemsWithProducts
      })
    } catch (err: any) {
      setError(err.message || 'Error loading invoice')
      console.error('Error loading invoice:', err)
    } finally {
      setLoading(false)
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-red-100 text-red-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Invoice not found</p>
          <Link href="/invoices" className="text-blue-600 hover:text-blue-700">
            ← Back to Invoices
          </Link>
        </div>
      </div>
    )
  }

  const balanceAmount = invoice.total_amount - invoice.paid_amount

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/invoices" className="text-gray-600 hover:text-gray-900">
                ← Back to Invoices
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Invoice: {invoice.invoice_number}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {invoice.payment_status !== 'paid' && (
                <Link
                  href={`/invoices/${invoiceId}/payment`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Record Payment
                </Link>
              )}
              <button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Invoice Document */}
          <div className="bg-white shadow rounded-lg p-8 print:p-4">
            {/* Header */}
            <div className="border-b pb-6 mb-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">TAX INVOICE</h2>
                  <p className="text-sm text-gray-600">Invoice #: {invoice.invoice_number}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                  {invoice.due_date && (
                    <p className="text-sm text-gray-600">Due Date: {new Date(invoice.due_date).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(invoice.payment_status)}`}>
                    {invoice.payment_status.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Company Info */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Bill To:</h3>
                {invoice.customer && (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900">{invoice.customer.name}</p>
                    <p>{invoice.customer.address}</p>
                    <p>{invoice.customer.city}, {invoice.customer.state} - {invoice.customer.pincode}</p>
                    {invoice.customer.gstin && (
                      <p className="mt-1">GSTIN: {invoice.customer.gstin}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">From:</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">NETZOR</p>
                  <p>Field Sales & Invoicing System</p>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">HSN</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GST %</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.product?.name || 'Unknown Product'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {item.product?.hsn_code || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        ₹{item.unit_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {item.discount_percent > 0 ? `${item.discount_percent}%` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {item.tax_rate}%
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                        ₹{item.total_amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">₹{invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discount_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">-₹{invoice.discount_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST):</span>
                  <span className="font-medium">₹{invoice.tax_amount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-blue-600">₹{invoice.total_amount.toFixed(2)}</span>
                  </div>
                </div>
                {invoice.paid_amount > 0 && (
                  <>
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-gray-600">Paid:</span>
                      <span className="font-medium text-green-600">₹{invoice.paid_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Balance:</span>
                      <span className={`font-semibold ${balanceAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{balanceAmount.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

