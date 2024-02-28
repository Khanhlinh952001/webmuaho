// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCfVXvQXBqU4Yyx3-naxapRQWYerV5iaAg",
  authDomain: "website-8015b.firebaseapp.com",
  projectId: "website-8015b",
  storageBucket: "website-8015b.appspot.com",
  messagingSenderId: "562998165221",
  appId: "1:562998165221:web:9def5ad64555ce50375e0c",
  measurementId: "G-787Y451CY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
