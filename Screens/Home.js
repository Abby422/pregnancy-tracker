import { View, Text, Button } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from '../Services/firebaseConfig';

function Home() {
  const auth = getAuth(FIREBASE_APP);
  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => {
        auth.signOut()
      }} />
    </View>
  )
} 

export default Home