
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc8l27s0cPR5Rag4UcSa_tA8wHfjyKnd4",
  authDomain: "vasco-6095f.firebaseapp.com",
  projectId: "vasco-6095f",
  storageBucket: "vasco-6095f.appspot.com",
  messagingSenderId: "914572317035",
  appId: "1:914572317035:web:db3a423e1c62902b6bfc2e",
  measurementId: "G-K9WJ26ELX7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db };
export { auth };