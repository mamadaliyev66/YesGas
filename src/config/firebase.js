// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyATZdBzxfQsGvDjpT5QmwdA9YPsByr6ZSE",
    authDomain: "testpyrebase-16f63.firebaseapp.com",
    projectId: "testpyrebase-16f63",
    storageBucket: "testpyrebase-16f63.appspot.com",
    messagingSenderId: "705088045665",
    appId: "1:705088045665:web:b22740ecabbbef3de82020",
    measurementId: "G-DWL0KSRX5Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
