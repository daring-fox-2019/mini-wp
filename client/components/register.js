Vue.component("register", {
  props:['successRegister'],
  data() {
    return {
        username:"",
        email: "",
        password: "",
        image: ""
    };
  },
  methods: {
    register() {
      let formData = new FormData()

      formData.append('username', this.username)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('profilePicture', this.image)

      axios
        .post(`${baseURL}/users/register`, formData)
        .then(({ data }) => {
          this.$parent.successRegister()
          swal('Congratulation!','Please Log in to Continue','success')
          console.log(data);
        })
        .catch(err => {
          swal('Sorry, buddy!', 'something is wrong' , 'warning')
          console.log(err);
        });
    },
    getImage(event) {
      this.image = event.target.files[0]
    }
    
  },
  template: `
    <div class="container py-5" style="width:500px;">
          <h1>Register</h1>
          <form v-on:submit.prevent="register" class="mt-5">
            <div class="form-group">
              <label for="exampleInputPassword1">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
                v-model="username"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
              <small id="emailHelp" class="form-text text-muted" style=" color: #d52c82"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <span>Profile Picture</span>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  v-on:change="getImage"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >Choose file</label
                >
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style=" color: white;background-color: #d52c82; border: none"
            >
              Submit
            </button>
          </form>
        </div>
    `
});
