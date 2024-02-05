import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_DB } from "./firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {db} from "./firebaseConfig"
const auth = getAuth(FIREBASE_APP);

export const signIn = async (email, password) => {
  try {
    console.log(email, password);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in user
    const user = userCredential.user;
    console.log("User signed in successfully", user);

    // Get user document reference
    const userDocRef = doc(db, "users", user.uid);

    // Retrieve user document from Firestore
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const dueDate = userData.dueDate;

      console.log("Due Date:", dueDate);

      // You can do something with the retrieved dueDate here
      return { user, dueDate };
    } else {
      console.warn("User document does not exist in Firestore");
      return { user, dueDate: null }; // Handle the case where the document does not exist
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Login failed: " + error.message);
  }
};
export const register = async (email, password, dueDate) => {
  const usersCollection = collection(db, "users");
  const userData = {
    email: email,
    dueDate: dueDate,
  };

  try {
    // Create user with email and password
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Get user from response
    const user = response.user;

    // Add user data to "users" collection
    const docRef = await addDoc(usersCollection, userData);
    console.log("Document added with ID: ", docRef.id);

    // Save due date to a specific document for the user
    const userDocRef = doc(db, "users", docRef.id);
    await setDoc(userDocRef, { dueDate: dueDate }, { merge: true });

    console.log("User registered successfully", user);
    return user;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};