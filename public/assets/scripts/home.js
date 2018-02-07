$(document).ready(function(){
    $("#comment-container").hide();
    $(".form-group").hide();

    $("#scrape-btn").on("click", function(){
        event.preventDefault();
        $.get("/scrape", function(data){
            location.reload();
        })
    })

    $("#delete-comments-btn").on("click", function(){
        $.get("/removecomments");
    })

    $(document).on("click", ".article-div", function(){
        $.get("/getcomments/" + $(this).attr("data-article-id"), function(data){
            if(data.length > 0)
            {
                $("#comments-go-here").html("");
                for(i = 0; i < data.length; i++)
                {
                    $("#comments-go-here").append('<p><b>' + data[i].user + ': ' + data[i].comment + '</b></p><hr />');
                    console.log(data);
                }
            }
            else
            {
                $("#comments-go-here").html("");
                $("#comments-go-here").append("<h3>No Comments Were Found for This Article</h3>");
            }
        })

        $(".article-div").css("background-color", "slategrey").css("color", "black");
        $(this).css("background-color", "grey").css("color", "white");
        $("#comment-container").show();
        $(".form-group").show();
        $("#form-article-id").val($(this).attr("data-article-id"));
    })


})