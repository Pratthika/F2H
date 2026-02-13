import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation();

  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Alice', comment: t('Great product, very fresh!') },
    { id: 2, user: 'Bob', comment: t('I love the quality!') },
  ]);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [quantityInput, setQuantityInput] = useState('');

  const numericPrice = parseFloat(product.price.replace('$', '').replace('/kg', ''));

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, { id: reviews.length + 1, user: 'Anonymous', comment: newReview }]);
      setNewReview('');
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    } else {
      setQuantityInput((prev) => (prev ? prev : quantity.toString()));
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityInput(''); // Clear the input box when quantity is decreased
    }
  };

  const handleQuantityChange = (text) => {
    setQuantityInput(text);  // Update the input box value as you type
  };

  const handleQuantityBlur = () => {
    // On blur, update the main quantity value with the valid number
    const newQuantity = parseInt(quantityInput, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    } else {
      setQuantityInput(quantity.toString());  // If invalid, reset to the previous quantity
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Create a new item object with a unique productId and quantity
      const item = {
        productId: product.id, // Ensure the productId is unique
        image: product.image,
        productName: product.productName, // Use productName correctly
        price: product.price,
        owner: product.owner,
        location: product.location,
        contact: product.contact,
        quantity, // Set the correct quantity
      };
      addToCart(item); // Add product to global cart
      navigation.navigate('Cart');
    } else {
      console.error('No product data available');
    }
  };

  const totalPrice = (numericPrice * quantity).toFixed(2);

    const handleCall = (phoneNumber) => {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url).catch((err) => console.error('Error launching dialer:', err));
    };

  if (!product) {
    return <Text>{t('No Product Data')}</Text>; // Translate the text
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.productName}</Text>
        <View style={styles.priceAndQuantityRow}>
          <Text style={styles.productPrice}>{t('Total Price')}: {totalPrice}</Text>
          {quantity >= 10 ? (
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantityInput}
              onChangeText={handleQuantityChange}
              onBlur={handleQuantityBlur}
            />
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.ownerRow}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
            <View style={styles.ownerDetails}>
              <Text style={styles.ownerName}>{product.owner}</Text>
              <View style={styles.messageBox}>
                <TouchableOpacity>
                  <Icon name="mic" size={24} color="#000" style={styles.voiceIcon} />
                </TouchableOpacity>
                <TextInput
                  placeholder={t('Message Owner')}
                  style={styles.messageInput}
                />
                <TouchableOpacity>
                  <Icon name="message" size={24} color="#000" style={styles.messageIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.iconRow}>
            <Icon name="location-on" size={24} color="#000" />
            <Text style={styles.detailText}>{product.location}</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="call" size={24} color="#000" />
            <TouchableOpacity onPress={() => handleCall(product.contact)}>
              <Text style={styles.detailText}>{product.contact}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>{t('Add To Cart')}</Text>
            </TouchableOpacity>
            {product.status.trim().toLowerCase() === 'yet to harvest' ? (  // Updated condition
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buttonText}>{t('Preorder')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buttonText}>{t('Buy')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>{t('Reviews')}</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder={t('Add Review')}
            value={newReview}
            onChangeText={setNewReview}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
            <Text style={styles.buttonText}>{t('Submit Review')}</Text>
          </TouchableOpacity>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewBox}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};  

// Keeping your styles unchanged...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceAndQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 18,
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
  quantityInput: {
    width: 120, // Same width as the quantity slider
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  voiceIcon: {
    marginRight: 8,
  },
  messageInput: {
    flex: 1,
    marginRight: 8,
  },
  messageIcon: {
    marginLeft: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#f0c14b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#ff9900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewSection: {
    marginTop: 24,
    marginBottom: 50,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  reviewUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 16,
  },
});

export default ProductDetailsScreen;

