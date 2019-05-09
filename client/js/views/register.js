Vue.component('register', {
    data() {
        return {
            formData: {
                email: '',
                password: '',
                name: '',
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
        onSubmitRegister(data) {
            this.formData = data
            axios.post(serverURL + '/auth/signup', this.formData
            )
            .then(({data}) => {
                this.status.message = ''
                this.status.type = 'success'
                this.status.message = "You have been successfully registered.\nPlease go to login page"
                //this.$emit('success')
            })
            .catch(err => {
                console.log(err.response);
                this.status.type = 'error'
                this.status.message = err.response.data.error.message
            })
        },
        onCancelRegister() {
            app.page = 'login'
        }
    },
    template:
    `<div style="display: flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%;">
        <div v-if="status.message" v-bind:class="getAlertClass()" role="alert">
            {{ status.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <loginregister page="register" v-on:onsubmitregister="onSubmitRegister" v-on:backToLogin="onCancelRegister"></loginregister>
    </div>
    `
})