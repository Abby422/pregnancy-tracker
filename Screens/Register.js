import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../Services/firebaseAuth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (email === "" || password === "") {
        alert("Email or Password cannot be empty");
        return;
      }
      const user = await register(email, password);
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
    <View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          placeholder="Email"
          autoFocus
          name="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={{ type: "material", name: "email" }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          name="password"
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
              onPress={handleRegistration}
              title="Register"
            />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.register}>Already a user? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  register: {
    marginTop: 10,
    color: "blue",
  },
});
