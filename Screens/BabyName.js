import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { IconButton, Text, SegmentedButtons } from "react-native-paper";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getBabyBoyNames, getBabyGirlNames } from "../Services/fireStore";

const BabyName = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState("Girl");
  const [girlNames, setGirlNames] = React.useState([])
  const [boyNames, setBoyNames] = React.useState([])

  const babyGirlNames = async() => {
    try {
      const girlNameSuggestions = await getBabyGirlNames();
      setGirlNames(girlNameSuggestions);
    } catch (error) {
      console.log(error, "Error");
    }
  }
  const babyBoyNames = async() => {
    try {
      const boyNameSuggestions = await getBabyBoyNames();
      setBoyNames(boyNameSuggestions);
    } catch (error) {
      console.log(error, "Error");
    }
  }

  useEffect(() => {
    babyGirlNames();
    babyBoyNames();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconButton icon="arrow-left" size={30} iconColor="#000" />
        </TouchableOpacity>
        <Text variant="titleLarge">Baby Names</Text>
      </View>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={styles.segmentedButton}
        buttons={[
          {
            value: "Girl",
            label: "Girl Names",
          },
          {
            value: "Boy",
            label: "Boy Names",
          },
        ]}
      />
      <ScrollView>
        {value === "Girl"
          ? girlNames.map((name, index) => (
              <Text key={index}> {index + 1} . {name}</Text>
            ))
          : boyNames.map((name, index) => (
              <Text key={index}> {index + 1} . {name}</Text>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  segmentedButton: {
    marginTop: 20,
  },
  
});
export default BabyName;
