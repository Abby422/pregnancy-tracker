import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchUserData = async (userId) => {

 try {
   const userDocRef = doc(db, "users", userId);
   const userDocSnapshot = await getDoc(userDocRef);

   console.log(userDocSnapshot)

   if (userDocSnapshot.exists()) {
     const userData = { id: userDocSnapshot.id, ...userDocSnapshot.data() };
     console.log("User data:", userData);
     return userData;
   } else {
     console.log("User document does not exist!");
     return null;
   }
 } catch (error) {
   console.error("Error fetching user data:", error);
   throw error;
 }
};
