Vue.component('login-form', {
    props: ['menus', 'user'],
    data() {
        return {
            userForm: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        submitLogin() {
            this.$emit('login', this.userForm)
        },
        clickRegister() {
            this.$emit('go-to-register-page')
        },
        clickSignOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            this.$emit('logout', auth2)
            this.
            auth2.signOut().then(function () {
              console.log('User signed out.');
            });
        },
        
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.googleSignIn
        });

        gapi.load('auth2', function() {
            gapi.auth2.init();
        });
    },
    template: 
    `<div>
        <section 
            id="login" 
            v-if="menus.login && user.loggedIn===false" 
            class="relative"
        >
        <div class="container-sm">
        <div class="row my-card my-card--border">
            <div class="">
            <h4>Login</h4>
            </div>
            <div class="">
            <div>
                <form v-on:submit.prevent="submitLogin">
                <div class="form-group">
                    <input 
                    type="email" 
                    class="form-control" 
                    v-model="userForm.email"
                    placeholder="email@mail.com"
                    >
                </div>
                <div class="form-group">
                    <input 
                    type="password" 
                    class="form-control" 
                    v-model="userForm.password"
                    placeholder="Password"
                    >
                </div>

                <div class="d-flex justify-content-between">
                    <div 
                    class="color-red 
                        cursor-pointer
                        pointer-underline
                        "
                    @click="clickRegister"
                    >
                    Create new account
                    </div>
                    <button 
                    type="submit" 
                    class="btn 
                    btn-danger
                    cursor-pointer"
                    >
                    Login
                    </button>
                    <div 
                        id="google-signin-button"
                        class="g-signin2"
                    ></div>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </section>
    </div>
    `
})