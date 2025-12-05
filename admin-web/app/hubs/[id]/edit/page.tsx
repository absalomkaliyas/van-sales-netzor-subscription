'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface User {
  id: string
  name: string
  role: string
}

interface Hub {
  id: string
  name: string
}

export default function EditHubPage() {
  const router = useRouter()
  const params = useParams()
  const hubId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [managers, setManagers] = useState<User[]>([])
  const [parentHubs, setParentHubs] = useState<Hub[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
    manager_id: '',
    parent_hub_id: '',
    is_warehouse: false,
  })

  useEffect(() => {
    loadHub()
    loadManagers()
    loadParentHubs()
  }, [hubId])

  async function loadHub() {
    try {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .eq('id', hubId)
        .single()

      if (error) throw error

      setFormData({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        gstin: data.gstin || '',
        manager_id: data.manager_id || '',
        parent_hub_id: data.parent_hub_id || '',
        is_warehouse: data.is_warehouse,
      })
    } catch (err: any) {
      setError(err.message || 'Error loading hub')
    } finally {
      setLoading(false)
    }
  }

  async function loadManagers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, role')
        .eq('is_active', true)
        .in('role', ['hub_manager', 'admin'])
        .order('name')

      if (error) throw error
      setManagers(data || [])
    } catch (err: any) {
      console.error('Error loading managers:', err)
    }
  }

  async function loadParentHubs() {
    try {
      const { data, error } = await supabase
        .from('hubs')
        .select('id, name')
        .eq('is_warehouse', true)
        .neq('id', hubId)
        .order('name')

      if (error) throw error
      setParentHubs(data || [])
    } catch (err: any) {
      console.error('Error loading parent hubs:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!formData.name.trim()) {
        throw new Error('Hub name is required')
      }
      if (!formData.address.trim()) {
        throw new Error('Address is required')
      }
      if (!formData.city.trim()) {
        throw new Error('City is required')
      }
      if (!formData.state.trim()) {
        throw new Error('State is required')
      }
      if (!formData.pincode.trim()) {
        throw new Error('Pincode is required')
      }

      const { error } = await supabase
        .from('hubs')
        .update({
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          gstin: formData.gstin || null,
          manager_id: formData.manager_id || null,
          parent_hub_id: formData.parent_hub_id || null,
          is_warehouse: formData.is_warehouse,
          updated_at: new Date().toISOString(),
        })
        .eq('id', hubId)

      if (error) throw error

      router.push(`/hubs/${hubId}`)
    } catch (err: any) {
      setError(err.message || 'Error updating hub')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/hubs/${hubId}`} className="text-gray-600 hover:text-gray-900">
                ← Back to Hub
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Edit Hub
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Hub Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
                  GSTIN (Optional)
                </label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="manager_id" className="block text-sm font-medium text-gray-700">
                    Manager (Optional)
                  </label>
                  <select
                    id="manager_id"
                    name="manager_id"
                    value={formData.manager_id}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a manager (optional)</option>
                    {managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.name} ({manager.role})
                      </option>
                    ))}
                  </select>
                </div>

                {!formData.is_warehouse && (
                  <div>
                    <label htmlFor="parent_hub_id" className="block text-sm font-medium text-gray-700">
                      Parent Warehouse (Optional)
                    </label>
                    <select
                      id="parent_hub_id"
                      name="parent_hub_id"
                      value={formData.parent_hub_id}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select parent warehouse (optional)</option>
                      {parentHubs.map((hub) => (
                        <option key={hub.id} value={hub.id}>
                          {hub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_warehouse"
                    name="is_warehouse"
                    checked={formData.is_warehouse}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_warehouse" className="ml-2 block text-sm text-gray-900">
                    This is a warehouse (not a sub-hub)
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Link
                  href={`/hubs/${hubId}`}
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
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

