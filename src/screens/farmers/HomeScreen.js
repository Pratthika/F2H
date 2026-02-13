import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

const products = [
  { id: '1', name: 'Organic Apples', total: 100, bought: 80, image: 'https://via.placeholder.com/100', harvestDate: '2024-08-20', status: 'Available' },
  { id: '2', name: 'Fresh Carrots', total: 50, bought: 50, image: 'https://via.placeholder.com/100', harvestDate: '2024-08-18', status: 'Available' },
  { id: '3', name: 'Free-Range Eggs', total: 200, bought: 0, image: 'https://via.placeholder.com/100', harvestDate: '2024-08-25', status: 'Yet to be Harvested' },
  { id: '4', name: 'Sweet Corn', total: 150, bought: 30, image: 'https://via.placeholder.com/100', harvestDate: '2024-08-15', status: 'Available' },
  { id: '5', name: 'Green Lettuce', total: 80, bought: 20, image: 'https://via.placeholder.com/100', harvestDate: '2024-08-22', status: 'Available' },
];

const FarmerHomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const renderProductStatus = (item) => {
    const remaining = item.total - item.bought;
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {t('Status')}: <Text style={styles.status}>{item.status}</Text>
        </Text>
        <Text style={styles.statusText}>
          {t('Sold')}: {item.bought} | {t('Left')}: {remaining}
        </Text>
        <Text style={styles.dateText}>{t('Harvest Date')}: {item.harvestDate}</Text>
      </View>
    );
  };

  const handlePress = (item) => {
    navigation.navigate('FProductDetailScreen', { product: item });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('HomeScreen')}</Text>
        <View style={styles.icons}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('FNotificationScreen')}
            style={styles.iconButton}
          >
            <Ionicons name="notifications" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Call')}
            style={styles.iconButton}
          >
            <Ionicons name="call" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('FMessage')}
            style={styles.iconButton}
          >
            <Ionicons name="chatbubble" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handlePress(item)}
            style={styles.productItem}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.name}</Text>
              {renderProductStatus(item)}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.productList}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.iconButton}
        >
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('ProductUpdate')}
          style={styles.iconButton}
        >
          <Ionicons name="cloud-upload" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('FProfileScreen')}
          style={styles.iconButton}
        >
          <Ionicons name="person-circle" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FForumScreen')}>
          <Icon name="group" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('MarketPlace')}
          style={styles.iconButton}
        >
          <Ionicons name="cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  productList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  statusContainer: {
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  status: {
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default FarmerHomeScreen;
