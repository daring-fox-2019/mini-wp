Vue.component("articleDetails", {
  props : ['details','updateArticle'],
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
            <p class="card-text">{{details.content}}</p>
            <div class="row">
                <div class="col-6">
                <p class="card-text text-left"><small class="text-muted">Author : {{details.userId.username}} </small></p>
                <button class="btn button-like float-sm-left" @click="getUpdate(details._id, 'like')">
                    <i class="fa fa-heart" style="color:#cc4b37" v-if="details.like.length !== 0"></i>
                    <i class="fa fa-heart" v-else="article.like.length == 0"></i>
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
