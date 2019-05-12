Vue.component("login", {
  props : ['successLogin'],
  data() {
    return {
      email : "",
      password : ""
    }
  },
  methods: {
    login() {
      axios
        .post(`${baseURL}/users/login`,{
          email : this.email,
          password : this.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.details.id)
          localStorage.setItem('username', data.details.username)
          localStorage.setItem('image', data.details.profilePicture)
          this.$parent.successLogin()
          swal('Welcome!', data.details.username, 'success')
          console.log(data);
        })
        .catch((err) => {
          swal('Sorry, buddy!', 'email/username is incorrect', 'warning')
          console.log(err);
        })
    },
  },
  template: `
    <div class="container py-5" style="width:500px;">
          <h1>Login</h1>
          <form v-on:submit.prevent="login" class="mt-5">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
              <small id="emailHelp" class="form-text text-muted" 
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style=" color: white;background-color: #d52c82; border: none"
            >
              Submit
            </button>
            </form>
            <slot></slot>
    </div>
    `
});
