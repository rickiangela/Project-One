var $j = jQuery.noConflict(true);

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
var displayName = "";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userId = firebase.auth().currentUser.uid;

        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            displayName = snapshot.val().displayName;
        })
    } else {
        window.location.href = "index.html";
    }
   
})

database.ref("/chat").on("child_added", function (childInfo){
    console.log(childInfo.val());
    var userName = localStorage.getItem("displayName")
    var chatName = childInfo.val().displayName;
    var message = childInfo.val().message;
    
    if (chatName == userName){
        var p = $("<p>").text(chatName + " says: " + message)
        p.addClass("self")
        $("#chatMessage").append(p)
    }else{
        var p = $("<p>").text(chatName + " says: " + message)
        p.addClass("notSelf")
        $("#chatMessage").append(p)
    }; 
});

$("#chatSend").on("click", function(e){
    e.preventDefault();
    
    var message = $("#text").val().trim();

    if ( message === ""){
        $("#signInText").text("Please write a message.")
        $("#myModal").modal();
    }else{
        database.ref("/chat").push({
            message: message,
            displayName: displayName,
            dateAdded : firebase.database.ServerValue.TIMESTAMP
        });
        
        $("#text").val("");
    }
});



function openArticles(){

    var search = "Kids";
    var queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=e399cee38ee9457b83fb4fa2819d53da";
   
    console.log(queryURL)

    $j.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);

        var results = response.articles;

        for (var i=0; i< 4; i++) {
            var author = results[i].author;
            var description = results[i].description;
            var fullarticle = results[i].url;
            var title = results[i].title;

            var mainDiv = $("<div>").addClass("card");

            var bodyDiv = $("<div>").addClass("card-body");

            var h3 = $("<h3>").text("Title: " + title);
            h3.addClass("card-title");

            var p = $("<p>").text(description);
            p.addClass("card-text");

            var authorDiv = $("<h6>").text("Author: " + author)

            var a = $("<a>").attr("href",fullarticle)
            a.addClass("btn btn-primary")
            a.text("Read Full Article")

            bodyDiv.append(h3)
            bodyDiv.append(p)
            bodyDiv.append(authorDiv)
            bodyDiv.append(a)

            mainDiv.append(bodyDiv)

            $("#articles").prepend(mainDiv)

        };
    });
    
};

openArticles()

$("#searchEnter").on("click",function (event){
    
    event.preventDefault();

    if ($("#searchVal").val().trim() === "") {

        $("#signInText").text("Your search is empty")
        $("#myModal").modal();

    }else{

        $("#articles").empty()
        var search = $("#searchVal").val().trim();
        var queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=e399cee38ee9457b83fb4fa2819d53da";
   
        $j.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            console.log(response);

            var results = response.articles;

            for (var i=0; i< 4; i++) {
                var author = results[i].author;
                var description = results[i].description;
                var fullarticle = results[i].url;
                var title = results[i].title;

                var mainDiv = $("<div>").addClass("card");

                var bodyDiv = $("<div>").addClass("card-body");

                var h3 = $("<h3>").text("Title: " + title);
                h3.addClass("card-title");

                var p = $("<p>").text(description);
                p.addClass("card-text");

                var authorDiv = $("<h6>").text("Author: " + author)

                var a = $("<a>").attr("href",fullarticle)
                a.addClass("btn btn-primary")
                a.text("Read Full Article")

                bodyDiv.append(h3)
                bodyDiv.append(p)
                bodyDiv.append(authorDiv)
                bodyDiv.append(a)

                mainDiv.append(bodyDiv)

                $("#articles").prepend(mainDiv)

            };
        });
    };
});



$(".child-button").on("click", function(){
    window.location.href = "account.html";
}); 

$(".settings-page").on("click", function(){
    window.location.href = "settingsPage.html";
}); 

$(".sign-out").on("click", function(){
    firebase.auth().signOut().then(function() {
        window.location.href = "index.html";
    }).catch(function(error) {
        alert(errorMessage)
        alert("You are not signed out. Please try again.")
    });
}); 
