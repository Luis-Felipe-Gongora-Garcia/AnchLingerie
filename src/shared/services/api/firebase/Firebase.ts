import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  storageBucket: 'gs://anchlingerie-2bc3a.appspot.com',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
