// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-wZ190NNjNi-7j7-G2CUTI0uOvcfiQrY",
  authDomain: "ptracker-aedef.firebaseapp.com",
  projectId: "ptracker-aedef",
  storageBucket: "ptracker-aedef.appspot.com",
  messagingSenderId: "402929710960",
  appId: "1:402929710960:web:096604268b5119aed301b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default FIREBASE_APP = app;
export const db = getFirestore(app);