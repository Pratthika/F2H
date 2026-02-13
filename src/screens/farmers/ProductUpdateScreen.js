import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';  // For dropdown
import { useTranslation } from 'react-i18next'; // For i18n translation
import '../../i18n'; // Adjusted import for the correct path
import DateTimePicker from '@react-native-community/datetimepicker'; // Date picker

export default function ProductUpdateScreen({ navigation }) {
  const { t } = useTranslation(); // Use translation hook
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [harvestDate, setHarvestDate] = useState(new Date());

  // Log marketplace state changes to track updates

  // Image Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Date Change Handler
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || harvestDate;
    setShowDatePicker(false);
    setHarvestDate(currentDate);
  };

  const handleUpdatePress = () => {
    if (marketplace) {
      alert(t('product_saved'));
    } else {
      alert(t('select_marketplace'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Where do you want to update your product?')}</Text>

      {/* Marketplace Selection */}
      <View style={styles.marketplaceContainer}>
        <TouchableHighlight 
          style={[styles.marketplaceButton, marketplace === 'consumer' && styles.selectedButton]} 
          onPress={() => setMarketplace('consumer')}
          underlayColor="#DDDDDD"
        >
          <Text style={[styles.buttonText, marketplace === 'consumer' && styles.selectedButtonText]}>{t('Consumer MarketPlace')}</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={[styles.marketplaceButton, marketplace === 'farmer' && styles.selectedButton]} 
          onPress={() => setMarketplace('farmer')}
          underlayColor="#DDDDDD"
        >
          <Text style={[styles.buttonText, marketplace === 'farmer' && styles.selectedButtonText]}>{t('Farmer\nMarketPlace')}</Text>
        </TouchableHighlight>
      </View>

      {/* Conditional rendering based on marketplace selection */}
      {marketplace === 'consumer' && (
        <>
          {/* Status Dropdown */}
          <Text style={styles.label}>{t('Status')}</Text>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label={t('Available')} value="available" />
            <Picker.Item label={t('Yet to Harvest')} value="yet_to_harvest" />
          </Picker>

          {/* Harvest Date Picker */}
          <Text style={styles.label}>{t('Harvest Date')}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text style={styles.datePickerText}>{harvestDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={harvestDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </>
      )}

      {marketplace === 'farmer' && (
        <>
          {/* Category Dropdown */}
          <Text style={styles.label}>{t('Category')}</Text>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label={t('Seeds and Plants')} value="seeds_and_plants" />
            <Picker.Item label={t('Fertilizers and Soil Amendments')} value="fertilizers_and_soil" />
            <Picker.Item label={t('Pesticides and Herbicides')} value="pesticides_and_herbicides" />
            <Picker.Item label={t('Tools and Equipment')} value="tools_and_equipment" />
            <Picker.Item label={t('Protective Gear')} value="protective_gear" />
            <Picker.Item label={t('Irrigation Supplies')} value="irrigation_supplies" />
            <Picker.Item label={t('Animal Feed and Supplies')} value="animal_feed" />
            <Picker.Item label={t('Farm Infrastructure')} value="farm_infrastructure" />
            <Picker.Item label={t('Maintenance and Repair Materials')} value="maintenance_and_repair" />
          </Picker>
        </>
      )}

      {/* Product Title */}
      <Text style={styles.label}>{t('Product Title')}</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder={t('Enter_Product_Title')}
      />
      
      {/* Price */}
      <Text style={styles.label}>{marketplace === 'farmer' ? t('Price') : t('Price Per kg')}</Text>
      <TextInput 
        style={styles.input} 
        value={price} 
        onChangeText={setPrice} 
        placeholder={marketplace === 'farmer' ? t('Enter Price') : t('Enter_Price_Per_kg')}
        keyboardType="numeric"
      />
      
      {/* Image Picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>{t('Pick Image')}</Text>
      </TouchableOpacity>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title={t('Cancel')} color="#FF6F61" onPress={() => navigation.goBack()} />
        <Button title={t('Save')} color="#4CAF50" onPress={handleUpdatePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  marketplaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  marketplaceButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    elevation: 3,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  picker: {
    height: 50,
    borderColor: '#CCC',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  datePicker: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
});
