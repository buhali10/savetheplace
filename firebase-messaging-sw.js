// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCZqb22ogsH-dKbE28e4bv5UbfTJNjZkGk",
  authDomain: "save-the-place-app.firebaseapp.com",
  projectId: "save-the-place-app",
  storageBucket: "save-the-place-app.appspot.com",
  messagingSenderId: "605267219747",
  appId: "1:605267219747:web:f188d3105fa2ea84aba896"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

