Vue.component('postlist', {
    data() {
        return {
            posts: [],
        }
    },
    created() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            axios.get(serverURL + '/articles',this.$root.config)
                .then(({data}) => {
                    console.log(data);
                    this.posts = data
                })
                .catch(({response}) => {
                    console.log('postlist ==>', response);
                })
        },
        deletePost(id) {
            console.log('delete...', id, this.$root.config);
            axios({
                method: 'DELETE',
                url: serverURL + '/articles/' + id, 
                headers: this.$root.config.headers,
            })
                .then(({data}) => {
                    this.getPosts()
                    this.posts = this.posts.filter(x => x._id !== id)
                })
                .catch((err) => {
                    swal.fire({
                        title: 'Error!',
                        text: err,
                        type: 'error',
                    })
                })
        },
        updatePost(id) {
            this.$root.showUpdate(id)
        }
    },
    template: 
    `<div class="list-group post-list">
        <postitemcard v-for="post in posts" 
            :post="post" :key="post._id" 
            @updatePost="updatePost" @deletePost="deletePost"></postitemcard>
    </div>`
})