Vue.component('FormLogin', {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  mounted: function () {
    gapi.signin2.render('g-signin2', {
      scope: 'email',
      width: '280',
      longtitle: true,
      onsuccess: this.googleSigned
    })
  },
  methods: {
    handleSubmitLogin: function () {
      axios
        .post('/auth/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.$emit('on-login', data)
        })
        .catch(err => console.log(err))
    },
    googleSigned: function (googleUser) {
      let {id_token} = googleUser.getAuthResponse()

      this.$emit('google-signed', id_token)
    },
    renderButton: function () {
      console.log('render button')
    }
  },
  template: `
    <div class="pt-5">
      <div class="card mx-auto" style="width: 320px">
        <div class="card-body">
          <h5 class="card-title">Login</h5>
          <hr />
          <form @submit.prevent="handleSubmitLogin">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                class="form-control"
                type="email"
                name="email"
                v-model="email"
                required
                autofocus
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                type="password"
                name="password"
                v-model="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-block btn-success border mt-3">
              Login
            </button>
            <p class="text-secondary text-center mt-3 mb-1" style="font-size: 70%">Or, you can sign in with google</p>
            <div id="g-signin2"></div>
          </form>
        </div>
      </div>
    </div>
  `
})
