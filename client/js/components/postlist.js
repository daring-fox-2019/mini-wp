Vue.component('postlist', {
    props: ['posts'],
    data() {
        return {
            
        }
    },
    created() {
    },
    methods: {
        deletePost(id) {
            if(localStorage.getItem('miniwp_token')) {
                axios({
                    method: 'DELETE',
                    url: serverURL + '/articles/' + id, 
                    headers: this.$root.config.headers,
                })
                    .then(({data}) => {
                        this.getPosts()
                        this.posts = this.posts.filter(x => x._id !== id)
                    })
                    .catch(({response}) => {
                        swal.fire({
                            title: 'Error!',
                            text: response.data,
                            type: 'error',
                        })
                    })
            }
            else {
                this.$root.showLogin()
            }
        },
        updatePost(id) {
            this.$root.showUpdatePost(id)
        }
    },
    template: 
    `<div class="list-group post-list">
        <postitemcard v-for="post in posts" 
            :post="post" :key="post._id" 
            @updatePost="updatePost" @deletePost="deletePost"></postitemcard>
    </div>`
})