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
      // Sign out the user using Firebase
      await auth.signOut();

      // Navigate to the login screen
      navigation.navigate("OnBoarding");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Your profile content goes here */}
      <Text>Profile Information</Text>

      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF0000", // Customize the button color
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#FFFFFF", // Customize the button text color
    fontWeight: "bold",
  },
});

export default Profile