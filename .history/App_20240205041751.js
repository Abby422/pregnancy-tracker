import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Home from "./Screens/Home";
import  ArticleDetailScreen  from "./Screens/Home";
import OnlineCommunity from "./Screens/OnlineCommunity";
import Posts from "./Screens/Posts";
import Profile from "./Screens/Profile";
import { FIREBASE_APP } from "./Services/firebaseConfig";
import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnBoarding from "./Screens/OnBoarding";
import MealPlanScreen from "./Screens/MealPlanScreen";
import DateCalculator from "./Screens/DateCalculator";
import { MD3Colors, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Tools from "./Screens/Tools";
import Exercise from "./Screens/Exercise";
import MotherDetailsScreen from "./Screens/MotherDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const auth = getAuth(FIREBASE_APP);
export const UserContext = createContext();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const screenOptionStyle = {
    headerShown: false,
  };

  const tabOptionStyle = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#fff",
      color: "#FFFFFF",
      tabBarIcon: {
        color: "#000",
        focused: "#000000",
        size: 30,
      },
    },
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
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    };
  }

  const MainStack = () => {
    return (
        <Tab.Navigator screenOptions={tabOptionStyle}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Stack.Screen
          name="Tools"
          component={Tools}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="apps" color={color} size={size} />
            ),
          }}
        />
        <Stack.Screen
          name="OnlineCommunity"
          component={OnlineCommunity}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="forum" color={color} size={size} />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
      
    );
  };

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator screenOptions={screenOptionStyle}>
          {user ? (
            <>
              <Stack.Screen name="Main" component={MainStack} />
              <Stack.Screen
                name="MotherDetailsScreen"
                component={MotherDetailsScreen}
              />
              <Stack.Screen name="Posts" component={Posts} />
              <Stack.Screen name="MealPlanScreen" component={MealPlanScreen} />
              <Stack.Screen
                name="ArticleDetailScreen"
                component={ArticleDetailScreen}
              />
              <Stack.Screen name="Exercise" component={Exercise} />
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
      </PaperProvider>
    </NavigationContainer>
  );
}
