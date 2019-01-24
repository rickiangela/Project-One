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

var parentName = "";
var childName = "";
var childAge = "";
var displayName = "";

firebase.auth().onAuthStateChanged(function(user){
    if (user){
        window.location.href = "account.html";
    };
});

$("#btn1").on("click", function (event) {

    event.preventDefault();

    var email = $("#InputParent1").val().trim();
    var password = $("#InputChild1").val().trim();
    console.log(email + password);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                 // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#signInText").text(errorMessage)
                $("#myModal").modal();
                console.log(errorCode);
                console.log(errorMessage);
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signInText").text(errorMessage)
        $("#myModal").modal();
        console.log(errorCode);
        console.log(errorMessage);
    }).then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                $(".done").val("")
                window.location.href = "account.html"
            };
        });
    });
});

$("#newUserbtn").on("click", function (e) {

    event.preventDefault();
    var parentName = $("#inputName").val().trim();
    var childName = $("#inputChild").val().trim();
    var childAge = $("#inputAge").val().trim();
    var displayName = $("#displayName1").val().trim();
    var email = $("#InputEmail1").val().trim();
    var password = $("#InputPassword1").val().trim();

    if ($("#inputName").val().trim() != "" && $("#inputChild").val().trim() != "" && $("#inputAge").val().trim() != "" && $("#displayName1").val().trim() != "" && $("#InputEmail1").val().trim() != "" && $("#InputPassword1").val().trim() != ""){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#signInText").text(errorMessage)
                $("#myModal").modal();
                console.log(errorCode);
                console.log(errorMessage);
            }).then(function (userId) {
                    var userId = firebase.auth().currentUser;
                    console.log(userId)
                    firebase.database().ref("users/" + userId.uid).set({
                        parentName: parentName,
                        childName: childName,
                        childAge: childAge,
                        displayName: displayName,
                        timeLimit: "0"
                    });
            }).then(function () {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in.
                        $(".done").val("")
                        window.location.href = "account.html"
                    } else {

                    }
                });
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#signInText").text(errorMessage)
            $("#myModal").modal();
            console.log(errorCode);
            console.log(errorMessage);
        });   
    }else{
        $("#signInText").text("Please fill in all fields, Thank You!")
        $("#myModal").modal();
    }
});

