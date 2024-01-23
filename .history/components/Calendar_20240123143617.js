import { StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "react-native-paper";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const getMaxDueDate = () => {
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 11;
    return currentDate;
   }

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
      <Button
        icon="calendar"
        onPress={showDatepicker}
        style={{
          backgroundColor: "#FF69B4",
          width: "auto",
          alignSelf: "center",
        }}
        mode="contained"
      >
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
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          minimumDate={new Date()}
          maximumDate={getMaxDueDate()}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
