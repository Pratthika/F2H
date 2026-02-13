import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

// List of videos with language and title
const videos = [
  { url: 'https://www.youtube.com/watch?v=lznReft-QLE', language: 'ta', title: 'Tamil Video 1' },
  { url: 'https://www.youtube.com/watch?v=WaCZcpTmNps', language: 'ta', title: 'Tamil Video 2' },
  { url: 'https://www.youtube.com/watch?v=xFqecEtdGZ0', language: 'en', title: 'English Video 1' },
  { url: 'https://www.youtube.com/watch?v=_tijHjup-gM', language: 'en', title: 'English Video 2' },
  { url: 'https://www.youtube.com/watch?v=Al3pcVDdvwk', language: 'en', title: 'English Video 3' },
  { url: 'https://www.youtube.com/watch?v=wuC9h-xnYi8', language: 'te', title: 'Telugu Video 1' },
  { url: 'https://www.youtube.com/watch?v=Uj1H0WX7hiQ', language: 'te', title: 'Telugu Video 2' },
  { url: 'https://www.youtube.com/watch?v=wougJaN_Ha0', language: 'hi', title: 'Hindi Video 1' },
  { url: 'https://www.youtube.com/watch?v=fvXDpr8KNuo', language: 'hi', title: 'Hindi Video 2' },
  { url: 'https://www.youtube.com/watch?v=uwovIIbFMYQ', language: 'as', title: 'Assamese Video 1' },
  { url: 'https://www.youtube.com/watch?v=T_bUnqMz__U', language: 'as', title: 'Assamese Video 2' },
  { url: 'https://www.youtube.com/watch?v=gavBhEjkBYs', language: 'mr', title: 'Marathi Video 1' },
  { url: 'https://www.youtube.com/watch?v=PpyUQ3I5qUA', language: 'mr', title: 'Marathi Video 2' },
  { url: 'https://www.youtube.com/watch?v=FnJokCF_Cx0', language: 'od', title: 'Odia Video 1' },
  { url: 'https://www.youtube.com/watch?v=0u3QBFxJX-o', language: 'od', title: 'Odia Video 2' },
  { url: 'https://www.youtube.com/watch?v=xBB4lIaSdzs', language: 'pa', title: 'Punjabi Video 1' },
  { url: 'https://www.youtube.com/watch?v=P9azabW3YQw', language: 'be', title: 'Bengali Video 1' },
  { url: 'https://www.youtube.com/watch?v=C_ssahuUFgc', language: 'be', title: 'Bengali Video 2' },
  { url: 'https://www.youtube.com/watch?v=N7lG-Ly6iys', language: 'ml', title: 'Malayalam Video 1' },
  { url: 'https://www.youtube.com/watch?v=0Ibnp2M5jBo', language: 'ml', title: 'Malayalam Video 2' },
  { url: 'https://www.youtube.com/watch?v=JFwFsJilKgQ', language: 'kn', title: 'Kannada Video 1' },
  { url: 'https://www.youtube.com/watch?v=veNxGeADoKk', language: 'kn', title: 'Kannada Video 2' },
  { url: 'https://www.youtube.com/watch?v=wjA3zfKGdk0', language: 'gu', title: 'Gujarati Video 1' },
  { url: 'https://www.youtube.com/watch?v=-QfVTCkPNKU', language: 'gu', title: 'Gujarati Video 2' },
  { url: 'https://www.youtube.com/watch?v=GR5pcdZIvAg', language: 'ur', title: 'Urdu Video 1' },
  { url: 'https://www.youtube.com/watch?v=66WcfpCTTE0', language: 'ur', title: 'Urdu Video 2' },
];

// Helper to get the YouTube thumbnail URL
const getYouTubeThumbnail = (url) => {
  const videoId = url.split('v=')[1];
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};

const LearnExploreScreen = () => {
  const { language } = useLanguage();

  // Filter videos based on the selected language
  const filteredVideos = videos.filter(video => video.language === language);

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoItem}>
      <Image source={{ uri: getYouTubeThumbnail(item.url) }} style={styles.thumbnail} />
      <Text style={styles.videoTitle}></Text>
      <TouchableOpacity style={styles.watchButton} onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.watchButtonText}>Watch</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredVideos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.url}
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
  videoItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  watchButton: {
    backgroundColor: '#FF6F61',
    padding: 8,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LearnExploreScreen;
