Vue.component('mediumcard', {
  props : ['art'],
  methods: {
    getRandomInteger() {
      return Math.floor(Math.random() * (this.art.tags.length - 0 + 1)) + 0;
    }
  },
  created() {
    
  },
  template : `
  <div class="card mb-1" style="border: none;  max-width:150vh; max-height:50vh">
  <div class="row ">
    <div class="col-md-8">
      <div class="card-body">
        <h4 style="font-weight:400; font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;" class="text-left card-title">{{art ? (art.title) : (null) }}</h4>
        <p style="max-width: 150px;" class="text-truncate card-text font-weight-light text-left text-muted" >{{art ? (art.content) : (null) }} </p>
        <p class="card-text font-weight-light"><p class="text-left text-muted">{{art ? (art.userId.username) : (null) }} in {{art ? (art.tags[getRandomInteger()].tagName) : (null) }} </p></p>
        <p class="text-left card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
    <div class="col-md-4 ">
      <img style="max-width:20vh; max-height:20vh; " v-bind:src="art.image" class="mt-3 align-middle card-img" alt="hehe">
    </div>
  </div>
</div>`
})
