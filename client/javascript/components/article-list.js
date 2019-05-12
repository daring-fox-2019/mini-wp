Vue.component('article-list', {
  props: ['article','index'],
  methods: {
    showDetailPage() {
      this.$emit('seedetail', this.article._id) 
    },
    showEditArticle() {
        this.$emit('showeditarticle',this.article._id)
    },
    deleteArticle() {
        this.$emit('deletearticle',this.article._id)
    }
  },
  template: `
    <div class="card mb-3 border-0" style="background-color: #FBEAD2 "
    v-bind:class="{ 'bg-light' : (index % 2 == 0)}">
        <div class="row no-gutters">
            <div class="col-md-4 p-4">
                <img v-bind:src="article.image" style="height:300px" class="card-img"
                    alt="no image">
            </div>
            <div class="col-md-8 ">
                <div class="card-body d-flex flex-column justify-content-between"
                    style="height:100%">
                    <h5 class="card-title">{{ article.title }}</h5>
                    <p class="card-text" v-html="article.description"> </p>
                    <p>
                        <a href="#" v-on:click="showDetailPage()"> see detail</a>
                    </p>

                    <div class="row">
                        <div class="col-md-8">
                            <p class="card-text"><small class="text-muted">Last updated
                                    {{article.date}}</small>
                            </p>
                        </div>
                        <div class="col-md-4 d-flex justify-content-end">
                            <p>
                                <a href="#" v-on:click.prevent="showEditArticle">
                                    <i class="far fa-edit"></i>
                                </a> | 
                                <a href="#"
                                    v-on:click.prevent="deleteArticle">
                                    <i class="far fa-trash-alt"></i>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})