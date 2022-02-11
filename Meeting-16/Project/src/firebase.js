import firebase from "firebase/app";
import "firebase/database";

const ENV = process.env;

let config = {
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
  // databaseURL: ENV.DATABASE_URL,
  databaseURL:
    "https://react-firebase-a4357-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(config);

export default firebase.database();
