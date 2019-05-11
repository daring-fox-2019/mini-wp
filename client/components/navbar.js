Vue.component('nav-bar', {
    props: ['islogin','gapi.auth2'],
    template: `<nav class="navbar navbar-expand-lg navbar-info py-0 px-0 my-0 mx-0 fixed-top">
    <a class="navbar-brand text-white bg-dark py-2 px-3" href="#"> <i
            class="fas fa-carrot"></i>
        TinyWP</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active text-white" href="#"><i class="far fa-newspaper mr-2"
                       ></i>Timeline</a>
            </li>
        </ul>
    </div>
    <div class="navbar-collapse float-right"></div>
    <li v-if="islogin"  class="navbar-nav mr-4 ">
        <a href="#" class="btn btn-light text-info" @click.prevent="$emit('click','formpost')"><i class="fas fa-edit"></i>
            Write</a>
    </li>
    <li v-if="islogin"  class="navbar-nav mr-4">
        <a href="#" class="text-light"><i class="fas fa-user-circle"></i> halo,{{username}}  </a>
    </li>
    <li v-if="islogin"  class="navbar-nav mr-4 ">
        <a href="#" class="text-light"><i class="fas fa-align-left mr-2 "></i>Blog
            Posts</a>
    </li>
    <li v-if="islogin" class="navbar-nav mr-4 ">
        <a href="#" @click="logout" class=text-light>logout</a>
    </li>
    <li v-else class="navbar-nav mr-4 ">
        <a href="#" class="btn btn-light text-info" @click.prevent="$emit('click','login')">login</a>
    </li>
</nav>`,
    data() {
        return {
            username: localStorage.name

        }
    },
    methods: {
        logout() { 
           this.$parent.logout()
        },
    }

})