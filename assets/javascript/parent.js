$("#submitBtn").on("click",function (event){
    
    event.preventDefault();

    var search = $("#searchInput").val().trim();
    var queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=3d72ad8b736142c3a32863f235626190";
   
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);
    });
    
});