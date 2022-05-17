import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { fireStore } from "../firebase.config";

//saving new  data
export const saveItem = async (data) => {
  await setDoc(doc(fireStore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};
export const getAllFoodItems = async (data) => {
  await getDocs(
    query(collection(fireStore, "foodItems"), orderBy("id", "desc"))
  );
  return getAllFoodItems.docs.map((doc) => doc.data());
};
