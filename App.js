import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Register from "./Screens/Register";
import Home from "./Screens/Home";
import { FIREBASE_APP } from './Services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

const auth = getAuth(FIREBASE_APP);
const screenOptionStyle = {
  headerShown: false,
};


    const MainStack = () => {
      return (
        <Stack.Navigator
          screenOptions={screenOptionStyle}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      );
    };

 
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const screenOptionStyle = {
    headerShown: false,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
      if (initializing) setInitializing(false);
    });
    }, []);



  // if (initializing) {
  //   () => {
  //     return(
  //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </View>
  //     );
  //   };
  // }




  return (
    <NavigationContainer>
      <Stack.Navigator>
      {user ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

