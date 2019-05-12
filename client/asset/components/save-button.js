Vue.component('save-button', {
    props : ['dataArticle', 'articles'],
    methods: {
        submitArticle(){
            if(this.dataArticle.id){
                console.log(this.dataArticle)
                axios.patch(`${url}/articles/${this.dataArticle.id}`,this.dataArticle ,
                    { headers : {token: localStorage.getItem('token')}}) 
                .then(({data}) => {
                    let index = this.articles.findIndex(el => el._id === data._id)
      
                    this.articles[index].title = data.title
                    this.articles[index].text = data.text
                    this.articles[index].tags = data.tags
                    this.$emit('set-articles', this.articles)

                    Swal.fire({
                        title: 'Edit',
                        text: `Success edited`,
                        type: 'success',
                        showConfirmButton: false
                    })
                })
                .catch( err => {
                    Swal.fire({
                        title: 'Error!!!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        showConfirmButton: false
                    })
                })
            } else {
                axios.post(`${url}/articles`, 
                    {title: this.dataArticle.title, content: this.dataArticle.text, published: this.dataArticle.published, tags: this.dataArticle.tags}
                    ,{ headers : {token: localStorage.getItem('token')}}
                )
                .then(({data}) => {
                    data.author.name = localStorage.getItem('name')
                    this.articles.unshift(data)
                    this.$emit('set-articles', this.articles)
                    this.$emit('edit-mode', data._id)
                    Swal.fire({
                        title: 'Submit',
                        text: `Submit successfull`,
                        type: 'success',
                        showConfirmButton: false
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!!!',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        showConfirmButton: false
                    })
                })
            }

        },
    },
    template: 
    `
        <b-button class="btn btn-success mt-3" block @click="submitArticle()"> <i class="far fa-save"> </i> Save </b-button>
    `
})