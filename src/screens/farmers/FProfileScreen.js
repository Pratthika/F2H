import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import '../../i18n'; // Adjusted import for the correct path


const FProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Use translation hook

  // Sample profile data for a consumer
  const profileData = {
    'Mobile Number': '+1234567890',
    'Age': '28',
    'Address': '456 Elm St, Cityville',
    'Verified Status': 'Verified',
    'Email': 'consumer@example.com',
    'State': 'Stateland',
    'City': 'Cityville',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={styles.backButtonText}>{t('back')}</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Jane Doe</Text>

        <View style={styles.detailsBox}>
          {Object.entries(profileData).map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t(key)}:</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.boxContainer}>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => navigation.navigate('SalesHistory')} // Navigate to Sales History Screen
          >
            <Text style={styles.boxText}>{t('sales_history')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => navigation.navigate('ContactUsScreen')} // Navigate to Contact Us Screen
          >
            <Text style={styles.boxText}>{t('contact_us')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsBox: {
    width: '100%',
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  boxContainer: {
    width: '100%',
  },
  box: {
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center', // Center alignment for buttons
  },
  boxText: {
    fontSize: 18,
  },
});

export default FProfileScreen;
