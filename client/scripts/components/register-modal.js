Vue.component('register-modal', {
    template: `
    <div>
        <b-nav-item v-b-modal.modal-register>Register</b-nav-item>
        <b-modal id="modal-register" title="Register Account" centered ref="register">
            <b-form @submit.prevent="submitRegister">
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
                    v-model="register.email"
                ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                <b-form-input
                    type="password"
                    id="input-2"
                    required
                    placeholder="Enter password"
                    v-model="register.password"
                ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
                <b-form-input
                    type="password"
                    id="input-3"
                    required
                    placeholder="Enter password again"
                    v-model="confirm.password"
                ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="Name:" label-for="input-4">
                <b-form-input
                    type="text"
                    id="input-4"
                    required
                    placeholder="Input Your Name"
                    v-model="register.name"
                ></b-form-input>
                </b-form-group>

                <!-- <b-form-group id="input-group-5" label="Adress:" label-for="input-5">
                <b-form-input
                    type="text"
                    id="input-5"
                    required
                    placeholder="Input Your Address"
                ></b-form-input>
                </b-form-group> -->

                <div class="mt-2" hidden>
                    <b-button type="submit" variant="primary" ref="buttonRegister">Register</b-button>
                    <b-button type="reset" variant="danger" ref="buttonReset">Reset</b-button>
                </div>
                
            </b-form>
            
            <div slot="modal-footer">
                <b-button class="my-2 my-sm-0" @click="triggerReset">Reset</b-button>
                <b-button class="my-2 my-sm-0" @click="triggerSubmitRegister">Register</b-button>
            </div>
        </b-modal>
    </div>
    `,
    data() {
        return {
            register: {
                email: '',
                password: '',
                name: ''
            },
            confirm: {
                password:''
            }
        }
    },
    methods: {
        submitRegister() {
            if(this.register.password === this.confirm.password) {
                const {email,password,name} = this.register
                const register_obj = {email, password, name}
                // this.$emit('submit-register', register_obj)

                axios
                .post(`${serverUrl}/users/register`, register_obj)
                .then(({ data }) => {
                    Swal.fire({
                        // position: 'top-end',
                        type: 'success',
                        title: `Welcome ${data.name}!`,
                        text: `To start writing, please login first!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.hideModal()  
                })
                .catch(err => {
                    console.log(`register failed`)
                })
            } else {
                Swal.fire({
                     // position: 'top-end',
                     type: 'error',
                     title: 'Password does not match',
                     showConfirmButton: false,
                     timer: 1500
                })
                this.hideModal()
            }
        },
        triggerSubmitRegister() {
            this.$refs.buttonRegister.click()
        },
        triggerReset() {
            this.$refs.buttonReset.click()
        },
        showModal() {
            this.$refs['register'].show()
        },
        hideModal() {   
            this.$refs['register'].hide()
        },
    },
})