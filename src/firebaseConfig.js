// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwW21X_MzkWzZTmJQYwY7BeNoOcmkFQRE",
  authDomain: "my-greatest.firebaseapp.com",
  projectId: "my-greatest",
  storageBucket: "my-greatest.appspot.com",
  messagingSenderId: "368307390030",
  appId: "1:368307390030:web:7369e6dcef19956df9251f",
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
