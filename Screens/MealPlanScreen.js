import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, IconButton, Menu, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import OpenAI from "openai";

const MealPlanScreen = () => {
  const openai = new OpenAI({
    apiKey: "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",
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [mealType, setMealType] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();


const generateMealPlan = async () => {
  try {
      const mealtimePlaceholder = "{MealType}";
      const dietaryRestrictionsPlaceholder = "{DietaryRestrictions}";

      let prompt = `The following is an AI meal planner agent for pregnant women. The AI is responsible for recommending a meal plan based on the user's specified mealtime, dietary restrictions, and preferred cuisine/country. It should refrain from asking users for personal information. The AI uses data from the Nutritionix database for the food and nutrition values.

Customer :\t "I'm pregnant and looking for a meal recommendation for ${mealtimePlaceholder}, considering my dietary restrictions and nutritional needs."

Agent: Please provide meal options with their corresponding nutritional value per serving. With the output in a json format with meal title, ingredients, preparation, and nutritional value of the meals

Mealtime Options: Breakfast, Lunch, Dinner, Snack

Dietary Restrictions:
${dietaryRestrictionsPlaceholder})}

Nutritional Needs:
- High in Iron
- Rich in Calcium
- Good Source of Protein
- High in Fiber
- Low in Sugar

For example:
Customer: "I'm pregnant and looking for a lunch recommendation, considering I'm lactose intolerant and need a meal high in iron."

Agent: 
{
  "meal_title": "Spinach and Lentil Salad",
  "ingredients": ["Spinach", "Lentils", "Tomatoes", "Cucumber", "Red Onion", "Feta Cheese", "Olive Oil", "Lemon Juice", "Salt", "Pepper"],
  "preparation": "1. Cook lentils in water until tender. 2. Combine cooked lentils with spinach, diced tomatoes, sliced cucumber, diced red onion, and crumbled feta cheese. 3. Drizzle olive oil and lemon juice over the salad. 4. Season with salt and pepper to taste.",
  "nutritional_value": {
    "calories": 320,
    "protein": 18,
    "carbohydrates": 32,
    "fat": 15,
    "fiber": 9,
    "iron": 6.2,
    "calcium": 120,
    "sugar": 5
  }
}`;
            const completion = await openai.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content:
                    "You are a helpful assistant designed to output JSON.",
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              model: "gpt-3.5-turbo",
              response_format: { type: "json_object" },
            });

      console.log(`Prediction: ${completion.choices[0].message.content}`);
      setMealPlan(completion.choices[0].message.content);

  } catch (error) {
    console.error("Error generating meal plan:", error);
  }
};

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

const toggleOption = (option, stateVariable, stateSetter) => {
  if (stateVariable.includes(option)) {
    stateSetter(stateVariable.filter((item) => item !== option));
  } else {
    stateSetter([...stateVariable, option]);
  }
};
  const dietaryPreferencesOptions = ["Vegan", "Vegetarian", "Low-Carb"];
  const allergiesOptions = ["Gluten-Free", "Lactose Intolerant"];
  const mealTypeOptions = ["Breakfast", "Lunch", "Dinner"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <IconButton icon="arrow-left" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text variant="labelLarge">Dietary Preferences:</Text>
        <View style={styles.menu}>
          {dietaryPreferencesOptions.map((option) => (
            <Button
              key={option}
              mode={
                dietaryPreferences.includes(option) ? "contained" : "outlined"
              }
              onPress={() => toggleOption(option, dietaryPreferences, setDietaryPreferences)}
              style={styles.optionButton}
            >
              {option}
            </Button>
          ))}
        </View>

        <Text variant="labelLarge">Allergies:</Text>
        <View style={styles.menu}>
          {allergiesOptions.map((option) => (
            <Button
              key={option}
              mode={allergies.includes(option) ? "contained" : "outlined"}
              onPress={() => toggleOption(option, allergies, setAllergies)}
              style={styles.optionButton}
            >
              {option}
            </Button>
          ))}
        </View>

        <Text variant="labelLarge">Meal Type:</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              onPress={openMenu}
              mode="outlined"
              style={styles.menuButton}
            >
              {mealType || "Select Meal Type"}
            </Button>
          }
        >
          {mealTypeOptions.map((option) => (
            <Menu.Item
              key={option}
              onPress={() => {
                setMealType(option);
                closeMenu();
              }}
              title={option}
            />
          ))}
        </Menu>
      </View>

      {mealPlan && (
        <View style={styles.cardContainer}>
          <Text>{mealPlan}</Text>
        </View>
      )}

      <Button
        mode="contained"
        style={styles.generateButton}
        onPress={generateMealPlan}
      >
        Generate Meal Plan
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 10,
  },
  cardContainer: {
    marginTop: 10,
  },
  content: {
    marginBottom: 20,
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  optionButton: {
    marginRight: 10,
    marginBottom: 10,
  },
  menuButton: {
    marginBottom: 10,
  },
  generateButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "purple",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default MealPlanScreen;
