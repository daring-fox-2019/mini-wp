Vue.component('index', {
    data() {
        return {
            mode: 'all',
            posts: [],
        }
    },
    methods: {
        getPosts() {
            axios.get(serverURL + '/articles',this.$root.config)
                .then(({data}) => {
                    this.posts = data
                })
                .catch(({response}) => {
                    Swal.fire(
                        'Error!',
                        response.data.error.message,
                        'error'
                      )
                })
        },
        getClass(option) {
            let activeClass = 'category-item active', normal = 'category-item'
            if(option === this.mode) {
                return activeClass
            }
            else {
                return normal
            }
        },
    },
    mounted () {
        this.getPosts()
    },
    template: 
    `<div class="container">
        <div class="row">
            <nav class="navbar">
                <a href="#" id="cat-all" v-bind:class="getClass('all')" @click="mode = 'all'">ALL</a>
                <a href="#" id="cat-publish" v-bind:class="getClass('published')" @click="mode = 'published'">PUBLISHED</a>
                <a href="#" id="cat-draft" v-bind:class="getClass('draft')" @click="mode = 'draft'">DRAFT</a>
            </nav>
        </div>
        <div class="row mt-4">
            <postlist :posts="posts"></postlist>
        </div>
    </div>
    `
})