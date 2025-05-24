import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';

export default function TaskTracker() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <ImageBackground 
      source={require('../assets/bg.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Task Tracker</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add Task" onPress={addTask} color="#262a30" 
          style={styles.addtaskbutton} />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} onDelete={deleteTask} />}
        />
      </View>
    </ImageBackground>
  );
}

const TaskItem = ({ task, onDelete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start with opacity 0
  const slideAnim = useRef(new Animated.Value(50)).current; // Start below

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleDelete = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
      onDelete(task.id);
    });
  };

  return (
    <Animated.View style={[styles.taskItem, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.taskText}>{task.text}</Text>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#1C00ff00' }, // Slight transparency for visibility
  header: { fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', margintop: 100, marginTop: 30 },
  input: { borderWidth: 1, padding: 10, marginTop: 100, borderRadius: 5, backgroundColor: 'white'},
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginVertical: 5, backgroundColor: '#262a30', borderRadius: 5},
  taskText: { fontSize: 16, color: 'white'},
  addtaskbutton: { backgroundColor: 'purple'},
  deleteButton: { backgroundColor: '#525254', padding: 5, borderRadius: 5 },
  deleteText: { color: 'white', fontSize: 14 },
});