import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getPregnancyInfo } from "../Services/fireStore";

const MotherDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();

    const [mother, setMotherData] = React.useState({});
    
    React.useEffect(() => {
      getPregnancyData(id);
    }, []);
    
    const getPregnancyData = async (week) => {
      try {
        const motherInfo = await getPregnancyInfo(week.toString());
        setMotherData(motherInfo.mother);
        console.log(motherInfo);
      } catch (err) {
        console.error("Error fetching pregnancy data:", err);
      }
    };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <Text style={styles.articleDetailTitle}>{mother.heading}</Text>
      <View style={styles.content}>
        <Image
          source={{ uri: mother.image }}
          style={styles.articleDetailImage}
          resizeMode="cover"
        />
        <Divider style={styles.divider} />
        <Text style={styles.articleDetailText}>{mother.text}</Text>
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
