import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from '../Services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const auth = getAuth(FIREBASE_APP);

  const handleLogout = async () => {
    try {
      await auth.signOut();

      navigation.navigate("OnBoarding");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Profile Information
      </Text>

      <View style={{ marginVertical: 10 }}>
        <Text>Name: John Doe</Text>
        <Text>Email: john@doe.com </Text>
      </View>
      <Button mode="outlined" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#FFFFFF", // Customize the button text color
    fontWeight: "bold",
  },
});

export default Profile