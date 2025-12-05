'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'

interface InventoryItem {
  id: string
  product_id: string
  hub_id: string
  product?: {
    sku: string
    name: string
    image_url?: string
    unit: string
  }
  hub?: {
    name: string
  }
  batch_no: string
  expiry_date?: string
  quantity: number
  reserved_quantity: number
  available_quantity: number
}

export default function InventoryPage() {
  const router = useRouter()
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hubFilter, setHubFilter] = useState<string>('all')
  const [hubs, setHubs] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    loadHubs()
    loadInventory()
  }, [hubFilter])

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

  async function loadInventory() {
    try {
      setLoading(true)
      // Fetch inventory
      const { data: inventoryData, error: inventoryError } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false })

      if (inventoryError) throw inventoryError

      // Apply hub filter
      let filteredData = inventoryData || []
      if (hubFilter !== 'all') {
        filteredData = filteredData.filter(item => item.hub_id === hubFilter)
      }

      // Fetch products
      const productIds = [...new Set(filteredData.map(item => item.product_id))]
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, sku, name, image_url, unit')
        .in('id', productIds)

      if (productsError) throw productsError

      // Fetch hubs
      const hubIds = [...new Set(filteredData.map(item => item.hub_id))]
      const { data: hubsData, error: hubsError } = await supabase
        .from('hubs')
        .select('id, name')
        .in('id', hubIds)

      if (hubsError) throw hubsError

      const productMap = new Map(
        (productsData || []).map(p => [p.id, p])
      )

      const hubMap = new Map(
        (hubsData || []).map(h => [h.id, h])
      )

      const inventoryWithDetails = filteredData.map(item => ({
        ...item,
        product: productMap.get(item.product_id),
        hub: hubMap.get(item.hub_id)
      }))

      setInventory(inventoryWithDetails)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading inventory:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading inventory...</p>
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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Inventory
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/inventory/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + Add Stock
              </Link>
              <Link
                href="/inventory/transfers"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Stock Transfers
              </Link>
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

          <div className="mb-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Hub:</label>
            <select
              value={hubFilter}
              onChange={(e) => setHubFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Hubs</option>
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>

          {inventory.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No inventory found.</p>
              <Link
                href="/inventory/add"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add stock to inventory →
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hub
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reserved
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProductImage 
                            src={item.product?.image_url} 
                            alt={item.product?.name || ''} 
                            size="sm" 
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product?.name || 'Unknown Product'}
                            </div>
                            <div className="text-xs text-gray-500">
                              SKU: {item.product?.sku || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.hub?.name || 'Unknown Hub'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.batch_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {item.quantity} {item.product?.unit || ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.reserved_quantity} {item.product?.unit || ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${
                          item.available_quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.available_quantity} {item.product?.unit || ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/inventory/${item.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Showing {inventory.length} inventory item(s)
          </div>
        </div>
      </main>
    </div>
  )
}

