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
            axios.get(this.$root.serverURL + '/articles', this.$root.headers)
                .then(({data}) => {
                    this.posts = data
                })
                .catch(({response}) => {
                    console.log('postlist === ',response.data.error);
                })
        }
    },
    template: 
    `<div class="list-group post-list">
        <postitemcard v-for="post in posts" :post="post" :key="post._id"></postitemcard>
    </div>`
})