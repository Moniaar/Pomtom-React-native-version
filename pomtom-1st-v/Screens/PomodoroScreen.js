import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ImageBackground, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timer from '../components/Timer';
import { Image } from 'expo-image';

export default function PomodoroScreen() {
  const [time, setTime] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const glowAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const glowStyle = {
    shadowColor: '#66442b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.9],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 15],
    }),
  };

  return (
    <Image 
      source={require("../assets/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer, styles.overlay]}>
        <TouchableOpacity style={styles.darkModeToggle} onPress={() => setDarkMode(!darkMode)}>
          <Ionicons
            name={darkMode ? "sunny-outline" : "moon-outline"}
            size={30}
            color={darkMode ? "lightblue" : "white"}
          />
        </TouchableOpacity>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>How many minutes would you like to start the journey with?</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={inputMinutes}
                onChangeText={setInputMinutes}
                placeholder="Enter minutes"
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                const newTime = parseInt(inputMinutes, 10);
                if (!isNaN(newTime) && newTime > 0) {
                  setTime(newTime * 60);
                }
                setInputMinutes('');
                setModalVisible(false);
              }}>
                <Text style={styles.buttonText}>Set Timer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={[styles.timerButton, glowStyle]} onPress={() => setModalVisible(true)}>
          <Text style={styles.timerText}>Set Timer</Text>
        </TouchableOpacity>
        <Timer time={time} isPaused={isPaused} />
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsPaused(!isPaused)}>
          <Text style={styles.controlText}>{isPaused ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>
      </View>
    </Image>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lightContainer: { backgroundColor: '#1C00ff00' },
  darkContainer: { backgroundColor: 'rgba(18, 20, 20, 0.8)' },
  timerButton: { padding: 20, backgroundColor: '#bd8153', borderRadius: 10, top: 70 },
  timerText: { color: 'white', fontSize: 18 },
  controlButton: { position: 'absolute', bottom: 180, padding: 20, backgroundColor: '#9c673e', borderRadius: 10, color: 'white'},
  controlText: { color: 'white', fontSize: 18 },
  darkModeToggle: { position: 'absolute', top: 50, right: 20 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#ba7947', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center', color: 'white'},
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', borderRadius: 5, marginBottom: 20, fontSize: 16 },
  modalButton: { padding: 15, backgroundColor: 'teal', borderRadius: 10 },
  buttonText: { color: 'white', fontSize: 16 },
});