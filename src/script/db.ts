import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAPk8Givpk9frARWezj0S24X51vutsyTXc',
  authDomain: 'chat-fec7d.firebaseapp.com',
  databaseURL:
    'https://chat-fec7d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chat-fec7d',
  storageBucket: 'chat-fec7d.appspot.com',
  messagingSenderId: '505237520486',
  appId: '1:505237520486:web:c93fd68ca9ab79e7e22da7',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
