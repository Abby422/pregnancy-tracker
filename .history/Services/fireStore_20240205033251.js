import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";

import { db } from "./firebaseConfig";

export const fetchUserData = async (userId) => {

  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User data:", userData);
      return userData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
