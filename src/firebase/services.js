import { db } from "./config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("result from database" + docRef);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
