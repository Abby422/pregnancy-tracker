import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card, Button, IconButton, Text, Menu } from "react-native-paper";
import { CohereClient } from "cohere-ai";

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const cohere = new CohereClient({
    token: "xNGsvKUT6rean2FliNUswGxLWLAxI2QfKbsnJCW3", // This is your trial API key
  });

  const generateMealPlan = () => {
    // Simulate fetching a meal plan based on dietary restrictions
    const generatedMealPlan = async () => {
      const response = await cohere.generate({
        model: "command",
        prompt:
          "The following is an AI meal planner agent for pregnant women. The AI is responsible for recommending a meal plan based on the user's specified mealtime, dietary restrictions, and preferred cuisine/country. It should refrain from asking users for personal information. The AI uses data from the Nutritionix database for the food and  nutrition values.\n\nCustomer: \"I'm pregnant and looking for a Kenyan-inspired meal recommendation for Lunch, considering my dietary restrictions which are lactose intolerant and require iron rich foods\"\nAgent: Please provide meal options with their corresponding nutritional value per serving. With the output in a json format with meal title, ingredients, preparation and nutritional value of the meals\n",
        maxTokens: 300,
        temperature: 1,
        k: 0,
        stopSequences: [],
        returnLikelihoods: "NONE",
      });
      console.log(`Prediction: ${response.generations[0].text}`);
    };
    console.log(generatedMealPlan())
    // setMealPlan(generatedMealPlan());
  };

  const renderMealPlanCard = (day, mealType, meal) => (
    <Card key={`${day}-${mealType}`} style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{`${day} - ${mealType}`}</Text>
        <Text>{meal}</Text>
      </Card.Content>
    </Card>
  );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const selectDietaryOption = (option) => {
    console.log(option);
    setDietaryRestrictions(option);
    closeMenu();
  };

  const dietaryOptions = [
    "Vegan",
    "Vegetarian",
    "Gluten-Free",
    "Low-Carb",
    "No Restrictions",
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
            width: "100%",
          }}
        >
          <Text variant="labelLarge">Dietary restrictions:</Text>
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
                  {dietaryRestrictions || "Select Dietary Restrictions"}
                </Text>
              </Button>
            }
          >
            {dietaryOptions.map((option) => (
              <Menu.Item
                key={option}
                onPress={() => {
                  selectDietaryOption(option);
                }}
                title={option}
              />
            ))}
          </Menu>
        </View>
        <Button
          mode="contained"
          style={styles.generateButton}
          onPress={generateMealPlan}
        >
          Generate Meal Plan
        </Button>
      </View>

      {mealPlan && (
        <View style={styles.cardContainer}>
          {Object.keys(mealPlan).map((day) => (
            <View key={day}>
              {Object.keys(mealPlan[day]).map((mealType) =>
                renderMealPlanCard(day, mealType, mealPlan[day][mealType])
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

export default MealPlanScreen;
