Vue.component('article-detail', {
    props: {
        article: Object,
        userEmail: String
    },
    methods: {
        // EDIT ARTICLE
        editArticle() {
            this.$parent.oldArticle = this.article
            this.$parent.page = 'article form'
        },
        // DELETE ARTICLE
        deleteArticle(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios({
                            url: baseUrl + `/articles/${id}`,
                            method: 'delete',
                            headers: {
                                accesstoken: localStorage.getItem('accesstoken')
                            }
                        })
                            .then(({ data }) => {
                                this.$parent.showHomePage();

                                swal("Article deleted!", {
                                    icon: "success",
                                });
                            })
                            .catch(err => {
                                if (err.response) {
                                    swal(err.response.data.message)
                                } else {
                                    console.log(err)
                                }
                            })
                    }
                });
        }
    },
    template: `
    <div class="ui basic segment container">
          <h1 class="ui centered header">{{ article.title }}</h1>
          <h4 class="ui horizontal divider">
            {{ article.subtitle }}
          </h4>
          <h2 class="ui centered sub header">
            {{ article.owner.name }}
            <p>{{ $parent.createdAt(article.created_at) }}</p>
          </h2>
          <br />
          <div class="ui fluid large centered image">
            <img :src="article.featured_image === 'https://www.seaharvest.net.au/wp-content/themes/seaharvest/img/assets/built/compass-blue.png' ? '' : article.featured_image" alt="" />
          </div>
          <br />
          <div v-html="article.content"></div>
          <br />
          <div class="ui basic labels">
            <a
              class="ui label"
              v-for="(tag, i) in article.tags"
              :key="i"
              @click="$parent.fetchArticles(tag)"
            >
              {{ tag }}
            </a>
          </div>
          <template v-if="userEmail == article.owner.email">
            <div class="ui right floated icon buttons">
              <button
                class="ui basic button"
                data-inverted=""
                data-tooltip="Edit article"
                data-position="left center"
                @click="editArticle"
              >
                <i class="edit icon"></i>
              </button>
              <button
                class="ui basic button"
                data-inverted=""
                data-tooltip="Delete article"
                data-position="right center"
                @click="deleteArticle(article._id)"
              >
                <i class="trash icon"></i>
              </button>
            </div>
          </template>
    </div>
    `
})