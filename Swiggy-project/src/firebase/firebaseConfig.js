import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBqBAP4TWmq9gmrOu0QYohCzKConegsa4E",
  authDomain: "swiggy-project-20319.firebaseapp.com",
  projectId: "swiggy-project-20319",
  storageBucket: "swiggy-project-20319.appspot.com",
  messagingSenderId: "1066114544101",
  appId: "1:1066114544101:web:11a725c545ae46c8f53f0c",
  measurementId: "G-313DZP5PW3"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
const provider= new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        resolve(result.user);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export const signOutUser = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        resolve();
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
        reject(error);
      });
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  });
};

export const db =getFirestore(app);