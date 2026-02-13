import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Import icons

const { width } = Dimensions.get('window'); // Get screen width for responsive design

const categories = [
  'Seeds and Plants',
  'Fertilizers and Soil Amendments',
  'Pesticides and Herbicides',
  'Tools and Equipment',
  'Protective Gear',
  'Irrigation Supplies',
  'Animal Feed and Supplies',
  'Farm Infrastructure',
  'Maintenance and Repair Materials'
];

const MarketplaceScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Access navigation prop

  // Handle navigation for categories and icons
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryScreen', { category });
  };

  const handleIconPress = (screen) => {
    if (screen === 'Learn') {
      navigation.navigate('LearnExploreScreen'); // Navigate to Learn & Explore screen
    } else if (screen === 'Schemes') {
      navigation.navigate('SchemeScreen'); // Navigate to StateScreen for Schemes
    }
  };

  // Function to render each category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryBox} 
      onPress={() => handleCategoryPress(item)} // Navigate on press
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Icons Row for Learn & Explore and Schemes */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handleIconPress('Learn')}>
          <FontAwesome name="book" size={40} color="black" />
          <Text style={styles.iconLabel}>Learn & Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => handleIconPress('Schemes')}>
          <MaterialIcons name="account-balance" size={40} color="black" />
          <Text style={styles.iconLabel}>Schemes</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List for Categories */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: '100%', // Make search bar full width
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16, // Add padding to the bottom for better spacing
  },
  categoryBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 12,
    marginVertical: 8, // Margin top and bottom for vertical layout
    marginHorizontal: 16, // Horizontal margin for alignment
    alignItems: 'center',
    justifyContent: 'center',
    height: 80, // Height of the category box
    width: '100%', // Full width for vertical layout
  },
  categoryText: {
    fontSize: 14, // Adjust font size for readability
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap', // Ensure long text wraps within the box
  },
});

export default MarketplaceScreen;
