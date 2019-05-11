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
            axios.get(serverURL + '/articles',{headers: {authorization: this.$root.headers.authorization}})
                .then(({data}) => {
                    console.log(data);
                    this.posts = data
                })
                .catch(({response}) => {
                    console.log('postlist ==>', response);
                })
        },
        deletePost(id) {
            axios.delete(serverURL + '/articles/' + id, {headers: this.$root.headers.authorization})
                .then(({data}) => {
                    console.log('deleted...');
                    this.getPosts()
                })
                .catch(({response}) => {
                    console.log(response);
                })
        },
        updatePost(id) {
            this.$root.showUpdate(id)
        }
    },
    template: 
    `<div class="list-group post-list">
        <postitemcard v-for="post in posts" :post="post" :key="post._id" @updatePost="updatePost" @deletePost="deletePost"></postitemcard>
    </div>`
})