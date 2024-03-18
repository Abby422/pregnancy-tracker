import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = { id: userDocSnapshot.id, ...userDocSnapshot.data() };

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

export const getTopicsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "topics"));
    const topics = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return topics;
  } catch (error) {
    console.error("Error fetching topic data:", error);
    throw error;
  }
};

export const getPostsData = async (topicId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"), topicId);
    const posts = querySnapshot.docs.map((doc) => {
      console.log(posts, "posts");
      return { id: doc.id, ...doc.data() };
    });
    return posts;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};

export const getPregnancyInfo = async (weekNumber) => {
  try {
    const pregnancyInfoDocRef = doc(db, "pregnancy_info", weekNumber);

    console.log(weekNumber)
    const pregnancyInfoDocSnapshot = await getDoc(pregnancyInfoDocRef);
    if (pregnancyInfoDocSnapshot.exists()) {
      const pregnancyInfo = {
        id: pregnancyInfoDocSnapshot.id,
        ...pregnancyInfoDocSnapshot.data(),
      };
      return pregnancyInfo.data;
    } else {
      console.log("Pregnancy info document does not exist!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching pregnancy info:", error);
    throw error;
  }
};
