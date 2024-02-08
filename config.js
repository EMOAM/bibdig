//import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat';
require("@firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyCWSDGe7E6Lgt76pWIjvWX9d1e-wT1QboU",
    authDomain: "biblioteca-dig-8110b.firebaseapp.com",
    projectId: "biblioteca-dig-8110b",
    storageBucket: "biblioteca-dig-8110b.appspot.com",
    messagingSenderId: "119823472305",
    appId: "1:119823472305:web:c0469d9388a40652023490"
  };
  
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  export default app;