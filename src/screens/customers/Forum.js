import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

const ForumScreen = () => {
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([
    { id: '1', content: 'How to grow organic tomatoes?', image: null, replies: [] },
    { id: '2', content: 'Best fertilizers for leafy greens?', image: null, replies: [] },
  ]);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const { t } = useTranslation();

  const handleAskQuestion = () => {
    setIsQuestionVisible(true);
  };

  const handleSubmit = () => {
    if (questionText) {
      setPosts([...posts, { id: Date.now().toString(), content: questionText, image, replies: [] }]);
      setQuestionText('');
      setImage(null);
      setIsQuestionVisible(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: null,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleReplySubmit = (postId) => {
    if (replyText) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, replies: [...post.replies, replyText] } : post
        )
      );
      setReplyText('');
      setReplyingTo(null); // Close the reply input after submitting
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
        <Text style={styles.askButtonText}>{t('Create a Post or Ask a Question')}</Text>
      </TouchableOpacity>

      {isQuestionVisible && (
        <View style={styles.questionContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={t('Ask your question here...')}
              value={questionText}
              onChangeText={setQuestionText}
            />
            <TouchableOpacity style={styles.chooseFileButton} onPress={pickImage}>
              <Text style={styles.chooseFileButtonText}>📎</Text>
            </TouchableOpacity>
          </View>

          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('Submit')}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.recentPostsHeading}>{t('Recent Posts')}</Text>

      <ScrollView style={styles.postsContainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Text>{post.content}</Text>
            {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}

            {/* Display replies */}
            {post.replies.length > 0 && (
              <View style={styles.repliesContainer}>
                {post.replies.map((reply, index) => (
                  <Text key={index} style={styles.replyText}>
                    {reply}
                  </Text>
                ))}
              </View>
            )}

            {/* Reply button */}
            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => setReplyingTo(post.id)}
            >
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>

            {/* Reply input */}
            {replyingTo === post.id && (
              <View style={styles.replyInputContainer}>
                <TextInput
                  style={styles.replyInput}
                  placeholder={t("Type your reply...")}
                  value={replyText}
                  onChangeText={setReplyText}
                />
                <TouchableOpacity
                  style={styles.submitReplyButton} // Using the new style for reduced width
                  onPress={() => handleReplySubmit(post.id)}
                >
                  <Text style={styles.submitButtonText}>{t('Submit Reply')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  askButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
  },
  askButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    padding: 8,
  },
  chooseFileButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 8,
  },
  chooseFileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
  recentPostsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postsContainer: {
    flex: 1,
  },
  post: {
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
  },
  repliesContainer: {
    marginTop: 10,
  },
  replyText: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  replyButton: {
    marginTop: 10,
  },
  replyButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  submitReplyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 9,
    paddingHorizontal: 9, // Adjust horizontal padding for reduced width
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center', // Keeps it centered
    marginTop: 7,
    width: 130, // Set fixed width to reduce button size
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ForumScreen;
