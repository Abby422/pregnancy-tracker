import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { pregnancyData } from "../lib/pregnancy";
import { Divider } from "react-native-paper";

const MotherDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const { image, heading, text } = pregnancyData.find(
    (week) => week.id === id
  ).mother;

  return (
    <View style={styles.container}>
      <Text style={styles.articleDetailTitle}>{heading}</Text>
      <View>
        <Image
          source={{uri: image}}
          style={styles.articleDetailImage}
          alt="mother_image"
        />
        <Divider />
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default MotherDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  articleDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  articleDetailImage: {
    width: Dimensions.get("screen").width,
    height: 200,
    marginBottom: 10,
  },
  articleDetailText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
