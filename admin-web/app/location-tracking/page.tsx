'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface LocationTracking {
  id: string
  user_id: string
  latitude: number
  longitude: number
  address?: string
  timestamp: string
  accuracy?: number
  route_id?: string
  customer_id?: string
  user?: {
    name: string
  }
  route?: {
    name: string
  }
  customer?: {
    name: string
  }
}

export default function LocationTrackingPage() {
  const router = useRouter()
  const [locations, setLocations] = useState<LocationTracking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])
  const [userFilter, setUserFilter] = useState<string>('all')
  const [users, setUsers] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    loadUsers()
    loadLocations()
  }, [dateFilter, userFilter])

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name')
        .eq('is_active', true)
        .eq('gps_enabled', true)
        .in('role', ['salesman', 'supervisor'])
        .order('name')

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      console.error('Error loading users:', err)
    }
  }

  async function loadLocations() {
    try {
      setLoading(true)
      // Fetch location tracking
      const startDate = new Date(dateFilter)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(dateFilter)
      endDate.setHours(23, 59, 59, 999)

      let query = supabase
        .from('location_tracking')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())
        .order('timestamp', { ascending: false })
        .limit(500)

      if (userFilter !== 'all') {
        query = query.eq('user_id', userFilter)
      }

      const { data: locationsData, error: locationsError } = await query

      if (locationsError) throw locationsError

      // Fetch users
      const userIds = [...new Set((locationsData || []).map(l => l.user_id))]
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', userIds)

      if (usersError) throw usersError

      // Fetch routes
      const routeIds = [...new Set((locationsData || []).map(l => l.route_id).filter(Boolean))]
      let routesData: any[] = []
      if (routeIds.length > 0) {
        const { data, error: routesError } = await supabase
          .from('routes')
          .select('id, name')
          .in('id', routeIds)

        if (!routesError && data) {
          routesData = data
        }
      }

      // Fetch customers
      const customerIds = [...new Set((locationsData || []).map(l => l.customer_id).filter(Boolean))]
      let customersData: any[] = []
      if (customerIds.length > 0) {
        const { data, error: customersError } = await supabase
          .from('customers')
          .select('id, name')
          .in('id', customerIds)

        if (!customersError && data) {
          customersData = data
        }
      }

      const userMap = new Map((usersData || []).map(u => [u.id, u]))
      const routeMap = new Map(routesData.map(r => [r.id, r]))
      const customerMap = new Map(customersData.map(c => [c.id, c]))

      const locationsWithDetails = (locationsData || []).map(loc => ({
        ...loc,
        user: userMap.get(loc.user_id),
        route: loc.route_id ? routeMap.get(loc.route_id) : null,
        customer: loc.customer_id ? customerMap.get(loc.customer_id) : null
      }))

      setLocations(locationsWithDetails)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading locations:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading location data...</p>
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
                Location Tracking
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
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

          {locations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No location data found for the selected date.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Map
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locations.map((location) => (
                    <tr key={location.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {location.user?.name || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(location.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {location.address || 'Address not available'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.route?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.customer?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.accuracy ? `${location.accuracy.toFixed(0)}m` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Map
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Total Location Points: {locations.length} | 
            Showing last 500 records for selected date
          </div>
        </div>
      </main>
    </div>
  )
}

