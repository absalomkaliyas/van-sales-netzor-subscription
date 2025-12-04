'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, signOut } from '@/lib/auth'
import type { AuthUser } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
        return
      }
      setUser(currentUser)
      setLoading(false)
    }
    loadUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                VAN Sales - NETZOR
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {user.name}! 👋
            </h2>
            <p className="text-gray-600">
              Field Sales & Automatic Invoicing System Dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📦 Products
              </h3>
              <p className="text-gray-600 text-sm mb-4">Manage product catalog, HSN codes, GST rates, and pricing</p>
              <span className="text-xs text-blue-600 font-medium">View Products →</span>
            </Link>
            
            <Link href="/price-lists" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💰 Price Lists
              </h3>
              <p className="text-gray-600 text-sm mb-4">Manage MRP, trade prices, and promotional pricing</p>
              <span className="text-xs text-blue-600 font-medium">View Price Lists →</span>
            </Link>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🛒 Orders
              </h3>
              <p className="text-gray-600 text-sm mb-4">View and manage sales orders</p>
              <span className="text-xs text-gray-500">Coming soon</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🧾 Invoices
              </h3>
              <p className="text-gray-600 text-sm mb-4">Generate GST-compliant invoices</p>
              <span className="text-xs text-gray-500">Coming soon</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                👥 Users
              </h3>
              <p className="text-gray-600 text-sm mb-4">Manage users, roles, and permissions</p>
              <span className="text-xs text-gray-500">Coming soon</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🏢 Hubs
              </h3>
              <p className="text-gray-600 text-sm mb-4">Manage warehouses and sub-hubs</p>
              <span className="text-xs text-gray-500">Coming soon</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📊 Reports
              </h3>
              <p className="text-gray-600 text-sm mb-4">View sales, stock, and performance reports</p>
              <span className="text-xs text-gray-500">Coming soon</span>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              🎉 System Ready!
            </h3>
            <p className="text-blue-800 text-sm">
              Your authentication system is working perfectly. You can now start building features!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
