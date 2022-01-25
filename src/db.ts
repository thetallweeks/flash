import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAyYdd8-TUuE61h-hF9sc9HWHR4BBBh_xA",
  authDomain: "flashcards-3bc66.firebaseapp.com",
  projectId: "flashcards-3bc66",
  storageBucket: "flashcards-3bc66.appspot.com",
  messagingSenderId: "377696279796",
  appId: "1:377696279796:web:a07436690cea53c1aed2a1",
  measurementId: "G-YMNNCNKK47"
};

initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore();
enableIndexedDbPersistence(db)

export default db;
