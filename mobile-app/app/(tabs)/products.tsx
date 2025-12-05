import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Product {
  id: string
  sku: string
  name: string
  unit: string
  image_url?: string
  stock_quantity?: number
}

export default function ProductsScreen() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user's hub
      const { data: userData } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      // Load products with stock from user's hub
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (productsError) throw productsError

      // Get stock quantities for user's hub
      if (userData?.hub_id) {
        const { data: inventoryData } = await supabase
          .from('inventory')
          .select('product_id, quantity')
          .eq('hub_id', userData.hub_id)
          .gt('quantity', 0)

        const stockMap = new Map()
        inventoryData?.forEach(item => {
          const existing = stockMap.get(item.product_id) || 0
          stockMap.set(item.product_id, existing + item.quantity)
        })

        const productsWithStock = (productsData || []).map(product => ({
          ...product,
          stock_quantity: stockMap.get(product.id) || 0,
        }))

        setProducts(productsWithStock)
      } else {
        setProducts(productsData || [])
      }
    } catch (error: any) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.productImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Ionicons name="cube-outline" size={32} color="#9ca3af" />
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSku}>SKU: {item.sku}</Text>
        <Text style={styles.productUnit}>Unit: {item.unit}</Text>
        {item.stock_quantity !== undefined && (
          <View style={styles.stockRow}>
            <Ionicons 
              name={item.stock_quantity > 0 ? "checkmark-circle" : "close-circle"} 
              size={14} 
              color={item.stock_quantity > 0 ? "#10b981" : "#ef4444"} 
            />
            <Text style={[
              styles.stockText,
              item.stock_quantity === 0 && styles.outOfStock
            ]}>
              {item.stock_quantity > 0 
                ? `Available: ${item.stock_quantity} ${item.unit}`
                : 'Out of Stock'}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadProducts}
      />
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
  list: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  productSku: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  productUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  stockText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  outOfStock: {
    color: '#ef4444',
  },
})

