// screens/NotificationScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import '../../i18n'; // Adjusted import for the correct path
 // Adjust the path as necessary

const notifications = [
  { id: '1', message: 'Consumer John Doe is interested in contacting you regarding your product "Organic Apples".' },
  { id: '2', message: 'Consumer Jane Smith wants to call you regarding "Pineapples".' },
  { id: '3', message: 'Consumer Mark Johnson wants to know more about the delivery details.' },
];

const FNotificationScreen = () => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('notifications')}</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
});

export default FNotificationScreen;
