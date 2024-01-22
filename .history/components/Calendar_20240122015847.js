import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

const Calendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);
  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  const endDate = selectedEndDate ? selectedEndDate.toString() : "";

  const onDateChange = (date) => {
    console.log("onDateChange", date);
    setSelectedStartDate(date);
  };

  return (
    <View style={styles.container}>
      <Date/>
            
      />

      <View>
        <Text>SELECTED DATE:{startDate}</Text>
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
