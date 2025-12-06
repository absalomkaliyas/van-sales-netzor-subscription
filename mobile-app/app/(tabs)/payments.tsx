import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Invoice {
  id: string
  invoice_number: string
  total_amount: number
  paid_amount: number
  payment_status: string
  created_at: string
  customer: {
    name: string
    phone: string
  }
}

export default function PaymentsScreen() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'partial'>('pending')

  useEffect(() => {
    loadInvoices()
  }, [filter])

  async function loadInvoices() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user's hub
      const { data: userData } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      let query = supabase
        .from('invoices')
        .select(`
          id,
          invoice_number,
          total_amount,
          paid_amount,
          payment_status,
          created_at,
          customers (
            name,
            phone
          )
        `)
        .eq('hub_id', userData?.hub_id || '')
        .order('created_at', { ascending: false })

      // Apply filter
      if (filter === 'pending') {
        query = query.eq('payment_status', 'pending')
      } else if (filter === 'partial') {
        query = query.eq('payment_status', 'partial')
      }

      const { data, error } = await query

      if (error) throw error

      const invoicesList = (data || []).map((inv: any) => ({
        id: inv.id,
        invoice_number: inv.invoice_number,
        total_amount: inv.total_amount,
        paid_amount: inv.paid_amount || 0,
        payment_status: inv.payment_status,
        created_at: inv.created_at,
        customer: inv.customers,
      }))

      setInvoices(invoicesList)
    } catch (error: any) {
      console.error('Error loading invoices:', error)
      Alert.alert('Error', error.message || 'Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  const getOutstandingAmount = (invoice: Invoice) => {
    return invoice.total_amount - invoice.paid_amount
  }

  const renderInvoice = ({ item }: { item: Invoice }) => {
    const outstanding = getOutstandingAmount(item)
    const isFullyPaid = outstanding <= 0

    return (
      <TouchableOpacity
        style={styles.invoiceCard}
        onPress={() => router.push(`/collect-payment?invoiceId=${item.id}`)}
      >
        <View style={styles.invoiceHeader}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceNumber}>{item.invoice_number}</Text>
            <Text style={styles.customerName}>{item.customer?.name || 'Unknown'}</Text>
            <Text style={styles.customerPhone}>{item.customer?.phone || ''}</Text>
          </View>
          <View style={[styles.statusBadge, getStatusStyle(item.payment_status)]}>
            <Text style={styles.statusText}>{item.payment_status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{item.total_amount.toFixed(2)}</Text>
          </View>
          <View style={styles.amountDivider} />
          <View>
            <Text style={styles.amountLabel}>Paid</Text>
            <Text style={styles.paidAmount}>₹{item.paid_amount.toFixed(2)}</Text>
          </View>
          <View style={styles.amountDivider} />
          <View>
            <Text style={styles.amountLabel}>Outstanding</Text>
            <Text style={[styles.outstandingAmount, isFullyPaid && styles.fullyPaid]}>
              ₹{outstanding.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Text style={styles.dateText}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          {!isFullyPaid && (
            <TouchableOpacity
              style={styles.collectButton}
              onPress={() => router.push(`/collect-payment?invoiceId=${item.id}`)}
            >
              <Ionicons name="cash" size={16} color="#fff" />
              <Text style={styles.collectButtonText}>Collect Payment</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
        return { backgroundColor: '#10b981' }
      case 'partial':
        return { backgroundColor: '#f59e0b' }
      case 'pending':
        return { backgroundColor: '#ef4444' }
      default:
        return { backgroundColor: '#6b7280' }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.filterActive]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'partial' && styles.filterActive]}
          onPress={() => setFilter('partial')}
        >
          <Text style={[styles.filterText, filter === 'partial' && styles.filterTextActive]}>
            Partial
          </Text>
        </TouchableOpacity>
      </View>

      {loading && invoices.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          data={invoices}
          renderItem={renderInvoice}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadInvoices} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No invoices found</Text>
              <Text style={styles.emptySubtext}>
                {filter === 'pending' 
                  ? 'No pending payments to collect'
                  : 'No invoices available'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  filterActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  paidAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  outstandingAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  fullyPaid: {
    color: '#10b981',
  },
  amountDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  collectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  collectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 400,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
})


