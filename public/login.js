 var config = {
      apiKey: "AIzaSyDYRTle8vQqNZDCL_wx2HZflZfMf_k2dBk",
      authDomain: "antibuddies-1019a.firebaseapp.com",
      databaseURL: "https://antibuddies-1019a.firebaseio.com",
      projectId: "antibuddies-1019a",
      storageBucket: "antibuddies-1019a.appspot.com",
      messagingSenderId: "533152371568",
      appId: "1:533152371568:web:24876187a15d6c91"
    };
      firebase.initializeApp(config); 
      window.onload = function() {
        // inititally hide the user welcome
        document.getElementById("user_div").style.display = "none";

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            document.getElementById("user_div").style.display = "block";
            document.getElementById("login_form").style.display = "none";

            var user = firebase.auth().currentUser;

            if(user != null){

              var email_id = user.email;
              document.getElementById("user_para").innerHTML = "User Email : " + email_id;
            
            }
          } else {
            // No user is signed in.
            document.getElementById("login_form").style.display = "block";
            document.getElementById("user_div").style.display = "none";

          }
        });
      }

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

//START OF POST REQUEST
// var url = "https://us-central1-antibuddies-274a7.cloudfunctions.net/getUserWithEmail";
// var method = "POST";
// var postData = { "email":"ssmith@gmail.com"};

// You REALLY want shouldBeAsync = true.
// Otherwise, it'll block ALL execution waiting for server response.
// var shouldBeAsync = true;

//var request = new XMLHttpRequest();

// Before we send anything, we first have to say what we will do when the
// server responds. This seems backwards (say how we'll respond before we send
// the request? huh?), but that's how Javascript works.
// This function attached to the XMLHttpRequest "onload" property specifies how
// the HTTP response will be handled. 
//request.onload = function () {

   // Because of javascript's fabulous closure concept, the XMLHttpRequest "request"
   // object declared above is available in this function even though this function
   // executes long after the request is sent and long after this function is
   // instantiated. This fact is CRUCIAL to the workings of XHR in ordinary
   // applications.

   // You can get all kinds of information about the HTTP response.
  //  var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
  //  var data = request.responseText; // Returned data, e.g., an HTML document.
//}

// request.open(method, url, shouldBeAsync);

//request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// Or... request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
// Or... whatever

// Actually sends the request to the server.
// request.send(postData);

// }

// function newUser(){

//   document.getElementById("firstname_para").innerHTML;

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

//}

function home(){
  window.location.href="home.html";
}

function logout(){
  firebase.auth().signOut();
}

function newPanel(){
  window.location.href="admin-grid.html";
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
}