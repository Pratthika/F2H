import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const MessageScreen = () => {
  const { t } = useTranslation();

  // Example messages data
  const messages = [
    { id: '1', name: 'john_doe', messageKey: 'message1', date: 'today', time: '10:30 AM' },
    { id: '2', name: 'jane_smith', messageKey: 'message2', date: 'yesterday', time: '2:15 PM' },
    { id: '3', name: 'bob_williams', messageKey: 'message3', date: '2 days ago', time: '5:30 PM' },
  ];

  const renderMessageItem = ({ item }) => {
    let displayDate;
    if (item.date === 'today') {
      displayDate = t('times.Today') + ': ' + item.time;
    } else if (item.date === 'yesterday') {
      displayDate = t('times.Yesterday');
    } else {
      const daysAgo = item.date.split(' ')[0]; // Extract the number from "2 days ago"
      displayDate = t('times.daysAgo', { count: daysAgo });
    }

    return (
      <View style={styles.messageItem}>
        <Text style={styles.sender}>{t(`names.${item.name}`)}</Text>
        <Text style={styles.message}>{t(`messages.${item.messageKey}`)}</Text>
        <Text style={styles.time}>{displayDate}</Text>
      </View>
    );
  };

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

export default MessageScreen;
