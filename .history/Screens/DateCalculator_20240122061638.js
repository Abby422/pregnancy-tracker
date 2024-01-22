import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Icon,
  IconButton,
  MD3Colors,
  TextInput,
  Button,
  List,
  Divider,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";


const DateCalculator = () => {
  const [method, setMethod] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [cycleExpanded, setCycleExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  const handleCyclePress = () => setCycleExpanded(!cycleExpanded); 
   const [date, setDate] = useState(new Date(1598051730000));
   const [mode, setMode] = useState("date");
   const [show, setShow] = useState(false);

   const onChange = (event, selectedDate) => {
     const currentDate = selectedDate;
     setShow(false);
     setDate(currentDate);
   };

   const showMode = (currentMode) => {
     setShow(true);
     setMode(currentMode);
   };

   const showDatepicker = () => {
     showMode("date");
   };
  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Icon source="calendar" color={MD3Colors.primary60} size={200} />
        <Text style={styles.headerText}>Due Date Calculator</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>Method</Text>
        <List.Accordion
          style={styles.accordion}
          left={(props) => <List.Icon {...props} />}
          expanded={expanded}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </View>
      <Divider />
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>First day of last period</Text>
        <IconButton
          icon="calendar"
          iconColor={MD3Colors.primary30}
          size={20}
          onPress={showDatepicker}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>Cyle Length:</Text>
        <List.Accordion
          style={styles.accordion}
          left={(props) => <List.Icon {...props} />}
          expanded={cycleExpanded}
          onPress={handleCyclePress}
        >
          <List.Item title="20" />
          <List.Item title="40" />
        </List.Accordion>
      </View>
      <Divider />
      <Divider />
      <Button
        style={{
          backgroundColor: "#FF69B4",
          width: 200,
          marginTop: 10,
          alignSelf: "center",
        }}
        mode="outlined"
        onPress={() => console.log("Pressed")}
      >
        Calculate
      </Button>
    </View>
  );
};

export default DateCalculator;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: MD3Colors.grey50,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: MD3Colors.grey900,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  accordion: {
    width: "100%",
    marginLeft: 20,
  },
});
