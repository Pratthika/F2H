import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const CallScreen = () => {
  const { t } = useTranslation();

  // Example call history data
  const callHistory = [
    { id: '1', name: 'john_doe', time: '10:30 AM', duration: 5, type: 'Outgoing', date: 'today' },
    { id: '2', name: 'jane_smith', time: '2:15 PM', duration: 8, type: 'Incoming', date: 'yesterday' },
    { id: '3', name: 'bob_williams', time: '5:30 PM', duration: 3, type: 'Missed', date: '2 days ago' },
  ];

  const renderCallItem = ({ item }) => {
    let displayDate;
    if (item.date === 'today') {
      displayDate = t('callScreen.time') + ': ' + item.time;
    } else if (item.date === 'yesterday') {
      displayDate = t('callScreen.yesterday');
    } else {
      const daysAgo = item.date.split(' ')[0]; // Extract the number from "2 days ago"
      displayDate = t('callScreen.daysAgo', { count: daysAgo });
    }

    return (
      <View style={styles.callItem}>
        <Text style={styles.callName}>{t(`names.${item.name}`)}</Text>
        <Text>{`${displayDate} • ${t('callScreen.duration')}: ${item.duration} ${t('callScreen.mins')}`}</Text>
        <Text style={styles.callType}>{t(`callScreen.${item.type.toLowerCase()}`)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('callScreen.Call History')}</Text>
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
