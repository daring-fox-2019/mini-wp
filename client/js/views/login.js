Vue.component('login', {
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
            status: {
                type: '',
                message: '',
            }
        }
    },
    methods: {
        getAlertClass() {
            if(this.status.type === 'error') {
                return 'alert alert-dismissible fade alert-danger show'
            }
            else {
                return 'alert alert-dismissible fade alert-success show'
            }
        },
        onSubmitLogin(data) {
            this.formData = {email: data.email, password: data.password}
            this.$root.loading = true;

            axios.post(serverURL + '/auth/signin', this.formData)
            .then(({data}) => {
                localStorage.setItem('miniwp_token', data.token)
                localStorage.setItem('miniwp_email', data.email)
                localStorage.setItem('miniwp_name', data.name)
                
                this.$root.config = {headers: {authorization: data.token}}
                this.$root.loading = false;
                this.$emit('success')
            })
            .catch(err => {

            })
        },
        onshowregister() {
           app.page = 'register'
        },
        onGoogleSignIn(googluser) {
            this.$root.loading = true;
            axios.post(serverURL + '/auth/google', {token: googluser.token})
                .then(({data}) => {
                    localStorage.setItem('miniwp_token', data.token)
                    localStorage.setItem('miniwp_email', data.email)
                    localStorage.setItem('miniwp_name', data.name)
                    
                    this.$root.loading = false;
                    this.$root.config = {headers: {authorization: data.token}}
                    this.$emit('success')
    
                    swal.fire(
                        'Success',
                        `Welcome back, ${data.name}`,
                        'success',
                    )
                })
                .catch(({response}) => {
                    swal.fire(
                        'Error',
                        response.data.error.message,
                        'error',
                    )
                })
        }
    },
    template:
    `<div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <div v-if="status.message" v-bind:class="getAlertClass()" role="alert">
            {{ status.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <loginregister page="login" v-on:showregister="onshowregister" v-on:submitlogin="onSubmitLogin" v-on:googlelogin="onGoogleSignIn"></loginregister>
    </div>
    `
})