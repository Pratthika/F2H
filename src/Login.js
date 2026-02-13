import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Ensure the path is correct
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Login = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Fetch user data based on mobile number
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('mobile', mobile)
      .single();

    if (error || !userData) {
      Alert.alert('Login failed', 'User not found');
      return;
    }

    // Check if the password matches
    if (userData.password !== password) {
      Alert.alert('Login failed', 'Invalid password');
      return;
    }

    // Redirect based on the user's category
    if (userData.category === 'Farmer') {
      navigation.navigate('FarmerHome'); // Navigate to Farmer Home
    } else {
      navigation.navigate('Home'); // Navigate to Customer Home
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Mobile" 
        value={mobile} 
        onChangeText={setMobile} 
        style={styles.input} 
        keyboardType="phone-pad" 
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.registerPrompt}>
          New User? Register
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
  registerPrompt: {
    marginTop: 12,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Login;
