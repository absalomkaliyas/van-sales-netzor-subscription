import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'

interface InventoryItem {
  id: string
  product_id: string
  product: {
    name: string
    sku: string
    unit: string
  }
  quantity: number
  batch_number?: string
  expiry_date?: string
}

export default function InventoryScreen() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hubId, setHubId] = useState<string | null>(null)

  useEffect(() => {
    loadHubInventory()
  }, [])

  async function loadHubInventory() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user's hub
      const { data: userData } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      if (!userData?.hub_id) {
        setLoading(false)
        return
      }

      setHubId(userData.hub_id)

      // Load inventory for this hub
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          id,
          product_id,
          quantity,
          batch_number,
          expiry_date,
          products (
            id,
            name,
            sku,
            unit
          )
        `)
        .eq('hub_id', userData.hub_id)
        .gt('quantity', 0)
        .order('products(name)')

      if (error) throw error

      const inventoryItems = (data || []).map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        product: item.products,
        quantity: item.quantity,
        batch_number: item.batch_number,
        expiry_date: item.expiry_date,
      }))

      setInventory(inventoryItems)
    } catch (error: any) {
      console.error('Error loading inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item }: { item: InventoryItem }) => {
    const isExpiringSoon = item.expiry_date && new Date(item.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    const isExpired = item.expiry_date && new Date(item.expiry_date) < new Date()

    return (
      <View style={styles.itemCard}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.product.name}</Text>
            <Text style={styles.itemSku}>SKU: {item.product.sku}</Text>
          </View>
          <View style={[styles.quantityBadge, item.quantity < 10 && styles.lowStock]}>
            <Text style={styles.quantityText}>{item.quantity} {item.product.unit}</Text>
          </View>
        </View>
        
        {item.batch_number && (
          <Text style={styles.batchInfo}>Batch: {item.batch_number}</Text>
        )}
        
        {item.expiry_date && (
          <View style={styles.expiryRow}>
            <Ionicons 
              name="calendar" 
              size={14} 
              color={isExpired ? '#ef4444' : isExpiringSoon ? '#f59e0b' : '#6b7280'} 
            />
            <Text style={[
              styles.expiryText,
              isExpired && styles.expiredText,
              isExpiringSoon && !isExpired && styles.expiringText
            ]}>
              Expiry: {new Date(item.expiry_date).toLocaleDateString()}
              {isExpired && ' (Expired)'}
              {isExpiringSoon && !isExpired && ' (Expiring Soon)'}
            </Text>
          </View>
        )}
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  if (!hubId) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#9ca3af" />
        <Text style={styles.emptyText}>No hub assigned</Text>
        <Text style={styles.emptySubtext}>Contact admin to assign a hub</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hub Inventory</Text>
        <Text style={styles.headerSubtitle}>Available stock in your hub</Text>
      </View>

      {inventory.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="cube-outline" size={48} color="#9ca3af" />
          <Text style={styles.emptyText}>No stock available</Text>
          <Text style={styles.emptySubtext}>Stock will appear here when assigned by admin</Text>
        </View>
      ) : (
        <FlatList
          data={inventory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadHubInventory} />
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
    padding: 32,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  list: {
    padding: 16,
  },
  itemCard: {
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
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemSku: {
    fontSize: 12,
    color: '#6b7280',
  },
  quantityBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  lowStock: {
    backgroundColor: '#f59e0b',
  },
  quantityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  batchInfo: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  expiredText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  expiringText: {
    color: '#f59e0b',
    fontWeight: '600',
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

