import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {StateContext} from '../../context/StateContext'; // Adjusted import for the correct path


// List of states in India
const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const StateScreen = ({ navigation }) => {
  const { setState } = useContext(StateContext); // Use the State Context

  const handleStatePress = (state) => {
    setState(state); // Update the global state with the selected state
    navigation.navigate('FarmerHome'); // Navigate back to the previous screen
  };

  const renderStateItem = ({ item }) => (
    <TouchableOpacity style={styles.stateItem} onPress={() => handleStatePress(item)}>
      <Text style={styles.stateText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={states}
        renderItem={renderStateItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  stateItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stateText: {
    fontSize: 18,
  },
});

export default StateScreen;
