import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {IconButton, Button, Text} from "react-native-paper"
import TodoItem from "../components/TodoItem";
import { useNavigation } from "@react-navigation/native";
import { addShoppingListItem, deleteShoppingListItem } from "../Services/fireStore";


const HospitalBag = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Baby's clothes", completed: true },
    { id: 2, text: "Crib", completed: false },
  ]);
  const [text, setText] = useState("");

  const addTask = async () => {
    if (text.trim() !== "") {
      const newTask = { id: Date.now(), text, completed: false };
      const response = await addShoppingListItem(newTask);
      if (!response) {
        Alert.alert("Error", "Failed to add item", [{ text: "OK" }]);
        return;
      } else {
        Alert.alert("Success", "Item added successfully", [{ text: "OK" }]);
      }
      setTasks([...tasks, newTask]);
      setText("");
    }
    if (text.trim() === "") {
      Alert.alert("Error", "Please enter an item", [{ text: "OK" }]);
    }
  };

  const deleteTask =  (id) => {
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
      <View style={{alignItems: "center"}}> 
        <Text variant="headlineSmall">Baby Shopping List</Text>
      </View>
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
