import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FProfile = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Text>{t('Back')}</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>John Doe</Text>

        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('Mobile Number')}:</Text>
            <Text style={styles.detailValue}>+1234567890</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('Age')}:</Text>
            <Text style={styles.detailValue}>30</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('Address')}:</Text>
            <Text style={styles.detailValue}>123 Main St, Farmville</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('Verified Status')}:</Text>
            <Text style={styles.detailValue}>{t('Verified')}</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('Aadhar Number')}:</Text>
            <Text style={styles.detailValue}>1234 5678 9012</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('State')}:</Text>
            <Text style={styles.detailValue}>Farmstate</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('Village')}:</Text>
            <Text style={styles.detailValue}>Farmville</Text>
          </View>
        </View>

        <View style={styles.boxContainer}>
        <TouchableOpacity 
            style={styles.box}
            onPress={() => navigation.navigate('PurchaseHistory')}
          >
            <Text style={styles.boxText}>{t('Purchase History')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.boxText}>{t('Contact Us')}</Text>
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    alignItems: 'flex-start', // Left alignment
  },
  boxText: {
    fontSize: 18,
  },
});

export default FProfile;
