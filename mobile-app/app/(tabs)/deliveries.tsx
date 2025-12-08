import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DeliveriesScreen() {
  const deliveries = [
    {
      id: 1,
      destination: 'Customer A',
      address: '123 Main St, City',
      items: 25,
      status: 'in-transit',
    },
    {
      id: 2,
      destination: 'Customer B',
      address: '456 Oak Ave, City',
      items: 18,
      status: 'pending',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Deliveries</Text>
          <Text style={styles.subtitle}>Deliver to designated places</Text>
        </View>

        {deliveries.map((delivery) => (
          <TouchableOpacity key={delivery.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>{delivery.destination}</Text>
                <View style={styles.cardRow}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.cardText}>{delivery.address}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                delivery.status === 'in-transit' ? styles.statusInTransit : styles.statusPending
              ]}>
                <Text style={styles.statusText}>
                  {delivery.status === 'in-transit' ? 'In Transit' : 'Pending'}
                </Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardRow}>
                <Ionicons name="cube" size={16} color="#666" />
                <Text style={styles.cardText}>{delivery.items} items</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.deliverButton}>
              <Ionicons name="navigate" size={20} color="#fff" />
              <Text style={styles.deliverButtonText}>Start Delivery</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
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
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  cardBody: {
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusInTransit: {
    backgroundColor: '#E5F3FF',
  },
  statusPending: {
    backgroundColor: '#FFE5E5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  deliverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  deliverButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});

