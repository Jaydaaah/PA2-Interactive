import {initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC_Ef4MEP4XnqFicL5ZSRhGpDLh6hLAcws",
  authDomain: "my-app-11a26.firebaseapp.com",
  databaseURL: "https://my-app-11a26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-app-11a26",
  storageBucket: "my-app-11a26.appspot.com",
  messagingSenderId: "411683423953",
  appId: "1:411683423953:web:d37597e572e5a86c49e7f0",
  measurementId: "G-QV2QYDMRXP"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;