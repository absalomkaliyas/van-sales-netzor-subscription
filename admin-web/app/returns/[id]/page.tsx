'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'

interface ReturnItem {
  id: string
  product_id: string
  batch_no?: string
  quantity: number
  unit_price: number
  reason: string
  condition: string
  product?: {
    id: string
    name: string
    sku: string
    image_url?: string
  }
}

interface Return {
  id: string
  invoice_id?: string
  customer_id: string
  return_date: string
  reason: string
  status: string
  total_amount: number
  notes?: string
  customer?: {
    name: string
  }
  invoice?: {
    invoice_number: string
  }
  items: ReturnItem[]
}

export default function ReturnDetailPage() {
  const router = useRouter()
  const params = useParams()
  const returnId = params.id as string

  const [returnData, setReturnData] = useState<Return | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadReturn()
  }, [returnId])

  async function loadReturn() {
    try {
      setLoading(true)
      // Fetch return
      const { data: returnData, error: returnError } = await supabase
        .from('product_returns')
        .select('*')
        .eq('id', returnId)
        .single()

      if (returnError) throw returnError

      // Fetch customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id, name')
        .eq('id', returnData.customer_id)
        .single()

      if (customerError) throw customerError

      // Fetch invoice if exists
      let invoiceData = null
      if (returnData.invoice_id) {
        const { data, error: invoiceError } = await supabase
          .from('invoices')
          .select('id, invoice_number')
          .eq('id', returnData.invoice_id)
          .single()

        if (!invoiceError && data) {
          invoiceData = data
        }
      }

      // Fetch return items
      const { data: itemsData, error: itemsError } = await supabase
        .from('return_items')
        .select('*')
        .eq('return_id', returnId)

      if (itemsError) throw itemsError

      // Fetch products
      const productIds = [...new Set((itemsData || []).map(item => item.product_id))]
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, sku, image_url')
        .in('id', productIds)

      if (productsError) throw productsError

      const productMap = new Map((productsData || []).map(p => [p.id, p]))

      const itemsWithProducts = (itemsData || []).map(item => ({
        ...item,
        product: productMap.get(item.product_id)
      }))

      setReturnData({
        ...returnData,
        customer: customerData,
        invoice: invoiceData,
        items: itemsWithProducts
      })
    } catch (err: any) {
      setError(err.message || 'Error loading return')
      console.error('Error loading return:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove() {
    if (!confirm('Approve this return? This will update the return status.')) return

    try {
      setProcessing(true)
      const user = await getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('product_returns')
        .update({
          status: 'approved',
          approved_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', returnId)

      if (error) throw error

      loadReturn()
    } catch (err: any) {
      alert('Error approving return: ' + err.message)
    } finally {
      setProcessing(false)
    }
  }

  async function handleReject() {
    if (!confirm('Reject this return? This action cannot be undone.')) return

    try {
      setProcessing(true)
      const user = await getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('product_returns')
        .update({
          status: 'rejected',
          approved_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', returnId)

      if (error) throw error

      loadReturn()
    } catch (err: any) {
      alert('Error rejecting return: ' + err.message)
    } finally {
      setProcessing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading return...</p>
        </div>
      </div>
    )
  }

  if (!returnData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Return not found</p>
          <Link href="/returns" className="text-blue-600 hover:text-blue-700">
            ← Back to Returns
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
              <Link href="/returns" className="text-gray-600 hover:text-gray-900">
                ← Back to Returns
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Return Details
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  returnData.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : returnData.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : returnData.status === 'processed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {returnData.status}
                </span>
              </h1>
            </div>
            {returnData.status === 'pending' && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleReject}
                  disabled={processing}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  disabled={processing}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  Approve
                </button>
              </div>
            )}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Return Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Return Information</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Customer</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {returnData.customer?.name || 'Unknown'}
                    </dd>
                  </div>
                  {returnData.invoice && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Invoice</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <Link href={`/invoices/${returnData.invoice_id}`} className="text-blue-600 hover:text-blue-700">
                          {returnData.invoice.invoice_number}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Return Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(returnData.return_date).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Reason</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {returnData.reason.replace('_', ' ')}
                    </dd>
                  </div>
                  {returnData.notes && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Notes</dt>
                      <dd className="mt-1 text-sm text-gray-900">{returnData.notes}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Return Items */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Return Items ({returnData.items.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {returnData.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <ProductImage
                                src={item.product?.image_url}
                                alt={item.product?.name || 'Product'}
                                size="sm"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {item.product?.name || 'Unknown Product'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  SKU: {item.product?.sku || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {item.batch_no || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {formatCurrency(item.unit_price)}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {formatCurrency(item.quantity * item.unit_price)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.condition === 'good'
                                ? 'bg-green-100 text-green-800'
                                : item.condition === 'damaged'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.condition}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Return Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">{returnData.items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">{formatCurrency(returnData.total_amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      returnData.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : returnData.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : returnData.status === 'processed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {returnData.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


