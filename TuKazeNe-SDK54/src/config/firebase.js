// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuhJecKMRqhIRlegpP1TBrKzZHmoqIYeI",
  authDomain: "tukazene-uganda.firebaseapp.com",
  projectId: "tukazene-uganda",
  storageBucket: "tukazene-uganda.firebasestorage.app",
  messagingSenderId: "97956836449",
  appId: "1:97956836449:web:9e89610db2bd906817a620",
  measurementId: "G-Q1N0JJK4CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);