import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile

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

      const additionalUserInfo = userCredential.additionalUserInfo;
      console.log("Additional user info:", additionalUserInfo);
      return user;
      
    })
  } catch (error) {
    console.log(
      "Error Code is " + error.code + "Error Message is " + error.message
    );
    alert("Login in failed" + error.message);
  }
};

export const register = async (email, password, dueDate) => {
  try {
    // Create user with email and password
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get user from response
    const user = response.user;

    await updateProfile(user, {
      dueDate
    });

    console.log("User registered successfully", user);
    return user;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};