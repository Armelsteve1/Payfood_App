import { getAuth } from 'firebase/auth';
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
const auth = getAuth(app);

// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'payfood-7925c',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID'
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Now you can use Firebase services in your app
// const db = firebase.firestore();
