import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMhA4Csm8vJ3v1EYoLJaqwJuEPWmlew28",
  authDomain: "cosmetique-abdelhak.firebaseapp.com",
  projectId: "cosmetique-abdelhak",
  storageBucket: "cosmetique-abdelhak.firebasestorage.app",
  messagingSenderId: "1068637497574",
  appId: "1:1068637497574:web:70944cfda03e0806f3b327"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
