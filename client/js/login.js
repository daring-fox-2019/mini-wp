Vue.component('Login', {
    data(){
        return {
            loginData:{}
        }
    },
    methods: {
        login(e) {
            this.$emit('login', this.loginData )
            console.log(`trying to log in`)
        }
    },
    template:`<div class="col p-2" id='login-form'>
    <div class="container">
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control"  v-model="loginData.email">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" v-model="loginData.password">
            </div>    
            <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
    </div>
</div>`
})