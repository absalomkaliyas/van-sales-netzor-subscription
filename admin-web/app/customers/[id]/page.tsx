'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  gstin?: string
  phone: string
  email?: string
  price_list_id?: string
  credit_limit: number
  outstanding_amount: number
  route_id?: string
  is_active: boolean
  created_at: string
  price_list?: {
    name: string
  }
}

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCustomer()
  }, [customerId])

  async function loadCustomer() {
    try {
      setLoading(true)
      // Fetch customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single()

      if (customerError) throw customerError

      // Fetch price list if customer has one
      let priceList = null
      if (customerData.price_list_id) {
        const { data: priceListData, error: priceListError } = await supabase
          .from('price_lists')
          .select('name')
          .eq('id', customerData.price_list_id)
          .single()

        if (!priceListError && priceListData) {
          priceList = priceListData
        }
      }

      setCustomer({
        ...customerData,
        price_list: priceList
      })
    } catch (err: any) {
      setError(err.message || 'Error loading customer')
      console.error('Error loading customer:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customer...</p>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Customer not found</p>
          <Link href="/customers" className="text-blue-600 hover:text-blue-700">
            ← Back to Customers
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
              <Link href="/customers" className="text-gray-600 hover:text-gray-900">
                ← Back to Customers
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                {customer.name}
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  customer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {customer.is_active ? 'Active' : 'Inactive'}
                </span>
              </h1>
            </div>
            <div className="flex items-center">
              <Link
                href={`/customers/${customerId}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit Customer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
            </div>
            <div className="px-6 py-4">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Customer Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.name}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
                </div>

                {customer.email && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
                  </div>
                )}

                {customer.gstin && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">GSTIN</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.gstin}</dd>
                  </div>
                )}

                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer.address}, {customer.city}, {customer.state} - {customer.pincode}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Price List</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer.price_list?.name || 'Not assigned'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Credit Limit</dt>
                  <dd className="mt-1 text-sm text-gray-900">₹{customer.credit_limit.toFixed(2)}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Outstanding Amount</dt>
                  <dd className={`mt-1 text-sm font-semibold ${
                    customer.outstanding_amount > 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    ₹{customer.outstanding_amount.toFixed(2)}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Available Credit</dt>
                  <dd className={`mt-1 text-sm font-semibold ${
                    (customer.credit_limit - customer.outstanding_amount) < 0 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    ₹{(customer.credit_limit - customer.outstanding_amount).toFixed(2)}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Created On</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Placeholder for future sections */}
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <p className="text-gray-500 text-sm">Order history will be displayed here once orders are created.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

