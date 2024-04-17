import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

export const getCommentData = async (postID) => {
  try {
    const querySnapshot = await getDocs(collection(db, "comments"), postID);
    const comments = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return comments;
  } catch (error) {
    console.error("Error fetching comment data:", error);
    throw error;
  }
}

export const postComment = async (commentEntry) => {
  try {
    const docRef = await collection(db, "comments");
    await addDoc(docRef, commentEntry);

    return true;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}
export const getPregnancyInfo = async (weekNumber) => {
  try {
    const pregnancyInfoDocRef = doc(db, "pregnancy_info", weekNumber);
    const pregnancyInfoDocSnapshot = await getDoc(pregnancyInfoDocRef);
    if (pregnancyInfoDocSnapshot.exists()) {
      const pregnancyInfo = {
        id: pregnancyInfoDocSnapshot.id,
        ...pregnancyInfoDocSnapshot.data(),
      };
      return JSON.parse(pregnancyInfo.data);
    } else {
      console.log("Pregnancy info document does not exist!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching pregnancy info:", error);
    throw error;
  }
};

//get baby names from firestore
export const getBabyGirlNames = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "baby_names"));
    const babyNames = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return JSON.parse(babyNames[0].g_name);
  } catch (error) {
    console.error("Error fetching baby names:", error);
    throw error;
  }
};

export const getBabyBoyNames = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "baby_names"));
    const babyNames = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return JSON.parse(babyNames[1].b_name);
  } catch (error) {
    console.error("Error fetching baby names:", error);
    throw error;
  }
};

export const postSymptoms = async (symptomEntry) => {
  try {
    const docRef = await collection(db, "symptoms");
    await addDoc(docRef, symptomEntry);

    return true;
  } catch (error) {
    console.error("Error posting symptoms:", error);
    throw error;
  }
}

export const getSymptoms = async (userId) => {
  try {
    const symptomRef = collection(db, "symptoms");
    const q = query(symptomRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return entries;
  } catch (error) {
    console.error("Error loading symptom entries:", error);
    throw error;
  }
}

export const deleteSymptom = async (symptomId) => {
  try {
    const symptomRef = doc(db, "symptoms", symptomId);
    await symptomRef.delete();

    return true;
  } catch (error) {
    console.error("Error deleting symptom entry:", error);
    throw error;
  }
}

export const updateSymptom = async (symptomId, updatedEntry) => {
  try {
    const symptomRef = doc(db, "symptoms", symptomId);
    await setDoc(symptomRef, updatedEntry);

    return true;
  } catch (error) {
    console.error("Error updating symptom entry:", error);
    throw error;
  }
}

export const addShoppingListItem = async (item) => {
  try {
    const docRef = await collection(db, "shopping_list");
    await addDoc(docRef, item);

    return true;
  } catch (error) {
    console.error("Error adding shopping list item:", error);
    throw error;
  }
}

export const getShoppingList = async (userId) => {
  try {
    const listRef = collection(db, "shopping_list");
    const q = query(listRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error loading shopping list items:", error);
    throw error;
  }
}

export const deleteShoppingListItem = async (itemId) => {
  try {
    const itemRef = doc(db, "shopping_list", itemId);
    await itemRef.delete();

    return true;
  } catch (error) {
    console.error("Error deleting shopping list item:", error);
    throw error;
  }
}