var login_modal = Vue.component('login-modal', {
    props: ['show'],
    template:`
    <div>
    <b-nav-item v-b-modal.modal-login>Sign in</b-nav-item>
        <b-modal id="modal-login" title="Login"  centered ref="modal-login">
            <b-form @submit.prevent="submitLogin">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                    id="input-1"
                    type="email"
                    required
                    placeholder="Enter email"
                    v-model="login.email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                    <b-form-input
                    type="password"
                    id="input-2"
                    required
                    placeholder="Enter password"
                    v-model="login.password"
                    ></b-form-input>
                </b-form-group>

                Or you can login with google: 
                <div class="g-signin2" data-onsuccess="onSignIn"></div>


                <div class="mt-2" hidden>
                    <b-button type="submit" variant="primary" ref="buttonLogin">Login</b-button>
                    <b-button type="reset" variant="danger" ref="buttonReset">Reset</b-button>
                </div>
            </b-form>


            <div slot="modal-footer">
                <b-button type="reset" variant="danger" @click="triggerReset">Reset</b-button>
                <b-button type="submit" variant="primary" @click="triggerSubmitLogin">Login</b-button>
            </div>
        </b-modal>
    </div>
    `,
    created() {
        app.$on('hide-login-modal', (id) => {
            // console.log(this)
            this.hideModal()
        })
    },
    data() {
        return {
            login: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        submitLogin() {
            const {email,password} = this.login
            const login_obj = {email, password}
            
            axios
            .post(`${serverUrl}/users/login`, login_obj)
            .then(({data}) => {
                // console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', data.name)
                localStorage.setItem('email', data.email)
                localStorage.setItem('_id', data._id)
                Swal.fire({
                    // position: 'top-end',
                    type: 'success',
                    title: 'Login success!',
                    text: `Welcome ${data.name}!`,
                    showConfirmButton: false,
                    timer: 1500
                })
                this.hideModal()
                this.$emit('login-success')
            })
            .catch(err => {
                // console.log(err)
                Swal.fire({
                     // position: 'top-end',
                     type: 'error',
                     title: 'Login failed',
                     text: err.message,
                     showConfirmButton: false,
                     timer: 1500
                })
            })
        },
        triggerSubmitLogin() {
            this.$refs.buttonLogin.click()
        },
        triggerReset() {
            this.$refs.buttonReset.click()
        },
        showModal() {
            this.$refs['modal-login'].show()
        },
        hideModal() {   
            this.$refs['modal-login'].hide()
        },
    }
})