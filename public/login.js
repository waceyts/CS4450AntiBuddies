// var AWS = require('aws-sdk');
// var uuid = require('uuid');
// var sha256 = require('js-sha256');

//AWS configurations
AWS.config.update({region:'us-east-2'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-2:ae65310a-354d-4f4b-a770-e5d13c2cc74e'});

var lambda = new AWS.Lambda({region: 'us-east-2', apiVersion: '2015-03-31'});


//variables that hold lambda responses
var responseVal;
var loginResponse;
var isLoggedIn = false;
var user;
var getUserPromise;
var firstName;
var lastName;
var userName;
var password;
var newUserResponse;


  //init
  window.onload = function() {
    // inititally hide the user welcome
    document.getElementById("user_div").style.display = "none";


      if (isLoggedIn) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_form").style.display = "none";

        if(user != null){
          var email_id = user.email;
          document.getElementById("user_para").innerHTML = "User Email : " + email_id;
        }

      } else {
    //     // No user is signed in.
        document.getElementById("login_form").style.display = "block";
        document.getElementById("user_div").style.display = "none";

      }
    // });

  }


  function getUser(userID) {

    // create JSON object for getUser
    var params = {
      FunctionName : "getUserWeb",
      InvocationType : "RequestResponse",
      LogType : "None",
      Payload : '{"ID":"'+String(userID)+'"}',
    };

    getUserPromise = new Promise((resolve, reject) => {
      lambda.invoke(params, function(error, data) {
        if (error) {
          prompt(error, error.stack);
          //debugger;
          reject();
        } else {
          responseVal = JSON.parse(data.Payload);
          user = responseVal[0];
          // debugger;
          resolve(user);
        }
      });
      resolve();
    })
  }

  function getUserFirstName(user) {
    return user.userFirst;
  }


function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  var passHash = sha256(userPass);


  // create JSON object for loginParams
  var loginParams = {
    FunctionName : "loginUser",
    InvocationType : "RequestResponse",
    LogType : "None",
    Payload : '{"username":"'+String(userEmail)+
              '","password":"'+String(passHash)+'"}',
  };

  lambda.invoke(loginParams, function(error, data) {
    if (error) {
      prompt(error, error.stack);
    } else {
      console.log('data: '+ data.Payload);
      loginResponse = JSON.parse(data.Payload);

      //if login was successful
      if (loginResponse.response) {
        userID = loginResponse.ID;
        console.log("UserID: " + userID);
        // debugger;

        //TODO getUser to work
        getUserPromise
          .then(function(user) {
            console.log("User: "+user);
            document.getElementById("getUserFirst").innerHTML = "Welcome " + getUserFirstName(user);
        }, function() {
            console.log("failed");
        })
        // debugger; 

      
      }
      else {
        //wrong login information
        //TODO: Raise error
      }
    }
  });

  directAfterLogin(user);

}


function addUser() {

  //get all input values
  firstName = document.getElementById("first_name_field").value;
  lastName = document.getElementById("last_name_field").value;
  userName = document.getElementById("user_name_field").value;
  password = document.getElementById("create_password_field").value;
  // debugger;

  var passToStore = sha256(password);


  var addUserParams = {
    FunctionName : "createUser",
    InvocationType : "RequestResponse",
    LogType : "None",
    Payload : '{"firstName":"'+String(firstName)+
                '","lastName":"'+String(lastName)+
                '","username":"'+String(userName)+
                '","password":"'+String(passToStore)+
                '"}',
  };

  lambda.invoke(addUserParams, function(error, data) {
    if (error) {
      prompt(error, error.stack);
    } else {
      console.log('newUser: '+ data.Payload);
      newUserResponse = JSON.parse(data.Payload);
      user = newUserResponse;

      directAfterLogin(user);
    }
  });

}

function directAfterLogin(user) {

  isLoggedIn = true;

  document.getElementById("user_div").style.display = "block";
  document.getElementById("login_form").style.display = "none";

}

function admin(){
  window.location.href="admin.html";
}

function practiceQuestions(){
  window.location.href="quiz.html";
}

function courses(){
  window.location.href="courses.html";
}

function immunhematology(){
  window.location.href="Immunhematology.html";
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

