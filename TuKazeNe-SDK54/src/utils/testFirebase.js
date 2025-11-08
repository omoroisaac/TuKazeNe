import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    const testDoc = await addDoc(collection(db, 'testConnection'), {
      message: 'Testing Firebase connection',
      timestamp: new Date()
    });
    console.log('✅ Firebase connected! Document ID:', testDoc.id);
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};