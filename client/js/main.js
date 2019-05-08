$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
    });

    let $publishCategory = $('#cat-publish')
    let $draftCategory = $('#cat-draft')

    $publishCategory.on('click', function () {
       if(!$publishCategory.hasClass('active')) {
          $publishCategory.toggleClass('active');
          $draftCategory.removeClass('active');
       }
    });

    $draftCategory.on('click', function () {
      if(!$draftCategory.hasClass('active')) {
        $draftCategory.toggleClass('active');
        $publishCategory.removeClass('active');
      }
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

const serverURL = 'http://localhost:3000';

function showCreatePost() {
  $('#createPost').show()
  $('#index').hide()
  $('#updatePost').hide()
  $('#loginPage').hide()
  $('#registerPage').hide()
}

function showIndex() {
  $('#index').show()
  $('#createPost').hide()
  $('#updatePost').hide()
  $('#loginPage').hide()
  $('#registerPage').hide()
}

function showUpdatePost() {
  $('#updatePost').show()
  $('#createPost').hide()
  $('#index').hide()
  $('#loginPage').hide()
  $('#registerPage').hide()
}

function showLogin() {
  $('#loginPage').show()
  $('#registerPage').hide()
  $('#index').hide()
  $('#updatePost').hide()
  $('#createPost').hide()
}

function showRegister() {
  $('#registerPage').show()
  $('#loginPage').hide()
  $('#index').hide()
  $('#updatePost').hide()
  $('#createPost').hide()
}

function onSignIn(googleUser) {
  console.log('sampaiii login...di main.js');
}

var app = new Vue({
  el: '#miniWP',
  data: {
    isLogin: false,
    user: {
      _id: '',
      email: '',
      name: '',
    }
  },
  created() {
    console.log('created main...');
    showLogin()

    /* 
    if(localStorage.getItem('miniwp_token')) {
      showIndex()
    }
    else {
      showLogin()
    } */
  }
})
