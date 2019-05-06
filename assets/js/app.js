function showArticlePage() {
    $("#article").hide()
    $("#list").show()
}

function showArticleCreatePage(){
    $("#article").show()
    $("#list").hide()
}


$(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#sidebar__article-link").on('click',function() {
        showArticlePage()
    })

    $("#sidebar__create-link").on('click',function() {
        showArticleCreatePage()
    })

    $('#summernote').summernote({
        placeholder: 'Body',
        tabsize: 2,
        height: 500
    });
})