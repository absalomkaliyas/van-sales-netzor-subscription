'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'

interface PriceListItem {
  id: string
  product_id: string
  product: {
    id: string
    sku: string
    name: string
    image_url?: string
  }
  mrp: number
  trade_price: number
  promotional_price?: number
  effective_from: string
  effective_to?: string
}

interface PriceList {
  id: string
  name: string
  description?: string
  is_default: boolean
}

export default function PriceListDetailPage() {
  const router = useRouter()
  const params = useParams()
  const priceListId = params.id as string

  const [priceList, setPriceList] = useState<PriceList | null>(null)
  const [items, setItems] = useState<PriceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPriceList()
    loadItems()
  }, [priceListId])

  async function loadPriceList() {
    try {
      const { data, error } = await supabase
        .from('price_lists')
        .select('*')
        .eq('id', priceListId)
        .single()

      if (error) throw error
      setPriceList(data)
    } catch (err: any) {
      setError(err.message || 'Error loading price list')
    }
  }

  async function loadItems() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('price_list_items')
        .select(`
          *,
          product:products(id, sku, name, image_url)
        `)
        .eq('price_list_id', priceListId)
        .order('effective_from', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (err: any) {
      setError(err.message || 'Error loading items')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to remove this product from the price list?')) return

    try {
      const { error } = await supabase
        .from('price_list_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadItems()
    } catch (err: any) {
      alert('Error deleting item: ' + err.message)
    }
  }

  if (loading && !priceList) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading price list...</p>
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
              <Link href="/price-lists" className="text-gray-600 hover:text-gray-900">
                ← Back to Price Lists
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                {priceList?.name}
                {priceList?.is_default && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Default
                  </span>
                )}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/price-lists/${priceListId}/add-product`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + Add Product
              </Link>
              <Link
                href={`/price-lists/${priceListId}/edit`}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit
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

          {priceList?.description && (
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <p className="text-gray-600">{priceList.description}</p>
            </div>
          )}

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No products in this price list.</p>
              <Link
                href={`/price-lists/${priceListId}/add-product`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first product →
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
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MRP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trade Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promotional Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Effective From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
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
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.product?.sku || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.mrp.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.trade_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.promotional_price ? `₹${item.promotional_price.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.effective_from).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/price-lists/${priceListId}/items/${item.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Total Products: {items.length}
          </div>
        </div>
      </main>
    </div>
  )
}

