import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_DB } from "./firebaseConfig";
import firestore from "@react-native-firebase/firestore";

const auth = getAuth(FIREBASE_APP);
const db = FIREBASE_DB;

export const signIn = async (email, password) => {
  try {
    console.log(email, password);
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in successfully" + user);

        const additionalUserInfo = userCredential.additionalUserInfo;
        console.log("Additional user info:", additionalUserInfo);
        return user;
      }
    );
  } catch (error) {
    console.log(
      "Error Code is " + error.code + "Error Message is " + error.message
    );
    alert("Login in failed" + error.message);
  }
};

export const register = async (email, password, dueDate) => {
  const usersCollection = firestore().collection("users");
  const userData = {
    email: email,
    dueDate: dueDate,
  };

  try {
    console.log(email, password, dueDate);
    // Create user with email and password
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Get user from response
    const user = response.user;

    // Add user data to "users" collection
    const docRef = await usersCollection.add(userData);
    console.log("Document added with ID: ", docRef.id);

    // Save due date to a specific document for the user
    const userDocRef = doc(usersCollection, docRef.id);
    await setDoc(userDocRef, { dueDate: dueDate }, { merge: true });

    console.log("User registered successfully", user);
    return user;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};