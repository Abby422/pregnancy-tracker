import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from "react-native-date-picker";

const Calendar = () => {
    const[date, setDate ] = useState(new Date()) 
  return (
    <View>
       <DatePicker date={date} onDateChange={setDate} />
    </View>
  );
}

export default Calendar

const styles = StyleSheet.create({})