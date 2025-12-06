'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Attendance {
  id: string
  user_id: string
  hub_id?: string
  checkin_time: string
  checkout_time?: string
  checkin_latitude?: number
  checkin_longitude?: number
  checkin_address?: string
  checkout_latitude?: number
  checkout_longitude?: number
  checkout_address?: string
  user?: {
    name: string
  }
  hub?: {
    name: string
  }
}

export default function AttendancePage() {
  const router = useRouter()
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])
  const [userFilter, setUserFilter] = useState<string>('all')
  const [users, setUsers] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    loadUsers()
    loadAttendance()
  }, [dateFilter, userFilter])

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name')
        .eq('is_active', true)
        .in('role', ['salesman', 'supervisor'])
        .order('name')

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      console.error('Error loading users:', err)
    }
  }

  async function loadAttendance() {
    try {
      setLoading(true)
      // Fetch attendance
      const startDate = new Date(dateFilter)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(dateFilter)
      endDate.setHours(23, 59, 59, 999)

      let query = supabase
        .from('attendance')
        .select('*')
        .gte('checkin_time', startDate.toISOString())
        .lte('checkin_time', endDate.toISOString())
        .order('checkin_time', { ascending: false })

      if (userFilter !== 'all') {
        query = query.eq('user_id', userFilter)
      }

      const { data: attendanceData, error: attendanceError } = await query

      if (attendanceError) throw attendanceError

      // Fetch users
      const userIds = [...new Set((attendanceData || []).map(a => a.user_id))]
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', userIds)

      if (usersError) throw usersError

      // Fetch hubs
      const hubIds = [...new Set((attendanceData || []).map(a => a.hub_id).filter(Boolean))]
      let hubsData: any[] = []
      if (hubIds.length > 0) {
        const { data, error: hubsError } = await supabase
          .from('hubs')
          .select('id, name')
          .in('id', hubIds)

        if (!hubsError && data) {
          hubsData = data
        }
      }

      const userMap = new Map((usersData || []).map(u => [u.id, u]))
      const hubMap = new Map(hubsData.map(h => [h.id, h]))

      const attendanceWithDetails = (attendanceData || []).map(att => ({
        ...att,
        user: userMap.get(att.user_id),
        hub: att.hub_id ? hubMap.get(att.hub_id) : null
      }))

      setAttendance(attendanceWithDetails)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading attendance:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateDuration = (checkin: string, checkout?: string) => {
    if (!checkout) return 'Still checked in'
    const checkinTime = new Date(checkin).getTime()
    const checkoutTime = new Date(checkout).getTime()
    const diffMs = checkoutTime - checkinTime
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance...</p>
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
                Attendance
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

          {attendance.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No attendance records found for the selected date.</p>
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
                      Hub
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.user?.name || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.hub?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{new Date(record.checkin_time).toLocaleTimeString()}</div>
                        {record.checkin_address && (
                          <div className="text-xs text-gray-400 truncate max-w-xs">
                            {record.checkin_address}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkout_time ? (
                          <>
                            <div>{new Date(record.checkout_time).toLocaleTimeString()}</div>
                            {record.checkout_address && (
                              <div className="text-xs text-gray-400 truncate max-w-xs">
                                {record.checkout_address}
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateDuration(record.checkin_time, record.checkout_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkin_latitude && record.checkin_longitude ? (
                          <a
                            href={`https://www.google.com/maps?q=${record.checkin_latitude},${record.checkin_longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            View Map
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.checkout_time
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {record.checkout_time ? 'Checked Out' : 'Checked In'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Total Records: {attendance.length} | 
            Checked In: {attendance.filter(a => !a.checkout_time).length} | 
            Checked Out: {attendance.filter(a => a.checkout_time).length}
          </div>
        </div>
      </main>
    </div>
  )
}


