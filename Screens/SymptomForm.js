import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import {
  TextInput,
  Text,
  Button,
  Switch,
  IconButton,
  Surface,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { postSymptoms } from "../Services/fireStore";

const auth = getAuth(FIREBASE_APP);
const {width} = Dimensions.get("window");

const SymptomForm = () => {
  const [title, setTitle] = useState("");
  const [feeling, setFeeling] = useState("");
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState("");
  const [reminderDay, setReminderDay] = useState("");
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    console.log(userId, "userId");
  }, [userId]);

  const handleSave = async () => {
    try {
      if (title.trim() === "" || feeling.trim() === "") {
        Alert.alert("Error", "Please enter a title and how you're feeling.");
        return;
      }

      const symptomEntry = {
        title: title.trim(),
        feeling: feeling.trim(),
        reminder: reminder,
        reminderTime: reminderTime,
        reminderDay: reminderDay,
        userId: userId,
      };

      const response = await postSymptoms(symptomEntry);
      if (response) {
        Alert.alert("Success", "Symptom entry saved successfully.");
        setTitle("");
        setFeeling("");
        setReminder(false);
        setReminderTime("");
        setReminderDay("");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save symptom entry.");
    }
  };

  const handleReminderToggle = () => {
    setReminder(!reminder);
  };

  const handleReminderTimeChange = (time) => {
    setReminderTime(time);
  };

  const handleReminderDayChange = (day) => {
    setReminderDay(day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconButton icon="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Surface
        style={{ elevation: 5, borderRadius: 10, padding: 10, margin: 10 }}
      >
        <Text variant="labelLarge">Symptoms Tracker</Text>
        <Text variant="bodyLarge">
          Track your symptoms and how you're feeling. You can opt to set a
          reminder as well to share the symptoms with your doctor.
        </Text>
      </Surface>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label="Title"
            width={width - 100}
            mode="outlined"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            label="Symptom"
            placeholder="How are you feeling?"
            mode="outlined"
            value={feeling}
            multiline={true}
            onChangeText={setFeeling}
          />
        </View>
        <View style={styles.reminderContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text style={styles.reminderText}>Remind me</Text>
            <Switch value={reminder} onValueChange={handleReminderToggle} />
          </View>
          {reminder && (
            <View style={styles.reminderDetails}>
              <Picker
                selectedValue={reminderTime}
                onValueChange={handleReminderTimeChange}
              >
                <Picker.Item label="Select Time" value="" />
                <Picker.Item label="9 AM" value="9:00" />
                <Picker.Item label="12 PM" value="12:00" />
                <Picker.Item label="3 PM" value="15:00" />
                <Picker.Item label="6 PM" value="18:00" />
              </Picker>
              <Picker
                selectedValue={reminderDay}
                onValueChange={handleReminderDayChange}
              >
                <Picker.Item label="Select Day" value="" />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" mode="outlined" onPress={handleSave}>
            Save
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  reminderContainer: {
    width: width - 100,
    marginBottom: 20,
  },
  reminderText: {
    fontSize: 16,
  },
  reminderDetails: {
    marginTop: 10,
  },
  buttonContainer: {
    width: width / 2,
    marginTop: 20,
  },
});

export default SymptomForm;
