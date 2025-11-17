// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBSXd5hCYHG4-pOSz1AEI81gs8Iq45Ur14",

  authDomain: "dbms-f81b8.firebaseapp.com",

  projectId: "dbms-f81b8",

  storageBucket: "dbms-f81b8.firebasestorage.app",

  messagingSenderId: "708484172200",

  appId: "1:708484172200:web:3c793650ba052dcee4759d",

  measurementId: "G-6HN80GX796"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

