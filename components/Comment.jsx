// Comment.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const Comment = ({ comment }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph>{comment.content}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
});

export default Comment;
