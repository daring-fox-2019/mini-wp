$(document).ready(function(){
    $("#create-form").hide()

    $("#new-article").click(function(){
        event.preventDefault()
        $("#content-list").hide()
        $("#create-form").show()
    })

    $("#create-article").click(function(){
        event.preventDefault()
        $("#content-list").show()
        $("#create-form").hide()
    })
})