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
            var errorMessage = error.message;
            console.log(errorMessage)
        }).then(function(){
            firebase.database().ref("/users/" + userId).update({
                timeLimit: "0"
            });
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

// ========================== 0-5 Video Requests and Appends ========================
// On load to sync api and broswer loading
window.onload = function video() {
    console.log("hi")
    // Sets initial query to first slide in carosel
    var qSearch = "blippi"

    // API get is being set
    gapi.client.setApiKey('AIzaSyDQ3VgLYjf0HR-CCHFPmAvWwk2e4ENK-M0');
    // Here is the request being made by terms and allows safeSearch
    var restRequest = gapi.client.request({
        'path': 'youtube/v3/search',
        'params': {
            'q': qSearch,
            'part': 'snippet',
            'safeSearch': 'strict'
        }
    });
    
    // console.log(restRequest);
    // Response return
    restRequest.execute(function (resp) {
        console.log(resp);
        // For loop to grab items and append to the page
        for (i in resp.items) {
            $('.container2').append('<iframe width="250" height="auto" src="//www.youtube.com/embed/' + resp.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>');
        }
    });
        
    // On click set-up for user interaction
    $("img").on("click", function () {
        // event.preventDefault();
        // console.log("Working");
        // Clears container of current videos
        $('.container2').empty();
        // Sets the search term to the value of the current item clicked
        qSearch = $(this).attr("value");
        // console.log(this);
        // console.log(qSearch);
        // This will rerun the request to the API
        gapi.client.setApiKey('AIzaSyDQ3VgLYjf0HR-CCHFPmAvWwk2e4ENK-M0');
        restRequest = gapi.client.request({
            'path': 'youtube/v3/search',
            'params': {
                'q': qSearch,
                'part': 'snippet',
                'safeSearch': 'strict'
            }
        });
        // Returns the request back and will run the same loop to append items to page
        restRequest.execute(function (resp) {
            
            for (i in resp.items) { 
                $('.container2').append('<iframe width="250" height="auto" src="//www.youtube.com/embed/' + resp.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>');
            }
        });
    });
}

$("#littleSearchbtn").on("click", function (event){
    event.preventDefault();
    // Sets initial query to first slide in carosel
    $('.container2').empty()
    var qSearch = $("#littleSearch").val().trim();

    console.log(qSearch)
    // API get is being set
    gapi.client.setApiKey('AIzaSyDQ3VgLYjf0HR-CCHFPmAvWwk2e4ENK-M0');
    // Here is the request being made by terms and allows safeSearch
    var restRequest = gapi.client.request({
        'path': 'youtube/v3/search',
        'params': {
            'q': qSearch,
            'part': 'snippet',
            'safeSearch': 'strict'
        }
    });

    // console.log(restRequest);
    // Response return
    restRequest.execute(function (resp) {
        console.log(resp);
        // For loop to grab items and append to the page
        for (i in resp.items) {
            $('.container2').append('<iframe width="250" height="auto" src="//www.youtube.com/embed/' + resp.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>');
        }
    });
        
    // On click set-up for user interaction
    $("img").on("click", function () {
        // event.preventDefault();
        // console.log("Working");
        // Clears container of current videos
        $('.container2').empty();
        // Sets the search term to the value of the current item clicked
        qSearch = $(this).attr("value");
        // console.log(this);
        // console.log(qSearch);
        // This will rerun the request to the API
        gapi.client.setApiKey('AIzaSyDQ3VgLYjf0HR-CCHFPmAvWwk2e4ENK-M0');
        restRequest = gapi.client.request({
            'path': 'youtube/v3/search',
            'params': {
                'q': qSearch,
                'part': 'snippet',
                'safeSearch': 'strict'
            }
        });
        // Returns the request back and will run the same loop to append items to page
        restRequest.execute(function (resp) {
            // console.log(resp);
            for (i in resp.items) { 
                $('.container2').append('<iframe width="250" height="auto" src="//www.youtube.com/embed/' + resp.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>');
            }
        });
    });
});
