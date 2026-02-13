import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsive design

// Placeholder data for demonstration
const itemsData = {
  'Seeds and Plants': [
    { id: '1', image: 'https://via.placeholder.com/150', title: 'Tomato Seeds', owner: 'John Doe', price: '$5.00' },
    { id: '2', image: 'https://via.placeholder.com/150', title: 'Carrot Seeds', owner: 'Jane Smith', price: '$3.50' },
    { id: '3', image: 'https://via.placeholder.com/150', title: 'Lettuce Seeds', owner: 'Emily Johnson', price: '$4.00' },
    { id: '4', image: 'https://via.placeholder.com/150', title: 'Cucumber Seeds', owner: 'Michael Brown', price: '$6.00' },
  ],
  'Fertilizers and Soil Amendments': [
    { id: '5', image: 'https://via.placeholder.com/150', title: 'Organic Fertilizer', owner: 'Laura White', price: '$10.00' },
    { id: '6', image: 'https://via.placeholder.com/150', title: 'Compost', owner: 'Mark Green', price: '$8.00' },
    { id: '7', image: 'https://via.placeholder.com/150', title: 'Soil Enhancer', owner: 'Anna Lee', price: '$12.00' },
    { id: '8', image: 'https://via.placeholder.com/150', title: 'Bone Meal', owner: 'David Wilson', price: '$15.00' },
  ],
  'Pesticides and Herbicides': [
    { id: '9', image: 'https://via.placeholder.com/150', title: 'Insecticide', owner: 'Sarah Lewis', price: '$7.00' },
    { id: '10', image: 'https://via.placeholder.com/150', title: 'Herbicide', owner: 'Paul Turner', price: '$9.00' },
    { id: '11', image: 'https://via.placeholder.com/150', title: 'Fungicide', owner: 'Nancy Harris', price: '$11.00' },
    { id: '12', image: 'https://via.placeholder.com/150', title: 'Weed Killer', owner: 'Chris Martinez', price: '$14.00' },
  ],
  'Tools and Equipment': [
    { id: '13', image: 'https://via.placeholder.com/150', title: 'Garden Trowel', owner: 'Lisa Scott', price: '$8.00' },
    { id: '14', image: 'https://via.placeholder.com/150', title: 'Pruning Shears', owner: 'Steve Adams', price: '$12.00' },
    { id: '15', image: 'https://via.placeholder.com/150', title: 'Hoe', owner: 'Karen Baker', price: '$20.00' },
    { id: '16', image: 'https://via.placeholder.com/150', title: 'Watering Can', owner: 'James Campbell', price: '$15.00' },
  ],
  'Protective Gear': [
    { id: '17', image: 'https://via.placeholder.com/150', title: 'Gloves', owner: 'Jessica Miller', price: '$6.00' },
    { id: '18', image: 'https://via.placeholder.com/150', title: 'Safety Glasses', owner: 'Michael Smith', price: '$9.00' },
    { id: '19', image: 'https://via.placeholder.com/150', title: 'Apron', owner: 'Emily Davis', price: '$12.00' },
    { id: '20', image: 'https://via.placeholder.com/150', title: 'Mask', owner: 'Robert Wilson', price: '$4.00' },
  ],
  'Irrigation Supplies': [
    { id: '21', image: 'https://via.placeholder.com/150', title: 'Drip Irrigation Kit', owner: 'Alice Johnson', price: '$30.00' },
    { id: '22', image: 'https://via.placeholder.com/150', title: 'Hose', owner: 'Tom White', price: '$25.00' },
    { id: '23', image: 'https://via.placeholder.com/150', title: 'Sprinkler', owner: 'Linda Harris', price: '$15.00' },
    { id: '24', image: 'https://via.placeholder.com/150', title: 'Irrigation Timer', owner: 'John Lee', price: '$20.00' },
  ],
  'Animal Feed and Supplies': [
    { id: '25', image: 'https://via.placeholder.com/150', title: 'Chicken Feed', owner: 'Karen Johnson', price: '$18.00' },
    { id: '26', image: 'https://via.placeholder.com/150', title: 'Horse Feed', owner: 'Jim Brown', price: '$22.00' },
    { id: '27', image: 'https://via.placeholder.com/150', title: 'Cow Feed', owner: 'Nancy White', price: '$25.00' },
    { id: '28', image: 'https://via.placeholder.com/150', title: 'Pet Food', owner: 'Alex Miller', price: '$12.00' },
  ],
  'Farm Infrastructure': [
    { id: '29', image: 'https://via.placeholder.com/150', title: 'Greenhouse', owner: 'Jessica Martinez', price: '$500.00' },
    { id: '30', image: 'https://via.placeholder.com/150', title: 'Shed', owner: 'Mark Smith', price: '$300.00' },
    { id: '31', image: 'https://via.placeholder.com/150', title: 'Fencing', owner: 'Lisa Davis', price: '$200.00' },
    { id: '32', image: 'https://via.placeholder.com/150', title: 'Barn', owner: 'Paul Lee', price: '$800.00' },
  ],
  'Maintenance and Repair Materials': [
    { id: '33', image: 'https://via.placeholder.com/150', title: 'Wrench Set', owner: 'Sara Green', price: '$40.00' },
    { id: '34', image: 'https://via.placeholder.com/150', title: 'Screwdriver Set', owner: 'David White', price: '$25.00' },
    { id: '35', image: 'https://via.placeholder.com/150', title: 'Lubricant', owner: 'Laura Scott', price: '$15.00' },
    { id: '36', image: 'https://via.placeholder.com/150', title: 'Hammer', owner: 'James Adams', price: '$20.00' },
  ],
};
const CategoryScreen = ({ route }) => {
    const { category } = route.params;
    const items = itemsData[category] || [];
  
    const renderItem = ({ item }) => (
      <View style={styles.itemBox}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemOwner}>Owner: {item.owner}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.grid}
          contentContainerStyle={styles.gridContainer}
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
    gridContainer: {
      flexGrow: 1,
    },
    grid: {
      justifyContent: 'space-between',
    },
    itemBox: {
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      margin: 8,
      flex: 1,
      maxWidth: '48%',
      overflow: 'hidden',
    },
    itemImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    itemDetails: {
      padding: 8,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemOwner: {
      fontSize: 14,
      color: '#555',
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
  });
  
  export default CategoryScreen;