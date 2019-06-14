 var config = {
      apiKey: "AIzaSyA9S8PIArbHxiZGfV7EXsfxMLeEVaxPG7g",
      authDomain: "antibuddies-1019a.firebaseapp.com",
      databaseURL: "https://antibuddies-1019a.firebaseio.com",
      projectId: "antibuddies-1019a",
      storageBucket: "antibuddies-1019a.appspot.com",
      messagingSenderId: "533152371568",
      appId: "1:533152371568:web:24876187a15d6c91"
    };
      firebase.initializeApp(config); 

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "User Email : " + email_id;
      //window.location.href("C:/Users/Rachel/Documents/CS4450/project/AntiBuddies-/home.html")
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

//window.alert(user.uid)
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function newUser(){

  document.getElementById("firstname_para").innerHTML;

//window.alert(user.uid)
  

  /*var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
  });*/

}

function home(){
  window.location.href="home.html";
}

function logout(){
  firebase.auth().signOut();
}

function newUserlogin(){
  //window.alert(user.uid)
  var userFirst = document.getElementById("firstname").value;
  var userLast = document.getElementById("lastname").value;
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;


  firebase.auth().signInWithEmailAndPassword(userFirst, userLast, userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}