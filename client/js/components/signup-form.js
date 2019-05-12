Vue.component('signup-form', {
    data() {
        return {
            nameRegister: '',
            emailRegister: '',
            passwordRegister: ''
        }
    },
    methods: {
        register() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data: {
                    name: this.nameRegister,
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
                .then(({ data }) => {
                    this.$parent.page = 'login form';

                    this.nameRegister = '';
                    this.emailRegister = '';
                    this.passwordRegister = '';
                })
                .catch(err => {
                    swal(err.response.data.message)
                })
        },
    },
    template: `
    <div class="ui container middle aligned center aligned grid">
          <div class="six wide column" style="margin-top: 17rem;">
        <h2 class="ui black image header">
            <div class="content">
                Create new account
            </div>
        </h2>
        
        <form class="ui large form" @keyup.enter.prevent="register">
            <div class="ui piled segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          id="name-register"
                          v-model="nameRegister"
                        />
                    </div>
                </div>
                
                <div class="field">
                    <div class="ui left icon input">
                        <i class="mail icon"></i>
                        <input
                          type="text"
                          name="email"
                          placeholder="E-mail address"
                          id="email-register"
                          v-model="emailRegister"
                        />
                    </div>
                </div>
                
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          id="password-register"
                          v-model="passwordRegister"
                        />
                    </div>
                </div>
                
                <div
                    class="ui fluid large black submit button"
                    @click="register"
                    >
                        <p>Sign Up</p>
                </div>
            </div>

            <div class="ui error message"></div>
        </form>

            <div class="ui message">
                <p>
                    Already have account?
                    <a 
                        @click="$parent.page = 'login form'"
                    >Login</a>
                </p>
            </div>
            </div>
    </div>
    `
})