
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCVUlq2-UEUyd41_QM7axwflkFevSJKaA8",
  authDomain: "calendar-58c7e.firebaseapp.com",
  projectId: "calendar-58c7e",
  storageBucket: "calendar-58c7e.appspot.com",
  messagingSenderId: "550496590790",
  appId: "1:550496590790:web:441f8db1b1335e6fd030c7",
  measurementId: "G-G9MFENSWE4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);