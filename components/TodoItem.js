import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox, IconButton } from "react-native-paper";

const TodoItem = ({ task, deleteTask, toggleCompleted }) => {
  return (
    <View style={styles.container}>
      <Checkbox
        status={task.completed ? "checked" : "unchecked"}
        onPress={() => toggleCompleted(task.id)}
        style={styles.checkbox}
      />
      <Text
        style={[
          styles.taskText,
          { textDecorationLine: task.completed ? "line-through" : "none" },
        ]}
      >
        {task.text}
      </Text>
      <TouchableOpacity
        onPress={() => deleteTask(task.id)}
      >
        <IconButton icon="delete" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  checkbox:{
    borderRadius: 5,
  }
});

export default TodoItem;
