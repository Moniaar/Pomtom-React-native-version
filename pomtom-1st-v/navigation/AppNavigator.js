import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import PomodoroScreen from '../Screens/PomodoroScreen';
import ChatbotScreen from '../Screens/ChatbotScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define light and dark themes
  const LightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#66442b', // Custom light mode background color
    },
  };

  const currentTheme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <NavigationContainer theme={currentTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: isDarkMode ? '#9c673e' : '#66442b' }, // Dynamically set tab bar color
        }}>
        <Tab.Screen 
          name="Pomodoro" 
          component={PomodoroScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="timer-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Tasks" 
          component={ChatbotScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}