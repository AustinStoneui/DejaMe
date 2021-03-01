import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBg3YO_ZbH2WuPdoPYlcCIuXaig5oBhDJ0",
    authDomain: "deja-me.firebaseapp.com",
    projectId: "deja-me",
    storageBucket: "deja-me.appspot.com",
    messagingSenderId: "934856711392",
    appId: "1:934856711392:web:12de07754924c2ade24485"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};