import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, Button, Card, Text } from "react-native-paper";
import Calendar from "../components/Calendar";
import * as React from "react";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const OnBoarding = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome! 🥳</Text>
        <Card>
          <Card.Content>
            <Text variant="bodyMedium" style={styles.contentText}>
              Choose your due date to personalize your experience
            </Text>

            <Calendar />
          </Card.Content>
          <Card.Actions>
            <Button
              style={{
                backgroundColor: "#FF69B4",
                width: 100,
                alignSelf: "center",
              }}
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              Ok
            </Button>
          </Card.Actions>
        </Card>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("dateCalculator")}>
        <Text>I don't know my due date</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    margin: 10,
  },
});
