import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import { FIREBASE_APP } from "./firebaseConfig";

const auth = getAuth(FIREBASE_APP);

export const signIn = async (email, password) => {
  try {
    console.log(email, password)
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in successfully" + user);
      return user;
      
    })
  } catch (error) {
    console.log(
      "Error Code is " + error.code + "Error Message is " + error.message
    );
    alert("Login in failed" + error.message);
  }
};

export const register = async (email, password) => {
  try {
    console.log(email, password);
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    console.log("User registered successfully" + user);
    return user;
  } catch (error) {
    console.log(
      "Error Code is " + error.code + "Error Message is " + error.message
    );
    alert("Registration failed" + error.message);
  }
};
