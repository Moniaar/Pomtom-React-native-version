import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Modal, View, TouchableOpacity } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

export default function Timer({ time, isPaused }) {
  const [currentTime, setCurrentTime] = useState(time);
  const [isCompleted, setIsCompleted] = useState(false);

  const radius = 90; // Radius of the circle
  const strokeWidth = 7; // Width of the circle stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  useEffect(() => {
    setCurrentTime(time); // Update time if the prop changes
  }, [time]);

  useEffect(() => {
    if (!isPaused && currentTime > 0) {
      const interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime - 1 === 0) {
            setIsCompleted(true); // Show message when timer ends
          }
          return prevTime > 0 ? prevTime - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused, currentTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = (currentTime / time) * circumference; // Progress of the circle

  return (
    <>
      {/* Circular Timer */}
      <View style={styles.circleContainer}>
        <Svg height={2 * (radius + strokeWidth)} width={2 * (radius + strokeWidth)}>
          {/* Background Circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#ba7947"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Progress Circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#f7c9a6"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
      </View>

      {/* Completion Message Modal */}
      <Modal visible={isCompleted} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Well done!! 🎉</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCompleted(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 470, // Adjust to position the circle,
    paddingLeft: 3,
  },
  timerText: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },

  // Modal Styles
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' },
  modalContent: { backgroundColor: '#262a30', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalText: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 },
  closeButton: { padding: 15, backgroundColor: 'white', borderRadius: 10 },
  buttonText: { color: 'black', fontSize: 16 },
});
