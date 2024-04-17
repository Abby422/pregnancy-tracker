import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CustomCalendar(props) {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      initialDate={date}
      markedDates={{
        [date]: {
          selected: true,
          selectedColor: "blue",
          disableTouchEvent: true,
          selectedDotColor: "green",
          selectedDotSize: 10,
        },
      }}
      markingType="period"
      hideExtraDays={true}
      theme={{
        arrowColor: "blue",
        todayTextColor: "blue",
        selectedDayBackgroundColor: "lightblue",
        selectedDayTextColor: "white",
      }}
      firstDay={1}
      renderArrow={(direction) => <Arrow direction={direction} />}
    />
  );
}

function Arrow({ direction }) {
  return (
    <View
      style={{
        borderColor: "blue",
        borderWidth: 1,
        width: 8,
        height: 8,
        transform: [{ rotate: direction === "left" ? "45deg" : "-135deg" }],
      }}
    />
  );
}
