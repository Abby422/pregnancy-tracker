import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from "react-native-calendar-picker";

const Calendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
      console.log("onDateChange", date);
    setSelectedStartDate(date);
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : "";

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
      />

      <View>
        <Text>SELECTED DATE:{startDate}</Text>
      </View>
    </View>
  );
}

export default Calendar

const styles = StyleSheet.create({})