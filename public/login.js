  //Trying to import AWS / Firebase
  
  // var config = {
  //     apiKey: "AIzaSyDYRTle8vQqNZDCL_wx2HZflZfMf_k2dBk",
  //     authDomain: "antibuddies-1019a.firebaseapp.com",
  //     databaseURL: "https://antibuddies-1019a.firebaseio.com",
  //     projectId: "antibuddies-1019a",
  //     storageBucket: "antibuddies-1019a.appspot.com",
  //     messagingSenderId: "533152371568",
  //     appId: "1:533152371568:web:24876187a15d6c91"
  //   };
  //     firebase.initializeApp(config); 

////////////////////////////////////////////////////////////////////////////

//AWS configurations
AWS.config.update({region:'us-east-2'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-2:ae65310a-354d-4f4b-a770-e5d13c2cc74e'});

var lambda = new AWS.Lambda({region: 'us-east-2', apiVersion: '2015-03-31'});

var blob = new Blob(['ID:1'], {type: 'text/plain'});
// create JSON object for parameters for invoking Lambda function
var params = {
  FunctionName : "getUserWeb",
  InvocationType : "RequestResponse",
  LogType : "None",
  Payload : "{ID:2}",
};

// create variable to hold data returned by the Lambda function
var responseVal;

  //init
  window.onload = function() {
    // inititally hide the user welcome
    document.getElementById("user_div").style.display = "none";


    //firebase AUTH content
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     document.getElementById("user_div").style.display = "block";
    //     document.getElementById("login_form").style.display = "none";

    //     var user = firebase.auth().currentUser;

    //     if(user != null){

    //       var email_id = user.email;
    //       document.getElementById("user_para").innerHTML = "User Email : " + email_id;
        
    //     }
    //   } else {
    //     // No user is signed in.
    //     document.getElementById("login_form").style.display = "block";
    //     document.getElementById("user_div").style.display = "none";

    //   }
    // });

  }


  function getUser() {
    lambda.invoke(params, function(error, data) {
      if (error) {
        prompt(error, error.stack);
      } else {
        console.log('were somewhat in');
        console.log('data: '+ data.Payload);
        responseVal = JSON.parse(data.Payload);
        debugger;
        console.log("responseVal: " + responseVal);
      }
    });
  }


function login(){

//window.alert(user.uid)
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  // firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;

  //   window.alert("Error : " + errorMessage);

  //   // ...
  // });

//START OF POST REQUEST
var url = "https://antibuddies-274a7.web.app/index.html";
var data = { "email":"ssmith@gmail.com"};

var xhr = new XMLHttpRequest();
xhr.responseType = "json"; // xhr.response will be parsed into a JSON object
xhr.open('GET', "https://antibuddies-274a7.web.app/index.html", true);
xhr.send();
 
xhr.onreadystatechange = processRequest;
 
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.response.ip); // no parsing needed
    }
}
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

//   getText = function(url, callback) // How can I use this callback?
// {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function()
//     {
//         if (request.readyState == 4 && request.status == 200)
//         {
//             callback(request.responseText); // Another callback here
//         }
//     }; 
//     request.open('GET', url);
//     request.send();
// }

// function mycallback(data) {
//    alert(data);
// }

// getText('', mycallback); //passing mycallback as a method

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

}

function courses(){
  window.location.href="courses.html";
}


function immunhematology(){
  window.location.href="immunhematology.html";
}

function chemistry(){
  window.location.href="chemistry.html";
}

function home(){
  window.location.href="home.html";
}

function logout(){
  firebase.auth().signOut();
}

function newPanel(){
  window.location.href="admin-grid.html";
}

function newQuestion() {
  window.location.href="admin-quiz.html";
}

function antigram(){
  window.location.href="grid.html";
}

function beginner(){
  window.location.href="panel.html"
}

function intermediate(){
  window.location.href="panel.html";
}

function advanced(){
  window.location.href="panel.html";
}

function quiz(){
  window.location.href="quiz.html";
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