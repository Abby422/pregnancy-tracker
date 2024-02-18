import { doc } from "firebase/firestore";
import { USER_STATE_CHANGE } from "../constants";
import { getAuth } from "firebase/auth";
import {FIREBASE_APP, db} from "../../Services/firebaseConfig";

export async function fetchUser() {
  return (dispatch) => {
    try {
      const auth = getAuth(FIREBASE_APP);
      const userDocRef = doc(db, "users", auth.currentUser.uid );
      const userDocSnapshot =  getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = { id: userDocSnapshot.id, ...userDocSnapshot.data() };
        console.log("User data:", userData);
        dispatch({
          type: USER_STATE_CHANGE,
          currentUser: userDocSnapshot.data(),
        });
        return userData;
      } else {
        console.log("Does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
}
