Vue.component('see-detail', {
  props: ['detailArticle','page'],
  data() {
    return {
    }
  },
  template: `
    <div class="col-md-10 p-5 card mb-3" v-show="page == 'detail-article'">
        <img v-bind:src="detailArticle.image" class="card-img-top" style="height:100vh" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{detailArticle.title}}</h5>
            <p class="card-text" v-html="detailArticle.description"></p>
            <p class="card-text"><small class="text-muted">Last updated {{detailArticle.date}}</small></p>
        </div>
    </div>`
})