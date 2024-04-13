import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import OpenAI from "openai";

const MealPlanScreen = () => {
  const openai = new OpenAI({
    apiKey: "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",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [mealType, setMealType] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const generateMealPlan = async (dietaryRestrictions, allergy, mealTime) => {
    try {
      const outputFormat = {
        mealName: "Meal Name",
        ingredients: "Ingredient\n ...",
        preparationInstructions:
          "Preparation Instructions. \n1.\n \n 2. \n ...",
        nutritionBenefit: " \n calories: 100, \n protein: 10g, ...",
      };

      const prompt = `Generate a kenyan commonly paired meal plan for me with ingredients locally found in Kenya. I am looking for a healthy ${mealTime} meal that is ${dietaryRestrictions} and ${allergy}. The meal should be healthy and easy to prepare. The output should be in the following format: ${JSON.stringify(
        outputFormat
      )}`;
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      const mealPlan = completion.choices[0].message.content;

      console.log(`Prediction: ${completion.choices[0].message.content}`);
      setMealPlan(JSON.parse(mealPlan));
      showModal();
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
  const dietaryPreferencesOptions = [
    "Vegan",
    "Vegetarian",
    "Low-Carb",
    "Keto",
    "Paleo",
    "Pescatarian",
    "Mediterranean",
    "Whole30",
    "Flexitarian",
  ];
  const allergiesOptions = [
    "Gluten-Free",
    "Lactose Intolerant",
    "Nut Allergy",
    "Shellfish Allergy",
    "Soy Allergy",
    "Egg Allergy",
  ];
  const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack"];

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
              onPress={() =>
                toggleOption(option, dietaryPreferences, setDietaryPreferences)
              }
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
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              position: "relative",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
              >
                <IconButton icon="close" size={30} onPress={hideModal} />
              </View>
              <View style={styles.cardContainer}>
                <Text variant="headlineMedium">{mealPlan.mealName}</Text>
                <Text variant="headlineSmall" style={styles.headline}>
                  Ingredients
                </Text>
                <Text>{mealPlan.ingredients}</Text>
                <Text variant="headlineSmall" style={styles.headline}>
                  Preparation Instructions
                </Text>
                <Text>{mealPlan.preparationInstructions}</Text>
                <Text variant="headlineSmall" style={styles.headline}>
                  Nutrition Benefit
                </Text>
                <Text style={{ paddingBottom: 10 }}>
                  {mealPlan.nutritionBenefit}
                </Text>
              </View>
              <View
                style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
              >
                <IconButton
                  icon="content-save"
                  size={30}
                  onPress={() => {
                    console.log("Meal Plan Saved");
                  }}
                />
              </View>
            </ScrollView>
          </Modal>
        </Portal>
      )}

      <Button
        mode="contained"
        style={styles.generateButton}
        onPress={() =>
          generateMealPlan(dietaryPreferences, allergies, mealType)
        }
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
    padding: 12,
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
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  headline: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default MealPlanScreen;
