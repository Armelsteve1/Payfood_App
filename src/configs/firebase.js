// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMKH6SOgscqKFuwdClmNXrdLmAJGQbtF0",
  authDomain: "payfood-9cdd8.firebaseapp.com",
  projectId: "payfood-9cdd8",
  storageBucket: "payfood-9cdd8.appspot.com",
  messagingSenderId: "767677484338",
  appId: "1:767677484338:web:a7699d808cc51576589b2b",
  measurementId: "G-5GS90R385X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);