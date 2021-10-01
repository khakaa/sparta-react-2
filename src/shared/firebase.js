import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-jd7lWM5OnXFEitVn5eU3aL2-RIQP_V0",
  authDomain: "image-community-8cfaa.firebaseapp.com",
  projectId: "image-community-8cfaa",
  storageBucket: "image-community-8cfaa.appspot.com",
  messagingSenderId: "659486649171",
  appId: "1:659486649171:web:2093afd968d69befd98fa6",
  measurementId: "G-FJYD9TRZ0K",
};

//초기화
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();

export { auth, apiKey };
