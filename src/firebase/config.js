import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


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

const storage = getStorage(app);

const app2=firebase.initializeApp(firebaseConfig)
const firestore = app2.firestore();

const auth = getAuth(app)

export { auth, storage,firestore, firebase ,app,db};