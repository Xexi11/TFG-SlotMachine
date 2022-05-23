import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY9XyUwbVgFgg5VY9bwHteJST6_dYMo9o",
  authDomain: "zodiaccasino-83769.firebaseapp.com",
  projectId: "zodiaccasino-83769",
  storageBucket: "zodiaccasino-83769.appspot.com",
  messagingSenderId: "944852840270",
  appId: "1:944852840270:web:aa411cf4d3f3c571b6381f",
  measurementId: "G-2FL7C69ZS2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
