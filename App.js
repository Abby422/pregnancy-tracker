import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Register from "./Screens/Register";
import Home from "./Screens/Home";
import OnlineCommunity from "./Screens/OnlineCommunity";
import { ArticleDetailScreen } from './Screens/Home';
import { FIREBASE_APP } from './Services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoarding from './Screens/OnBoarding';
import DateCalculator from './Screens/DateCalculator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const auth = getAuth(FIREBASE_APP);
const screenOptionStyle = {
  headerShown: false,
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



  if (initializing) {
    () => {
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    };
  }


    const MainStack = () => {
      return (
        <Tab.Navigator screenOptions={screenOptionStyle}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="OnlineCommunity" component={OnlineCommunity} />
        </Tab.Navigator>
      );
    };



  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainStack} />
            <Stack.Screen
              name="ArticleDetailScreen"
              component={ArticleDetailScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="onboarding" component={OnBoarding} />

            <Stack.Screen name="dateCalculator" component={DateCalculator} />

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

