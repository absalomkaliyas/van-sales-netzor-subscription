'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface PriceList {
  id: string
  name: string
  description?: string
  is_default: boolean
  created_at: string
  updated_at: string
  item_count?: number
}

export default function PriceListsPage() {
  const router = useRouter()
  const [priceLists, setPriceLists] = useState<PriceList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPriceLists()
  }, [])

  async function loadPriceLists() {
    try {
      setLoading(true)
      // Get price lists with item counts
      const { data: priceListsData, error: priceListsError } = await supabase
        .from('price_lists')
        .select('*')
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false })

      if (priceListsError) throw priceListsError

      // Get item counts for each price list
      const { data: itemsData, error: itemsError } = await supabase
        .from('price_list_items')
        .select('price_list_id')

      if (itemsError) throw itemsError

      // Count items per price list
      const itemCounts = itemsData?.reduce((acc: Record<string, number>, item) => {
        acc[item.price_list_id] = (acc[item.price_list_id] || 0) + 1
        return acc
      }, {}) || {}

      const priceListsWithCounts = (priceListsData || []).map(list => ({
        ...list,
        item_count: itemCounts[list.id] || 0
      }))

      setPriceLists(priceListsWithCounts)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading price lists:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this price list? This will also delete all associated price list items.')) return

    try {
      const { error } = await supabase
        .from('price_lists')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadPriceLists()
    } catch (err: any) {
      alert('Error deleting price list: ' + err.message)
    }
  }

  async function handleSetDefault(id: string) {
    try {
      // First, unset all defaults
      await supabase
        .from('price_lists')
        .update({ is_default: false })
        .neq('id', id)

      // Then set this one as default
      const { error } = await supabase
        .from('price_lists')
        .update({ is_default: true })
        .eq('id', id)

      if (error) throw error
      loadPriceLists()
    } catch (err: any) {
      alert('Error setting default price list: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading price lists...</p>
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
                Price Lists
              </h1>
            </div>
            <div className="flex items-center">
              <Link
                href="/price-lists/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + New Price List
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

          {priceLists.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No price lists found.</p>
              <Link
                href="/price-lists/new"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first price list →
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {priceLists.map((priceList) => (
                    <tr key={priceList.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {priceList.name}
                          </div>
                          {priceList.is_default && (
                            <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              Default
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {priceList.description || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {priceList.item_count || 0} products
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/price-lists/${priceList.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/price-lists/${priceList.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        {!priceList.is_default && (
                          <button
                            onClick={() => handleSetDefault(priceList.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(priceList.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Total Price Lists: {priceLists.length}
          </div>
        </div>
      </main>
    </div>
  )
}

