const serverURL = 'http://localhost:3000';

new Vue ({
  el: '#app',

  data: {
    activeUser: '',
    isLogin: true,
    isRegister: false,
    isOauth: false,

    isWelcome: true,

    drawer: null,

  },

  created() {
    this.logCheck();
  },

  methods: {
    logCheck() {
      if (localStorage.token) {
        this.isWelcome = false;
      }
    },

    toggleWelcome() {
      this.isLogin = !this.isLogin;
      this.isRegister = !this.isRegister;
    },

    login(data) {
      axios({
        method: 'post',
        data,
        url: `${serverURL}/login`
      })
        .then(({ data }) => {
          const { token, user, message } = data;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', token);
          this.activeUser = user;
          this.isWelcome = false;
        })
        .catch(err => {
          const { message } = err.response.data;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    register(data) {
      axios({
        method: 'post',
        data,
        url: `${serverURL}/register`
      })
        .then(({ data }) => {
          const { message } = data;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
          this.toggleWelcome();
        })
        .catch(err => {
          const { message } = err.response.data;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    logout() {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'logged out',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem('token');
      this.activeUser = '';
      this.isWelcome = true;
    }
  }
});
