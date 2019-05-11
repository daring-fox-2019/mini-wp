Vue.component("articleDetails", {
  props : ['details','updateArticle'],
  data() {
      return {
          userId : localStorage.getItem('id')
      }
  },
  methods: {
      getUpdate(id, value) {
        this.$parent.updateArticle(id, value)
      }
  },
  template: `
    <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example" >
        <div class="card">
            <div class="card-body">
            <h1 class="card-title">{{details.title}}</h1>
            <p class="card-text" v-html="details.content"></p>
            <div class="row">
                <div class="col-6">
                <p class="card-text text-left"><small class="text-muted">Author : {{details.userId.username}} </small></p>
                <div class="d-flex">
                    <i class="fas fa-tags"></i>
                    <small class="px-2" v-for="(tag, index) in details.tags">{{tag.tagName}}</small> 
                </div>
                <button class="btn button-like float-sm-left" @click="getUpdate(details._id, 'like')">
                    <i class="fa fa-heart" style="color:#cc4b37" v-if="details.like.indexOf(userId) > -1"></i>
                    <i class="fa fa-heart" v-else></i>
                    <span>Like</span>
                </button>
                </div>
                <div class="col-6">
                <p class="card-text text-right"><small class="text-muted">Last Updated : 3 mins ago </small></p>
                </div>
            </div>
            </div>
            <img :src=details.photo class="img-fluid" alt="Responsive image">
         </div>
    </div>
    `
});
