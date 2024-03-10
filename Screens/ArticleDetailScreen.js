import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { pregnancyData } from "../lib/pregnancy";
import { Divider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const ArticleDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const data = pregnancyData.find((week) => week.id === id);
  const Baby = data.Baby;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <Text style={styles.articleDetailTitle}>{Baby.Heading}</Text>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: Baby.image }}
          style={styles.articleDetailImage}
          resizeMode="cover"
        />
        <Text style={styles.reviewedText}>{Baby.Reviewed}</Text>
        <Text style={styles.writtenText}>{Baby.Written}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subHeading}>{Baby.subHeading}</Text>
        <Text style={styles.bodyText}>{Baby.text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  contentContainer: {
    marginTop: 10,
  },
  articleDetailImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  articleDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  reviewedText: {
    fontSize: 16,
    color: "#555555",
  },
  writtenText: {
    fontSize: 16,
    color: "#555555",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "#CCCCCC",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  bodyText: {
    fontSize: 16,
    color: "#555555",
  },
});

export default ArticleDetailScreen;
