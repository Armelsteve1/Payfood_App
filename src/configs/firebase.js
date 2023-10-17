import firebase from './firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAMKH6SOgscqKFuwdClmNXrdLmAJGQbtF0",
  authDomain: "payfood-9cdd8.firebaseapp.com",
  projectId: "payfood-9cdd8",
  storageBucket: "payfood-9cdd8.appspot.com",
  messagingSenderId: "767677484338",
  appId: "1:767677484338:web:a7699d808cc51576589b2b",
  measurementId: "G-5GS90R385X"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = app.auth()
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { auth, db, timestamp }
