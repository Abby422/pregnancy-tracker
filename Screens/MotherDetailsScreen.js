import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { pregnancyData } from "../lib/pregnancy";
import { Divider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MotherDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const { image, heading, text } = pregnancyData.find(
    (week) => week.id === id
  ).mother;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <Text style={styles.articleDetailTitle}>{heading}</Text>
      <View style={styles.content}>
        <Image
          source={{ uri: image }}
          style={styles.articleDetailImage}
          resizeMode="cover"
        />
        <Divider style={styles.divider} />
        <Text style={styles.articleDetailText}>{text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  content: {
    marginTop: 15,
  },
  articleDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  articleDetailImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: "#CCCCCC",
  },
  articleDetailText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
  },
});

export default MotherDetailsScreen;
