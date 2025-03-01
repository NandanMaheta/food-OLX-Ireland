
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAERovAfPnqTdXEoGsSxCmQYtS-PNUKjZM",
  authDomain: "olxfoodireland.firebaseapp.com",
  projectId: "olxfoodireland",
  storageBucket: "olxfoodireland.firebasestorage.app",
  messagingSenderId: "1071483128578",
  appId: "1:1071483128578:ios:3e266072484125f58fd01b",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
