  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyAYGDKg0-hQFV-PVCP8hvcBez1-k5hl6lA",
    authDomain: "project-86969.firebaseapp.com",
    projectId: "project-86969",
    storageBucket: "project-86969.firebasestorage.app",
    messagingSenderId: "619864505459",
    appId: "1:619864505459:web:86bb3d63af091341193e06",
    measurementId: "G-GXGDK9RYGQ"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
