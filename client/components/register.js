Vue.component('form-register', {
    template: `<div class="card mx-auto my-auto" style="width:30rem">
    <div class="card-header">
    </div>
    <div class="card-body">
        <form class="p-5 col-11 mx-auto " id="form-register">
            <p class="h4  text-center">Sign up</p>
            <label for="register-name">Fullname</label>
            <input type="text" id="register-name" class="form-control mb-4" placeholder="input Your Fullname"
                ref="name">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" class="form-control mb-4" placeholder="input Your Email"
                ref="email">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" class="form-control" placeholder="input Your Password"
                aria-describedby="defaultRegisterFormPasswordHelpBlock" ref="password">
            <button class="btn btn-info my-4 btn-block" type="submit" @click.prevent="register">Sign up</button>
            <div class="text-center">
                <p>or sign up with: <div id="google-signin-button" data-onsuccess="onSignIn">
                    </div>
                </p>
                <hr>
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
            onsuccess: this.$parent.googleLogin
        })

    },
    methods: {
        register() {
            console.log('masuk')
            axios.post(`${serverUrl}/user/register`, {
                name: this.$refs.name.value,
                email: this.$refs.email.value,
                password: this.$refs.password.value
            })
                .then(({ data }) => {
                    this.registerformshow = false
                    this.loginformshow = true
                    console.log(data)
                    this.$refs.name = ""
                    this.$refs.email = ""
                    this.$refs.password = ""
                    Swal.fire({
                        type: 'success',
                        title: 'Successfully registered',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$parent.whereWego('login')

                })
                .catch(err => {
                    this.errorMsg = 'Wrong email/password'
                    this.$refs.email.value = ""
                    this.$refs.password.value = ""
                    console.log(err.message)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        
    }
})