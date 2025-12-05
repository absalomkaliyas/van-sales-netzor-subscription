'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Hub {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  gstin?: string
  manager_id?: string
  parent_hub_id?: string
  is_warehouse: boolean
  created_at: string
  manager?: {
    name: string
  }
  parent_hub?: {
    name: string
  }
}

export default function HubsPage() {
  const router = useRouter()
  const [hubs, setHubs] = useState<Hub[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    loadHubs()
  }, [typeFilter])

  async function loadHubs() {
    try {
      setLoading(true)
      // Fetch hubs
      let query = supabase
        .from('hubs')
        .select('*')
        .order('created_at', { ascending: false })

      if (typeFilter === 'warehouse') {
        query = query.eq('is_warehouse', true)
      } else if (typeFilter === 'hub') {
        query = query.eq('is_warehouse', false)
      }

      const { data: hubsData, error: hubsError } = await query

      if (hubsError) throw hubsError

      // Fetch managers
      const managerIds = [...new Set((hubsData || []).map(h => h.manager_id).filter(Boolean))]
      const { data: managersData, error: managersError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', managerIds)

      if (managersError) throw managersError

      // Fetch parent hubs
      const parentHubIds = [...new Set((hubsData || []).map(h => h.parent_hub_id).filter(Boolean))]
      const { data: parentHubsData, error: parentHubsError } = await supabase
        .from('hubs')
        .select('id, name')
        .in('id', parentHubIds)

      if (parentHubsError) throw parentHubsError

      const managerMap = new Map((managersData || []).map(m => [m.id, m]))
      const parentHubMap = new Map((parentHubsData || []).map(h => [h.id, h]))

      const hubsWithDetails = (hubsData || []).map(hub => ({
        ...hub,
        manager: hub.manager_id ? managerMap.get(hub.manager_id) : null,
        parent_hub: hub.parent_hub_id ? parentHubMap.get(hub.parent_hub_id) : null
      }))

      setHubs(hubsWithDetails)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading hubs:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this hub? This action cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('hubs')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadHubs()
    } catch (err: any) {
      alert('Error deleting hub: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hubs...</p>
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
                Hubs & Warehouses
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="warehouse">Warehouses</option>
                <option value="hub">Hubs</option>
              </select>
              <Link
                href="/hubs/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + New Hub
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

          {hubs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No hubs found.</p>
              <Link
                href="/hubs/new"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first hub →
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
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent Hub
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GSTIN
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hubs.map((hub) => (
                    <tr key={hub.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {hub.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {hub.city}, {hub.state}
                        </div>
                        <div className="text-xs text-gray-400">
                          {hub.pincode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hub.manager?.name || 'Not assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hub.parent_hub?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            hub.is_warehouse
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {hub.is_warehouse ? 'Warehouse' : 'Hub'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hub.gstin || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/hubs/${hub.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/hubs/${hub.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(hub.id)}
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
            Total Hubs: {hubs.length} | 
            Warehouses: {hubs.filter(h => h.is_warehouse).length} | 
            Hubs: {hubs.filter(h => !h.is_warehouse).length}
          </div>
        </div>
      </main>
    </div>
  )
}

