'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

interface Invoice {
  id: string
  invoice_number: string
  customer_id: string
  customer?: {
    name: string
  }
  total_amount: number
  paid_amount: number
}

export default function RecordPaymentPage() {
  const router = useRouter()
  const params = useParams()
  const invoiceId = params.id as string

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    amount: 0,
    mode: 'cash' as 'cash' | 'upi' | 'card' | 'cheque' | 'credit_note',
    transaction_ref: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  useEffect(() => {
    loadInvoice()
  }, [invoiceId])

  async function loadInvoice() {
    try {
      setLoading(true)
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', invoiceId)
        .single()

      if (invoiceError) throw invoiceError

      // Fetch customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id, name')
        .eq('id', invoiceData.customer_id)
        .single()

      if (customerError) throw customerError

      setInvoice({
        ...invoiceData,
        customer: customerData
      })

      // Set default amount to remaining balance
      const balance = invoiceData.total_amount - invoiceData.paid_amount
      setFormData(prev => ({
        ...prev,
        amount: balance > 0 ? balance : 0
      }))
    } catch (err: any) {
      setError(err.message || 'Error loading invoice')
      console.error('Error loading invoice:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!invoice) {
        throw new Error('Invoice not found')
      }

      if (formData.amount <= 0) {
        throw new Error('Payment amount must be greater than 0')
      }

      const balance = invoice.total_amount - invoice.paid_amount
      if (formData.amount > balance) {
        throw new Error(`Payment amount cannot exceed balance of ₹${balance.toFixed(2)}`)
      }

      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Get user's hub_id
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      if (userError) throw userError

      let hubId = userData?.hub_id
      if (!hubId) {
        const { data: defaultHub } = await supabase
          .from('hubs')
          .select('id')
          .limit(1)
          .single()
        if (defaultHub?.id) {
          hubId = defaultHub.id
        } else {
          throw new Error('No hub available. Please contact administrator.')
        }
      }

      // Generate receipt number
      const receiptNumber = `RCP-${Date.now()}`

      // Create payment
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert([{
          invoice_id: invoiceId,
          customer_id: invoice.customer_id,
          user_id: user.id,
          hub_id: hubId,
          amount: formData.amount,
          mode: formData.mode,
          transaction_ref: formData.transaction_ref || null,
          receipt_number: receiptNumber,
          payment_date: formData.payment_date,
          notes: formData.notes || null,
        }])
        .select()
        .single()

      if (paymentError) throw paymentError

      // Update invoice payment status
      const newPaidAmount = invoice.paid_amount + formData.amount
      let newPaymentStatus: 'pending' | 'partial' | 'paid' = 'pending'
      
      if (newPaidAmount >= invoice.total_amount) {
        newPaymentStatus = 'paid'
      } else if (newPaidAmount > 0) {
        newPaymentStatus = 'partial'
      }

      const { error: updateError } = await supabase
        .from('invoices')
        .update({
          paid_amount: newPaidAmount,
          payment_status: newPaymentStatus,
        })
        .eq('id', invoiceId)

      if (updateError) throw updateError

      // Update customer outstanding amount
      const { error: customerUpdateError } = await supabase.rpc('decrement_customer_outstanding', {
        customer_id: invoice.customer_id,
        amount: formData.amount
      }).catch(() => {
        // If function doesn't exist, manually update
        return supabase
          .from('customers')
          .update({
            outstanding_amount: supabase.raw(`GREATEST(0, outstanding_amount - ${formData.amount})`)
          })
          .eq('id', invoice.customer_id)
      })

      router.push(`/invoices/${invoiceId}`)
    } catch (err: any) {
      setError(err.message || 'Error recording payment')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Invoice not found</p>
          <Link href="/invoices" className="text-blue-600 hover:text-blue-700">
            ← Back to Invoices
          </Link>
        </div>
      </div>
    )
  }

  const balance = invoice.total_amount - invoice.paid_amount

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/invoices/${invoiceId}`} className="text-gray-600 hover:text-gray-900">
                ← Back to Invoice
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Record Payment
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Invoice Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <span className="font-medium">Invoice:</span> {invoice.invoice_number}
                </div>
                <div>
                  <span className="font-medium">Customer:</span> {invoice.customer?.name}
                </div>
                <div>
                  <span className="font-medium">Total Amount:</span> ₹{invoice.total_amount.toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Paid Amount:</span> ₹{invoice.paid_amount.toFixed(2)}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Balance:</span> 
                  <span className={`ml-2 font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₹{balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Payment Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="amount"
                    required
                    min="0.01"
                    max={balance}
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum: ₹{balance.toFixed(2)}
                  </p>
                </div>

                <div>
                  <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700">
                    Payment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="payment_date"
                    required
                    value={formData.payment_date}
                    onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
                    Payment Mode <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="mode"
                    required
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                    <option value="cheque">Cheque</option>
                    <option value="credit_note">Credit Note</option>
                  </select>
                </div>

                {(formData.mode === 'upi' || formData.mode === 'card' || formData.mode === 'cheque') && (
                  <div className="md:col-span-2">
                    <label htmlFor="transaction_ref" className="block text-sm font-medium text-gray-700">
                      Transaction Reference {formData.mode === 'upi' || formData.mode === 'card' ? '(Optional)' : '(Required)'}
                    </label>
                    <input
                      type="text"
                      id="transaction_ref"
                      required={formData.mode === 'cheque'}
                      value={formData.transaction_ref}
                      onChange={(e) => setFormData({ ...formData, transaction_ref: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={formData.mode === 'upi' ? 'UPI Transaction ID' : formData.mode === 'card' ? 'Card Transaction ID' : 'Cheque Number'}
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes about this payment..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Link
                  href={`/invoices/${invoiceId}`}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving || formData.amount <= 0 || formData.amount > balance}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Recording...' : 'Record Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

