Vue.component('mediumcard', {
  props : ['art'],
  data() {
    return {
      userId : localStorage.getItem('userId'),
      objArt : ''
    }
  },
  methods: {
    
    getRandomInteger() {
      return Math.floor(Math.random() * (this.art.tags.length - 0 - 1 ) + 0);
    },
    getFullArticle(id) {
      console.log('ada kesini');
      this.$emit('fullarticle', id)
    },
    likeThis(id) {      
      this.$emit('likearticle', id)
    },
    deleteArticle(id) {
      console.log(id);
      this.$emit('deletearticle', id)
    },
    editArticle(id) {
      this.$emit('editarticle', id)
    }
  },
  created() {

    
  },
  template : `
  <div class="card" style="border: none;  max-width:150vh; max-height:50vh">
  <div class="row ">
    <div class="col-md-8">
      <div class="card-body">
        <h4 @click="getFullArticle(art._id)" style="font-weight:400; font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;" class="mousechange text-left card-title">{{art ? (art.title) : (null) }}</h4>
        <p style="max-width: 600px;" class="text-truncate card-text font-weight-light text-left text-muted" >{{art ? (art.content) : (null) }} </p>
        <p style="margin:0 !important;padding-top:20px;" class="card-text text-left text-muted">Author : {{art.userId ? (art.userId.username) : (null) }} in {{art.tags ? (art.tags[0].tagName) : (null) }} </p>
       
       
        <button v-if="art.userId" @click="likeThis(art._id)" class="btn button-like float-sm-left" >
        <i v-if="art.likes.indexOf(userId) >= 0" class="fa fa-heart" style="color:#cc4b37"></i>
        <i v-else class="fa fa-heart"></i>
        <span>Like</span>
        </button> 


        <button v-show="art.userId._id == userId" @click="deleteArticle(art._id)" class="btn button-like float-sm-left" >
        <i class="fas fa-trash-alt"></i>
        <span>Delete</span>
        </button>

        <button v-show="art.userId._id == userId"  class="btn button-like float-sm-left" >
        <i class="fas fa-edit"></i>
        <span  @click="editArticle(art._id)" >Edit</span>
        </button>

        </div>
    </div>
    <div class="col-md-4 ">
      <img style="max-width:20vh; max-height:20vh; "v-bind:src="art.image" class="mt-3 align-middle card-img" alt="hehe">
    </div>
  </div>
</div>
`
})

