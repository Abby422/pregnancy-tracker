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
        <Image
          source={{ uri: Baby.image }}
          style={styles.articleDetailImage}
          alt="baby_image"/>
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
  articleDetailImage: {
    width: Dimensions.get("screen").width,
    height: 200,
    marginBottom: 10,
  },
  articleDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
