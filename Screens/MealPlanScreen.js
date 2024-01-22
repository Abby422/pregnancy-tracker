import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Button } from "react-native-paper";

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);

  const generateMealPlan = () => {
    const generatedMealPlan = async () => {
        const response = await fetch("http://localhost:3000/mealPlan", { method: 'POST',});
        const data = await response.json();
        console.log(data);
        return data;
        }
    setMealPlan(generatedMealPlan);
  };

  const renderMealPlanCard = (day, mealType, meal) => (
    <Card key={`${day}-${mealType}`} style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{`${day} - ${mealType}`}</Text>
        <Text>{meal}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Button
        style={{ marginTop: "15%", flex: 1, alignSelf: "flex-start", justifyContent: "flex-start" }}
        mode="contained"
        onPress={() => generateMealPlan()}
      >
        Generate Meal Plan
      </Button>

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
});

export default MealPlanScreen;
