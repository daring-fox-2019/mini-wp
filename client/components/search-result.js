Vue.component('search-result', {
    props: ['result'],
    template: `<div class="container pb-3">
    <div class="row ">
    <div v-for="(article,index) in articles" class="card col-3"">
  <img class="card-img-top" :src="article.featured_image" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{article.title}}</h5>
    <a href="#" @click.prevent="detail(article)" class="btn btn-primary">Detail</a>
  </div>
</div></div>
    </div>`,
    data() {
        return {
            articles:[]       
        }
    },
    mounted(){
        this.articles = this.result
        console.log(this.articles,'sr')
    }
    ,
    methods: {
        detail(value){
            this.$parent.showGetOne(value)
        }
      
    }

})