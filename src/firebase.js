// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,

  authDomain: "mern-blog-c005a.firebaseapp.com",

  projectId: "mern-blog-c005a",

  storageBucket: "mern-blog-c005a.appspot.com",

  messagingSenderId: "711701214036",

  appId: "1:711701214036:web:09c1249297e4ee67280ec1"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);