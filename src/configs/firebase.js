import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMFzvO7mmZTA7-yUinI5Et6vzelTyj4a0",
  authDomain: "payfood-7925c.firebaseapp.com",
  databaseURL: "https://payfood-7925c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "payfood-7925c",
  storageBucket: "payfood-7925c.appspot.com",
  messagingSenderId: "586328239954",
  appId: "1:586328239954:web:f00b8d2450e0c1b1a9148b",
  measurementId: "G-129T1FR4RZ",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(app);

console.log("app", app);
console.log("auth", auth);
console.log("firestore", firestore);
console.log("Firebase initialized successfully");

export { auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword, firestore };
