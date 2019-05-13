Vue.component('login-form', {
    data(){
        return {
          form: {
            email: '',
            password: '',
          },
        }
      },
      methods: {
        toRegister(){
          this.$emit('to-register', true)
        },
        responseSuccess(data){
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('id', data.id)
          this.$emit('login', true)
          Swal.fire({
              title: 'Success Login',
              type: 'success',
              showConfirmButton: false
          })
        },
        onSubmit() {
          axios.post(`${url}/users/login`,{email: this.form.email, password: this.form.password})
          .then( ({data}) => {
            this.responseSuccess(data)
          })
          .catch(err => {
            Swal.fire({
              title: 'Login Failed',
              text: `${err.response.data.message}`,
              type: 'error',
              showConfirmButton: false
            })
          })
        },
        signInGoogle(googleUser) {
          const id_token = googleUser.getAuthResponse().id_token;
          axios.post(`${url}/oauth/google-sign-in`, { id_token })
            .then(({ data }) => {
              this.responseSuccess(data)
            })
            .catch(err => {
              Swal.fire({
                title: 'Login Failed',
                text: `${err.response.data.message}`,
                type: 'error',
                showConfirmButton: false
              })
            });
        },
    },
    template : `
    <div class="container animated fadeIn" style="margin-top:100px;width:30%;padding-bottom:100px" >
        <b-form @submit.prevent="onSubmit" >
        <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
        >
            <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="form.password"
            required
            type="password"
            placeholder="Enter password"
            ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success" block> Login </b-button>
        
        </b-form>
        <hr>
        <p> don't have an account ? </p>
        <g-signin-button @done="signInGoogle"></g-signin-button>
        <b-button type="submit" size="sm" variant="outline-success" @click="toRegister" block> <i class="fab fa-wpforms"></i> Register </b-button>
        <b-button type="submit" size="sm" variant="outline-success" block @click="$parent.toMainPage()"> Main Page <i class="fas fa-arrow-right"></i> </b-button>
    </div>
    `
})