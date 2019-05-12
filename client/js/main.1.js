// const axios = axios.create({
//     baseUrl: 'http://localhost:3000/'
// })

let App = new Vue({
    el: '#app',
    data: {
        isLogin: localStorage.getItem('accesstoken') ? true : false,
        page: 'home',
        search: '',
        articles: [],
        // ARTICLE
        article: '',
        // NEW ARTICLE
        newTitle: '',
        newSubtitle: '',
        newContent: '',
        newImage: '',
        newTag: '',
        newTags: [],
        // LOGIN
        emailLogin: '',
        passwordLogin: '',
        // REGISTER
        nameRegister: '',
        emailRegister: '',
        passwordRegister: ''
    },
    created() {
        axios({
            method: 'get',
            url: 'http://localhost:3000/articles'
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
        },
        userEmail() {
            return localStorage.getItem('email')
        }
    },
    methods: {
        fetchArticles(tag) {
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
                url: 'http://localhost:3000/articles' + query
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
        // PAGES CONFIG
        showHomePage() {
            this.fetchArticles();
            this.resetArticleForm();

            this.page = 'home'
        },
        resetArticleForm() {
            this.newTitle = '';
            this.newSubtitle = '';
            this.newContent = '';
            this.newTags = '';
        },
        // LOGIN
        login() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
                .then(({ data }) => {
                    localStorage.setItem('accesstoken', data.accesstoken)
                    localStorage.setItem('email', this.emailLogin)

                    this.showHomePage();
                    this.isLogin = true;
                    // console.log(data)

                    this.emailLogin = '';
                    this.passwordLogin = '';
                })
                .catch(err => {
                    if (err.response) {
                        swal(err.response.data.message)
                    } else {
                        console.log(err)
                    }
                })
        },
        // REGISTER
        register() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data: {
                    name: this.nameRegister,
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
                .then(({ data }) => {
                    this.loginForm = true;

                    this.nameRegister = '';
                    this.emailRegister = '';
                    this.passwordRegister = '';
                })
                .catch(err => {
                    swal(err.response.data.message)
                })
        },
        logout() {
            localStorage.clear();
            this.isLogin = false;
        },
        // FORM NEW & EDIT ARTICLE
        addTag() {
            if (this.newTags.indexOf(this.newTag) < 0 && this.newTag !== ' ') {
                this.newTags.push(this.newTag)
            }
            this.newTag = ''
        },
        removeTag(v) {
            this.newTag = this.newTag.replace(/ /g, '')
            this.newTags = this.newTags.filter(tag => tag !== v)
        },
        previewFile(event) {
            this.newImage = event.target.files[0]
        },
        addArticle() {
            let method = 'post';
            let id = '';
            let edit = false;

            if (this.article !== '') {
                method = 'patch';
                id = `/${this.article._id}`
                edit = true;
            }
            const newArticle = new FormData();

            newArticle.append('title', this.newTitle);
            newArticle.append('subtitle', this.newSubtitle);
            newArticle.append('content', this.newContent)
            newArticle.append('tags', this.newTags);
            newArticle.append('image', this.newImage);

            axios({
                url: 'http://localhost:3000/articles' + id,
                method: method,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken'),
                    'Content-Type': 'multipart/form-data'
                },
                data: newArticle
            })
                .then(({ data }) => {
                    if (!edit) {
                        this.articles.unshift(data)
                    }
                    this.showHomePage();
                })
                .catch(err => {
                    if (err.response) {
                        swal(err.response.data.message)
                    } else {
                        console.log(err)
                    }
                })

        },
        // VIEW ARTICLE
        viewArticle(i) {
            const article = this.articles[i]
            this.article = article
            this.page = 'article'
            this.showArticlePage();
        },
        // EDIT ARTICLE
        editArticle() {
            this.newTitle = this.article.title
            this.newSubtitle = this.article.subtitle
            this.newContent = this.article.content
            this.newTags = this.article.tags

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
                            url: `http://localhost:3000/articles/${id}`,
                            method: 'delete',
                            headers: {
                                accesstoken: localStorage.getItem('accesstoken')
                            }
                        })
                            .then(({ data }) => {
                                this.showHomePage();

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
    components: {
        wysiwyg: vueWysiwyg.default.component,
    }
})