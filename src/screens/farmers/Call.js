import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const CallScreen = () => {
  const { t } = useTranslation();

  // Example call history data
  const callHistory = [
    { id: '1', name: 'John Doe', time: '10:30 AM', duration: '5 mins', type: 'Outgoing' },
    { id: '2', name: 'Jane Smith', time: 'Yesterday, 2:15 PM', duration: '8 mins', type: 'Incoming' },
    { id: '3', name: 'Bob Williams', time: '2 days ago, 5:30 PM', duration: '3 mins', type: 'Missed' },
  ];

  const renderCallItem = ({ item }) => (
    <View style={styles.callItem}>
      <Text style={styles.callName}>{item.name}</Text>
      <Text>{`${item.time} • ${item.duration}`}</Text>
      <Text style={styles.callType}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Call History')}</Text>
      <FlatList
        data={callHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderCallItem}
        contentContainerStyle={styles.callList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  callList: {
    flexGrow: 1,
  },
  callItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  callName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  callType: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CallScreen;