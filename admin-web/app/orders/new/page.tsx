'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
  price_list_id?: string
}

interface Product {
  id: string
  sku: string
  name: string
  hsn_code: string
  gst_rate: number
  unit: string
  pack_size: number
}

interface PriceListItem {
  mrp: number
  trade_price: number
  promotional_price?: number
}

interface OrderItem {
  product_id: string
  product: Product
  quantity: number
  unit_price: number
  discount_percent: number
  tax_rate: number
}

export default function NewOrderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [priceListItems, setPriceListItems] = useState<Map<string, PriceListItem>>(new Map())
  const [selectedCustomer, setSelectedCustomer] = useState<string>('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [discountAmount, setDiscountAmount] = useState(0)

  const [formData, setFormData] = useState({
    customer_id: '',
    route_id: '',
  })

  useEffect(() => {
    loadCustomers()
    loadProducts()
  }, [])

  useEffect(() => {
    if (selectedCustomer) {
      loadPriceListForCustomer(selectedCustomer)
    }
  }, [selectedCustomer])

  async function loadCustomers() {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name, price_list_id')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCustomers(data || [])
    } catch (err: any) {
      console.error('Error loading customers:', err)
    }
  }

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      console.error('Error loading products:', err)
    }
  }

  async function loadPriceListForCustomer(customerId: string) {
    try {
      const customer = customers.find(c => c.id === customerId)
      if (!customer?.price_list_id) return

      const { data, error } = await supabase
        .from('price_list_items')
        .select('product_id, mrp, trade_price, promotional_price')
        .eq('price_list_id', customer.price_list_id)
        .eq('effective_from', new Date().toISOString().split('T')[0])

      if (error) throw error

      const priceMap = new Map<string, PriceListItem>()
      data?.forEach(item => {
        priceMap.set(item.product_id, {
          mrp: item.mrp,
          trade_price: item.trade_price,
          promotional_price: item.promotional_price
        })
      })
      setPriceListItems(priceMap)
    } catch (err: any) {
      console.error('Error loading price list:', err)
    }
  }

  const handleAddProduct = () => {
    if (orderItems.length === 0 || orderItems[orderItems.length - 1].product_id) {
      setOrderItems([...orderItems, {
        product_id: '',
        product: {} as Product,
        quantity: 1,
        unit_price: 0,
        discount_percent: 0,
        tax_rate: 0
      }])
    }
  }

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const newItems = [...orderItems]
    newItems[index].product_id = productId
    newItems[index].product = product
    newItems[index].tax_rate = product.gst_rate

    // Set price from price list if available
    const priceItem = priceListItems.get(productId)
    if (priceItem) {
      newItems[index].unit_price = priceItem.trade_price || priceItem.mrp
    } else {
      // Fallback: use a default or let user enter
      newItems[index].unit_price = 0
    }

    setOrderItems(newItems)
    calculateTotals(newItems)
  }

  const handleItemChange = (index: number, field: string, value: number) => {
    const newItems = [...orderItems]
    ;(newItems[index] as any)[field] = value
    setOrderItems(newItems)
    calculateTotals(newItems)
  }

  const handleRemoveItem = (index: number) => {
    const newItems = orderItems.filter((_, i) => i !== index)
    setOrderItems(newItems)
    calculateTotals(newItems)
  }

  const calculateTotals = (items: OrderItem[]) => {
    // This will be used to calculate totals when submitting
  }

  const calculateOrderTotals = () => {
    let subtotal = 0
    let totalTax = 0

    orderItems.forEach(item => {
      if (item.product_id && item.quantity > 0 && item.unit_price > 0) {
        const itemSubtotal = item.quantity * item.unit_price
        const itemDiscount = (itemSubtotal * item.discount_percent) / 100
        const itemAfterDiscount = itemSubtotal - itemDiscount
        const itemTax = (itemAfterDiscount * item.tax_rate) / 100
        subtotal += itemAfterDiscount
        totalTax += itemTax
      }
    })

    const finalSubtotal = subtotal - discountAmount
    const total = finalSubtotal + totalTax

    return { subtotal: finalSubtotal, tax: totalTax, total }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.customer_id) {
        throw new Error('Please select a customer')
      }

      if (orderItems.length === 0 || orderItems.some(item => !item.product_id || item.quantity <= 0)) {
        throw new Error('Please add at least one product with valid quantity')
      }

      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Get user's hub_id (assuming it's in the users table)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      if (userError) throw userError

      const totals = calculateOrderTotals()

      // Generate order number
      const orderNumber = `ORD-${Date.now()}`

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNumber,
          customer_id: formData.customer_id,
          user_id: user.id,
          hub_id: userData?.hub_id || null,
          route_id: formData.route_id || null,
          status: 'draft',
          subtotal: totals.subtotal,
          discount_amount: discountAmount,
          tax_amount: totals.tax,
          total_amount: totals.total,
          payment_status: 'pending',
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const itemsToInsert = orderItems
        .filter(item => item.product_id && item.quantity > 0)
        .map(item => {
          const itemSubtotal = item.quantity * item.unit_price
          const itemDiscount = (itemSubtotal * item.discount_percent) / 100
          const itemAfterDiscount = itemSubtotal - itemDiscount
          const itemTax = (itemAfterDiscount * item.tax_rate) / 100
          const itemTotal = itemAfterDiscount + itemTax

          return {
            order_id: orderData.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            discount_percent: item.discount_percent,
            discount_amount: itemDiscount,
            tax_rate: item.tax_rate,
            tax_amount: itemTax,
            total_amount: itemTotal,
          }
        })

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert)

      if (itemsError) throw itemsError

      router.push(`/orders/${orderData.id}`)
    } catch (err: any) {
      setError(err.message || 'Error creating order')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const totals = calculateOrderTotals()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/orders" className="text-gray-600 hover:text-gray-900">
                ← Back to Orders
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Create New Order
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Order Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">
                        Customer <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="customer_id"
                        required
                        value={formData.customer_id}
                        onChange={(e) => {
                          setFormData({ ...formData, customer_id: e.target.value })
                          setSelectedCustomer(e.target.value)
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a customer...</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      + Add Product
                    </button>
                  </div>

                  <div className="space-y-4">
                    {orderItems.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 md:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Product
                            </label>
                            <select
                              value={item.product_id}
                              onChange={(e) => handleProductChange(index, e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select product...</option>
                              {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.sku} - {product.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit Price
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unit_price}
                              onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Discount %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              value={item.discount_percent}
                              onChange={(e) => handleItemChange(index, 'discount_percent', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-6 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              &nbsp;
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {item.product_id && (
                          <div className="mt-2 text-xs text-gray-500">
                            GST: {item.tax_rate}% | 
                            Subtotal: ₹{(item.quantity * item.unit_price).toFixed(2)} | 
                            After Discount: ₹{((item.quantity * item.unit_price) * (1 - item.discount_percent / 100)).toFixed(2)}
                          </div>
                        )}
                      </div>
                    ))}

                    {orderItems.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No items added yet. Click "Add Product" to start.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{totals.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (GST):</span>
                      <span className="font-medium">₹{totals.tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-lg font-bold text-blue-600">₹{totals.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      disabled={loading || orderItems.length === 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Creating...' : 'Create Order'}
                    </button>
                    <Link
                      href="/orders"
                      className="block w-full text-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

