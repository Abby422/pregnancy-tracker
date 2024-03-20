import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Line } from "react-native-svg";

const WeightGraph = ({ data, width, height }) => {
  // Get the maximum and minimum dates from the data
  const minDate = new Date(data[0].date);
  const maxDate = new Date(data[data.length - 1].date);

  // Calculate the number of milliseconds between the minimum and maximum dates
  const dateRange = maxDate - minDate;

  // Map the dates to x-coordinates within the graph width
  const points = data.map((entry) => ({
    x: ((new Date(entry.date) - minDate) / dateRange) * width,
    y: height - (entry.weight * height) / getMaxWeight(data),
  }));

  const path = `M ${points
    .map((point) => `${point.x},${point.y}`)
    .join(" L ")}`;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Line
          x1="0"
          y1="0"
          x2={width}
          y2="0"
          stroke="#333" // X-axis color
          strokeWidth="1"
        />
        <Line
          x1="0"
          y1="0"
          x2="0"
          y2={height}
          stroke="#333" // Y-axis color
          strokeWidth="1"
        />
        <Path
          d={path}
          fill="none"
          stroke="#007bff" // Graph line color
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

// Helper function to get the maximum weight from data
const getMaxWeight = (data) => {
  return Math.max(...data.map((entry) => entry.weight));
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeightGraph;
