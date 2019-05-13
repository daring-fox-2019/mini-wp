Vue.component('FormRegister', {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmitRegister: function () {
      axios
        .post('/auth/register', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.$emit('on-register', data)
        })
        .catch(err => console.log(err))
    }
  },
  template: `
    <div class="pt-5">
      <div class="card mx-auto" style="width: 320px">
        <div class="card-body">
          <h5 class="card-title">Register</h5>
          <hr />
          <form @submit.prevent="handleSubmitRegister">
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
