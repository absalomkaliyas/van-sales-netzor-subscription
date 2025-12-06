'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface SalesStats {
  totalRevenue: number
  totalOrders: number
  totalInvoices: number
  paidInvoices: number
  pendingInvoices: number
  totalCustomers: number
  totalProducts: number
  lowStockItems: number
}

interface TopProduct {
  product_id: string
  product_name: string
  total_quantity: number
  total_revenue: number
}

interface TopCustomer {
  customer_id: string
  customer_name: string
  total_orders: number
  total_revenue: number
  outstanding_amount: number
}

interface RecentOrder {
  id: string
  order_number: string
  customer_name: string
  total_amount: number
  status: string
  created_at: string
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<SalesStats | null>(null)
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('month')

  useEffect(() => {
    loadReports()
  }, [dateRange])

  async function loadReports() {
    try {
      setLoading(true)
      setError('')

      // Calculate date filter
      const now = new Date()
      let startDate: Date | null = null
      
      if (dateRange === 'today') {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      } else if (dateRange === 'week') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      } else if (dateRange === 'month') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      }

      // Load sales statistics
      let invoicesQuery = supabase
        .from('invoices')
        .select('total_amount, payment_status')

      if (startDate) {
        invoicesQuery = invoicesQuery.gte('created_at', startDate.toISOString())
      }

      const { data: invoicesData, error: invoicesError } = await invoicesQuery

      if (invoicesError) throw invoicesError

      let ordersQuery = supabase
        .from('orders')
        .select('id, status')

      if (startDate) {
        ordersQuery = ordersQuery.gte('created_at', startDate.toISOString())
      }

      const { data: ordersData, error: ordersError } = await ordersQuery

      if (ordersError) throw ordersError

      // Calculate stats
      const totalRevenue = (invoicesData || []).reduce((sum, inv) => sum + parseFloat(inv.total_amount || 0), 0)
      const paidInvoices = (invoicesData || []).filter(inv => inv.payment_status === 'paid').length
      const pendingInvoices = (invoicesData || []).filter(inv => inv.payment_status === 'pending' || inv.payment_status === 'partial').length

      // Get customer and product counts
      const { count: customerCount } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      // Get low stock items (available_quantity < 10)
      const { count: lowStockCount } = await supabase
        .from('inventory')
        .select('*', { count: 'exact', head: true })
        .lt('available_quantity', 10)

      setStats({
        totalRevenue,
        totalOrders: ordersData?.length || 0,
        totalInvoices: invoicesData?.length || 0,
        paidInvoices,
        pendingInvoices,
        totalCustomers: customerCount || 0,
        totalProducts: productCount || 0,
        lowStockItems: lowStockCount || 0,
      })

      // Load top products
      let orderItemsQuery = supabase
        .from('order_items')
        .select('product_id, quantity, price, products(name)')

      if (startDate) {
        const { data: orderIds } = await supabase
          .from('orders')
          .select('id')
          .gte('created_at', startDate.toISOString())

        if (orderIds && orderIds.length > 0) {
          orderItemsQuery = orderItemsQuery.in('order_id', orderIds.map(o => o.id))
        } else {
          setTopProducts([])
        }
      }

      const { data: orderItemsData, error: orderItemsError } = await orderItemsQuery

      if (!orderItemsError && orderItemsData) {
        // Aggregate by product
        const productMap = new Map<string, { name: string; quantity: number; revenue: number }>()
        
        orderItemsData.forEach((item: any) => {
          const productId = item.product_id
          const productName = item.products?.name || 'Unknown'
          const quantity = parseFloat(item.quantity || 0)
          const revenue = parseFloat(item.price || 0) * quantity

          if (productMap.has(productId)) {
            const existing = productMap.get(productId)!
            productMap.set(productId, {
              name: productName,
              quantity: existing.quantity + quantity,
              revenue: existing.revenue + revenue,
            })
          } else {
            productMap.set(productId, { name: productName, quantity, revenue })
          }
        })

        const topProductsList = Array.from(productMap.entries())
          .map(([product_id, data]) => ({
            product_id,
            product_name: data.name,
            total_quantity: data.quantity,
            total_revenue: data.revenue,
          }))
          .sort((a, b) => b.total_revenue - a.total_revenue)
          .slice(0, 10)

        setTopProducts(topProductsList)
      }

      // Load top customers
      let customersQuery = supabase
        .from('orders')
        .select('customer_id, total_amount, customers(name)')

      if (startDate) {
        customersQuery = customersQuery.gte('created_at', startDate.toISOString())
      }

      const { data: customerOrdersData, error: customerOrdersError } = await customersQuery

      if (!customerOrdersError && customerOrdersData) {
        // Aggregate by customer
        const customerMap = new Map<string, { name: string; orders: number; revenue: number }>()
        
        customerOrdersData.forEach((order: any) => {
          const customerId = order.customer_id
          const customerName = order.customers?.name || 'Unknown'
          const revenue = parseFloat(order.total_amount || 0)

          if (customerMap.has(customerId)) {
            const existing = customerMap.get(customerId)!
            customerMap.set(customerId, {
              name: customerName,
              orders: existing.orders + 1,
              revenue: existing.revenue + revenue,
            })
          } else {
            customerMap.set(customerId, { name: customerName, orders: 1, revenue })
          }
        })

        // Get outstanding amounts
        const customerIds = Array.from(customerMap.keys())
        const { data: customersData } = await supabase
          .from('customers')
          .select('id, outstanding_amount')
          .in('id', customerIds)

        const outstandingMap = new Map((customersData || []).map(c => [c.id, parseFloat(c.outstanding_amount || 0)]))

        const topCustomersList = Array.from(customerMap.entries())
          .map(([customer_id, data]) => ({
            customer_id,
            customer_name: data.name,
            total_orders: data.orders,
            total_revenue: data.revenue,
            outstanding_amount: outstandingMap.get(customer_id) || 0,
          }))
          .sort((a, b) => b.total_revenue - a.total_revenue)
          .slice(0, 10)

        setTopCustomers(topCustomersList)
      }

      // Load recent orders
      let recentOrdersQuery = supabase
        .from('orders')
        .select('id, order_number, total_amount, status, created_at, customers(name)')
        .order('created_at', { ascending: false })
        .limit(10)

      if (startDate) {
        recentOrdersQuery = recentOrdersQuery.gte('created_at', startDate.toISOString())
      }

      const { data: recentOrdersData, error: recentOrdersError } = await recentOrdersQuery

      if (!recentOrdersError && recentOrdersData) {
        setRecentOrders(recentOrdersData.map((order: any) => ({
          id: order.id,
          order_number: order.order_number,
          customer_name: order.customers?.name || 'Unknown',
          total_amount: parseFloat(order.total_amount || 0),
          status: order.status,
          created_at: order.created_at,
        })))
      }

    } catch (err: any) {
      setError(err.message || 'Error loading reports')
      console.error('Error loading reports:', err)
    } finally {
      setLoading(false)
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
          <p className="mt-4 text-gray-600">Loading reports...</p>
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
                Reports & Analytics
              </h1>
            </div>
            <div className="flex items-center">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
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

          {stats && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalRevenue)}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Total Orders</div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {stats.totalOrders}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Total Invoices</div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {stats.totalInvoices}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {stats.paidInvoices} paid, {stats.pendingInvoices} pending
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Active Customers</div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {stats.totalCustomers}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Total Products</div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {stats.totalProducts}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Low Stock Items</div>
                  <div className="mt-2 text-2xl font-bold text-red-600">
                    {stats.lowStockItems}
                  </div>
                  <Link href="/inventory" className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                    View Inventory →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Top Products */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
                  {topProducts.length === 0 ? (
                    <p className="text-gray-500 text-sm">No sales data available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {topProducts.map((product, index) => (
                            <tr key={product.product_id}>
                              <td className="px-4 py-3 text-sm">
                                <span className="font-medium text-gray-900">#{index + 1}</span> {product.product_name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {product.total_quantity.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {formatCurrency(product.total_revenue)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Top Customers */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h2>
                  {topCustomers.length === 0 ? (
                    <p className="text-gray-500 text-sm">No sales data available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {topCustomers.map((customer, index) => (
                            <tr key={customer.customer_id}>
                              <td className="px-4 py-3 text-sm">
                                <div>
                                  <span className="font-medium text-gray-900">#{index + 1} {customer.customer_name}</span>
                                  {customer.outstanding_amount > 0 && (
                                    <div className="text-xs text-red-600">
                                      Outstanding: {formatCurrency(customer.outstanding_amount)}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {customer.total_orders}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {formatCurrency(customer.total_revenue)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <Link href="/orders" className="text-sm text-blue-600 hover:text-blue-700">
                    View All →
                  </Link>
                </div>
                {recentOrders.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recent orders</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {order.order_number}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {order.customer_name}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {formatCurrency(order.total_amount)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                order.status === 'invoiced' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              <Link
                                href={`/orders/${order.id}`}
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
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}


