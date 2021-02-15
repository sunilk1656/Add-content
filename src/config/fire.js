import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDjF56htrcz8IFcNBzsf3wg7FtkVOcY2iA",
    authDomain: "authtodoapp-a82e8.firebaseapp.com",
    projectId: "authtodoapp-a82e8",
    storageBucket: "authtodoapp-a82e8.appspot.com",
    messagingSenderId: "301227466757",
    appId: "1:301227466757:web:20d5dd5f4df3ef6696bc6c"
  };
  // Initialize Firebase
 let fire = firebase.initializeApp(firebaseConfig);


export default fire