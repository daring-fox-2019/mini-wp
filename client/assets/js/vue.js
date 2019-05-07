const SERVER_PORT = `http://localhost:3000`

var app = new Vue({
    el: '#app',
    data: {
        articles: [],
        message: 'Hello vue!',
        title: '',
        content: '',
        id: '',
        search: '',
        createButton: true,
        menus: 
        [
            {
                menu: 'list',
                show: true
            },
            {
                menu: 'article',
                show: false
            }
        ],
        toggled: false
    },
    mounted() {
        this.fetchArticles()
    },
    methods: {
        fetchArticles: function() {
            this.createButton=false
            axios
            .get(`${SERVER_PORT}/articles`)
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
            .post(`${SERVER_PORT}/articles`, {
                title: this.title,
                content: this.content
            })
            .then( ({data}) => {
                this.title=''
                this.content=''
                this.id=''
                this.articles.push(data)
                this.goToList()
            })
            .catch(err => {
                console.log(err);
            })
        },
        editArticle: function() {
            const id = this.id

            axios
            .patch(`${SERVER_PORT}/articles/${id}`, {
                title: this.title,
                content: this.content
            })
            .then( ({data}) => {
                this.articles=this.articles.map(e=> {
                    if(e._id===this.id) {
                        e.title=data.title
                        e.content=data.content
                    }

                    return e
                })

                this.title=''
                this.content=''
                this.id=''
                
                this.goToList()
            })
            .catch(err => {
                console.log(err);
            })
        },
        fetchEdit: function(id) {
            this.goToCreate()
            axios
            .get(`${SERVER_PORT}/articles/${id}`)
            .then(({data}) => {
                this.title=data.title
                this.content=data.content
                this.id=data._id

                this.createButton=false
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteArticle: function(id) {
            axios
            .delete(`${SERVER_PORT}/articles/${id}`)
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
        goToList: function() {
            this.menus[0].show=true
            this.menus[1].show=false
        },
        goToCreate: function() {
            this.menus[0].show=false
            this.menus[1].show=true
            this.createButton=true
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