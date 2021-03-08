import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyDxbWE4MZmgsoRAWh_-VQwJjw74Xa9rG-0',
  authDomain: 'task-management-30dad.firebaseapp.com',
  projectId: 'task-management-30dad',
  storageBucket: 'task-management-30dad.appspot.com',
  messagingSenderId: '718206582527',
  appId: '1:718206582527:web:b7584032a3dd4e2df9d6ca',
});

export { firebaseConfig as firebase };
