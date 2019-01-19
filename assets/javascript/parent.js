function openArticles(){

    var search = "Kids";
    var queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=e399cee38ee9457b83fb4fa2819d53da";
   
    console.log(queryURL)

    $.ajax({
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
    $("#articles").empty()
    var search = $("#searchVal").val().trim();
    var queryURL = "https://newsapi.org/v2/everything?q=" + search + "&apiKey=e399cee38ee9457b83fb4fa2819d53da";
   
    console.log(queryURL)

    $.ajax({
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
    
});