// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn1HuD0k6sxkEeUzpOtjOVmCzTIRQlvqs",
  authDomain: "pregnancy-tracker-46bc3.firebaseapp.com",
  projectId: "pregnancy-tracker-46bc3",
  storageBucket: "pregnancy-tracker-46bc3.appspot.com",
  messagingSenderId: "887697663526",
  appId: "1:887697663526:web:0a11535833c6e238d5e8e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default FIREBASE_APP = app;
export const FIREBASE_DB = getFirestore();