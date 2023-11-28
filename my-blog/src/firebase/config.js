import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAFgd1DjoUHyDLPDk1vX9CJ-L6xmmF_bsg",
  authDomain: "vuex-firebase-auth-4c89d.firebaseapp.com",
  projectId: "vuex-firebase-auth-4c89d",
  storageBucket: "vuex-firebase-auth-4c89d.appspot.com",
  messagingSenderId: "994756393585",
  appId: "1:994756393585:web:a52195cb64b4f5fc5c79d0",  
};

// init firebase
const app = initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage }