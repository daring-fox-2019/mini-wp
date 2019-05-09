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

            axios.post(serverURL + '/auth/signin', this.formData)
            .then(({data}) => {
                localStorage.setItem('miniwp_token', data.token)
                localStorage.setItem('miniwp_email', data.email)
                localStorage.setItem('miniwp_name', data.name)

                this.$emit('success')
            })
            .catch(err => {

            })
        },
        onshowregister() {
           app.page = 'register'
        },
        onSignIn(googleUser) {
            console.log('sampaiii login...');
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
        <loginregister page="login" v-on:showregister="onshowregister" v-on:submitlogin="onSubmitLogin"></loginregister>
    </div>
    `
})