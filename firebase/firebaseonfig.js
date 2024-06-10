import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfwN3PVZboHKEyzuOcNac_vfgPtDg3E7A",
    authDomain: "projectsoutenance-8ad8c.firebaseapp.com",
    projectId: "projectsoutenance-8ad8c",
    storageBucket: "projectsoutenance-8ad8c.appspot.com",
    messagingSenderId: "240103872232",
    appId: "1:240103872232:web:5a24d0d56b0f8e69f7db5d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
