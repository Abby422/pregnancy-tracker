import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, MD3Colors, Button } from "react-native-paper";

const DateCalculator = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Icon source="calendar" color={MD3Colors.primary99} size={200} />
        <Text style={styles.headerText}>Due Date Calculator</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.contentText}>
          Enter the first day of your last period to calculate your due date
        </Text>
        <Text style={styles.contentText}>First Day of Last Period</Text>
      </View>
      <Button>
        <Text>Calculate</Text>
      </Button>
    </View>
  );
};

export default DateCalculator;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: MD3Colors.grey50,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: MD3Colors.grey900,
  },
  contentText: {
    fontSize: 16,
    color: MD3Colors.grey900,
  },
});
