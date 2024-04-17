import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card } from "react-native-paper";

const {width, height} = Dimensions.get('screen');

const Tools = () => {
  const tools = [
    { title: "Weight Tracker", icon: "📊", screen: "WeightTracker" },
    { title: "Baby Names", icon: "👶", screen: "BabyName" },
    { title: "Baby Products", icon: "🎒", screen: "HospitalBag" },
    { title: "Nutrition Guide", icon: "🍎", screen: "MealPlanScreen" },
    { title: "Exercise Guide", icon: "🏃", screen: "Exercise" },
    { title: "Symptom Tracker", icon: "🤒", screen: "SymptomTracker"},
  ];
  const navigation = useNavigation();

  const handleToolPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
    <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 10,
        }}
      >Tools</Text>
      <View style={styles.content}>
      {tools.map((tool, index) => (
        <Card
          key={index}
          mode="outlined"
          style={styles.card}
          onPress={() => handleToolPress(tool.screen)}
        >
          <Text style={styles.icon}>{tool.icon}</Text>
          <Text style={styles.title}>{tool.title}</Text>
        </Card>
      ))}
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 150,
    borderRadius: 8,
    border : "2px solid #000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default Tools;
