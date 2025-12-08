import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AssignmentsScreen() {
  const assignments = [
    {
      id: 1,
      hub: 'Hub A',
      date: '2024-01-15',
      items: 25,
      status: 'pending',
    },
    {
      id: 2,
      hub: 'Hub B',
      date: '2024-01-15',
      items: 18,
      status: 'in-progress',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Stock Assignments</Text>
          <Text style={styles.subtitle}>Assigned stock for collection</Text>
        </View>

        {assignments.map((assignment) => (
          <TouchableOpacity key={assignment.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{assignment.hub}</Text>
              <View style={[
                styles.statusBadge,
                assignment.status === 'pending' ? styles.statusPending : styles.statusInProgress
              ]}>
                <Text style={styles.statusText}>
                  {assignment.status === 'pending' ? 'Pending' : 'In Progress'}
                </Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardRow}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.cardText}>{assignment.date}</Text>
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="cube" size={16} color="#666" />
                <Text style={styles.cardText}>{assignment.items} items</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
              <Ionicons name="chevron-forward" size={20} color="#007AFF" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#FFE5E5',
  },
  statusInProgress: {
    backgroundColor: '#E5F3FF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 4,
  },
});

