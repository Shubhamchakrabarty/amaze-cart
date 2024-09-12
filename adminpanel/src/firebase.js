// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFiStB6jgHeP7g6G6ryCbXABwtAkxSRj8",
  authDomain: "amaze-cart-66746.firebaseapp.com",
  projectId: "amaze-cart-66746",
  storageBucket: "amaze-cart-66746.appspot.com",
  messagingSenderId: "966421888594",
  appId: "1:966421888594:web:ef3ed1afdb455fb88fe98b",
  measurementId: "G-5QCGHWEBR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// Function to get the user's role from Firestore
export const getUserRole = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);  // Reference to the user document
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data().role;  // Return the user's role
    } else {
      console.log("No such user role document!");
      return null;  // Handle case where user document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;  // Handle any errors
  }
};

export { auth, db };
