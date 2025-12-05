'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
  phone: string
  city: string
  state: string
  is_active: boolean
}

export default function AddCustomersToRoutePage() {
  const router = useRouter()
  const params = useParams()
  const routeId = params.id as string

  const [customers, setCustomers] = useState<Customer[]>([])
  const [routeCustomers, setRouteCustomers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadCustomers()
    loadRouteCustomers()
  }, [routeId])

  async function loadCustomers() {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCustomers(data || [])
    } catch (err: any) {
      setError(err.message || 'Error loading customers')
    } finally {
      setLoading(false)
    }
  }

  async function loadRouteCustomers() {
    try {
      const { data, error } = await supabase
        .from('route_customers')
        .select('customer_id')
        .eq('route_id', routeId)

      if (error) throw error
      setRouteCustomers((data || []).map(rc => rc.customer_id))
    } catch (err: any) {
      console.error('Error loading route customers:', err)
    }
  }

  const handleToggleCustomer = (customerId: string) => {
    setRouteCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId)
      } else {
        return [...prev, customerId]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      // Get current route customers
      const { data: currentRouteCustomers, error: fetchError } = await supabase
        .from('route_customers')
        .select('customer_id')
        .eq('route_id', routeId)

      if (fetchError) throw fetchError

      const currentCustomerIds = new Set((currentRouteCustomers || []).map(rc => rc.customer_id))
      const selectedCustomerIds = new Set(routeCustomers)

      // Find customers to add
      const toAdd = routeCustomers.filter(id => !currentCustomerIds.has(id))
      // Find customers to remove
      const toRemove = Array.from(currentCustomerIds).filter(id => !selectedCustomerIds.has(id))

      // Add new customers
      if (toAdd.length > 0) {
        const itemsToAdd = toAdd.map(customerId => ({
          route_id: routeId,
          customer_id: customerId
        }))

        const { error: addError } = await supabase
          .from('route_customers')
          .insert(itemsToAdd)

        if (addError) throw addError
      }

      // Remove customers
      if (toRemove.length > 0) {
        const { error: removeError } = await supabase
          .from('route_customers')
          .delete()
          .eq('route_id', routeId)
          .in('customer_id', toRemove)

        if (removeError) throw removeError
      }

      router.push(`/routes/${routeId}`)
    } catch (err: any) {
      setError(err.message || 'Error updating route customers')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customers...</p>
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
              <Link href={`/routes/${routeId}`} className="text-gray-600 hover:text-gray-900">
                ← Back to Route
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Add Customers to Route
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow rounded-lg p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search customers by name, phone, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4 text-sm text-gray-600">
                {routeCustomers.length} customer(s) selected
              </div>

              <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">
                        <input
                          type="checkbox"
                          checked={filteredCustomers.length > 0 && filteredCustomers.every(c => routeCustomers.includes(c.id))}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRouteCustomers([...new Set([...routeCustomers, ...filteredCustomers.map(c => c.id)])])
                            } else {
                              setRouteCustomers(routeCustomers.filter(id => !filteredCustomers.map(c => c.id).includes(id)))
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={routeCustomers.includes(customer.id)}
                            onChange={() => handleToggleCustomer(customer.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {customer.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {customer.phone}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {customer.city}, {customer.state}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCustomers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No customers found matching your search.</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <Link
                  href={`/routes/${routeId}`}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

