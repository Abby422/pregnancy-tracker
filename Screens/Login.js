import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../Services/firebaseAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await signIn(email, password);
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
        <Text style={styles.title}>Welcome to Baby Tracker</Text>

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
              containerStyle={styles.button}
              onPress={handleLogin}
              title="Login"
            />
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.register}>New User? Register</Text>
            </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0e6f7", // Light Purple
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
  button: {
    backgroundColor: "#add8e6", // Baby Pink
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
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
