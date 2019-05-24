const baseUrl = 'http://mini-wp-server.emrido.site'

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
        // EDIT ARTICLE
        editArticle() {
            this.oldArticle =  this.article
            this.page = 'article form'
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
                                this.showHomePage();
                                this.fetchArticles();
                                
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
})