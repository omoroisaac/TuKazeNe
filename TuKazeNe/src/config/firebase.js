import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase config (you'll get this from Firebase console)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "tukazene-uganda.firebaseapp.com",
  projectId: "tukazene-uganda",
  storageBucket: "tukazene-uganda.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;