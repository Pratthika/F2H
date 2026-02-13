// src/screens/RoleSelection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')} // Navigate to customer interface
      >
        <Text style={styles.buttonText}>I'm a Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StateScreen')} // Navigate to farmer interface
      >
        <Text style={styles.buttonText}>I'm a Farmer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    margin: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RoleSelectionScreen;
