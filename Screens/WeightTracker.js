import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import WeightGraph from "../components/WeightGraph";

const WeightTracker = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState("");
  const [weightEntries, setWeightEntries] = useState([]);
  const [showPreviousWeightInput, setShowPreviousWeightInput] = useState(true);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  useEffect(() => {
    loadWeightEntries();
  }, []);

  useEffect(() => {
    setPage(0); // Reset page to 0 whenever weightEntries change
  }, [weightEntries]);

  const loadWeightEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem("weightEntries");
      if (storedEntries !== null) {
        setWeightEntries(JSON.parse(storedEntries));
        setShowPreviousWeightInput(false);
      }
    } catch (error) {
      console.error("Error loading weight entries:", error);
    }
  };

  const saveWeightEntry = async () => {
    try {
      const newEntry = { weight, date: new Date().toISOString() };
      const updatedEntries = [...weightEntries, newEntry];
      await AsyncStorage.setItem(
        "weightEntries",
        JSON.stringify(updatedEntries)
      );
      setWeightEntries(updatedEntries);
      setWeight("");
      setShowPreviousWeightInput(false);
    } catch (error) {
      console.error("Error saving weight entry:", error);
    }
  };

  const renderPreviousWeightInput = () => {
    if (showPreviousWeightInput) {
      return (
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

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, weightEntries.length);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <Text style={styles.chartTitle}>Weight Tracker</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>Weight</DataTable.Title>
        </DataTable.Header>
        {weightEntries.slice(from, to).map((item) => (
          <DataTable.Row key={item.date}>
            <DataTable.Cell>{item.date}</DataTable.Cell>
            <DataTable.Cell numeric>{item.weight}</DataTable.Cell>
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
        selectPageDropdownLabel={"Rows per page"}
      />
      {renderPreviousWeightInput()}
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <IconButton icon="send" onPress={saveWeightEntry} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
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
    paddingHorizontal: 10,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default WeightTracker;
