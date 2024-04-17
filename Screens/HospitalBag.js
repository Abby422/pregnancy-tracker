import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {IconButton, Button} from "react-native-paper"
import TodoItem from "../components/TodoItem";
import { useNavigation } from "@react-navigation/native";


const HospitalBag = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Doctor Appointment", completed: true },
    { id: 2, text: "Meeting at School", completed: false },
  ]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim() !== "") {
      const newTask = { id: Date.now(), text, completed: false };
      setTasks([...tasks, newTask]);
      setText("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <FlatList
        style={styles.taskList}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            style={styles.taskItem}
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="New Item"
          autoCapitalize="sentences"
        />
        <Button mode="contained" onPress={addTask}>Add</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  taskList: {
    marginBottom: 20,
  },
  taskItem: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default HospitalBag;
