// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, FacebookAuthProvider, signInWithPopup, connectAuthEmulator } from "firebase/auth";

import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEWMREcGAzFqvVaKzrWtYLvi3kSNGEgx0",
  authDomain: "chatseven-7c032.firebaseapp.com",
  projectId: "chatseven-7c032",
  storageBucket: "chatseven-7c032.appspot.com",
  messagingSenderId: "650278961447",
  appId: "1:650278961447:web:a1af970cd4cff58edc6902",
  measurementId: "G-2890MP15C9",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// if (window.location.host.startsWith('localhost')) {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }
const fbProvider = new FacebookAuthProvider();
export { auth, db, fbProvider, signInWithPopup };
