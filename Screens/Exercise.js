import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  Card,
  Button,
  IconButton,
  Text,
  Menu,
  TextInput,
  Modal,
  Portal,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import OpenAI from "openai";

const Exercise = () => {
  const openai = new OpenAI({
    apiKey: "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",
  });

  const [exercisePlan, setExercisePlan] = useState(null);
  const [trimester, setTrimester] = useState("");
  const [bodyIssues, setBodyIssues] = useState([]);
  const [disabilityValue, setDisabilityValue] = useState("");
  const [painDescription, setPainDescription] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabilityTextInputVisible, setDisabilityTextInputVisible] =
    useState(false);
  const navigation = useNavigation();

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const generateExercisePlan = async () => {
    try {
      const outputFormat = {
        Exercise1: {
          ExerciseName: "Exercise Name",
          Repetitions: 10,
          Sets: 3,
          Duration: "Duration",
          Description: "Description of how to do the exercise",
          Benefits: "Benefits of doing the exercise",
        },
      };

      const prompt = `Generate a tailored exercise plan with multiple exercises for a pregnant woman in her ${trimester} trimester. She reports ${bodyIssues}. She describes her pain as ${painDescription}. The output should be in the following format: ${JSON.stringify(
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

      const generatedExercisePlan = completion.choices[0].message.content;
      console.log(`Prediction: ${completion.choices[0].message.content}`);
      setExercisePlan(generatedExercisePlan);
      showModal();
    } catch (error) {
      console.error("Error generating exercise plan:", error);
    }
  };

  const displayExercisePlan = () => {
    if (!exercisePlan) return null;

    const jsonExercisePlan = JSON.parse(exercisePlan);

    return (
      <View style={styles.cardContainer}>
        {Object.keys(jsonExercisePlan).map((exerciseNumber) => (
          <Card key={exerciseNumber} style={styles.card}>
            <Text variant="titleMedium">
              {jsonExercisePlan[exerciseNumber].ExerciseName}
            </Text>
            <Text variant="bodyLarge">
              Repetitions: {jsonExercisePlan[exerciseNumber].Repetitions}
            </Text>
            <Text variant="bodyLarge">
              Sets: {jsonExercisePlan[exerciseNumber].Sets}
            </Text>
            <Text variant="bodyMedium">
              Duration: {jsonExercisePlan[exerciseNumber].Duration}
            </Text>
            <Text variant="bodyLarge">Description</Text>
            <Text>{jsonExercisePlan[exerciseNumber].Description}</Text>
            <Text variant="bodyLarge">Benefits</Text>
            <Text> {jsonExercisePlan[exerciseNumber].Benefits}</Text>
          </Card>
        ))}
      </View>
    );
  };

  const selectTrimester = (option) => {
    setTrimester(option);
  };

  const selectDisabilityValue = (option) => {
    setDisabilityValue(option);
    if (option === "Yes") {
      setDisabilityTextInputVisible(true);
    } else {
      setDisabilityTextInputVisible(false);
    }
  };

  const trimesterOptions = [
    "First Trimester",
    "Second Trimester",
    "Third Trimester",
  ];

  const disabilityValueOption = ["Yes", "No"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text variant="labelLarge">Trimester options:</Text>
        <View style={styles.trimesterContainer}>
          {trimesterOptions.map((option) => (
            <Button
              key={option}
              mode={trimester === option ? "contained" : "outlined"}
              onPress={() => selectTrimester(option)}
              style={styles.trimesterButton}
            >
              {option}
            </Button>
          ))}
        </View>

        <Text variant="labelLarge">Disability:</Text>
        <View style={styles.trimesterContainer}>
          {disabilityValueOption.map((option) => (
            <Button
              key={option}
              mode={disabilityValue === option ? "contained" : "outlined"}
              onPress={() => selectDisabilityValue(option)}
              style={styles.trimesterButton}
            >
              {option}
            </Button>
          ))}
        </View>

        {disabilityTextInputVisible && (
          <TextInput
            mode="outlined"
            label="Disability Description"
            value={bodyIssues}
            onChangeText={setBodyIssues}
            style={styles.input}
          />
        )}

        <TextInput
          mode="outlined"
          label="Preferences"
          value={bodyIssues}
          onChangeText={setBodyIssues}
          style={styles.input}
        />
        <TextInput
          label="Condition"
          mode="outlined"
          value={painDescription}
          onChangeText={setPainDescription}
          style={styles.input}
        />
      </View>

      {exercisePlan && (
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContent}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
              >
                <IconButton icon="close" size={30} onPress={hideModal} />
              </View>
              {displayExercisePlan()}
            </ScrollView>
          </Modal>
        </Portal>
      )}
      <Button
        mode="contained"
        style={styles.generateButton}
        onPress={generateExercisePlan}
      >
        Generate Exercise Plan
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
  card: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    marginTop: 50,
    marginHorizontal: 10,
  },
  generateButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  input: {
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "purple",
  },
  trimesterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  trimesterButton: {
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Exercise;
