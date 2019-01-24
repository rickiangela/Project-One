// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2x5ejtvQv8l5fMdsenPXuxIMbiiWDay0",
    authDomain: "project-one-34b56.firebaseapp.com",
    databaseURL: "https://project-one-34b56.firebaseio.com",
    projectId: "project-one-34b56",
    storageBucket: "project-one-34b56.appspot.com",
    messagingSenderId: "87245655562"
};

firebase.initializeApp(config);

var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
        window.location.href = "index.html";
    };
});

$("#updateInfo").on("click",function(event){
    event.preventDefault();
    
    email = $("#email").val().trim();
    password = $("#password").val().trim();
    childAge = $("#childAge").val().trim();

    var user = firebase.auth().currentUser;

    if(password != ""){
        user.updatePassword(password).then(function() {
            console.log("You Did It!");
        }).catch(function(error) {
            $("#signInText").text(error.message)
            $("#myModal").modal();
        });
        $("#password").val("");
        $("#passwordText").text("Your password has been changed")
        $("#passwordModal").modal();
    };

    if(email != ""){
        user.updateEmail(email).then(function() {
            console.log("You Did It!");
        }).catch(function(error) {
            $("#signInText").text(error.message)
            $("#emailText").modal();
        });
        $("#email").val("");
        $("#emailText").text("Your email has been changed")
        $("#emailModal").modal();
    };

    if(childAge != ""){
        var userId = firebase.auth().currentUser;
        
        firebase.database().ref("users/" + userId.uid).update({
            childAge: childAge
        });
        $("#childAge").val("");
        $("#signInText").text("Your childs age has been updated.")
        $("#myModal").modal();
    };

});

$(".child-button").on("click", function(){
    window.location.href = "account.html";
}); 

$(".home-button").on("click", function(){
    window.location.href = "parentPage.html";
}); 

$(".sign-out").on("click", function(){
    firebase.auth().signOut().then(function() {
        window.location.href = "index.html";
    }).catch(function(error) {
        $("#signInText").text(error.message)
        $("#myModal").modal();
    });
}); 

// $("").on("click", function(){
//     var user = firebase.auth().currentUser;

//     user.delete().then(function() {
//     // User deleted.
//     }).catch(function(error) {
//     console.log(error.message)
//     });
// }); 

