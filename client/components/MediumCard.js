Vue.component('mediumcard', {
  props : ['art'],
  data() {
    return {
    }
  },
  methods: {
    getRandomInteger() {
      return Math.floor(Math.random() * (this.art.tags.length - 0 + 1)) + 0;
    },
    getFullArticle(id) {
      console.log('ada kesini');
      this.$emit('fullarticle', id)
    },
    likeThis(id) {
      console.log('coy');
      
      this.$emit('likearticle', {id, type : 'like'})
    }
  },
  created() {
    
  },
  template : `
  <div v-if="art">
  <div class="card" style="border: none;  max-width:150vh; max-height:50vh">
  <div class="row ">
    <div class="col-md-8">
      <div class="card-body">
        <h4 @click="getFullArticle(art._id)" style="font-weight:400; font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;" class="text-left card-title">{{art ? (art.title) : (null) }}</h4>
        <p style="max-width: 600px;" class="text-truncate card-text font-weight-light text-left text-muted" >{{art ? (art.content) : (null) }} </p>
        <p style="margin:0 !important;padding-top:20px;" class="card-text text-left text-muted">Author : {{art.userId ? (art.userId.username) : (null) }} in {{art.tags ? (art.tags[getRandomInteger()].tagName) : (null) }} </p>
        <button @click="likeThis(art._id)" class="btn button-like float-sm-left" >
        <i v-if="art.likes.indexOf(art.userId._id) >= 0" class="fa fa-heart" style="color:#cc4b37"></i>
        <i v-else class="fa fa-heart"></i>
        <span>Like</span>
        </button>
        </div>
    </div>
    <div class="col-md-4 ">
      <img style="max-width:20vh; max-height:20vh; "v-bind:src="art.image" class="mt-3 align-middle card-img" alt="hehe">
    </div>
  </div>
</div>
 </div>
`
})
