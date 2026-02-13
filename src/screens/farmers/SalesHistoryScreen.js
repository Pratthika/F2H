import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

// Sample sales history data
const sampleSalesHistory = [
  { id: 1, productName: 'Tomatoes', price: '₹50', farmer: 'John Doe', date: '2024-08-30' },
  { id: 2, productName: 'Carrots', price: '₹30', farmer: 'Jane Smith', date: '2024-09-01' },
  { id: 3, productName: 'Lettuce', price: '₹25', farmer: 'Alice Johnson', date: '2024-09-05' },
];

const SalesHistoryScreen = () => {
  const { t } = useTranslation();
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching sales history (replace with real API call later)
    setSalesHistory(sampleSalesHistory);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{t('Sales History')}</Text>

      {salesHistory.length > 0 ? (
        salesHistory.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.productName}>{t('Consumer')}: {item.farmer}</Text>
            <Text>{t('Price')}: {item.price}</Text>
            <Text>{t('Product')}: {item.productName}</Text>
            <Text>{t('Date')}: {item.date}</Text>
          </View>
        ))
      ) : (
        <Text>{t('No sales history available')}</Text>
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

export default SalesHistoryScreen;
