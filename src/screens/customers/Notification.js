import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Sample notification data
const sampleNotifications = [
  { id: 1, productName: 'fresh_tomatoes', status: 'Accepted', farmer: 'john_doe', time: '10:30 AM' },
  { id: 2, productName: 'organic_carrots', status: 'Rejected', farmer: 'jane_smith', time: '9:45 AM' },
  { id: 3, productName: 'green_lettuce', status: 'Pending', farmer: 'alice_johnson', time: '8:00 AM' },
];

const NotificationScreen = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating fetching notifications (you can replace this with a real API call)
    setNotifications(sampleNotifications);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{t('notifications')}</Text>

      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              {
                borderColor: notification.status === 'Accepted' ? 'green' : notification.status === 'Rejected' ? 'red' : 'gray',
              },
            ]}
          >
            <View>
              <Text style={styles.productName}>{t(`products.${notification.productName}`)}</Text>
              <Text>{t('farmer')}: {t(`names.${notification.farmer}`)}</Text>
              <Text>
                {t('status')}: 
                <Text style={{ color: notification.status === 'Accepted' ? 'green' : notification.status === 'Rejected' ? 'red' : 'orange' }}>
                  {t(`statuses.${notification.status}`)}
                </Text>
              </Text>
              <Text>{t('time')}: {notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>{t('noNotifications')}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  notificationItem: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
