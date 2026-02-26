import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm2a6q8LRChyL6BsvKx-bHo1Vth_GNEnM",
  authDomain: "cuckoo-21aed.firebaseapp.com",
  projectId: "cuckoo-21aed",
  storageBucket: "cuckoo-21aed.firebasestorage.app",
  messagingSenderId: "544182842115",
  appId: "1:544182842115:web:8d5bd3894c3912f4c4af36",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
