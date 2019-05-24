Vue.component('loginForm', {
    data() {
        return {
            emailLogin: '',
            passwordLogin: '',
        }
    },
    methods: {
        signInGoogle(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            const profile = googleUser.getBasicProfile();

            this.emailLogin = profile.getEmail()
            axios({
                    method: 'post',
                    url: baseUrl + '/google-login',
                    data: {
                        token: id_token
                    }
                })
                .then(({ data }) => {
                    localStorage.setItem('accesstoken', data.accesstoken)
                    localStorage.setItem('email', this.emailLogin)

                    this.$emit('show-home-page');
                    this.$emit('is-login', true)
                    swal({
                        title: 'Login Success',
                        icon: 'success'
                    })
                })
                .catch(err => {
                    if (err.response) {
                        swal(err.response.data.message)
                    } else {
                        console.log(err)
                    }
                })
        },
        login() {
            axios({
                method: 'post',
                url:  baseUrl + '/login',
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
                .then(({ data }) => {
                    localStorage.setItem('accesstoken', data.accesstoken)
                    localStorage.setItem('email', this.emailLogin)

                    this.$emit('show-home-page');
                    this.$emit('is-login', true)
                    // console.log(data)

                    this.emailLogin = '';
                    this.passwordLogin = '';
                    swal({
                        title: 'Login Success',
                        icon: 'success'
                    })
                })
                .catch(err => {
                    if (err.response) {
                        swal(err.response.data.message)
                    } else {
                        console.log(err)
                    }
                })
        },
    },
    template: `
    <div class="ui container middle aligned center aligned grid">
          <div class="six wide column" style="margin-top: 17rem;">
        <h2 class="ui black image header">      
        <div class="content">
            Log-in to your account
        </div>
        </h2>

        <form class="ui large form" @keyup.enter.prevent="login">
            <div class="ui piled segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="mail icon"></i>
                        <input
                          type="text"
                          name="email"
                          placeholder="E-mail address"
                          id="email-login"
                          v-model="emailLogin"
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
                          id="password-login"
                          v-model="passwordLogin"
                        />
                    </div>
                </div>

                <div
                    class="ui fluid large black submit button"
                    @click="login"
                    >
                    <p>Login</p>
                </div>
            </div>

            <div class="ui error message"></div>
        </form>
        <br />
        
        <g-signin-button @google="signInGoogle">
        </g-signin-button>
        <div class="ui message">
            <p>
            New to us?
            <a id="sign-up-show" @click="$parent.page = 'register form'"
            >Sign Up</a>
            </p>
        </div>
        </div>
        </div>
    `
})