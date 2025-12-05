'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
  phone: string
  city: string
  state: string
}

interface Route {
  id: string
  name: string
  description?: string
  assigned_user_id?: string
  is_active: boolean
  assigned_user?: {
    name: string
    role: string
  }
  customers: Customer[]
}

export default function RouteDetailPage() {
  const router = useRouter()
  const params = useParams()
  const routeId = params.id as string

  const [route, setRoute] = useState<Route | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRoute()
  }, [routeId])

  async function loadRoute() {
    try {
      setLoading(true)
      // Fetch route
      const { data: routeData, error: routeError } = await supabase
        .from('routes')
        .select('*')
        .eq('id', routeId)
        .single()

      if (routeError) throw routeError

      // Fetch assigned user
      let assignedUser = null
      if (routeData.assigned_user_id) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, name, role')
          .eq('id', routeData.assigned_user_id)
          .single()

        if (!userError && userData) {
          assignedUser = userData
        }
      }

      // Fetch route customers
      const { data: routeCustomersData, error: routeCustomersError } = await supabase
        .from('route_customers')
        .select('customer_id')
        .eq('route_id', routeId)

      if (routeCustomersError) throw routeCustomersError

      // Fetch customers
      const customerIds = (routeCustomersData || []).map(rc => rc.customer_id)
      let customers: Customer[] = []
      
      if (customerIds.length > 0) {
        const { data: customersData, error: customersError } = await supabase
          .from('customers')
          .select('id, name, phone, city, state')
          .in('id', customerIds)
          .order('name')

        if (customersError) throw customersError
        customers = customersData || []
      }

      setRoute({
        ...routeData,
        assigned_user: assignedUser,
        customers
      })
    } catch (err: any) {
      setError(err.message || 'Error loading route')
      console.error('Error loading route:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveCustomer(customerId: string) {
    if (!confirm('Remove this customer from the route?')) return

    try {
      const { error } = await supabase
        .from('route_customers')
        .delete()
        .eq('route_id', routeId)
        .eq('customer_id', customerId)

      if (error) throw error
      loadRoute()
    } catch (err: any) {
      alert('Error removing customer: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading route...</p>
        </div>
      </div>
    )
  }

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Route not found</p>
          <Link href="/routes" className="text-blue-600 hover:text-blue-700">
            ← Back to Routes
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
              <Link href="/routes" className="text-gray-600 hover:text-gray-900">
                ← Back to Routes
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                {route.name}
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  route.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {route.is_active ? 'Active' : 'Inactive'}
                </span>
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/routes/${routeId}/add-customers`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + Add Customers
              </Link>
              <Link
                href={`/routes/${routeId}/edit`}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Route Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Route Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{route.name}</dd>
                  </div>
                  {route.description && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{route.description}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {route.assigned_user ? `${route.assigned_user.name} (${route.assigned_user.role})` : 'Not assigned'}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Customers List */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Customers ({route.customers.length})
                </h2>
                {route.customers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No customers assigned to this route.</p>
                    <Link
                      href={`/routes/${routeId}/add-customers`}
                      className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                    >
                      Add customers →
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {route.customers.map((customer) => (
                          <tr key={customer.id}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {customer.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {customer.phone}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {customer.city}, {customer.state}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              <Link
                                href={`/customers/${customer.id}`}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => handleRemoveCustomer(customer.id)}
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
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Customers:</span>
                    <span className="font-medium">{route.customers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      route.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {route.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

