import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, MD3Colors, Button, List, Separator } from "react-native-paper";

const DateCalculator = () => {
  const [method, setMethod] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Icon source="calendar" color={MD3Colors.primary60} size={200} />
        <Text style={styles.headerText}>Due Date Calculator</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>Method</Text>
          <List.Accordion
            style={styles.accordion}
            left={(props) => <List.Icon {...props} />}
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
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
    width: "100%",
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
