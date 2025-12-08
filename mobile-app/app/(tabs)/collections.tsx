import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CollectionsScreen() {
  const collections = [
    {
      id: 1,
      hub: 'Hub A',
      product: 'Product A',
      quantity: 50,
      status: 'collected',
    },
    {
      id: 2,
      hub: 'Hub B',
      product: 'Product B',
      quantity: 30,
      status: 'pending',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Stock Collections</Text>
          <Text style={styles.subtitle}>Collect from hub stock room</Text>
        </View>

        {collections.map((collection) => (
          <TouchableOpacity key={collection.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>{collection.product}</Text>
                <Text style={styles.cardSubtitle}>{collection.hub}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                collection.status === 'collected' ? styles.statusCollected : styles.statusPending
              ]}>
                <Text style={styles.statusText}>
                  {collection.status === 'collected' ? 'Collected' : 'Pending'}
                </Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardRow}>
                <Ionicons name="cube" size={16} color="#666" />
                <Text style={styles.cardText}>Quantity: {collection.quantity}</Text>
              </View>
            </View>
            {collection.status === 'pending' && (
              <TouchableOpacity style={styles.collectButton}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.collectButtonText}>Mark as Collected</Text>
              </TouchableOpacity>
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCollected: {
    backgroundColor: '#E5F9E5',
  },
  statusPending: {
    backgroundColor: '#FFE5E5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
  },
  cardBody: {
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  collectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  collectButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});

