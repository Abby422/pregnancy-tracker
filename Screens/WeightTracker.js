import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import WeightGraph from "../components/WeightGraph";
import { LineChart } from "react-native-chart-kit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Services/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(FIREBASE_APP);
const WeightTracker = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(0);
  const [weightEntries, setWeightEntries] = useState([]);
  const [showPreviousWeightInput, setShowPreviousWeightInput] = useState(true);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  useEffect(() => {
    setPage(0);
    calculateBMI();
  }, [weightEntries, userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    console.log(userId, "userId");

    loadWeightEntries();
  }, []);
  const loadWeightEntries = async () => {
    try {
      if (userId) {
        // Load data from Firebase based on the userId
        const weightRef = collection(db, "weightEntries");
        const q = query(weightRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const entries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWeightEntries(entries);
        setShowPreviousWeightInput(false);
      } else {
        const storedEntries = await AsyncStorage.getItem(
          `weightEntries_${userId}`
        );
        if (storedEntries !== null) {
          setWeightEntries(JSON.parse(storedEntries));
          setShowPreviousWeightInput(false);
        }
      }
    } catch (error) {
      console.error("Error loading weight entries:", error);
    }
  };
  const saveWeightEntry = async () => {
    try {
      if (weight === "" || height === "") {
        alert("Please enter weight and height");
        return;
      }

      const calculatedBmi = calculateBMI();

      const newEntry = {
        weight: parseFloat(weight),
        height: parseFloat(height),
        bmi: parseFloat(calculatedBmi),
        userId: userId,
        date: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "weightEntries"), newEntry);
      setWeightEntries([...weightEntries, { id: docRef.id, ...newEntry }]);

      // Save to AsyncStorage
      const storedEntries = await AsyncStorage.getItem(
        `weightEntries_${userId}`
      );
      let updatedEntries = [];
      if (storedEntries !== null) {
        updatedEntries = JSON.parse(storedEntries);
      }
      updatedEntries.push(newEntry);
      await AsyncStorage.setItem(
        `weightEntries_${userId}`,
        JSON.stringify(updatedEntries)
      );

      setWeight("");
      setHeight("");
      setShowPreviousWeightInput(false);
    } catch (error) {
      console.error("Error saving weight entry:", error);
    }
  };

  const renderPreviousWeightInput = () => {
    if (showPreviousWeightInput) {
      return (
        <KeyboardAvoidingView>
          <View style={styles.previousWeightContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter previous weight (optional)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Button title="Save" onPress={saveWeightEntry} />
          </View>
        </KeyboardAvoidingView>
      );
    }
    return null;
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setPage(0); // Reset page to 0 when items per page changes
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date to a human-readable format
  };

  const getDayFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDay();
    return day;
  };
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, weightEntries.length);

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInMeter = parseFloat(height) / 100;

    if (weightInKg && heightInMeter) {
      const calculatedBMI = (
        weightInKg /
        (heightInMeter * heightInMeter)
      ).toFixed(2);
      setBmi(calculatedBMI); // Set the calculated BMI value
      return calculatedBMI;
    } else {
      setBmi(""); // Clear BMI value if weight or height is invalid
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconButton icon="arrow-left" size={30} iconColor="#000" />
        </TouchableOpacity>
        <Text style={styles.chartTitle}>Weight Tracker</Text>
      </View>
      {weightEntries.length > 0 ? (
        <LineChart
          data={{
            datasets: [
              {
                data: weightEntries.map((entry) => entry.weight),
              },
            ],
          }}
          width={400}
          height={220}
          yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#000",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : null}

      <View style={styles.content}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Weight (kg)</DataTable.Title>
            <DataTable.Title numeric>BMI</DataTable.Title>
          </DataTable.Header>
          {weightEntries.slice(from, to).map((item) => (
            <DataTable.Row key={item.date}>
              <DataTable.Cell>{formatDate(item.date)}</DataTable.Cell>
              <DataTable.Cell numeric>{item.weight}</DataTable.Cell>
              <DataTable.Cell numeric>{item.bmi}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(weightEntries.length / itemsPerPage)}
          onPageChange={handlePageChange}
          label={`${from + 1}-${to} of ${weightEntries.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel="Rows per page"
        />
        {renderPreviousWeightInput()}
      </View>
      <View style={styles.bmiContainer}>
        <Text>BMI: {bmi}</Text>
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter height in cm"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <IconButton icon="send" onPress={saveWeightEntry} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  content: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  previousWeightContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bmiContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeightTracker;
