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

export default function EditRoutePage() {
  const router = useRouter()
  const params = useParams()
  const routeId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [users, setUsers] = useState<User[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assigned_user_id: '',
    is_active: true,
  })

  useEffect(() => {
    loadRoute()
    loadUsers()
  }, [routeId])

  async function loadRoute() {
    try {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .eq('id', routeId)
        .single()

      if (error) throw error

      setFormData({
        name: data.name,
        description: data.description || '',
        assigned_user_id: data.assigned_user_id || '',
        is_active: data.is_active,
      })
    } catch (err: any) {
      setError(err.message || 'Error loading route')
    } finally {
      setLoading(false)
    }
  }

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, role')
        .eq('is_active', true)
        .in('role', ['salesman', 'supervisor'])
        .order('name')

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      console.error('Error loading users:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!formData.name.trim()) {
        throw new Error('Route name is required')
      }

      const { error } = await supabase
        .from('routes')
        .update({
          name: formData.name,
          description: formData.description || null,
          assigned_user_id: formData.assigned_user_id || null,
          is_active: formData.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', routeId)

      if (error) throw error

      router.push(`/routes/${routeId}`)
    } catch (err: any) {
      setError(err.message || 'Error updating route')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          <p className="mt-4 text-gray-600">Loading route...</p>
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
                Edit Route
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
                  Route Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Route A - North Zone"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional description for this route"
                />
              </div>

              <div>
                <label htmlFor="assigned_user_id" className="block text-sm font-medium text-gray-700">
                  Assign To (Optional)
                </label>
                <select
                  id="assigned_user_id"
                  name="assigned_user_id"
                  value={formData.assigned_user_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a user (optional)</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Assign this route to a salesman or supervisor
                </p>
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Route is active
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
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
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

