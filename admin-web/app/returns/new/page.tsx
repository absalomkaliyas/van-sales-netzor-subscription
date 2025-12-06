'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
}

interface Invoice {
  id: string
  invoice_number: string
  customer_id: string
}

interface Product {
  id: string
  sku: string
  name: string
  unit: string
}

interface ReturnItem {
  product_id: string
  batch_no: string
  quantity: number
  unit_price: number
  reason: string
  condition: 'good' | 'damaged' | 'expired'
  product?: Product
}

export default function NewReturnPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([])

  const [formData, setFormData] = useState({
    invoice_id: '',
    customer_id: '',
    return_date: new Date().toISOString().split('T')[0],
    reason: 'customer_request' as 'damaged' | 'expired' | 'unsold' | 'wrong_item' | 'customer_request',
    notes: '',
  })

  useEffect(() => {
    loadCustomers()
    loadProducts()
  }, [])

  useEffect(() => {
    if (formData.customer_id) {
      loadCustomerInvoices()
    } else {
      setInvoices([])
    }
  }, [formData.customer_id])

  async function loadCustomers() {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCustomers(data || [])
    } catch (err: any) {
      console.error('Error loading customers:', err)
    }
  }

  async function loadCustomerInvoices() {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('id, invoice_number, customer_id')
        .eq('customer_id', formData.customer_id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setInvoices(data || [])
    } catch (err: any) {
      console.error('Error loading invoices:', err)
    }
  }

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, sku, name, unit')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      console.error('Error loading products:', err)
    }
  }

  const handleAddItem = () => {
    setReturnItems([...returnItems, {
      product_id: '',
      batch_no: '',
      quantity: 0,
      unit_price: 0,
      reason: 'customer_request',
      condition: 'good',
    }])
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...returnItems]
    const item = newItems[index]

    if (field === 'product_id') {
      const product = products.find(p => p.id === value)
      item.product_id = value
      item.product = product
    } else {
      ;(item as any)[field] = value
    }

    setReturnItems(newItems)
  }

  const handleRemoveItem = (index: number) => {
    setReturnItems(returnItems.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.customer_id) {
        throw new Error('Please select a customer')
      }

      if (returnItems.length === 0 || returnItems.some(item => !item.product_id || item.quantity <= 0)) {
        throw new Error('Please add at least one return item with valid quantity')
      }

      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Get user's hub
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      if (userError) throw userError

      let hubId = userData?.hub_id

      // If user doesn't have a hub, find or create a default hub
      if (!hubId) {
        const { data: hubsData } = await supabase
          .from('hubs')
          .select('id')
          .limit(1)
          .single()

        if (hubsData) {
          hubId = hubsData.id
        } else {
          // Create a default hub if none exists
          const { data: newHub, error: hubCreateError } = await supabase
            .from('hubs')
            .insert([{
              name: 'Default Hub',
              address: 'Default Address',
              city: 'Default City',
              state: 'Default State',
              pincode: '000000',
            }])
            .select()
            .single()

          if (hubCreateError) throw hubCreateError
          hubId = newHub.id
        }
      }

      // Calculate total amount
      const totalAmount = returnItems.reduce((sum, item) => {
        return sum + (item.quantity * item.unit_price)
      }, 0)

      // Create product return
      const { data: returnData, error: returnError } = await supabase
        .from('product_returns')
        .insert([{
          invoice_id: formData.invoice_id || null,
          customer_id: formData.customer_id,
          user_id: user.id,
          hub_id: hubId,
          return_date: formData.return_date,
          reason: formData.reason,
          status: 'pending',
          total_amount: totalAmount,
          notes: formData.notes || null,
        }])
        .select()
        .single()

      if (returnError) throw returnError

      // Create return items
      const itemsToInsert = returnItems.map(item => ({
        return_id: returnData.id,
        product_id: item.product_id,
        batch_no: item.batch_no || null,
        quantity: item.quantity,
        unit_price: item.unit_price,
        reason: item.reason,
        condition: item.condition,
      }))

      const { error: itemsError } = await supabase
        .from('return_items')
        .insert(itemsToInsert)

      if (itemsError) throw itemsError

      router.push(`/returns/${returnData.id}`)
    } catch (err: any) {
      setError(err.message || 'Error creating return')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/returns" className="text-gray-600 hover:text-gray-900">
                ← Back to Returns
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                New Return
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Return Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Return Details</h2>
                  
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
                        onChange={(e) => setFormData({ ...formData, customer_id: e.target.value, invoice_id: '' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select customer...</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.customer_id && invoices.length > 0 && (
                      <div>
                        <label htmlFor="invoice_id" className="block text-sm font-medium text-gray-700">
                          Invoice (Optional)
                        </label>
                        <select
                          id="invoice_id"
                          value={formData.invoice_id}
                          onChange={(e) => setFormData({ ...formData, invoice_id: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">No invoice (direct return)</option>
                          {invoices.map((invoice) => (
                            <option key={invoice.id} value={invoice.id}>
                              {invoice.invoice_number}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="return_date" className="block text-sm font-medium text-gray-700">
                          Return Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="return_date"
                          required
                          value={formData.return_date}
                          onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                          Reason <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="reason"
                          required
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value as any })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="damaged">Damaged</option>
                          <option value="expired">Expired</option>
                          <option value="unsold">Unsold</option>
                          <option value="wrong_item">Wrong Item</option>
                          <option value="customer_request">Customer Request</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Additional notes about the return..."
                      />
                    </div>
                  </div>
                </div>

                {/* Return Items */}
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Return Items</h2>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      + Add Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {returnItems.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Product <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={item.product_id}
                              onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            >
                              <option value="">Select product...</option>
                              {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.name} ({product.sku})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Batch No
                            </label>
                            <input
                              type="text"
                              value={item.batch_no}
                              onChange={(e) => handleItemChange(index, 'batch_no', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              required
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit Price <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              required
                              value={item.unit_price}
                              onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-6 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Condition <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={item.condition}
                              onChange={(e) => handleItemChange(index, 'condition', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            >
                              <option value="good">Good</option>
                              <option value="damaged">Damaged</option>
                              <option value="expired">Expired</option>
                            </select>
                          </div>

                          <div className="col-span-12 md:col-span-1">
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
                      </div>
                    ))}

                    {returnItems.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No items added yet. Click "Add Item" to start.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Return Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Items:</span>
                      <span className="ml-2 font-medium">{returnItems.length}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="ml-2 font-medium">
                        ₹{returnItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      disabled={loading || returnItems.length === 0 || !formData.customer_id}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Creating...' : 'Create Return'}
                    </button>
                    <Link
                      href="/returns"
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


