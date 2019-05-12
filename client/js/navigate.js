Vue.component('Navigate', {
    data: '',
    props: ['token'],
    methods: {
        logout() {
            this.$emit('logout')
        }
    },
    template: ` 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Mini-Wp</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">My Profile</a>
            </li>            
        </ul>
        <div class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </div>
        <div class="form-inline" v-if="!token">
            <button class="btn bg-info btn-sm m-3 p-2">login</button>
        </div>
        <div class="form-inline" v-if="!token">
            <button class="btn bg-info btn-sm m-3 p-2 " @click="tryRegister = !tryRegister">register</button>
        </div>
        <div class="form-inline" v-if="token">
            <button class="btn bg-info btn-sm m-3 p-2" @click="logout">logout</button>
        </div>
    </div>
</nav>
    `
})