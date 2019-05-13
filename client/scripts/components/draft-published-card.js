Vue.component('draft-published-card', {
    props: ['article'],
    data() {
        return {
            lastUpdate: moment(this.article.lastUpdate).fromNow()
        }
    },
    methods: {
        showArticle() {
            if(this.article.status === 'published') {
                this.$emit('show-published-in-editor', this.article._id)
            } else if(this.article.status === 'draft') {
                this.$emit('show-editor', this.article._id)
            }
        },
        deleteThisArticle(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    axios
                    .delete(`${serverUrl}/articles/${id}`, {headers:{token:localStorage.token}})
                    .then(({ data }) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                          this.$emit('success-delete-article')
                    })
                    .catch(err => {
                      Swal.fire({
                           // position: 'top-end',
                           type: 'error',
                           title: 'Oops',
                           text: err.message,
                           showConfirmButton: false,
                           timer: 1500
                      })  
                    })
                }
              })
        }
    },
    template: `
    <b-row class="draft-card">
        <b-col class="border-top">
            <b-row class="article-card-container px-3">
                <b-col class="article-homepage-card px-4 py-3">
                    <b-row class="font-serif">
                        <a href="#" @click="showArticle"><h2>{{article.title}}</h2></a>
                    </b-row>
                    <b-row>
                        {{article.subtitle}}
                    </b-row>
                    <b-row>
                        <div class="col">
                            <b-row class="font-15 pt-2">
                                Last update: {{lastUpdate}}
                            </b-row>
                        </div>
                    </b-row>
                </b-col>
                <b-col cols="1" class="pt-3">
                    <b-button variant="outline-danger" 
                        @click="deleteThisArticle(article._id)">Delete</b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    `
})