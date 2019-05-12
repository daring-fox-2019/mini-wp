'use strict';
$(document).ready(function () {
  // $('[data-toggle="tooltip"]').tooltip();
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active')
  });

  $('.collapse.in').toggleClass('in');
  $('a[aria-expanded=true]').attr('aria-expanded', 'false');

  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
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

// start VUE codes
var serverURL = 'http://localhost:3000';

var app = new Vue({
  el: '#miniWP',
  data: {
    loading: false,
    config: null,
    isLogin: false,
    page: '',
    user: {
      _id: '',
      email: '',
      name: '',
    },
    currentPost: null,
  },
  methods: {
    loginSuccess() {
      this.isLogin = true;
      this.page = 'index'
    },
    logout() {
        let self = this
        var auth2 = gapi.auth2.getAuthInstance();

        auth2.signOut().then(function () {
          localStorage.removeItem('miniwp_token')
          localStorage.removeItem('miniwp_name')
          localStorage.removeItem('miniwp_email')

          self.page = "login"
          self.config = null
          self.isLogin = false;
        });
    },
    showIndex() {
      if(localStorage.getItem('miniwp_token')) {
        this.page = 'index'

      }
      else {
        this.page = 'login'
      }
    },
    showCreatePost() {
      this.page = 'createPost'
    },
    showLogin() {
      this.page = 'login'
    },
    showRegister() {
      this.page = 'register'
    },
    showUpdatePost(id) {
      axios.get(serverURL + '/articles/' + id, this.config)
      .then(({data}) => {
        this.currentPost = data
        this.page = 'updatePost'
      })
      .catch(({response}) => {
        console.log(response);
        Swal.fire(
          'Error!',
          response.data.error.message,
          'error'
        )
      })
    },
    showDetailPost(id) {
      axios.get(serverURL + '/articles/' + id, this.config)
      .then(({data}) => {
        this.currentPost = data
        this.page = 'detailPost'
      })
      .catch(({response}) => {
        console.log(response);
        Swal.fire(
          'Error!',
          response.data.error.message,
          'error'
        )
      })
    },
  },
  mounted() {
    if(localStorage.getItem('miniwp_token')) {
      this.isLogin = true
      this.page = 'index'
      this.config = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.miniwp_token
        }
      }
    }
    else {
      this.isLogin = false;
      this.page = 'login'
    }
  }
})
