import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth();