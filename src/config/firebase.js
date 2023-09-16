// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0qb7eiwXEdAlBZLMz14vaXu3BWCbE4nU",
  authDomain: "vite-contact-75619.firebaseapp.com",
  projectId: "vite-contact-75619",
  storageBucket: "vite-contact-75619.appspot.com",
  messagingSenderId: "1005885398975",
  appId: "1:1005885398975:web:d1898b4830747f62eb4b0a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)