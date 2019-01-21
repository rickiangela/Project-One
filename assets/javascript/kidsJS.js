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
var timeLimit="";
var intervalId;
$("#timer").hide()

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userId = firebase.auth().currentUser.uid;

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(function() {
            return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                timeLimit = snapshot.val().timeLimit;
                console.log(timeLimit);
                startTimer()
            });
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
        
    } else {
        window.location.href = "index.html";
    };
});

function startTimer() {
    console.log(timeLimit)
    if (timeLimit != "0"){
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 60000);
    $("#timer").show()
    $("#timer").html(timeLimit + " Minutes Left");
    }else{
        console.log("Timer is not on")
    }
}


function decrement(){
    timeLimit--;
    $("#timer").html(timeLimit + " Minutes Left");

    if (timeLimit == 0) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user){
                var userId = firebase.auth().currentUser.uid;

                firebase.database().ref("users/" + userId).update({
                    timeLimit: "0"
                }).then(firebase.auth().signOut()).then(function() {
                    window.location.href = "index.html";
                }).catch(function(error) {
                    console.log(error.message)
                });
            }
        });
    }
}


