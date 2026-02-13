import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsive design

const subcategories = [
  'Learn & Explore',
  'Schemes',
];

const SubCategoryScreen = ({ navigation }) => {
  const handleSubCategoryPress = (subCategory) => {
    if (subCategory === 'Learn & Explore') {
      // Navigate to the LearnExplore page
      navigation.navigate('Learn');
    } else if (subCategory === 'Schemes') {
      // Navigate to SchemesScreen
      navigation.navigate('SchemesScreen');
    } else {
      // Navigate to CategoryScreen for other subcategories
      navigation.navigate('CategoryScreen', { category: subCategory });
    }
  };

  const renderSubCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.subCategoryBox} 
      onPress={() => handleSubCategoryPress(item)} // Navigate on press
    >
      <Text style={styles.subCategoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subcategories}
        renderItem={renderSubCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Number of columns in the grid
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
  subCategoryBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80, // Height of the subcategory box
    width: (width - 48) / 2, // Adjust width based on screen width and margins
  },
  subCategoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubCategoryScreen;
