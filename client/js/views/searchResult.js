Vue.component('search-result', {
    props: ['tag', 'params', 'title'],
    data() {
        return {
            posts: [],
            currentTag: '',
        }
    },
    mounted() {
        this.currentTag = this.$props.tag
        this.getPosts()
    },
    watch: {
        tag: function() {
            this.currentTag = this.$props.tag
            this.posts = []
            if(this.$props.tag && this.$props.tag !== ' ') {
                this.getPosts()
            }
        },
    },
    methods: {
        getPosts() {
            axios.get(serverURL + '/tag/' + this.$props.tag)
                .then(({data}) => {
                    this.posts = data
                })
                .catch(({response}) => {
                    Swal.fire(
                        'Error!',
                        response.data,
                        'error'
                      )
                })
        },
        addFavorite(id) {

        }
    },
    template: 
    `<div class="container">
        <div class="row mt-2">
            <h2>Tag: {{tag}}</h2>
        </div>
        <div class="row mt-4">
            <postlist :posts="posts"></postlist>
        </div>
    </div>
    `
})