Vue.component('Posted', {
  props: ['article', `index`],
  data: function () {
    return {
      edit: false,
      showEdit: true,
    }
  },
  template: `
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">
      <button class="btn btn-link text-dark" type="button" data-toggle="collapse" :data-target="'#post'+index" @click="showEdit = !showEdit">
        {{article.title}}
      </button>      
      <button class="btn btn-info text-dark btn-sm" type="button"  v-if="showEdit" >
        edit
      </button>
      <button class="btn btn-danger text-dark btn-sm" type="button"  v-if="showEdit" >
        delete
      </button>
    </h5>
  </div>
  <div :id="'post'+index" class="collapse show">
    <div class="card-body">
      {{article.content}}
    </div>
  </div>
</div>`
})

var app = new Vue({
  el: '#blog-post',
  data: {
    message: 'Hello Vue!',
    articles: [],
    token:"xxxxxxx"
  },
  
  mounted() {
    axios
      .get('http://localhost:3000/articles')
      .then(response => (this.articles = response.data))
      .catch(err => console.log(err))
  }
})