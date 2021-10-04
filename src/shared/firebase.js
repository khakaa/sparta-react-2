import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-jd7lWM5OnXFEitVn5eU3aL2-RIQP_V0",
  authDomain: "image-community-8cfaa.firebaseapp.com",
  projectId: "image-community-8cfaa",
  storageBucket: "image-community-8cfaa.appspot.com",
  messagingSenderId: "659486649171",
  appId: "1:659486649171:web:2093afd968d69befd98fa6",
  measurementId: "G-FJYD9TRZ0K",
};

// firestore에서 데이터 불러오기 위해서 연동
//초기화
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };
