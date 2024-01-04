// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFZtnZ0s-Xup1JnamVxLFgKinoSMRzEzY",
    authDomain: "photofolio-4e922.firebaseapp.com",
    projectId: "photofolio-4e922",
    storageBucket: "photofolio-4e922.appspot.com",
    messagingSenderId: "450093207515",
    appId: "1:450093207515:web:4a2f5cdd5d4463ee5ea1fe"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;