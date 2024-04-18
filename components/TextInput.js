// TextInput.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const TextInputComponent = React.forwardRef(
  ({ onSubmitEditing, ...props }, ref) => {
    const [text, setText] = React.useState("");

    const handleTextChange = (text) => {
      setText(text);
    };

    return (
      <View style={[styles.containerText, props.style]}>
        <TextInput
          {...props}
          style={styles.input}
          ref={ref}
          value={text}
          onChangeText={handleTextChange}
          onSubmitEditing={() => {
            onSubmitEditing(text);
            setText("");
          }}
        />
        <View style={styles.iconContainer}>
          <IconButton
            icon="send"
            onPress={() => {
              onSubmitEditing(text);
              setText("");
            }}
            style={styles.icon}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  input: {
    borderRightColor: "#fff",
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default TextInputComponent;
