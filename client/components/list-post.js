Vue.component('list-post', {
  data: function () {
    return {
      count: 0
    }
  },
  props: ['post','idpost'],
  methods:{
    editPost(post){
      console.log(post)
      this.$emit('edit_post',post)
    },
    deletePost(id){
      console.log(id)
      this.$emit('delete_post',id)
    },
    showFullPage(){
      this.$emit('show_full_page')
    }
  },
  template: `
  <div class="card col-2 border-info my-3">
    <img :src="post.image" class="card-img-top" alt="Post's Image">
    <div class="card-body">
      <button @click="editPost(post)" type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
      <button @click="deletePost(post._id)" type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text" v-html="post.content">{{ post.content }}</p>
      <a @click="showFullPage" href="#" class="btn btn-primary">Read More</a>
    </div>
    <div class="card-footer">
      <small class="text-muted">Created At {{ post.created_at }}</small>
    </div>
  </div>
`
})