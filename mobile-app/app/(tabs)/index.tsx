import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons'

export default function HomeScreen() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [hub, setHub] = useState<any>(null)
  const [inventoryCount, setInventoryCount] = useState(0)
  const [pendingPayments, setPendingPayments] = useState(0)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)

  useEffect(() => {
    loadUser()
    checkAttendanceStatus()
    requestLocationPermission()
    loadDashboardData()
  }, [])

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('*, hubs(*)')
        .eq('id', user.id)
        .single()
      setUser(data)
      if (data?.hub_id) {
        setHub(data.hubs)
      }
    }
  }

  async function loadDashboardData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user's hub
      const { data: userData } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      if (!userData?.hub_id) return

      // Count inventory items
      const { count: inventoryCount } = await supabase
        .from('inventory')
        .select('*', { count: 'exact', head: true })
        .eq('hub_id', userData.hub_id)
        .gt('quantity', 0)

      setInventoryCount(inventoryCount || 0)

      // Count pending payments
      const { count: paymentsCount } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .eq('hub_id', userData.hub_id)
        .in('payment_status', ['pending', 'partial'])

      setPendingPayments(paymentsCount || 0)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  async function checkAttendanceStatus() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .gte('checkin_time', today.toISOString())
      .is('checkout_time', null)
      .single()

    setIsCheckedIn(!!data)
  }

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required for check-in')
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  async function handleCheckIn() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (!location) {
      Alert.alert('Error', 'Location not available')
      return
    }

    try {
      // Get user's hub
      const { data: userData } = await supabase
        .from('users')
        .select('hub_id')
        .eq('id', user.id)
        .single()

      // Get address from coordinates
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      const addressString = address
        ? `${address.street}, ${address.city}, ${address.region}`
        : 'Address not available'

      const { error } = await supabase
        .from('attendance')
        .insert([{
          user_id: user.id,
          hub_id: userData?.hub_id || null,
          checkin_time: new Date().toISOString(),
          checkin_latitude: location.coords.latitude,
          checkin_longitude: location.coords.longitude,
          checkin_address: addressString,
        }])

      if (error) throw error

      setIsCheckedIn(true)
      Alert.alert('Success', 'Checked in successfully')
      loadDashboardData()
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to check in')
    }
  }

  async function handleCheckOut() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (!location) {
      Alert.alert('Error', 'Location not available')
      return
    }

    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Get address from coordinates
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      const addressString = address
        ? `${address.street}, ${address.city}, ${address.region}`
        : 'Address not available'

      const { error } = await supabase
        .from('attendance')
        .update({
          checkout_time: new Date().toISOString(),
          checkout_latitude: location.coords.latitude,
          checkout_longitude: location.coords.longitude,
          checkout_address: addressString,
        })
        .eq('user_id', user.id)
        .gte('checkin_time', today.toISOString())
        .is('checkout_time', null)

      if (error) throw error

      setIsCheckedIn(false)
      Alert.alert('Success', 'Checked out successfully')
      loadDashboardData()
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to check out')
    }
  }

  async function handleLogout() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut()
            router.replace('/login')
          },
        },
      ]
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {user?.name || 'User'}</Text>
        <Text style={styles.role}>{user?.role || ''}</Text>
        {hub && (
          <View style={styles.hubInfo}>
            <Ionicons name="business" size={16} color="#6b7280" />
            <Text style={styles.hubName}>{hub.name}</Text>
          </View>
        )}
      </View>

      {/* Dashboard Stats */}
      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => router.push('/(tabs)/inventory')}
        >
          <Ionicons name="cube" size={24} color="#2563eb" />
          <Text style={styles.statValue}>{inventoryCount}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => router.push('/(tabs)/payments')}
        >
          <Ionicons name="cash" size={24} color="#10b981" />
          <Text style={styles.statValue}>{pendingPayments}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance</Text>
        <TouchableOpacity
          style={[styles.attendanceButton, isCheckedIn && styles.checkedInButton]}
          onPress={isCheckedIn ? handleCheckOut : handleCheckIn}
        >
          <Ionicons
            name={isCheckedIn ? 'log-out' : 'log-in'}
            size={24}
            color="#fff"
          />
          <Text style={styles.attendanceButtonText}>
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </Text>
        </TouchableOpacity>
        {isCheckedIn && (
          <Text style={styles.statusText}>You are currently checked in</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Ionicons name="add-circle" size={32} color="#2563eb" />
            <Text style={styles.actionText}>New Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/customers')}
          >
            <Ionicons name="people" size={32} color="#2563eb" />
            <Text style={styles.actionText}>Customers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/products')}
          >
            <Ionicons name="list" size={32} color="#2563eb" />
            <Text style={styles.actionText}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/inventory')}
          >
            <Ionicons name="cube" size={32} color="#2563eb" />
            <Text style={styles.actionText}>Inventory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/payments')}
          >
            <Ionicons name="cash" size={32} color="#2563eb" />
            <Text style={styles.actionText}>Payments</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  hubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  hubName: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsRow: {
    flexDirection: 'row',
    margin: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
    marginBottom: 12,
  },
  attendanceButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  checkedInButton: {
    backgroundColor: '#ef4444',
  },
  attendanceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#1f2937',
    textAlign: 'center',
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

