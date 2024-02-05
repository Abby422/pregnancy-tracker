import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";

const db = FIREBASE_DB;

export const fetchUserData = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    console.log("User data:", userData);
    return userData;
  } else {
    console.log("No such document!");
    return null;
  }
};

