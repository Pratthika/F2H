import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have this package installed
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const { t } = useTranslation();
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleBuy = () => {
    if (selectedItems.length > 0) {
      console.log('Buying selected items:', selectedItems);
    } else {
      console.log('Buying all items');
    }
  };

  const handleLongPress = (productId) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }
    toggleSelection(productId);
  };

  const toggleSelection = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>{t('Empty Cart')}</Text>
      ) : (
        <>
          <TouchableOpacity onPress={handleBuy} style={styles.buyAllButton}>
            <Text style={styles.buyAllButtonText}>
              {selectedItems.length > 0 ? t('Buy Selected Items') : t('Buy All Items')}
            </Text>
          </TouchableOpacity>

          {selectionMode && (
            <View style={styles.selectAllContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (selectedItems.length === cartItems.length) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems(cartItems.map((item) => item.productId));
                  }
                }}
                style={styles.selectAllButton}
              >
                <Text style={styles.selectAllText}>
                  {selectedItems.length === cartItems.length ? t('Deselect All') : t('Select All')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {cartItems.map((item) => (
            <TouchableOpacity
              key={item.productId}
              onLongPress={() => handleLongPress(item.productId)}
              onPress={() => selectionMode && toggleSelection(item.productId)}
              style={[
                styles.itemContainer,
                selectedItems.includes(item.productId) && styles.selectedItem,
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.detailsContainer}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>{t('Price')}: {item.price}</Text>
                <Text style={styles.productOwner}>{t('Owner')}: {item.owner}</Text>
                <Text style={styles.productLocation}>{t('Location')}: {item.location}</Text>
                <Text style={styles.productContact}>{t('Contact')}: {item.contact}</Text>
                <View style={styles.quantityAndDeleteContainer}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.productId, Math.max(item.quantity - 1, 1))}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => handleRemove(item.productId)} style={styles.deleteButton}>
                    <Icon name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
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
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  buyAllButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  buyAllButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  selectAllButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectAllText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedItem: {
    backgroundColor: '#e0f7fa',
  },
  productImage: {
    width: 120,
    height: 130,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  productOwner: {
    fontSize: 16,
    marginBottom: 4,
  },
  productLocation: {
    fontSize: 16,
    marginBottom: 4,
  },
  productContact: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityAndDeleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 8,
  },
});

export default Cart;
