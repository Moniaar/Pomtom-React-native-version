import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatbotIcon() {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name="chatbubble-outline" size={50} color="white" />
      <Text style={styles.text}>Chatbot</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: { position: 'absolute', bottom: 30, right: 20, alignItems: 'center' },
  text: { fontSize: 14, color: 'white', marginTop: 5 },
});
