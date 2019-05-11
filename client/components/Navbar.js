Vue.component('navbar', {
  props: ['isLogin', 'userImage'],
  data() {
    return {
      searchInput : ''
    }
  },
  created() {
    window.addEventListener("keydown", e => {
      if (e.keyCode == 13 && this.searchInput !== '') {
        this.hitsearch()
        e.preventDefault()
      }
    })
  },
  methods: {
    signOut() {
      console.log('hehe');
      this.$emit('sign-out')
    },
    seeStories() {
      console.log('hhuahah');
      this.$emit('changestories')
    },
    writeStories() {
      this.$emit('writestories')
    },
    home() {
      this.$emit('gethome')
    },
    hitsearch() {
      this.$emit('search', this.searchInput)
    },
    searchFilter(data) {
      this.$emit('searchtag', data)
    }

  },
  template: `<div>
      <nav class="shadow-sm navbar navbar-expand-lg navbar-light">
            <a v-on:click.prevent="home" class="navbar-brand" href="#">Sprache</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
            <form @submit="hitsearch" class=" ml-10 form-inline">
                <input class="mx-auto form-control mr-sm-2" type="search" placeholder="Search" v-model="searchInput"  aria-label="Search">
            </form>
                </ul>
                <button type="button"  data-toggle="modal" data-target="#exampleModalCenter" v-if="!isLogin"  class="btn btn-outline-secondary">Get Started</button>

                <div v-if="isLogin" class="dropdown">
                <span class="navbar-text">
                  <img data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdownMenu2" v-if="isLogin" v-bind:src="userImage"
                  style="border-radius:50%; max-height:40px; max-width:40px;" class=" dropdown-toggle card-img-top"
                  alt="foto user">
                </span>
                <button type="button" class="btn btn-sm  dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only"Toggle</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button">Profile</button>
                  <button v-on:click.prevent="seeStories" class="dropdown-item" type="button">See Stories</button>
                  <button v-on:click.prevent="writeStories" class="dropdown-item" type="button">Write Story</button>

                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item" type="button">Suprise Me</button>
                </div>
              </div>



                <a class="nav-link" v-if="isLogin" v-on:click.prevent="signOut">Signout</a>
            </div>
        </nav>
           
            <nav class=" navbar navbar-expand-lg navbar-light white">
                
                <div class="collapse active navbar-collapse" id="navbarNavAltMarkup">
                    <div class="mx-auto center navbar-nav">
                        <a v-on:click.prevent="searchFilter('home')" name="home" style="text-transform: uppercase; font-family: 'Lato', sans-serif;"  class="nav-item nav-link ">Home </a>
                        <a v-on:click.prevent="searchFilter('human')" name="human" style="text-transform: uppercase;font-family: 'Lato', sans-serif;"  class="nav-item nav-link">Human</a>
                        <a v-on:click.prevent="searchFilter('technology')" name="technology" style="text-transform: uppercase;font-family: 'Lato', sans-serif;"  class="nav-item nav-link">Technology</a>
                        <a v-on:click.prevent="searchFilter('politics')" name="politics" style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link">Politics</a>
                        <a v-on:click.prevent="searchFilter('lifestyle')" name="lifestyle" style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link">Lifestyle</a>
                        <a v-on:click.prevent="searchFilter('health')" name="health" style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link">Health</a>
                        <a v-on:click.prevent="searchFilter('humor')" name="humor" style="text-transform: uppercase;font-family: 'Lato', sans-serif;"  class="nav-item nav-link">Humor</a>
                        <a v-on:click.prevent="searchFilter('design')" name="design" style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link">Design</a>
                        <a v-on:click.prevent="searchFilter('self')" name="self" style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link">Self</a>
                        <a v-on:click.prevent="searchFilter('trends')" name="trends"  style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link">Trends</a>
                    </div>
                </div>
            </nav>
        </div>`
})