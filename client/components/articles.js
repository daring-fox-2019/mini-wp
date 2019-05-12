Vue.component("articles", {
  props: ["article", "fetchDetails", "updateArticle","updateArticle","deleteArticle"],
  data() {
    return {
      userId: localStorage.getItem("id"),
      date: moment().format('[today] dddd')
    };
  },
  methods: {
    getUpdate(id, value){
        this.$parent.updateArticle(id, value)
    },
    getDelete(id) {
        this.$parent.deleteArticle(id)
    },
    getEdit(id) {
        this.$emit('edit-article', id )
    },
    getDetails(id){
        this.$parent.fetchDetails(id)
    },
    toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
     }
    //  alert(toTimestamp('02/13/2009 23:31:30'));
  },
  template: `
  
    <div class="card mb-3">
            <img :src=article.photo class="card-img-top" alt="">
            <div class="card-body">
                <h3 class="card-title">{{article.title}}</h3>
                <div class="row card-body">
                    <p  class="h6 pl-1 d-inline-block text-truncate" style="max-width: 400px;" v-html="article.content">....</p>
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
                            <small>Last updated : ${moment('20190512','YYYYMMDD').fromNow()} </small>
                        </div>
                </div>
                <div class="row">
                    <div class="col-12">
                    <i class="fas fa-tags"></i>
                    <span class="badge badge-pill badge-light px-2" v-for="(tag, index) in article.tags">{{tag.tagName}}</span> 
                    </div>
                </div>
            </div>
        <slot></slot>
    </div>
   
    `
});
