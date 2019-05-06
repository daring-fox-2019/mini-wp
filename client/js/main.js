$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
    });

    $('#cat-publish').on('click', function () {
        $('#cat-publish').toggleClass('active');
        $('#cat-draft').removeClass('active');
    });
    $('#cat-draft').on('click', function () {
        $('#cat-draft').toggleClass('active');
        $('#cat-publish').removeClass('active');
    });

    // close dropdowns
    $('.collapse.in').toggleClass('in');
    // and also adjust aria-expanded attributes we use for the open/closed arrows
    // in our CSS
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
});