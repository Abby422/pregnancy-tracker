import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from "react-native-date-picker";

const Calendar = () => {
  return (
    <View>
       <DatePicker date={date} onDateChange={setDate} />
    </View>
  );
}

export default Calendar

const styles = StyleSheet.create({})