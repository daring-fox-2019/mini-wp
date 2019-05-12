const baseUrl = 'http://localhost:3000'

let App = new Vue({
    el: '#app',
    data: {
        isLogin: localStorage.getItem('accesstoken') ? true : false,
        userEmail: localStorage.getItem('email'),
        page: 'home',
        search: '',
        articles: [],
        // ARTICLE
        oldArticle: '',
        article: '',
    },
    created() {
        axios({
            method: 'get',
            url: baseUrl + '/articles'
        })
            .then(({ data }) => {
                this.articles = data
            })
            .catch(err => {
                swal(err.response.data.message)
            })
    },
    computed: {
        showLoginForm() {
            return this.loginForm;
        }
    },
    methods: {
        fetchArticles(tag) {
            this.oldArticle = ''
            let query = '';
            let searching = false

            if (this.search.length > 0) {
                query = `?title=${this.search}`

                searching = true
            } else if (tag) {
                this.search = '';
                query = `?tags=${tag}`

                searching = true
                this.search = tag
            }

            if (searching) {
                this.page = 'search'
            }

            axios({
                method: 'get',
                url: baseUrl + '/articles' + query
            })
                .then(({ data }) => {
                    this.articles = data
                    this.search = ''
                })
                .catch(err => {
                    console.log(err)
                    swal(err.response.data.message)
                })
        },
        createdAt(date) {
            return new Date(date).toString().substring(0, 10)
        },
        logout() {
            localStorage.clear();
            this.isLogin = false;
        },
        // PAGES CONFIG
        showHomePage() {
            this.fetchArticles();
            this.page = 'home'
        },
        showArticleForm() {
            this.page = 'article form'
            this.oldArticle = ''
        },
        // VIEW ARTICLE
        viewArticle(i) {
            const article = this.articles[i]
            this.article = article
            this.page = 'article'
        },
    },
})