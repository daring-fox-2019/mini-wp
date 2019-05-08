const ARTICLE_PATH = `http://localhost:3000/articles`

var app = new Vue({
    el: '#app',
    data: {
        articles: [],
        message: 'Hello vue!',
        user: {
            loggedIn: false
        },
        newArticle: {
            title: '',
            content: '',
            id: '',
        },
        userForm: {
            name: '',
            email: '',
            password: ''
        },
        search: '',
        createPage: true,
        menus: 
        {
            login: true,
            register: false,
            list: false,
            article: false
        },
        toggled: false
    },
    mounted() {
        this.fetchArticles()
    },
    methods: {
        fetchArticles: function() {
            this.createPage=false
            axios
            .get(`${ARTICLE_PATH}`)
            .then(({data}) => {
                data.forEach(element => {
                    this.articles.push(element)
                });
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        createArticle: function() {
            axios
            .post(`${ARTICLE_PATH}`, {
                title: this.newArticle.title,
                content: this.newArticle.content
            })
            .then( ({data}) => {
                this.newArticle={}

                this.articles.push(data)
                this.goToListPage()
            })
            .catch(err => {
                console.log(err);
            })
        },
        editArticle: function() {
            const id = this.newArticle.id

            axios
            .patch(`${ARTICLE_PATH}/${id}`, {
                title: this.newArticle.title,
                content: this.newArticle.content
            })
            .then( ({data}) => {
                this.articles=this.articles.map(e=> {
                    if(e._id===this.newArticle.id) {
                        e.title=data.title
                        e.content=data.content
                    }

                    return e
                })

                this.newArticle={}
                
                this.goToListPage()
            })
            .catch(err => {
                console.log(err);
            })
        },
        fetchEdit: function(id) {
            this.goToArticlePage()
            axios
            .get(`${ARTICLE_PATH}/${id}`)
            .then(({data}) => {
                this.newArticle.title=data.title
                this.newArticle.content=data.content
                this.newArticle.id=data._id

                this.createPage=false
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteArticle: function(id) {
            axios
            .delete(`${ARTICLE_PATH}/${id}`)
            .then((deleted) => {

                this.articles = this.articles.filter(article => {
                    if(article._id!==id) {
                        return article
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
        },
        goToLoginPage: function() {
            this.menus.login=true
            this.menus.register=false
            this.menus.list=false
            this.menus.article=false
        },
        goToRegisterPage: function() {
            this.menus.login=false
            this.menus.register=true
            this.menus.list=false
            this.menus.article=false
        },
        goToListPage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.list=true
            this.menus.article=false
        },
        goToArticlePage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.list=false
            this.menus.article=true
        },
        menuToggle: function() {
            this.toggled = !this.toggled
        }
    },
    computed: {
        filteredArticle() {
            return this.articles.filter(article => {
                return article.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
})