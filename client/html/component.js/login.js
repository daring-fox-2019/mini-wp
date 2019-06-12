Vue.component('form-login',{
    props: ['loginform'],
    data(){
        return{
            userdata : {
                email : '',
                password: ''
            }
        }
    },
    methods : {
        login(){
            this.$emit('login',this.userdata)
            this.clearform()
        },
        clearform(){
            this.userdata.email = ""
            this.userdata.password = ""
        }
    },
    created(){
        // this.clearform()
    },
    template : `
    <div>
    <form v-on:submit.prevent="login" class=" row d-flex justify-content-center mt-5">
    <div class="form-group row col-8 justify-content-center">
        <h4>Email</h4>
        <input v-model="userdata.email" type="text" class="form-control" id="email" placeholder="your email..">    
    </div>
    <div class="form-group row col-8 justify-content-center mt-4 mb-1">
        <h4>Password</h4>                                    
        <input v-model="userdata.password" type="password" class="form-control mb-4" id="password">    
        <div>
        <button id="login" type="submit" class="btn btn-success">login</button>    
        </div>
    </div>
    </form>
    </div>
    `
})