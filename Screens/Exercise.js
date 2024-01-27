import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card, Button, IconButton, Text, Menu } from "react-native-paper";

const Exercise = () => {
  const [exercisePlan, setExercisePlan] = useState(null);
  const [trimester, setTrimester] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const generateExercisePlan = () => {
    // Simulate fetching an exercise plan based on the trimester
    const generatedExercisePlan = {
        day1: {
            Morning: "Walk for 30 minutes",
            Afternoon: "Do 10 squats",
            Evening: "Do 10 pushups",
        },
        day2: {
            Morning: "Walk for 30 minutes",
            Afternoon: "Do 10 squats",
            Evening: "Do 10 pushups",
        },
        day3: {
            Morning: "Walk for 30 minutes",
            Afternoon: "Do 10 squats",
            Evening: "Do 10 pushups",
        },
    };
        setExercisePlan(generatedExercisePlan);
    };

  const renderExercisePlanCard = (day, exerciseType, exercise) => (
    <Card key={`${day}-${exerciseType}`} style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{`${day} - ${exerciseType}`}</Text>
        <Text>{exercise}</Text>
      </Card.Content>
    </Card>
  );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const selectTrimester = (option) => {
    console.log(option);
    setTrimester(option);
    closeMenu();
  };

  const trimesterOptions = [
    'First Trimester',
    'Second Trimester',
    'Third Trimester',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text variant="labelLarge">Trimester options:</Text>
          <Menu
            visible={visible}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            onDismiss={closeMenu}
            anchor={
              <Button
                onPress={openMenu}
                style={{ minWidth: "50%", backgroundColor: "purple" }}
              >
                <Text style={{ color: "#fff" }}>
                  {trimester || "Select Trimester"}
                </Text>
              </Button>
            }
          >
            {trimesterOptions.map((option) => (
              <Menu.Item
                key={option}
                onPress={() => {
                  selectTrimester(option);
                }}
                title={option}
              />
            ))}
          </Menu>
        </View>
        <Button
          mode="contained"
          style={styles.generateButton}
          onPress={generateExercisePlan}
        >
          Generate Exercise Plan
        </Button>
      </View>

      {exercisePlan && (
        <View style={styles.cardContainer}>
          {Object.keys(exercisePlan).map((day) => (
            <View key={day}>
              {Object.keys(exercisePlan[day]).map((exerciseType) =>
                renderExercisePlanCard(day, exerciseType, exercisePlan[day][exerciseType])
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginTop: 50,
    paddingTop: 50,
    margin: 10,
  },
  generateButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "purple",
    marginTop: 10,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default Exercise;
