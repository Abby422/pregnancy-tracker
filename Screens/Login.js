import React, {useState} from "react";
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