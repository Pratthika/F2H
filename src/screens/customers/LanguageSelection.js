// src/screens/LanguageSelectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18next';

const LanguageSelectionScreen = () => {
  const navigation = useNavigation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      <TouchableOpacity style={styles.singleButton} onPress={() => handleLanguageChange('en')}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('ta')}>
          <Text style={styles.buttonText}>தமிழ்</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('hi')}>
          <Text style={styles.buttonText}>हिन्दी</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('bn')}>
          <Text style={styles.buttonText}>বাংলা</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('te')}>
          <Text style={styles.buttonText}>తెలుగు</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('mr')}>
          <Text style={styles.buttonText}>मराठी</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('gu')}>
          <Text style={styles.buttonText}>ગુજરાતી</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('ur')}>
          <Text style={styles.buttonText}>اردو</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('kn')}>
          <Text style={styles.buttonText}>ಕನ್ನಡ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('ml')}>
          <Text style={styles.buttonText}>മലയാളം</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('or')}>
          <Text style={styles.buttonText}>ଓଡ଼ିଆ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('pa')}>
          <Text style={styles.buttonText}>ਪੰਜਾਬੀ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('as')}>
          <Text style={styles.buttonText}>অসমীয়া</Text>
        </TouchableOpacity>
      </View>
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
  singleButton: {
    width: 130,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 100,
    height: 100,
    margin: 8,
    backgroundColor: '#f0f0f0',
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

export default LanguageSelectionScreen;
