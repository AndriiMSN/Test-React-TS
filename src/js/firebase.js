import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCUl6eaPwV2HR8B-eeo4QSBapc8GK5nEK8",
    authDomain: "testtask-60d27.firebaseapp.com",
    projectId: "testtask-60d27",
    storageBucket: "testtask-60d27.appspot.com",
    messagingSenderId: "988892715409",
    appId: "1:988892715409:web:32dec8a7a9ba90b1d96230"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth, firebaseConfig}