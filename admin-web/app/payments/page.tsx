'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Payment {
  id: string
  invoice_id?: string
  invoice?: {
    invoice_number: string
  }
  customer_id: string
  customer?: {
    name: string
  }
  amount: number
  mode: string
  transaction_ref?: string
  receipt_number: string
  payment_date: string
  created_at: string
}

export default function PaymentsPage() {
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modeFilter, setModeFilter] = useState<string>('all')

  useEffect(() => {
    loadPayments()
  }, [modeFilter])

  async function loadPayments() {
    try {
      setLoading(true)
      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })

      if (paymentsError) throw paymentsError

      // Fetch invoices
      const invoiceIds = [...new Set((paymentsData || []).map(p => p.invoice_id).filter(Boolean))]
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('id, invoice_number')
        .in('id', invoiceIds)

      if (invoicesError) throw invoicesError

      // Fetch customers
      const customerIds = [...new Set((paymentsData || []).map(p => p.customer_id))]
      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('id, name')
        .in('id', customerIds)

      if (customersError) throw customersError

      const invoiceMap = new Map(
        (invoicesData || []).map(i => [i.id, i])
      )

      const customerMap = new Map(
        (customersData || []).map(c => [c.id, c])
      )

      let paymentsWithData = (paymentsData || []).map(payment => ({
        ...payment,
        invoice: payment.invoice_id ? invoiceMap.get(payment.invoice_id) : null,
        customer: customerMap.get(payment.customer_id)
      }))

      // Apply mode filter
      if (modeFilter !== 'all') {
        paymentsWithData = paymentsWithData.filter(
          payment => payment.mode === modeFilter
        )
      }

      setPayments(paymentsWithData)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading payments:', err)
    } finally {
      setLoading(false)
    }
  }

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'cash': return 'bg-green-100 text-green-800'
      case 'upi': return 'bg-blue-100 text-blue-800'
      case 'card': return 'bg-purple-100 text-purple-800'
      case 'cheque': return 'bg-yellow-100 text-yellow-800'
      case 'credit_note': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
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
                Payments
              </h1>
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
            <label className="text-sm font-medium text-gray-700">Filter by Payment Mode:</label>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
              <option value="cheque">Cheque</option>
              <option value="credit_note">Credit Note</option>
            </select>
          </div>

          {payments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No payments found.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Ref
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.receipt_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.invoice ? (
                          <Link href={`/invoices/${payment.invoice_id}`} className="text-blue-600 hover:text-blue-900">
                            {payment.invoice.invoice_number}
                          </Link>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.customer?.name || 'Unknown Customer'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ₹{payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getModeColor(payment.mode)}`}>
                          {payment.mode.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.transaction_ref || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/payments/${payment.id}`}
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
            Showing {payments.length} payment(s)
          </div>
        </div>
      </main>
    </div>
  )
}


