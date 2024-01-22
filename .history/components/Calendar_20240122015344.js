import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarPicker from "react-native-calendar-picker";

const Calendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : "";

  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={onDateChange} />

      <View>
        <Text>SELECTED DATE:{startDate}</Text>
      </View>
    </View>
  );
}

export default Calendar

const styles = StyleSheet.create({})