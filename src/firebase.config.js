import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyArNxuX1Mat6GRaDQ8jenk1kcHEx6fcmIo",
  authDomain: "food-app-b5029.firebaseapp.com",
  databaseURL: "https://food-app-b5029-default-rtdb.firebaseio.com",
  projectId: "food-app-b5029",
  storageBucket: "food-app-b5029.appspot.com",
  messagingSenderId: "342276505024",
  appId: "1:342276505024:web:e5fd23e2b924b54c725c25",
  measurementId: "G-2SYMN0FRHQ",
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);
export { app, fireStore, storage };
