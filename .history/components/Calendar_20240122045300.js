import { Button, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const Calendar = () => {
const [date, setDate] = useState(new Date(1598051730000));

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  setDate(currentDate);
};

const showMode = (currentMode) => {
  DateTimePickerAndroid.open({
    value: date,
    onChange,
    mode: currentMode,
    is24Hour: true,
  });
};

const showDatepicker = () => {
  showMode("date");
};

const showTimepicker = () => {
  showMode("time");
};
  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
