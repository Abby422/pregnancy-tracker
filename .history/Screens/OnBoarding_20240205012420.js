import { StyleSheet, TouchableOpacity, View } from "react-native";
import {   MD3Colors, Avatar, Button, Card, Text } from "react-native-paper";
import Calendar from "../components/Calendar";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome! 🥳</Text>
        <Card theme={{ colors: { primary: "#f0e6f7" } }}>
          <Card.Content>
            <Text variant="bodyMedium" style={styles.contentText}>
              Choose your due date to personalize your experience
            </Text>
          </Card.Content>
          <Card.Actions>
            <Calendar
              style={{
                flex: 1,
                width: 10,
                alignSelf: "center",
              }}
            />
            
          </Card.Actions>
        </Card>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("dateCalculator")}>
        <Text
          style={{
            fontWeight: "200",
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
            textAlign: "center",
            margin: 10,
          }}
        >
          I don't know my due date
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          variant="titleLarge"
          style={{
            fontWeight: "600",
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
            textAlign: "center",
            margin: 10,
          }}
        >
          LOG IN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: MD3Colors.grey50, // Light Purple
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10, 
  },
});
