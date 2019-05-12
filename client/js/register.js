Vue.component('Register', {
    data() {
        return {
            regData: {}
        }
    },
    methods: {
        register(e) {
            this.$emit('register', this.regData)
        }
    },
    template: `
    <div class="col p-2" >
        <div class="container">
            <form @submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" id="name" v-model="regData.name">
                </div>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" v-model="regData.email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" v-model="regData.password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    `
})