'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
    role: string
  }
  parent_hub?: {
    name: string
  }
}

export default function HubDetailPage() {
  const router = useRouter()
  const params = useParams()
  const hubId = params.id as string

  const [hub, setHub] = useState<Hub | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadHub()
  }, [hubId])

  async function loadHub() {
    try {
      setLoading(true)
      // Fetch hub
      const { data: hubData, error: hubError } = await supabase
        .from('hubs')
        .select('*')
        .eq('id', hubId)
        .single()

      if (hubError) throw hubError

      // Fetch manager
      let manager = null
      if (hubData.manager_id) {
        const { data: managerData, error: managerError } = await supabase
          .from('users')
          .select('id, name, role')
          .eq('id', hubData.manager_id)
          .single()

        if (!managerError && managerData) {
          manager = managerData
        }
      }

      // Fetch parent hub
      let parentHub = null
      if (hubData.parent_hub_id) {
        const { data: parentHubData, error: parentHubError } = await supabase
          .from('hubs')
          .select('id, name')
          .eq('id', hubData.parent_hub_id)
          .single()

        if (!parentHubError && parentHubData) {
          parentHub = parentHubData
        }
      }

      setHub({
        ...hubData,
        manager,
        parent_hub: parentHub
      })
    } catch (err: any) {
      setError(err.message || 'Error loading hub')
      console.error('Error loading hub:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hub...</p>
        </div>
      </div>
    )
  }

  if (!hub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Hub not found</p>
          <Link href="/hubs" className="text-blue-600 hover:text-blue-700">
            ← Back to Hubs
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
              <Link href="/hubs" className="text-gray-600 hover:text-gray-900">
                ← Back to Hubs
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                {hub.name}
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  hub.is_warehouse ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {hub.is_warehouse ? 'Warehouse' : 'Hub'}
                </span>
              </h1>
            </div>
            <div className="flex items-center">
              <Link
                href={`/hubs/${hubId}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit
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

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hub Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Hub Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{hub.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    hub.is_warehouse ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {hub.is_warehouse ? 'Warehouse' : 'Hub'}
                  </span>
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{hub.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900">{hub.city}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900">{hub.state}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Pincode</dt>
                <dd className="mt-1 text-sm text-gray-900">{hub.pincode}</dd>
              </div>
              {hub.gstin && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">GSTIN</dt>
                  <dd className="mt-1 text-sm text-gray-900">{hub.gstin}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Manager</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {hub.manager ? `${hub.manager.name} (${hub.manager.role})` : 'Not assigned'}
                </dd>
              </div>
              {hub.parent_hub && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Parent Warehouse</dt>
                  <dd className="mt-1 text-sm text-gray-900">{hub.parent_hub.name}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(hub.created_at).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  )
}


