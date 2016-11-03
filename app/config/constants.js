import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCsIoAWAch_OgFa6YPIRKVwxaGzHpjU1Is",
  authDomain: "cleaning-bot.firebaseapp.com",
  databaseURL: "https://cleaning-bot.firebaseio.com",
  storageBucket: "cleaning-bot.appspot.com",
  messagingSenderId: "585422219435"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
