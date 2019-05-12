Vue.component('registerform',{
    data(){
        return{
            registerdata : {
                firstName: '',
                lastName : '',
                email : '',
                password: ''
            }
        }
    },
    methods : {
        register(){
            this.$emit('register',this.registerdata)
            this.clearform()
        },
        clearform(){
            this.registerdata = {
                firstName: '',
                lastName : '',
                email : '',
                password: ''
            }
        }
    },
    created(){
        // this.clearform()
    },
    template : `
    <div>
    <div>
        <form @submit.prevent="register">
        <div class="form-group">
            <label for="firstname">First Name</label>
            <input type="text" class="form-control" id="firstName" placeholder="Enter first name.." v-model="registerdata.firstName">
            
        </div>
        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" placeholder="Enter last name.." v-model="registerdata.lastName">
            
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="registerdata.email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1"v-model="registerdata.password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
    </div>
    `
})