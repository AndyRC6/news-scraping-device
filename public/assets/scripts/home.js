$(document).ready(function(){

    $(".form-group").hide();

    $("#scrape-btn").on("click", function(){
        event.preventDefault();
        $.get("/scrape", function(data){
            location.reload();
        })
    })

    $(document).on("click", ".article-div", function(){
        $(".form-group").show();
       $("#form-article-id").val($(this).attr("data-article-id"));
    })


})