import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tools = () => {
  const tools = [
    { title: "Weight Tracker", icon: "📊", screen: "WeightTracker" },
    { title: "Kick Counter", icon: "👣", screen: "KickCounter" },
    { title: "Baby Names", icon: "👶", screen: "BabyName" },
    { title: "Hospital Bag Checklist", icon: "🎒", screen: "HospitalBag" },
    { title: "Nutrition Guide", icon: "🍎", screen: "MealPlanScreen" },
    { title: "Exercise Guide", icon: "🏃", screen: "Exercise" },
  ];
  const navigation = useNavigation();

  const handleToolPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {tools.map((tool, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handleToolPress(tool.screen)}
        >
          <Text style={styles.icon}>{tool.icon}</Text>
          <Text style={styles.title}>{tool.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 20,
  },
  card: {
    width: "48%",
    height: 150,
    borderRadius: 8,
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
