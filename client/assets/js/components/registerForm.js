Vue.component('register-form', {
    props: ['menus', 'user'],
    data() {
        return {
            userForm: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        submitRegister() {
            this.$emit('register', this.userForm)
        },
        clickLogin() {
            this.$emit('go-to-login-page')
        }
    },
    template: 
    `
    <div>
    <section id="register" v-if="menus.register && user.loggedIn===false">

    <div class="container-sm">
      <div class="row my-card my-card--border">
        <div>
          <h4>Register</h4>
        </div>
        <div>
          <form v-on:submit.prevent="submitRegister">
            <div class="form-group">
              <input 
                type="text" class="form-control" v-model="userForm.name" placeholder="Name">
            </div>

            <div class="form-group">
              <input type="email" class="form-control" v-model="userForm.email" placeholder="email@mail.com">
            </div>

            <div class="form-group">
              <input 
                type="password" 
                class="form-control" 
                v-model="userForm.password" 
                placeholder="Password"
              >
            </div>

            <button type="submit" class="btn 
                btn-danger
                cursor-pointer">
              Submit
            </button>

            <div>
              Already have account? Login <span @click="clickLogin" class="cursor-pointer
                color-red
                pointer-underline">here</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
    </div>
    `
})