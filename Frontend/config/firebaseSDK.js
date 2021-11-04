import firebase from 'firebase';
import Constants from 'expo-constants';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyB1nePiucetN0EXuUruec9xdCycHqyHvvE",
        authDomain: "musematch-82bd6.firebaseapp.com",
        databaseURL: "https://musematch-82bd6-default-rtdb.firebaseio.com",
        projectId: "musematch-82bd6",
        storageBucket: "musematch-82bd6.appspot.com",
        messagingSenderId: "347010474209",
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;