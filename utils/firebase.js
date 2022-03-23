import * as firebase from "firebase";

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp({
    apiKey: "AIzaSyBtrgn5KdUB15vSaQ7r21KZM7rkTYqiTP0",
    authDomain: "tasty-api-31d43.firebaseapp.com",
    projectId: "tasty-api-31d43",
    storageBucket: "tasty-api-31d43.appspot.com",
    messagingSenderId: "351523246361",
    appId: "1:351523246361:web:7bc4824ced4e6c14117588",
  });
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { app, auth, db };
