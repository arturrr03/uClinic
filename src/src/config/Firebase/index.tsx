// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCROs8HozO2sVuXPuqYUZTixFp6iFK5nhQ",
  authDomain: "unklabclinic.firebaseapp.com",
  databaseURL: "https://unklabclinic-default-rtdb.firebaseio.com",
  projectId: "unklabclinic",
  storageBucket: "unklabclinic.firebasestorage.app",
  messagingSenderId: "135047637255",
  appId: "1:135047637255:web:b3d0f4305ec02e5642fda2",
  measurementId: "G-B162120NHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { database, auth };