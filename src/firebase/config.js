import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAmqzoMBsUqM7siytOKLkqSVmAG2Er1XMU",
    authDomain: "mymoney-275dc.firebaseapp.com",
    projectId: "mymoney-275dc",
    storageBucket: "mymoney-275dc.appspot.com",
    messagingSenderId: "701978718151",
    appId: "1:701978718151:web:0adcfff8a174e0248233e2"
  };

//   init firebase 
firebase.initializeApp(firebaseConfig)

// init Service 
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }