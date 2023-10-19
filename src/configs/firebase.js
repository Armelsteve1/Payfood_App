import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMFzvO7mmZTA7-yUinI5Et6vzelTyj4a0",
  authDomain: "payfood-7925c.firebaseapp.com",
  databaseURL: "https://payfood-7925c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "payfood-7925c",
  storageBucket: "payfood-7925c.appspot.com",
  messagingSenderId: "586328239954",
  appId: "1:586328239954:web:f00b8d2450e0c1b1a9148b",
  measurementId: "G-129T1FR4RZ"
};

const app = initializeApp(firebaseConfig);

if (isSupported()) {
  const analytics = getAnalytics(app);
  console.log("Firebase Analytics is supported");
} else {
  console.warn("Firebase Analytics is not supported in this environment");
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

console.log("Firebase initialized successfully");
console.log("auth", auth);
console.log("app", app);