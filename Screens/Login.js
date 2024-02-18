import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../Services/firebaseAuth";
import { MD3Colors, Button } from "react-native-paper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
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

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const user = await signIn(trimmedEmail, trimmedPassword);
      if (user) {
        navigation.navigate("Main");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found, try again");
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
        <Image
          source={require("../assets/Images/cute-baby.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to PTracker</Text>

        <TextInput
          placeholder="Email"
          autoFocus
          name="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={{ type: "material", name: "email" }}
        />
        <TextInput
          placeholder="Password"
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
              mode="contained"
              onPress={() => handleLogin()}
            >
              LOGIN
            </Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3Colors.grey50, // Light Purple
  },
  innerContainer: {
    width: "100%",
    maxWidth: 300,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
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
