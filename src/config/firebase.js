// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwnpMFOYWc8vrEqLZUJjke2D-eG7tKjY4",
  authDomain: "clone-c8328.firebaseapp.com",
  projectId: "clone-c8328",
  storageBucket: "clone-c8328.appspot.com",
  messagingSenderId: "1096041182612",
  appId: "1:1096041182612:web:592a3725fc773c0cb38b81",
  measurementId: "G-TDXMFNLQDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();