import { StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "react-native-paper";

const Calendar = () => {
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
    <SafeAreaView>
      <Button onPress={showDatepicker} mode="contained">
        Choose your Due Date
      </Button>
      <Text
        variant="bodyMedium"
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
          margin: 10,
        }}
      >
     
        {date.getMonth.toLocaleString()}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
