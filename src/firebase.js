import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHHb2aKFgJGQt70yQltkPyP1we03hiMOg",
  authDomain: "test-19ed2.firebaseapp.com",
  databaseURL: "https://test-19ed2-default-rtdb.firebaseio.com",
  projectId: "test-19ed2",
  storageBucket: "test-19ed2.appspot.com",
  messagingSenderId: "1016383493851",
  appId: "1:1016383493851:web:b23583d43d769ff7c85efe",
  measurementId: "G-LSW5GYKMCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db };
export { storage };
