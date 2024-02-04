import { StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Calendar = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const getMaxDueDate = () => {
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 11);
    return currentDate;
   }

  const onChange = (event) => {
   
    const currentDate = event.nativeEvent.timestamp ? new Date(event.nativeEvent.timestamp) : date;
    
    console.log(currentDate.toString());    // navigate to register with the due date
    // setDate(currentDate);
    // navigation.navigate("Register", { dueDate: currentDate });

  };


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: 10,
        alignSelf: "center",
      }}
    >
      <Button
        icon="calendar"
        onPress={showDatepicker}
        style={{
          width: "auto",
          alignSelf: "center",
          marginBottom: 10,
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
