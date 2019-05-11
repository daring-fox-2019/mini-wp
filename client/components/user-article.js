Vue.component('userArticles', {
    props : ['articles','updateArticle','deleteArticle'],
    data() {
        return {
            userId : localStorage.getItem('id')
        }
    },
    methods: {
        getUpdate(id, value){
            this.$parent.updateArticle(id, value)
        },
        getDelete(id) {
            this.$parent.deleteArticle(id)
        },
        getEdit(id) {
            this.$parent.showEditArticle(id)
        }
    },
    template : 
    `
    <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example" id="all-articles">
        <div class="row">
            <div class="col-6" v-for="(article, index) in articles" :key="index">
                <div class="card mb-3">
                    <img :src=article.photo class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">{{article.title}}</h5>
                    <p class="card-text text-truncate" style="max-width: 300px;" v-html="article.content"></p>
                    <div class="row">
                        <div class="col-6">
                        <a href="#" class="stretched-link text-warning" @click.prevent="getDetails(article._id)">Read more...</a>
                        <p class="card-text text-left"><small class="text-muted">Author : {{article.userId.username}} </small></p>
                        <div class="d-flex">
                            <i class="fas fa-tags"></i>
                            <small class="px-2" v-for="(tag, index) in article.tags">{{tag.tagName}}</small> 
                        </div>
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
                    <div class="d-flex justify-content-center">
                        <button @click.prevent="getEdit(article._id)" type="button" class="btn mt-3" style="background-color: #016087; width: 120px; font-size: 10px">Edit</button>
                        <button @click.prevent="getDelete(article._id)" type="button" class="btn mt-3" style="background-color: #016087; width: 120px; font-size: 10px">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})