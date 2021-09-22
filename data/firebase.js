import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLlAgZ1L1_Zyyhor-_gha_PqWglaquOoU",
  authDomain: "messaging-c2292.firebaseapp.com",
  projectId: "messaging-c2292",
  storageBucket: "messaging-c2292.appspot.com",
  messagingSenderId: "959175006077",
  appId: "1:959175006077:web:4fea1f4964363ee6975e14",
  measurementId: "G-E3WXHE9GZ6",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };
