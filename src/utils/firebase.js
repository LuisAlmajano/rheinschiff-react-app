import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDy6qPz2KoJK2yYbBHeY_MHfpjzVjo4S4E ",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJET_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;
