import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';

const FProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [harvestDate, setHarvestDate] = useState(product.harvestDate);
  const [status, setStatus] = useState(product.status);
  const [total, setTotal] = useState(product.total.toString());
  const [sold, setSold] = useState(product.bought.toString());

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => {
            // Handle deletion logic here
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleSave = () => {
    // Handle save logic here
    Alert.alert("Product Updated", "The product details have been updated.");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.title}>Product Details</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Product Name"
      />
      <TextInput
        style={styles.input}
        value={harvestDate}
        onChangeText={setHarvestDate}
        placeholder="Harvest Date"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Available" value="Available" />
          <Picker.Item label="Yet to be Harvested" value="Yet to be Harvested" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={total}
        onChangeText={setTotal}
        placeholder="Total Amount"
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={sold}
        onChangeText={setSold}
        placeholder="Amount Sold"
      />
      <View style={styles.buttonsContainer}>
        <Button title="Save Changes" onPress={handleSave} color="#4CAF50" />
        <Button title="Delete Product" onPress={handleDelete} color="#F44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 48,
  },
  buttonsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 24,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default FProductDetailScreen;
