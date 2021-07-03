import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBKXLVpuMjYwUb8O2VQUV58jcTpjIBfv4M",
    authDomain: "talkative-e62fd.firebaseapp.com",
    projectId: "talkative-e62fd",
    storageBucket: "talkative-e62fd.appspot.com",
    messagingSenderId: "1031550372436",
    appId: "1:1031550372436:web:a6600f9d7a49048149bbc1"
  };

const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default fire 