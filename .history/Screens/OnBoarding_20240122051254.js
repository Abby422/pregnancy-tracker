import { StyleSheet, View } from "react-native";
import {Appbar, Avatar, Button, Card, Text } from "react-native-paper";
import Calendar from "../components/Calendar";
import * as React from "react";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const OnBoarding = () => {
  return (
    <View>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
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
              icon="calendar"
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
      </View>
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
