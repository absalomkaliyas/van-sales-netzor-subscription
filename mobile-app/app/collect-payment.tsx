import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Invoice {
  id: string
  invoice_number: string
  total_amount: number
  paid_amount: number
  customer: {
    name: string
    phone: string
  }
}

export default function CollectPaymentScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const invoiceId = params.invoiceId as string

  const [loading, setLoading] = useState(false)
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMode, setPaymentMode] = useState<'cash' | 'upi' | 'card' | 'cheque'>('cash')
  const [transactionRef, setTransactionRef] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    loadInvoice()
  }, [invoiceId])

  async function loadInvoice() {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          id,
          invoice_number,
          total_amount,
          paid_amount,
          customers (
            name,
            phone
          )
        `)
        .eq('id', invoiceId)
        .single()

      if (error) throw error

      setInvoice({
        id: data.id,
        invoice_number: data.invoice_number,
        total_amount: data.total_amount,
        paid_amount: data.paid_amount || 0,
        customer: data.customers as any,
      })

      // Set default payment amount to outstanding
      const outstanding = data.total_amount - (data.paid_amount || 0)
      setPaymentAmount(outstanding.toString())
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load invoice')
      router.back()
    }
  }

  async function collectPayment() {
    if (!invoice) return

    const amount = parseFloat(paymentAmount)
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid payment amount')
      return
    }

    const outstanding = invoice.total_amount - invoice.paid_amount
    if (amount > outstanding) {
      Alert.alert('Error', `Payment amount cannot exceed outstanding amount (₹${outstanding.toFixed(2)})`)
      return
    }

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const newPaidAmount = invoice.paid_amount + amount
      const newPaymentStatus = newPaidAmount >= invoice.total_amount 
        ? 'paid' 
        : newPaidAmount > 0 
        ? 'partial' 
        : 'pending'

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          invoice_id: invoice.id,
          amount: amount,
          payment_mode: paymentMode,
          transaction_reference: transactionRef || null,
          notes: notes || null,
          collected_by: user.id,
        }])

      if (paymentError) throw paymentError

      // Update invoice
      const { error: invoiceError } = await supabase
        .from('invoices')
        .update({
          paid_amount: newPaidAmount,
          payment_status: newPaymentStatus,
        })
        .eq('id', invoice.id)

      if (invoiceError) throw invoiceError

      // Update customer outstanding
      const { data: invoiceData } = await supabase
        .from('invoices')
        .select('customer_id')
        .eq('id', invoice.id)
        .single()

      if (invoiceData) {
        // Get current outstanding
        const { data: customerData } = await supabase
          .from('customers')
          .select('outstanding_amount')
          .eq('id', invoiceData.customer_id)
          .single()

        if (customerData) {
          const newOutstanding = Math.max(0, (customerData.outstanding_amount || 0) - amount)
          await supabase
            .from('customers')
            .update({ outstanding_amount: newOutstanding })
            .eq('id', invoiceData.customer_id)
        }
      }

      Alert.alert('Success', 'Payment collected successfully', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to collect payment')
    } finally {
      setLoading(false)
    }
  }

  if (!invoice) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  const outstanding = invoice.total_amount - invoice.paid_amount

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Invoice Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Invoice Number</Text>
            <Text style={styles.infoValue}>{invoice.invoice_number}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer</Text>
            <Text style={styles.infoValue}>{invoice.customer?.name || 'Unknown'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Amount</Text>
            <Text style={styles.infoValue}>₹{invoice.total_amount.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Paid Amount</Text>
            <Text style={[styles.infoValue, styles.paidAmount]}>
              ₹{invoice.paid_amount.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.infoRow, styles.outstandingRow]}>
            <Text style={styles.outstandingLabel}>Outstanding</Text>
            <Text style={styles.outstandingValue}>₹{outstanding.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Payment Amount *</Text>
            <TextInput
              style={styles.input}
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              keyboardType="decimal-pad"
              placeholder="Enter amount"
            />
            <Text style={styles.inputHint}>
              Maximum: ₹{outstanding.toFixed(2)}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Payment Mode *</Text>
            <View style={styles.paymentModeRow}>
              {(['cash', 'upi', 'card', 'cheque'] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.paymentModeButton,
                    paymentMode === mode && styles.paymentModeActive
                  ]}
                  onPress={() => setPaymentMode(mode)}
                >
                  <Text style={[
                    styles.paymentModeText,
                    paymentMode === mode && styles.paymentModeTextActive
                  ]}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {(paymentMode === 'upi' || paymentMode === 'card' || paymentMode === 'cheque') && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Transaction Reference</Text>
              <TextInput
                style={styles.input}
                value={transactionRef}
                onChangeText={setTransactionRef}
                placeholder="Enter transaction ID/reference"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any notes..."
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </ScrollView>

      {/* Collect Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.collectButton, loading && styles.buttonDisabled]}
          onPress={collectPayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="cash" size={20} color="#fff" />
              <Text style={styles.collectButtonText}>Collect Payment</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  outstandingRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  paidAmount: {
    color: '#10b981',
  },
  outstandingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  outstandingValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  paymentModeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentModeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  paymentModeActive: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  paymentModeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  paymentModeTextActive: {
    color: '#fff',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  collectButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  collectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

