// Loader.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <View style={styles.loader}>
      <Text>No posts here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
