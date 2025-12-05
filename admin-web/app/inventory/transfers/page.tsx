'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface StockTransfer {
  id: string
  from_hub_id: string
  to_hub_id: string
  transfer_type: string
  status: string
  requested_by: string
  approved_by?: string
  created_at: string
  from_hub?: {
    name: string
  }
  to_hub?: {
    name: string
  }
  requester?: {
    name: string
  }
  approver?: {
    name: string
  }
  item_count?: number
}

export default function StockTransfersPage() {
  const router = useRouter()
  const [transfers, setTransfers] = useState<StockTransfer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadTransfers()
  }, [statusFilter])

  async function loadTransfers() {
    try {
      setLoading(true)
      // Fetch transfers
      const { data: transfersData, error: transfersError } = await supabase
        .from('stock_transfers')
        .select('*')
        .order('created_at', { ascending: false })

      if (transfersError) throw transfersError

      // Apply status filter
      let filteredData = transfersData || []
      if (statusFilter !== 'all') {
        filteredData = filteredData.filter(t => t.status === statusFilter)
      }

      // Fetch hubs
      const hubIds = [...new Set([
        ...filteredData.map(t => t.from_hub_id),
        ...filteredData.map(t => t.to_hub_id)
      ])]
      const { data: hubsData, error: hubsError } = await supabase
        .from('hubs')
        .select('id, name')
        .in('id', hubIds)

      if (hubsError) throw hubsError

      // Fetch users
      const userIds = [
        ...new Set([
          ...filteredData.map(t => t.requested_by),
          ...filteredData.map(t => t.approved_by).filter(Boolean)
        ])
      ]
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', userIds)

      if (usersError) throw usersError

      // Fetch transfer items count
      const transferIds = filteredData.map(t => t.id)
      const { data: itemsData, error: itemsError } = await supabase
        .from('stock_transfer_items')
        .select('transfer_id')
        .in('transfer_id', transferIds)

      if (itemsError) throw itemsError

      const hubMap = new Map((hubsData || []).map(h => [h.id, h]))
      const userMap = new Map((usersData || []).map(u => [u.id, u]))
      const itemCountMap = new Map<string, number>()
      itemsData?.forEach(item => {
        itemCountMap.set(item.transfer_id, (itemCountMap.get(item.transfer_id) || 0) + 1)
      })

      const transfersWithDetails = filteredData.map(transfer => ({
        ...transfer,
        from_hub: hubMap.get(transfer.from_hub_id),
        to_hub: hubMap.get(transfer.to_hub_id),
        requester: userMap.get(transfer.requested_by),
        approver: transfer.approved_by ? userMap.get(transfer.approved_by) : null,
        item_count: itemCountMap.get(transfer.id) || 0
      }))

      setTransfers(transfersWithDetails)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading transfers:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'in_transit': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTransferTypeLabel = (type: string) => {
    switch (type) {
      case 'warehouse_to_hub': return 'Warehouse → Hub'
      case 'hub_to_hub': return 'Hub → Hub'
      case 'hub_to_salesman': return 'Hub → Salesman'
      default: return type
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stock transfers...</p>
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
              <Link href="/inventory" className="text-gray-600 hover:text-gray-900">
                ← Back to Inventory
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Stock Transfers
              </h1>
            </div>
            <div className="flex items-center">
              <Link
                href="/inventory/transfers/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + New Transfer
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

          <div className="mb-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Transfers</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in_transit">In Transit</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {transfers.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No stock transfers found.</p>
              <Link
                href="/inventory/transfers/new"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first transfer →
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transfer Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transfers.map((transfer) => (
                    <tr key={transfer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTransferTypeLabel(transfer.transfer_type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transfer.from_hub?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transfer.to_hub?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transfer.item_count || 0} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transfer.status)}`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transfer.requester?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transfer.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/inventory/transfers/${transfer.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Showing {transfers.length} transfer(s)
          </div>
        </div>
      </main>
    </div>
  )
}

