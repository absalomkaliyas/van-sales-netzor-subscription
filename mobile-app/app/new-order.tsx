import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Product {
  id: string
  name: string
  sku: string
  unit: string
}

interface Customer {
  id: string
  name: string
  price_list_id?: string
}

interface OrderItem {
  product_id: string
  product: Product
  quantity: number
  price: number
}

export default function NewOrderScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [showCustomerSelect, setShowCustomerSelect] = useState(false)
  const [showProductSelect, setShowProductSelect] = useState(false)

  useEffect(() => {
    loadCustomers()
    loadProducts()
    if (params.customerId) {
      const customer = customers.find(c => c.id === params.customerId)
      if (customer) setSelectedCustomer(customer)
    }
  }, [])

  async function loadCustomers() {
    const { data } = await supabase
      .from('customers')
      .select('id, name, price_list_id')
      .eq('is_active', true)
      .order('name')
    setCustomers(data || [])
  }

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('id, name, sku, unit')
      .eq('is_active', true)
      .order('name')
    setProducts(data || [])
  }

  function addProduct(product: Product) {
    // Get price from customer's price list
    // For now, use a default price
    const newItem: OrderItem = {
      product_id: product.id,
      product,
      quantity: 1,
      price: 0, // Will be fetched from price list
    }
    setOrderItems([...orderItems, newItem])
    setShowProductSelect(false)
  }

  function updateQuantity(index: number, quantity: number) {
    const newItems = [...orderItems]
    newItems[index].quantity = Math.max(0, quantity)
    setOrderItems(newItems)
  }

  function removeItem(index: number) {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  async function createOrder() {
    if (!selectedCustomer) {
      Alert.alert('Error', 'Please select a customer')
      return
    }

    if (orderItems.length === 0) {
      Alert.alert('Error', 'Please add at least one product')
      return
    }

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Get user's hub
      const { data: userData } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      // Generate order number
      const orderNumber = `ORD-${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 10000)}`

      // Calculate totals
      const subtotal = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      const taxAmount = subtotal * 0.18 // 18% GST
      const totalAmount = subtotal + taxAmount

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNumber,
          customer_id: selectedCustomer.id,
          user_id: user.id,
          hub_id: userData?.hub_id || null,
          status: 'pending',
          subtotal,
          tax_amount: taxAmount,
          total_amount: totalAmount,
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const itemsToInsert = orderItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert)

      if (itemsError) throw itemsError

      Alert.alert('Success', 'Order created successfully', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create order')
    } finally {
      setLoading(false)
    }
  }

  const totalAmount = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const taxAmount = totalAmount * 0.18
  const grandTotal = totalAmount + taxAmount

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Customer Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowCustomerSelect(true)}
          >
            <Text style={selectedCustomer ? styles.selectText : styles.selectPlaceholder}>
              {selectedCustomer ? selectedCustomer.name : 'Select Customer'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Products</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowProductSelect(true)}
            >
              <Ionicons name="add" size={20} color="#2563eb" />
              <Text style={styles.addButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>

          {orderItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemSku}>{item.product.sku}</Text>
              </View>
              <View style={styles.itemControls}>
                <TouchableOpacity
                  onPress={() => updateQuantity(index, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="remove" size={20} color="#2563eb" />
                </TouchableOpacity>
                <TextInput
                  style={styles.quantityInput}
                  value={item.quantity.toString()}
                  onChangeText={(text) => updateQuantity(index, parseFloat(text) || 0)}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => updateQuantity(index, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="add" size={20} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeItem(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemTotal}>
                ₹{(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        {orderItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18%)</Text>
              <Text style={styles.summaryValue}>₹{taxAmount.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{grandTotal.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Create Order Button */}
      <TouchableOpacity
        style={[styles.createButton, loading && styles.buttonDisabled]}
        onPress={createOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createButtonText}>Create Order</Text>
        )}
      </TouchableOpacity>

      {/* Customer Selection Modal */}
      {showCustomerSelect && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Customer</Text>
              <TouchableOpacity onPress={() => setShowCustomerSelect(false)}>
                <Ionicons name="close" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {customers.map((customer) => (
                <TouchableOpacity
                  key={customer.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCustomer(customer)
                    setShowCustomerSelect(false)
                  }}
                >
                  <Text style={styles.modalItemText}>{customer.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Product Selection Modal */}
      {showProductSelect && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Product</Text>
              <TouchableOpacity onPress={() => setShowProductSelect(false)}>
                <Ionicons name="close" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.modalItem}
                  onPress={() => addProduct(product)}
                >
                  <Text style={styles.modalItemText}>{product.name}</Text>
                  <Text style={styles.modalItemSubtext}>{product.sku}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  selectText: {
    fontSize: 16,
    color: '#1f2937',
  },
  selectPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  orderItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  itemInfo: {
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  itemSku: {
    fontSize: 12,
    color: '#6b7280',
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    width: 60,
    height: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 'auto',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'right',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1f2937',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  createButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalItemText: {
    fontSize: 16,
    color: '#1f2937',
  },
  modalItemSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
})

