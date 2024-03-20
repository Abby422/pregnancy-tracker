import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getPregnancyInfo } from "../Services/fireStore";


const ArticleDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [pregnancyData, setPregnancyData] = React.useState({});

  React.useEffect(() => {
    getPregnancyData(id);
  }, []);

  const getPregnancyData = async (week) => {
    try {
      const babyInfo = await getPregnancyInfo(week.toString());
      setPregnancyData(babyInfo.Baby);
    } catch (err) {
      console.error("Error fetching pregnancy data:", err);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <Text style={styles.articleDetailTitle}>{pregnancyData.Heading}</Text>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: pregnancyData.image }}
          style={styles.articleDetailImage}
          resizeMode="cover"
        />
        <Text style={styles.reviewedText}>{pregnancyData.Reviewed}</Text>
        <Text style={styles.writtenText}>{pregnancyData.Written}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subHeading}>{pregnancyData.subHeading}</Text>
        <Text style={styles.bodyText}>{pregnancyData.text}</Text>
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
