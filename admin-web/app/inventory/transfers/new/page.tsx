'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

interface Product {
  id: string
  sku: string
  name: string
  unit: string
}

interface Hub {
  id: string
  name: string
}

interface InventoryItem {
  id: string
  product_id: string
  batch_no: string
  expiry_date?: string
  available_quantity: number
  product?: Product
}

interface TransferItem {
  inventory_id: string
  product_id: string
  batch_no: string
  expiry_date?: string
  quantity: number
  product?: Product
}

export default function NewStockTransferPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hubs, setHubs] = useState<Hub[]>([])
  const [fromHubInventory, setFromHubInventory] = useState<InventoryItem[]>([])
  const [transferItems, setTransferItems] = useState<TransferItem[]>([])

  const [formData, setFormData] = useState({
    from_hub_id: '',
    to_hub_id: '',
    transfer_type: 'hub_to_hub' as 'warehouse_to_hub' | 'hub_to_hub' | 'hub_to_salesman',
  })

  useEffect(() => {
    loadHubs()
  }, [])

  useEffect(() => {
    if (formData.from_hub_id) {
      loadFromHubInventory()
    } else {
      setFromHubInventory([])
    }
  }, [formData.from_hub_id])

  async function loadHubs() {
    try {
      const { data, error } = await supabase
        .from('hubs')
        .select('id, name')
        .order('name')

      if (error) throw error
      setHubs(data || [])
    } catch (err: any) {
      console.error('Error loading hubs:', err)
    }
  }

  async function loadFromHubInventory() {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('hub_id', formData.from_hub_id)
        .gt('available_quantity', 0)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Fetch products
      const productIds = [...new Set((data || []).map(item => item.product_id))]
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, sku, name, unit')
        .in('id', productIds)

      if (productsError) throw productsError

      const productMap = new Map(
        (productsData || []).map(p => [p.id, p])
      )

      const inventoryWithProducts = (data || []).map(item => ({
        ...item,
        product: productMap.get(item.product_id)
      }))

      setFromHubInventory(inventoryWithProducts)
    } catch (err: any) {
      console.error('Error loading inventory:', err)
    }
  }

  const handleAddItem = () => {
    if (transferItems.length === 0 || transferItems[transferItems.length - 1].inventory_id) {
      setTransferItems([...transferItems, {
        inventory_id: '',
        product_id: '',
        batch_no: '',
        expiry_date: '',
        quantity: 0,
      }])
    }
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...transferItems]
    const item = newItems[index]

    if (field === 'inventory_id') {
      const inventoryItem = fromHubInventory.find(inv => inv.id === value)
      if (inventoryItem) {
        item.inventory_id = value
        item.product_id = inventoryItem.product_id
        item.batch_no = inventoryItem.batch_no
        item.expiry_date = inventoryItem.expiry_date || ''
        item.product = inventoryItem.product
        item.quantity = 0
      }
    } else {
      ;(item as any)[field] = value
    }

    setTransferItems(newItems)
  }

  const handleRemoveItem = (index: number) => {
    setTransferItems(transferItems.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.from_hub_id || !formData.to_hub_id) {
        throw new Error('Please select both from and to hubs')
      }

      if (formData.from_hub_id === formData.to_hub_id) {
        throw new Error('From and to hubs cannot be the same')
      }

      if (transferItems.length === 0 || transferItems.some(item => !item.inventory_id || item.quantity <= 0)) {
        throw new Error('Please add at least one item with valid quantity')
      }

      // Validate quantities don't exceed available
      for (const item of transferItems) {
        const inventoryItem = fromHubInventory.find(inv => inv.id === item.inventory_id)
        if (inventoryItem && item.quantity > inventoryItem.available_quantity) {
          throw new Error(`${item.product?.name || 'Product'}: Quantity (${item.quantity}) exceeds available (${inventoryItem.available_quantity})`)
        }
      }

      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Create stock transfer
      const { data: transferData, error: transferError } = await supabase
        .from('stock_transfers')
        .insert([{
          from_hub_id: formData.from_hub_id,
          to_hub_id: formData.to_hub_id,
          transfer_type: formData.transfer_type,
          status: 'pending',
          requested_by: user.id,
        }])
        .select()
        .single()

      if (transferError) throw transferError

      // Create transfer items
      const itemsToInsert = transferItems.map(item => ({
        transfer_id: transferData.id,
        product_id: item.product_id,
        batch_no: item.batch_no,
        quantity: item.quantity,
        expiry_date: item.expiry_date || null,
      }))

      const { error: itemsError } = await supabase
        .from('stock_transfer_items')
        .insert(itemsToInsert)

      if (itemsError) throw itemsError

      router.push(`/inventory/transfers/${transferData.id}`)
    } catch (err: any) {
      setError(err.message || 'Error creating stock transfer')
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
              <Link href="/inventory/transfers" className="text-gray-600 hover:text-gray-900">
                ← Back to Stock Transfers
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Create Stock Transfer
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Transfer Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Transfer Details</h2>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="transfer_type" className="block text-sm font-medium text-gray-700">
                        Transfer Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="transfer_type"
                        required
                        value={formData.transfer_type}
                        onChange={(e) => setFormData({ ...formData, transfer_type: e.target.value as any })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="warehouse_to_hub">Warehouse → Hub</option>
                        <option value="hub_to_hub">Hub → Hub</option>
                        <option value="hub_to_salesman">Hub → Salesman</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="from_hub_id" className="block text-sm font-medium text-gray-700">
                          From Hub <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="from_hub_id"
                          required
                          value={formData.from_hub_id}
                          onChange={(e) => setFormData({ ...formData, from_hub_id: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select source hub...</option>
                          {hubs.map((hub) => (
                            <option key={hub.id} value={hub.id}>
                              {hub.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="to_hub_id" className="block text-sm font-medium text-gray-700">
                          To Hub <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="to_hub_id"
                          required
                          value={formData.to_hub_id}
                          onChange={(e) => setFormData({ ...formData, to_hub_id: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select destination hub...</option>
                          {hubs.map((hub) => (
                            <option key={hub.id} value={hub.id}>
                              {hub.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfer Items */}
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Transfer Items</h2>
                    {formData.from_hub_id && (
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        + Add Item
                      </button>
                    )}
                  </div>

                  {!formData.from_hub_id ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Please select a source hub to view available inventory</p>
                    </div>
                  ) : fromHubInventory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No available inventory in selected hub</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transferItems.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-5">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product & Batch
                              </label>
                              <select
                                value={item.inventory_id}
                                onChange={(e) => handleItemChange(index, 'inventory_id', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select product...</option>
                                {fromHubInventory.map((inv) => (
                                  <option key={inv.id} value={inv.id}>
                                    {inv.product?.name} - Batch: {inv.batch_no} (Available: {inv.available_quantity})
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-span-6 md:col-span-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity
                              </label>
                              <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                max={fromHubInventory.find(inv => inv.id === item.inventory_id)?.available_quantity || 0}
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div className="col-span-6 md:col-span-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Available
                              </label>
                              <div className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-sm text-gray-600">
                                {fromHubInventory.find(inv => inv.id === item.inventory_id)?.available_quantity || 0} {item.product?.unit || ''}
                              </div>
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

                          {item.inventory_id && (
                            <div className="mt-2 text-xs text-gray-500">
                              Batch: {item.batch_no} | 
                              {item.expiry_date && ` Expiry: ${new Date(item.expiry_date).toLocaleDateString()}`}
                            </div>
                          )}
                        </div>
                      ))}

                      {transferItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No items added yet. Click "Add Item" to start.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Transfer Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">
                        {formData.transfer_type === 'warehouse_to_hub' ? 'Warehouse → Hub' :
                         formData.transfer_type === 'hub_to_hub' ? 'Hub → Hub' :
                         'Hub → Salesman'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Items:</span>
                      <span className="ml-2 font-medium">{transferItems.length}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      disabled={loading || transferItems.length === 0 || !formData.from_hub_id || !formData.to_hub_id}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Creating...' : 'Create Transfer'}
                    </button>
                    <Link
                      href="/inventory/transfers"
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

