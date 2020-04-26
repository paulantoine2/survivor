import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCApru32vU-LmkijmWzZln-03pomFkpFDU',
    authDomain: 'survivor-f8a44.firebaseapp.com',
    databaseURL: 'https://survivor-f8a44.firebaseio.com',
    projectId: 'survivor-f8a44',
    storageBucket: 'survivor-f8a44.appspot.com',
    messagingSenderId: '471319691500',
    appId: '1:471319691500:web:375c6d48653df1008ea5c9',
  });
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const rt = firebase.database();
