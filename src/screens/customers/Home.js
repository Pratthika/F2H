// src/screens/Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import { Menu, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Voice from '@react-native-community/voice';
import * as Speech from 'expo-speech';

const posts = [
    {
      id: '1',
      productName: 'Fresh Tomatoes',
      price: '$10/kg',
      owner: 'John Doe',
      location: 'Farmville',
      contact: '+1234567890',
      image: 'https://via.placeholder.com/100',
      status: 'Available', // New status field
    },
    {
      id: '2',
      productName: 'Organic Carrots',
      price: '$8/kg',
      owner: 'Jane Smith',
      location: 'Veggie Town',
      contact: '+0987654321',
      image: 'https://via.placeholder.com/100',
      status: 'Yet to harvest', // New status field
    },
    {
      id: '3',
      productName: 'Green Lettuce',
      price: '$12/kg',
      owner: 'Alice Johnson',
      location: 'Leafy Greens',
      contact: '+1122334455',
      image: 'https://via.placeholder.com/100',
      status: 'Available',
    },
    {
      id: '4',
      productName: 'Sweet Corn',
      price: '$7/kg',
      owner: 'Bob Williams',
      location: 'Cornfield',
      contact: '+2233445566',
      image: 'https://via.placeholder.com/100',
      status: 'Yet to harvest',
    },
    {
      id: '5',
      productName: 'Juicy Apples',
      price: '$15/kg',
      owner: 'Sarah Brown',
      location: 'Apple Orchard',
      contact: '+3344556677',
      image: 'https://via.placeholder.com/100',
      status: 'Available',
    },
    {
      id: '6',
      productName: 'Cucumbers',
      price: '$5/kg',
      owner: 'Tom Green',
      location: 'Veggie Patch',
      contact: '+4455667788',
      image: 'https://via.placeholder.com/100',
      status: 'Yet to harvest',
    },
  ];  

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Price');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event) => setSearchQuery(event.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // Change to desired language code if needed
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleProductPress = (post) => {
    navigation.navigate('ProductDetails', { product: post });
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>{t('Farm2Home')}</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Icon name="notifications" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing} onPress={() => navigation.navigate('Call')}>
              <Icon name="call" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing} onPress={() => navigation.navigate('Message')}>
              <Icon name="message" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder={t('Search')}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.micIconContainer}
              onPress={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
            >
              <Icon name={isListening ? 'mic-off' : 'mic'} size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Menu
  visible={visible}
  onDismiss={closeMenu}
  anchor={
    <TouchableOpacity onPress={openMenu} style={styles.filterButton}>
      <Text>{selectedFilter}</Text>
    </TouchableOpacity>
  }
>
  <Menu.Item onPress={() => { setSelectedFilter(t('Price')); closeMenu(); }} title={t('Price')} />
  <Menu.Item onPress={() => { setSelectedFilter(t('Harvest Date')); closeMenu(); }} title={t('Harvest Date')} /> 
  <Menu.Item onPress={() => { setSelectedFilter(t('Top Rated Farmers')); closeMenu(); }} title={t('Top Rated Farmers')} /> 
</Menu>
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Farmers' Location Label */}
          <Text style={styles.sectionTitle}>{t('Farmer Location')}</Text>

          {/* Map Section */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 13.0827, // Latitude of Chennai
                longitude: 80.2707, // Longitude of Chennai
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={{ latitude: 13.0827, longitude: 80.2707 }} title="Farmer's Name" />
            </MapView>
          </View>

          {/* Available Products Label */}
          <Text style={styles.sectionTitle}>{t('Available Products')}</Text>

          {/* Posts Section */}
          <View style={styles.postsContainer}>
            {posts
              .filter(post => post.productName.toLowerCase().includes(searchQuery.toLowerCase()))
              .slice(0, 6)
              .map((post) => (
                <TouchableOpacity key={post.id} onPress={() => handleProductPress(post)}>
                  <View style={styles.post}>
                    <View style={styles.postContent}>
                      <Image source={{ uri: post.image }} style={styles.postImage} />
                      <View style={styles.postDetails}>
                        <Text style={styles.productName}>{t('productName.' + post.productName)}</Text>
                        <Text style={styles.detailText}>{t('Price')}: {post.price}</Text>
                        <Text style={styles.detailText}>{t('owner.' + post.owner)}</Text>
                        <Text style={styles.detailText}>{t('location.' + post.location)}</Text>
                        <Text style={styles.detailText}>{t('Contact')}: {post.contact}</Text>
                        <Text style={[styles.detailText, { color: post.status === 'Available' ? 'green' : 'orange' }]}>
                          {t('status.' + post.status)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Icon name="home" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Forum')}>
            <Icon name="group" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="account-circle" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSpacing: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingRight: 40, // Make space for the mic icon
  },
  micIconContainer: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  filterButton: {
    marginLeft: 16,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  post: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  postContent: {
    flexDirection: 'row',
    width: '100%',
  },
  postImage: {
    width: 120,
    height: 130,
    borderRadius: 5,
    marginRight: 16,
  },
  postDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    backgroundColor: '#fff',
  },
});


export default HomeScreen;