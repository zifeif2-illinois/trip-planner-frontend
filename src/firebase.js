import firebase from 'firebase/app';
import 'firebase/auth';
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyA6GoLwhUzLcRguPqu8S2KLROMg67w4eT0",
  authDomain: "cs498rk-239014.firebaseapp.com",
  databaseURL: "https://cs498rk-239014.firebaseio.com",
  projectId: "cs498rk-239014",
  storageBucket: "cs498rk-239014.appspot.com",
  messagingSenderId: "1053708047986"
};
var fire = firebase.initializeApp(config);
var fbAuth = fire.auth();
export {fire,
  fbAuth,
  firebase
}
