// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCAxvduVu43fgDm4kxa1Wm_7mWZnQYc1_s",
  authDomain: "expense-tracker-73d6e.firebaseapp.com",
  projectId: "expense-tracker-73d6e",
  storageBucket: "expense-tracker-73d6e.firebasestorage.app",
  messagingSenderId: "385163574170",
  appId: "1:385163574170:web:91c1eba29b946098639823.firebaseapp.com"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Initialize Auth and DB
export const auth = getAuth(app);
export const db = getFirestore(app);
