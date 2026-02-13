import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

// Sample purchase history data
const samplePurchaseHistory = [
  { id: 1, productName: 'Tomatoes', price: '₹50', farmer: 'John Doe', date: '2024-08-30' },
  { id: 2, productName: 'Carrots', price: '₹30', farmer: 'Jane Smith', date: '2024-09-01' },
  { id: 3, productName: 'Lettuce', price: '₹25', farmer: 'Alice Johnson', date: '2024-09-05' },
];

const PurchaseHistoryScreen = () => {
  const { t } = useTranslation();
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching purchase history (replace with real API call later)
    setPurchaseHistory(samplePurchaseHistory);  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{t('Purchase History')}</Text>

      {purchaseHistory.length > 0 ? (
        purchaseHistory.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.productName}>{t('Farmer')}: {item.farmer}</Text>
            <Text>{t('Price')}: {item.price}</Text>
            <Text>{t('Product')}: {item.productName}</Text>
            <Text>{t('Date')}: {item.date}</Text>
          </View>
        ))
      ) : (
        <Text>{t('No purchase history available')}</Text>
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
  historyItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default PurchaseHistoryScreen;
