'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

interface OrderItem {
  id: string
  product_id: string
  product?: {
    sku: string
    name: string
    hsn_code: string
  }
  quantity: number
  unit_price: number
  discount_percent: number
  discount_amount: number
  tax_rate: number
  tax_amount: number
  total_amount: number
  batch_no?: string
}

interface Order {
  id: string
  order_number: string
  customer_id: string
  customer?: {
    name: string
    gstin?: string
  }
  subtotal: number
  discount_amount: number
  tax_amount: number
  total_amount: number
  items: OrderItem[]
}

export default function ConvertToInvoicePage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
  })

  useEffect(() => {
    loadOrder()
  }, [orderId])

  async function loadOrder() {
    try {
      setLoading(true)
      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (orderError) throw orderError

      // Fetch customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id, name, gstin')
        .eq('id', orderData.customer_id)
        .single()

      if (customerError) throw customerError

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)

      if (itemsError) throw itemsError

      // Fetch products
      const productIds = [...new Set((itemsData || []).map(item => item.product_id))]
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, sku, name, hsn_code')
        .in('id', productIds)

      if (productsError) throw productsError

      const productMap = new Map(
        (productsData || []).map(p => [p.id, p])
      )

      const itemsWithProducts = (itemsData || []).map(item => ({
        ...item,
        product: productMap.get(item.product_id)
      }))

      setOrder({
        ...orderData,
        customer: customerData,
        items: itemsWithProducts
      })

      // Set default due date (30 days from invoice date)
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + 30)
      setFormData(prev => ({
        ...prev,
        due_date: dueDate.toISOString().split('T')[0]
      }))
    } catch (err: any) {
      setError(err.message || 'Error loading order')
      console.error('Error loading order:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!order) {
        throw new Error('Order not found')
      }

      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Get user's hub_id
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      if (userError) throw userError

      // Get hub_id (use default if not available)
      let hubId = userData?.hub_id
      if (!hubId) {
        const { data: defaultHub } = await supabase
          .from('hubs')
          .select('id')
          .limit(1)
          .single()
        if (defaultHub?.id) {
          hubId = defaultHub.id
        } else {
          throw new Error('No hub available. Please contact administrator.')
        }
      }

      // Generate invoice number
      const invoiceNumber = `INV-${Date.now()}`

      // Create invoice
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          invoice_number: invoiceNumber,
          order_id: orderId,
          customer_id: order.customer_id,
          user_id: user.id,
          hub_id: hubId,
          invoice_date: formData.invoice_date,
          due_date: formData.due_date || null,
          subtotal: order.subtotal,
          discount_amount: order.discount_amount,
          tax_amount: order.tax_amount,
          total_amount: order.total_amount,
          payment_status: 'pending',
          paid_amount: 0,
        }])
        .select()
        .single()

      if (invoiceError) throw invoiceError

      // Create invoice items
      const invoiceItems = order.items.map(item => ({
        invoice_id: invoiceData.id,
        product_id: item.product_id,
        batch_no: item.batch_no || null,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount_percent: item.discount_percent,
        discount_amount: item.discount_amount,
        tax_rate: item.tax_rate,
        tax_amount: item.tax_amount,
        total_amount: item.total_amount,
      }))

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItems)

      if (itemsError) throw itemsError

      // Update order status to 'invoiced'
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'invoiced' })
        .eq('id', orderId)

      if (updateError) throw updateError

      // Redirect to invoice page (we'll create this next)
      router.push(`/invoices/${invoiceData.id}`)
    } catch (err: any) {
      setError(err.message || 'Error creating invoice')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link href="/orders" className="text-blue-600 hover:text-blue-700">
            ← Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/orders/${orderId}`} className="text-gray-600 hover:text-gray-900">
                ← Back to Order
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Convert Order to Invoice
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Order Information</h3>
                <p className="text-sm text-blue-800">
                  Order: <strong>{order.order_number}</strong> | 
                  Customer: <strong>{order.customer?.name}</strong> | 
                  Total: <strong>₹{order.total_amount.toFixed(2)}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="invoice_date" className="block text-sm font-medium text-gray-700">
                    Invoice Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="invoice_date"
                    required
                    value={formData.invoice_date}
                    onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Invoice Items Preview */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">HSN</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GST</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item) => (
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
              </div>

              {/* Summary */}
              <div className="border-t pt-6">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.discount_amount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount:</span>
                        <span className="font-medium text-green-600">-₹{order.discount_amount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (GST):</span>
                      <span className="font-medium">₹{order.tax_amount.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-lg font-bold text-blue-600">₹{order.total_amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Link
                  href={`/orders/${orderId}`}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {saving ? 'Creating Invoice...' : 'Create Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}


