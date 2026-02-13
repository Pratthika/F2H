import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from './supabaseClient'; // Ensure the path is correct
import { Picker } from '@react-native-picker/picker'; // Import Picker

const Registration = ({ navigation }) => { // Add navigation prop
  const [name, setName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('Farmer'); // Default to farmer
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
  
    const { error } = await supabase.from('users').insert([
      {
        name,
        mobile: phoneNumber, // Correctly refer to the mobile column
        aadhar: aadharNumber, // Refer to the aadhar column correctly
        category,
        password, // Note: Store hashed password in production
        language: 'en' // Add a default or selected language
      },
    ]);
  
    if (error) {
      Alert.alert('Registration failed', error.message);
      return;
    }
  
    Alert.alert('Registration successful!');
    // Clear input fields after successful registration
    setName('');
    setAadharNumber('');
    setPhoneNumber('');
    setCategory('farmer');
    setPassword('');
    setConfirmPassword('');
    
    navigation.navigate('Login'); // Navigate to Login page after successful registration
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChangeText={setAadharNumber}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Farmer" value="Farmer" />
        <Picker.Item label="Customer" value="Customer" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginPrompt}>
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 12,
  },
  loginPrompt: {
    marginTop: 12,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Registration;
