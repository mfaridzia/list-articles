import firebase from "firebase";
//import database from "firebase/database";

const config = {
  apiKey: "AIzaSyDW7LyessLJ0eDSLK72M9B8Z97xNBT_jKc",
  authDomain: "favorite-article.firebaseapp.com",
  databaseURL: "https://favorite-article.firebaseio.com",
  projectId: "favorite-article",
  storageBucket: "",
  messagingSenderId: "1094649614211",
  appId: "1:1094649614211:web:db430d14b4ad68ea"
};

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};
