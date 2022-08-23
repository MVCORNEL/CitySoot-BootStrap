//https://firebase.google.com/docs/auth/web/start
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, onValue, query, orderByChild } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

let firebaseApp;
let firebaseDB;
let firebaseAuth;
// https://firebase.google.com/docs/web/setup#available-libraries
//https://console.firebase.google.com/project/city-scoot-bbk/overview
const firebaseConfig = {
  apiKey: 'AIzaSyCTVZdfSX2HuE9Prg8hISYO9fLrZOuQ2RQ',
  authDomain: 'city-scoot-bbk.firebaseapp.com',
  databaseURL: 'https://city-scoot-bbk-default-rtdb.firebaseio.com',
  projectId: 'city-scoot-bbk',
  storageBucket: 'city-scoot-bbk.appspot.com',
  messagingSenderId: '920211304178',
  appId: '1:920211304178:web:4c236b66e75b916f2a2a6b',
};

//Firebase services  must be initialized in order to function
export const initFirebase = () => {
  //APP
  firebaseApp = initializeApp(firebaseConfig);
  //DB
  firebaseDB = getDatabase(firebaseApp);
  //AUTH
  firebaseAuth = getAuth(firebaseApp);
};
initFirebase();

//Promised version of a function used fetch data out of firebase realtime database management system
//this function is promisified in order to avoid the so called callback hell, and promote asyn/await ES8 feature
//when async function completes return a list of guides
// return a list
export const readGuides = function () {
  return new Promise(function (resolve, reject) {
    //https://firebase.google.com/docs/database/web/lists-of-data#web-version-9_1
    //https://firebase.google.com/docs/database/web/lists-of-data -> query
    const guidesRefOrdered = query(ref(firebaseDB, 'guides/'), orderByChild('lastName'));
    const guides = [];
    onValue(guidesRefOrdered, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //FIREBASE DOESNT ALLOW COMPLEX QUERYING
        if (childSnapshot.val().blueBadge === true) {
          guides.push(childSnapshot.val());
        }
      });
      resolve(guides);
    });
  });
};

//Promised version of a function used fetch data out of firebase realtime database management system
//this function is promisyfied in order to avoid the so called callback hell, and promote asyn/await ES8 feature
//when async function completes return a list of guides
//https://firebase.google.com/docs/auth/web/start#sign_up_new_users
export const signup = (email, password, name) => {
  return new Promise(function (resolve, reject) {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name })
          .then(() => {
            window.location.replace('./../../index.html');
          })
          .catch((e) => {
            throw e;
          });
        resolve(userCredential);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//function used to log in a already log in a user within the firebase auth backend system
//https://firebase.google.com/docs/auth/web/start#sign_in_existing_users
export const login = (email, password) => {
  return new Promise(function (resolve, reject) {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        resolve(userCredential);
        window.location.replace('./../../index.html');
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//function used to log out an already log in user, from the firebase auth serive
//inspired from https://firebase.google.com/docs/auth/web/password-auth
export const logOut = () => {
  signOut(getAuth())
    .then(() => {
      //user successfully logged in, redirecti him to the main page
      window.location.replace('./../../index.html');
    })
    .catch((error) => {
      console.log(error);
    });
};

//function used track if a user is log or not in
//param - [handler] this function will be executed when a change in the log state of the user occurs
//inspired from https://firebase.google.com/docs/auth/web/password-auth
export const trackUserLogin = (handler) => {
  const user = getAuth().currentUser;
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      handler(true, user.displayName);
    } else {
      handler(false);
    }
  });
};
