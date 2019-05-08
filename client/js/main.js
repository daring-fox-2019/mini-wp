function initUIComponents() {
  
}

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
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

function onSignIn(googleUser) {
  
}

// start VUE codes

const serverURL = 'http://localhost:3000';

var app = new Vue({
  el: '#miniWP',
  data: {
    isLogin: false,
    page: '',
    user: {
      _id: '',
      email: '',
      name: '',
    }
  },
  methods: {
    logout() {
        let self = this
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          localStorage.removeItem('miniwp_token')
           self.isLogin = false;
           self.page = 'login'
        });
    },
    showIndex() {
      this.page = 'index'
    },
    showCreatePost() {
      this.page = 'createPost'
    },
    showLogin() {
      this.page = 'login'
    },
    showRegister() {
      this.page = 'register'
    }
  },
  created() {
    if(localStorage.getItem('miniwp_token')) {
      this.login()
    }
    else {
      this.isLogin = false;
      this.showLogin()
    }
  }
})
