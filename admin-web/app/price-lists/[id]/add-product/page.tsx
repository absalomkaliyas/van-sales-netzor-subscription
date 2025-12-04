'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Product {
  id: string
  sku: string
  name: string
}

export default function AddProductToPriceListPage() {
  const router = useRouter()
  const params = useParams()
  const priceListId = params.id as string

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    product_id: '',
    mrp: 0,
    trade_price: 0,
    promotional_price: 0,
    effective_from: new Date().toISOString().split('T')[0],
    effective_to: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      // Get all active products
      const { data, error } = await supabase
        .from('products')
        .select('id, sku, name')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message || 'Error loading products')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!formData.product_id) {
        throw new Error('Please select a product')
      }
      if (formData.mrp <= 0 || formData.trade_price <= 0) {
        throw new Error('MRP and Trade Price must be greater than 0')
      }
      if (formData.trade_price > formData.mrp) {
        throw new Error('Trade price cannot be greater than MRP')
      }
      if (formData.promotional_price > 0 && formData.promotional_price > formData.mrp) {
        throw new Error('Promotional price cannot be greater than MRP')
      }

      const { error } = await supabase
        .from('price_list_items')
        .insert([{
          price_list_id: priceListId,
          product_id: formData.product_id,
          mrp: formData.mrp,
          trade_price: formData.trade_price,
          promotional_price: formData.promotional_price > 0 ? formData.promotional_price : null,
          effective_from: formData.effective_from,
          effective_to: formData.effective_to || null,
        }])

      if (error) {
        if (error.code === '23505') {
          throw new Error('This product already exists in this price list for the selected effective date')
        }
        throw error
      }

      router.push(`/price-lists/${priceListId}`)
    } catch (err: any) {
      setError(err.message || 'Error adding product to price list')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
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
              <Link href={`/price-lists/${priceListId}`} className="text-gray-600 hover:text-gray-900">
                ← Back to Price List
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Add Product to Price List
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by name or SKU..."
                />
              </div>

              <div>
                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  id="product_id"
                  name="product_id"
                  required
                  value={formData.product_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a product...</option>
                  {filteredProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.sku} - {product.name}
                    </option>
                  ))}
                </select>
                {searchTerm && filteredProducts.length === 0 && (
                  <p className="mt-1 text-sm text-gray-500">No products found matching "{searchTerm}"</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">
                    MRP (Maximum Retail Price) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="mrp"
                    name="mrp"
                    required
                    min="0"
                    step="0.01"
                    value={formData.mrp}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="trade_price" className="block text-sm font-medium text-gray-700">
                    Trade Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="trade_price"
                    name="trade_price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.trade_price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="promotional_price" className="block text-sm font-medium text-gray-700">
                    Promotional Price (Optional)
                  </label>
                  <input
                    type="number"
                    id="promotional_price"
                    name="promotional_price"
                    min="0"
                    step="0.01"
                    value={formData.promotional_price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                  <p className="mt-1 text-xs text-gray-500">Leave as 0 if not applicable</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="effective_from" className="block text-sm font-medium text-gray-700">
                    Effective From <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="effective_from"
                    name="effective_from"
                    required
                    value={formData.effective_from}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="effective_to" className="block text-sm font-medium text-gray-700">
                    Effective To (Optional)
                  </label>
                  <input
                    type="date"
                    id="effective_to"
                    name="effective_to"
                    value={formData.effective_to}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Leave empty for no expiry</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Link
                  href={`/price-lists/${priceListId}`}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

