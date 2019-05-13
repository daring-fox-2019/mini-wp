Vue.component('header-component', {
  props: ['status'],
  data(){
    return {
      search : ''
    }
  },
  methods: {
    toHome(value){
      this.$emit('to-home', value)
    },
    logout(){
      this.$emit('logout')
    },
    publish(){
      this.$parent.setPublish()
    },
    deleteArticle(){
      this.$parent.deleteArticle()
    },
    changeToLogin(){
      this.$parent.changeToLogin()
    },
    toMainPage(){
      this.$parent.toMainPage()
    }
  },
  watch : {
    search(){
      this.$emit('set-search', this.search)
    }
  },
  template: `
    <b-navbar toggleable="lg" variant="light" class="fixed-top" style="box-shadow: 0 1px 1px rgba(0,0,0,.125)">
      <b-navbar-brand href="" text-black style="margin-left:100px">MiniWP</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" style="margin-right:100px">
            <b-nav-form class="mr-2" v-if="status.Home || status.mainPage">
                <b-form-input size="sm" class="mr-sm-2 " placeholder="Search" v-model="search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="button" variant="success" @click.prevent="emitSearch"><i class="fas fa-search"></i></b-button>
            </b-nav-form>
          <div class="p-2">
                <b-button size="sm" variant="success" class="mr-2" @click="toHome(false)" v-if="status.Home && status.Login"> <i class="far fa-edit"></i> Write</b-button>
                <b-button size="sm" variant="success" class="mr-2" @click="toMainPage()" v-if="!status.Login && status.Read && !status.mainPage"> <i class="fas fa-arrow-left"></i></b-button>
                <b-button size="sm" variant="success" class="mr-2" @click="toHome(true)" v-if="!status.Home && status.Login || (status.Read && status.Login)"> <i class="fas fa-arrow-left"></i></b-button>
                <b-button size="sm" variant="dark" v-if="status.Login && !status.Home && !status.Read"  class="mr-2" @click="publish()"> <i class="fas fa-upload"></i> Publish</b-button>
                <b-button size="sm" variant="secondary" class="mr-2"  v-if="!status.Home && status.Login && !status.Read" @click="deleteArticle"> <i class="fas fa-trash"></i></b-button>
                <b-button size="sm" variant="outline-success" v-if="!status.Login" @click="changeToLogin"> <i class="fas fa-door-open"></i> Login</b-button>
                <b-button size="sm" variant="outline-success" v-if="status.Login && status.Login" @click="logout"> <i class="fas fa-walking"></i> Sign Out</b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  `
})