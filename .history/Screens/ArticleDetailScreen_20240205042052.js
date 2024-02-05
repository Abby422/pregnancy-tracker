import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { pregnancyData } from "../lib/pregnancy";
import { Divider } from "react-native-paper";

const ArticleDetailScreen = ({ route }) => {
  const { id } = route.params;
  // const [articleContent, setArticleContent] = useState("");

  const data = pregnancyData.find((week) => week.id === id);
  const Baby = data.Baby;
  console.log("data", Baby);

  return (
    <View style={styles.container}>
      <Text style={styles.articleDetailTitle}>{Baby.Heading}</Text>
      <View>
        <Text>{Baby.Reviewed}</Text>
        <Text>{Baby.Written}</Text>
        <Divider />
        <Text>{Baby.subHeading}</Text>
        <Text>{Baby.text}</Text>
      </View>
    </View>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  articleDetailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
