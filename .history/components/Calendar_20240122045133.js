import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <View>
      <DateTimePicker
        value={date}
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate);
        }}
        is24Hour="true"
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
