import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { Button, MD3Colors, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { register } from "../Services/firebaseAuth";

function Register({route}) {
  const [uName, setuName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {dueDate} = route.params;


  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (email === "" || password === "") {
        alert("Email or Password cannot be empty");
        return;
      }
      const validEmail = email.includes("@");
      if (!validEmail) {
        alert("Please enter a valid email");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      // remove spaces from email
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      if (!dueDate) {
        alert("Please select your due date");
        return;
      }
      const user = await register(trimmedEmail, trimmedPassword, dueDate, uName);
      if (user) {
        navigation.navigate("Main");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("User already exists, try again");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
        <Text variant="headlineMedium" style={styles.upperText}>
          Welcome to PTracker
        </Text>
        <TextInput
          placeholder="Name"
          name="name"
          require
          style={styles.input}
          value={uName}
          onChangeText={(text) => setuName(text)}
          leftIcon={{ type: "material", name: "person" }}
        />
        <TextInput
          placeholder="Email"
          autoFocus
          require
          name="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={{ type: "material", name: "email" }}
        />
        <TextInput
          placeholder="Password"
          require
          secureTextEntry
          name="password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon={{ type: "material", name: "lock" }}
        />

        {loading ? (
          <Text>Loading</Text>
        ) : (
          <>
            <Button
              style={{
                width: 200,
                marginTop: 10,
              }}
              onPress={handleRegistration}
              title="Register"
              mode="contained"
            >
              Register
            </Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3Colors.grey50, 
  },
  upperText: {
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 300,
  },
  register: {
    marginTop: 10,
    color: "#9370db", // Medium Purple
  },
  input: {
    backgroundColor: "#ffffff", // Baby Blue
    width: 250,
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});
