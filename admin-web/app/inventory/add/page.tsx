'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
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

export default function AddInventoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [hubs, setHubs] = useState<Hub[]>([])

  const [formData, setFormData] = useState({
    product_id: '',
    hub_id: '',
    batch_no: '',
    expiry_date: '',
    quantity: 0,
  })

  useEffect(() => {
    loadProducts()
    loadHubs()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.product_id || !formData.hub_id || !formData.batch_no) {
        throw new Error('Please fill in all required fields')
      }

      if (formData.quantity <= 0) {
        throw new Error('Quantity must be greater than 0')
      }

      // Check if inventory entry already exists
      const { data: existing, error: checkError } = await supabase
        .from('inventory')
        .select('id, quantity')
        .eq('product_id', formData.product_id)
        .eq('hub_id', formData.hub_id)
        .eq('batch_no', formData.batch_no)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existing) {
        // Update existing inventory
        const newQuantity = existing.quantity + formData.quantity
        const newAvailable = newQuantity - (existing.quantity - formData.quantity >= 0 ? 0 : formData.quantity)

        const { error: updateError } = await supabase
          .from('inventory')
          .update({
            quantity: newQuantity,
            available_quantity: newAvailable,
            expiry_date: formData.expiry_date || null,
          })
          .eq('id', existing.id)

        if (updateError) throw updateError
      } else {
        // Create new inventory entry
        const { error: insertError } = await supabase
          .from('inventory')
          .insert([{
            product_id: formData.product_id,
            hub_id: formData.hub_id,
            batch_no: formData.batch_no,
            expiry_date: formData.expiry_date || null,
            quantity: formData.quantity,
            reserved_quantity: 0,
            available_quantity: formData.quantity,
          }])

        if (insertError) throw insertError
      }

      router.push('/inventory')
    } catch (err: any) {
      setError(err.message || 'Error adding inventory')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/inventory" className="text-gray-600 hover:text-gray-900">
                ← Back to Inventory
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Add Stock to Inventory
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.sku} - {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="hub_id" className="block text-sm font-medium text-gray-700">
                    Hub/Warehouse <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hub_id"
                    name="hub_id"
                    required
                    value={formData.hub_id}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a hub...</option>
                    {hubs.map((hub) => (
                      <option key={hub.id} value={hub.id}>
                        {hub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="batch_no" className="block text-sm font-medium text-gray-700">
                    Batch Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="batch_no"
                    name="batch_no"
                    required
                    value={formData.batch_no}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="BATCH001"
                  />
                </div>

                <div>
                  <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="expiry_date"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    min="0.01"
                    step="0.01"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    If batch already exists, quantity will be added to existing stock
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Link
                  href="/inventory"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

