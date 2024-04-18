// TopicInfo.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopicInfo = ({ topic }) => {
  return (
    <View style={styles.topicContainer}>
      <Text style={styles.topicTitle}>{topic.topic}</Text>
      <Text style={styles.topicDescription}>{topic.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topicContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 16,
    color: "gray",
  },
});

export default TopicInfo;
