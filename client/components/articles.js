Vue.component("articles", {
  props: ["articles","fetchDetails","updateArticle"],
  data() {
      return {
          userId : localStorage.getItem('id')
      }
  },
  methods: {
      getDetails(id) {
          this.$parent.fetchDetails(id)
      },
      getUpdate(id, value) {
        this.$parent.updateArticle(id, value)
      }
  },
  template: `
    <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example" id="all-articles">
        <div class="row">
            <div class="col-6" v-for="(article, index) in articles" :key="index">
                <div class="card mb-3">
                    <img :src=article.photo class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">{{article.title}}</h5>
                    <p class="card-text text-truncate" style="max-width: 300px;">{{article.content}}</p>
                    <div class="row">
                        <div class="col-6">
                        <a href="#" class="stretched-link text-warning" @click.prevent="getDetails(article._id)">Read more...</a>
                        <p class="card-text text-left"><small class="text-muted">Author : {{article.userId.username}} </small></p>
                        </div>
                        <div class="col-6">
                        <button class="btn button-like float-sm-right" @click="getUpdate(article._id, 'like')">
                            <i class="fa fa-heart" style="color:#cc4b37" v-if="article.like.indexOf(userId) > -1"></i>
                            <i class="fa fa-heart" v-else></i>
                            <span>Like</span>
                           
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
});
