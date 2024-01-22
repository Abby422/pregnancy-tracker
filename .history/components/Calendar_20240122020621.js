import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from "react-native-date-picker";

const Calendar = () => {
  return (
    <View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />{" "}
    </View>
  );
}

export default Calendar

const styles = StyleSheet.create({})