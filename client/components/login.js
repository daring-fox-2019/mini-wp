Vue.component('form-login', {
    template: `<div class="card mx-auto my-auto" style="width:30rem">
    <div class="card-header">
    </div>
    <div class="card-body">
    <form class="border border-light p-5 mx-auto col-11" id="form-login">
    <p class="h4 mb-4 text-center">Sign in</p>
    <input type="email" id="login-email" class="form-control mb-4" placeholder="E-mail" ref="email">
    <input type="password" id="login-password" class="form-control mb-4" placeholder="Password" ref="password">
    <button class="btn btn-info btn-block my-4" @click.prevent="login" type="submit">Sign in</button>
    <div class="text-center">
        <p>Not a member?
            <a href="" @click.prevent="$emit('click','register')" >Register</a>
        </p>
        <p>or sign up with:<div id="google-signin-button" data-onsuccess="onSignIn"></div>

            </div>
        </p>
    </div>
</form>
    </div>
</div>`,
    props: [],
    data() {
        return {

        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess:this.$parent.googleLogin
        })

    },
    methods: {
        login() {
            axios.post(`${serverUrl}/user/login`, {
                email: this.$refs.email.value,
                password: this.$refs.password.value
            })
                .then(({ data }) => {
                    console.log(data.name)
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('name', data.name)
                    axios.defaults.headers.common['access_token'] = localStorage.access_token
                    this.$emit('islogin', true)
                    this.$parent.whereWego('adminarea')
                })
                .catch(err => {
                    this.$refs.email.value = ""
                    this.$refs.password.value = ""
                    console.log(err.message)

                })
        },
    }
})