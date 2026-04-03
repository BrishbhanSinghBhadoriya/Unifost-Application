import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// REPLACE THESE WITH YOUR ACTUAL FIREBASE PROJECT CREDENTIALS
const firebaseConfig = {
  apiKey: "AIzaSyB64XacSbpmH5ae0Cxe721rn1SNcxiXfxw",
  authDomain: "unifost-27c7f.firebaseapp.com",
  projectId: "unifost-27c7f",
  storageBucket: "unifost-27c7f.firebasestorage.app",
  messagingSenderId: "547925324774",
  appId: "1:547925324774:web:d632f0967a176d4c0c1c27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Fix for React Native persistence
let auth: Auth;
try {
  const { getReactNativePersistence } = require('firebase/auth');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };
