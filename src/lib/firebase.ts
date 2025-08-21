// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "neondepth-portfolio",
  appId: "1:870342837142:web:b974911d6597ee7ff9d3b7",
  storageBucket: "neondepth-portfolio.firebasestorage.app",
  apiKey: "AIzaSyBASX-wRtWWMElzkGrErfGNCfl3JYpYS5w",
  authDomain: "neondepth-portfolio.firebaseapp.com",
  messagingSenderId: "870342837142",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
