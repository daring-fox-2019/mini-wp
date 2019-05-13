Vue.component('show-all', {
    props: ['islogin'],
    template: `<div><div class="row mx-auto">
    <div class="col-8 mx-auto mb-30" style="width:80rem;">
        <div class="card">
            <div class="card-head px-2 pt-3">
    
            </div>
            <div class="card-body my-3" v-for="(article) in articles">
                <a href="#" class=" text-dark" @click="$parent.showGetOne(article)">
                    <h1 class="card-title">{{article.title}}</h1>
                </a>
                <div class="d-flex justify-content-between px-2">
                    <p><small>posted by: {{article.user.name}}</small></p>
                    <p><small>{{timeago(article.created_at)}}</small></p>
                </div>
                <p class="card-text">
                    <p v-html="article.content"></p> <a href="#"
                        @click="$parent.showGetOne(article)">readmore</a>
                </p>
                <div class="card-footer">   
           <small> <a class="btn btn-info ml-1" href="#" v-for="(tag,index) in article.tags" >#{{tag}}</a> </small>        
    
            </div>
            </div>
            
        </div>
    </div>
    </div>
    </div>`,
    data() {
        return {
            articles : []         
        }
    },
    created(){
        console.log('masuk show all')
        this.getAllArticles()

    },
    methods: {
        getAllArticles() {
            axios
                .get(serverUrl + '/article')
                .then(({ data }) => {
                    this.articles = data.reverse()
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        timeago: function (date) {
            return moment(date).fromNow()
        },
       
    }

})


