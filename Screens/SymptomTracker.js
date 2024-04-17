import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Text, IconButton, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getSymptoms } from "../Services/fireStore";

const auth = getAuth(FIREBASE_APP);
const { width, height } = Dimensions.get("window");

const SymptomsTracker = () => {
  const navigation = useNavigation();
  const [symptomEntry, setSymptomEntry] = useState([]); // [1]
  const [userId, setUserId] = useState("");

  const scrollView = React.createRef();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    handleLoad();
    console.log(userId, "userId");
  }, [userId]);

  useEffect(() => {
    scrollView.current.scrollToEnd({ animated: true }); 
  }, [symptomEntry]);

  const handleLoad = async () => {
    try {
      const response = await getSymptoms(userId);
      setSymptomEntry(response);
    } catch (error) {
      console.error("Error loading symptom entries:", error);
    }
  };

  const navigateToForm = () => {
    navigation.navigate("SymptomForm");
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconButton icon="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text variant="headlineSmall">Health Journal</Text>
      </View>
      <View style={styles.content}>
        <ScrollView ref={scrollView} showsVerticalScrollIndicator={false} >
          {symptomEntry.map((entry, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text>{entry.title}</Text>
                <Text>{entry.feeling}</Text>
                {entry.reminder && (
                  <Text>
                    Reminder Time: {entry.reminderTime}, Reminder Day:{" "}
                    {entry.reminderDay}
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
        <View>
          <Button mode="outlined" width={width / 2} onPress={navigateToForm}>
            {" "}
            New Entry
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  card: {
    marginBottom: 20,
    width: width - 60,
  },
  buttonContainer: {
    width: width / 2,
    marginTop: 20,
  },
});

export default SymptomsTracker;
