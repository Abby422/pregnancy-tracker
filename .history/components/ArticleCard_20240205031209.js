import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ArticleCard = ({ Heading, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{Heading}</Text>
    <Text style={styles.readMore}>Read More</Text>
  </TouchableOpacity>
);
export default ArticleCard

const styles = StyleSheet.create({})