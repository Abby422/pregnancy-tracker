import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ArticleCard = ({ Heading, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{Heading}</Text>
    <Text style={styles.readMore}>Read More</Text>
  </TouchableOpacity>
);
export default ArticleCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  readMore: {
    color: "blue",
  },
});