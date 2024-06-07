// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfwN3PVZboHKEyzuOcNac_vfgPtDg3E7A",
  authDomain: "projectsoutenance-8ad8c.firebaseapp.com",
  projectId: "projectsoutenance-8ad8c",
  storageBucket: "projectsoutenance-8ad8c.appspot.com",
  messagingSenderId: "240103872232",
  appId: "1:240103872232:web:268642922e84c89cf7db5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db }