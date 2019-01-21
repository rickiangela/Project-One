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
$(".bigChildDiv").hide();
$(".littleChildDiv").hide();
$(".parentDiv").hide();

firebase.auth().onAuthStateChanged(function(user){
    if (user){
        var userId = firebase.auth().currentUser.uid;
        
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            var parentName1 = snapshot.val().parentName;
            var childName1 = snapshot.val().childName;
            var displayName = snapshot.val().displayName;
            localStorage.clear();
            localStorage.setItem("displayName", displayName);
            
            childAge = snapshot.val().childAge;
            parentName = parentName1.toUpperCase();
            childName = childName1.toUpperCase();
            
            setUp()
        });
    }else{
        window.location.href = "index.html";
    };
    
    function setUp(){
        if (childAge <= 5){
            $("#parents").text(parentName);
            $("#littlechild").text(childName);
            $(".parentDiv").show();
            $(".littleChildDiv").show();
        }else{
            $("#parents").text(parentName);
            $("#bigchild").text(childName);
            $(".parentDiv").show();
            $(".bigChildDiv").show();
        };
    };
});

$('.timePicked').change(function (e) {
    var timeLimit = $(e.target).val()
    console.log(timeLimit)

    function timeSetter(userId) {
        var userId = firebase.auth().currentUser;
        firebase.database().ref("users/" + userId.uid).update({
            timeLimit: timeLimit
        });
    }
    timeSetter()
});