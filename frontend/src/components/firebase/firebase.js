// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCnNT4oiLOr3MYgDjpyTl4v3w-jZaW7-Y",
  authDomain: "mumbai-hacks11.firebaseapp.com",
  projectId: "mumbai-hacks11",
  storageBucket: "mumbai-hacks11.appspot.com",
  messagingSenderId: "582766944047",
  appId: "1:582766944047:web:0480c6d6861c1f3f458bda",
  measurementId: "G-FLSDNTWBKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app , auth };

