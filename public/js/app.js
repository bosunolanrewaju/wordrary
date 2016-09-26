'use strict';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxgCE_5x7WcMvn_afVExgoKKB_3Hfv8_k",
  authDomain: "wordrary.firebaseapp.com",
  databaseURL: "https://wordrary.firebaseio.com",
  storageBucket: "wordrary.appspot.com",
  messagingSenderId: "105036030377"
};
firebase.initializeApp(config);

// Login Button Actions
var facebookBtn = document.getElementById('facebook-btn');
var googleBtn = document.getElementById('google-btn');
var logoutBtn = document.getElementById('logout-btn');

[facebookBtn, googleBtn].forEach(function(btn) {
  btn.addEventListener('click', function(evt) {
    evt.preventDefault();
    var provider = initializeProvider(this.id);
    firebase.auth().signInWithRedirect(provider);
  });
});

function initializeProvider(id) {
  if(id == 'facebook-btn')
    return new firebase.auth.FacebookAuthProvider();

  if(id == 'google-btn')
    return new firebase.auth.GoogleAuthProvider();
}

firebase.auth().getRedirectResult().then(function(res) {
  if(res.credential)
    var token = res.credential.accessToken;

  var user = res.user;
}).catch(function(err) {
  console.log(err);
});


// Logout
logoutBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log("Sign out successful");
  }, function(err) {
    console.log(err);
  })
})
