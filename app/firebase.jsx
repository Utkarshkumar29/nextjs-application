// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection,getDocs,
    addDoc
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe7VOrUdS8c54Y-CcNZ4e46NuyTuDgyW8",
  authDomain: "authentication-ca558.firebaseapp.com",
  projectId: "authentication-ca558",
  storageBucket: "authentication-ca558.appspot.com",
  messagingSenderId: "937822951832",
  appId: "1:937822951832:web:9bb69f263a72debe43b3ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

initializeApp(firebaseConfig)
export const db=getFirestore()

//collection ref
export const colRef=collection(db,'test')