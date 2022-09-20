import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDslDvgmRcu4LkcpX7KlAOzRTV8AqiPEWE',
  authDomain: 'anchlingerie-2bc3a.firebaseapp.com',
  projectId: 'anchlingerie-2bc3a',
  storageBucket: 'anchlingerie-2bc3a.appspot.com',
  messagingSenderId: '562038548720',
  appId: '1:562038548720:web:e03a967ccf1a03aa02ba35',
  measurementId: 'G-WH9ZGKJVWW',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
