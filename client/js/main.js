$(document).ready(function () {
    $('#summernote').summernote({
        placeholder: 'Start writing here...',
        tabsize: 2,
        height: 200,
      });

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

    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');

    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

  }, false);
});