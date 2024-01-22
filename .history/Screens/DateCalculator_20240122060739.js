import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Icon,
  IconButton,
  MD3Colors,
  TextInput,
  Button,
  List,
  Divider,
} from "react-native-paper";

const DateCalculator = () => {
  const [method, setMethod] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

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
      <Divider />
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>First day of last period</Text>
        <IconButton
          icon="calendar"
          iconColor={MD3Colors.primary30}
          size={20}
          onPress={showDatePicker}
        />
      </View>
      <Divider />
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
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: MD3Colors.grey900,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  accordion: {
    width: "100%",
    marginLeft: 20,
  },
});
