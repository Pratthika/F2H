import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const FMessageScreen = () => {
  const { t } = useTranslation();

  // Example messages data
  const messages = [
    { id: '1', sender: 'John Doe', message: 'Hey, can you send the details?', time: '10:30 AM' },
    { id: '2', sender: 'Jane Smith', message: 'Meeting is postponed to tomorrow.', time: 'Yesterday, 2:15 PM' },
    { id: '3', sender: 'Bob Williams', message: 'Thanks for the update!', time: '2 days ago, 5:30 PM' },
  ];

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Messages')}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messageList}
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
  messageList: {
    flexGrow: 1,
  },
  messageItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sender: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FMessageScreen;