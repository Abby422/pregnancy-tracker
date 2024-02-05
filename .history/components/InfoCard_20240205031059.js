import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InfoCard = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);


export default InfoCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
  },
});