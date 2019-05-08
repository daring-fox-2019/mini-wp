Vue.component('navbar', {
  props: ['isLogin', 'searchBox', 'userImage'],
  methods: {
    signOut() {
      console.log('hehe');
      this.$emit('sign-out')
    },
    seeStories() {
      console.log('hhuahah');
      
      this.$emit('changestories')
    },
    home() {
      this.$emit('gethome')
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
            <form class=" ml-10 form-inline">
                <input class="mx-auto form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            </form>
                </ul>
                <button v-if="!isLogin" type="button" class="btn btn-outline-secondary">Get Started</button>


                <div class="dropdown">
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
                  <button v-on:click.prevent="seeStories" class="dropdown-item" type="button">Stories</button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item" type="button">Suprise Me</button>
                </div>
              </div>



                <a class="nav-link" v-if="isLogin" v-on:click.prevent="signOut">Signout</a>
            </div>
        </nav>
           
            <nav class=" navbar navbar-expand-lg navbar-light white">
                
                <div class="collapse  navbar-collapse" id="navbarNavAltMarkup">
                    <div class="  mx-auto center navbar-nav">
                        <a style="text-transform: uppercase; font-family: 'Lato', sans-serif;"  class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;"  class="nav-item nav-link" href="#">Human</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;"  class="nav-item nav-link" href="#">Technology</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link" href="#">Politics</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link" href="#">Lifestyle</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link" href="#">Health</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;"  class="nav-item nav-link" href="#">Humor</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link" href="#">Design</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link" href="#">Self</a>
                        <a style="text-transform: uppercase;font-family: 'Lato', sans-serif;" class="nav-item nav-link" href="#">Trends</a>
                    </div>
                </div>
            </nav>
        </div>`
})