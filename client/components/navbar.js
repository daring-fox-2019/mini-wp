Vue.component('nav-bar', {
    props: ['islogin', 'gapi.auth2', "username"],
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
               <a class="nv-link active text-white" href="#" @click="$parent.whereWego('showall')"><i class="far fa-newspaper mr-2"
                       ></i>Timeline</a>
            </li>                   
        </ul>
    </div>   
    <div class="navbar-collapse col-3">
    <div class="input-group ">
  <input type="text" v-model="searchValue" class="form-control" placeholder="search by tag" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary bg-light" @click.prevent="searchbytag" type="button"><i class="fa fa-search" aria-hidden="true"></i>
</button>
  </div>
</div>
    </div>
    <div class="navbar-collapse float-right"></div>
    <li v-if="islogin"  class="navbar-nav mr-4 ">
        <a href="#" class="btn btn-light text-info" @click.prevent="$emit('formpost')"><i class="fas fa-edit"></i>
            Write</a>
    </li>
    <li v-if="islogin" class="navbar-nav mr-4 text-light">
    halo,{{username}}  
    </li>   

    <li  v-if="islogin"   class="navbar-nav mr-4 ">
    <b-dropdown class="text-dark" variant="link" size="lg" no-caret>
    <template slot="button-content"> <a href="#" class="text-light"><i class="fas fa-user-circle"></i></a>
    </template>
    <b-dropdown-item href="#">
    <a href="#" @click.prevent="$emit('click','adminarea')" class="text-dark"><i class="fas fa-align-left mr-2 "></i>Blog
    Posts</a></b-dropdown-item>
    <b-dropdown-item href="#"> <a href="#" @click="logout" class=text-dark>logout</a></b-dropdown-item>
 
    </li>
    <li v-else class="navbar-nav mr-4 ">
        <a href="#" class="btn btn-light text-info" @click.prevent="$emit('click','login')">login</a>
    </li>
   
</nav>`,
    data() {
        return {
            searchValue: ''

        }
    },
    methods: {
        logout() {
            this.$parent.logout()
        },
        searchbytag() {
            axios
                .get(serverUrl + '/article/search/'+this.searchValue)
                .then(({ data }) => {
                   console.log(data,'ini hasil search')
                   this.searchValue=""
                   this.$parent.searchResultAction(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

})