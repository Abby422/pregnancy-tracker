import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Divider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getPregnancyInfo } from "../Services/fireStore";

const MotherDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [mother, setMotherData] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const motherInfo = await getPregnancyInfo(id.toString());
        setMotherData(motherInfo.mother);
      } catch (err) {
        console.error("Error fetching pregnancy data:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
