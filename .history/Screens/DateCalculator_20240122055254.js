import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, MD3Colors, Button } from "react-native-paper";
import { List } from "react-native-paper";

const DateCalculator = () => {
  const [method, setMethod] = React.useState("");
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Icon source="calendar" color={MD3Colors.primary60} size={200} />
        <Text style={styles.headerText}>Due Date Calculator</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>Method</Text>
        <List.AccordionGroup>
          <List.Accordion title="Accordion 1" id="1">
            <List.Item title="Item 1" />
          </List.Accordion>
          <List.Accordion title="Accordion 2" id="2">
            <List.Item title="Item 2" />
          </List.Accordion>
          <View>
            <Text>
              List.Accordion can be wrapped because implementation uses
              React.Context.
            </Text>
            <List.Accordion title="Accordion 3" id="3">
              <List.Item title="Item 3" />
            </List.Accordion>
          </View>
        </List.AccordionGroup>
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
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: MD3Colors.grey900,
  },
  contentText: {
    fontSize: 16,
    color: MD3Colors.grey900,
    marginRight: 10,
  },
  accordion: {
    width: "auto",
    marginLeft: 20,
  },
});
