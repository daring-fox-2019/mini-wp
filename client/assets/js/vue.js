
const ARTICLE_PATH = `http://localhost:3000/articles`
const USER_PATH = `http://localhost:3000/users`

const app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        articles: [],
        message: 'Hello vue!',
        user: {
            loggedIn: false,
            name: '',
            email: ''
        },
        newArticle: {
            title: '',
            content: '',
            id: '',
            featured_image: '',
            tags: []
        },
        homeArticles: [],
        auth2: '',
        searchValue: '',
        createPage: true,
        menus: 
        {
            login: true,
            register: false,
            home: false,
            list: false,
            article: false
        },
        toggled: false
    },
    created() {
        if(localStorage.token) {
            this.user.loggedIn = true
            this.user.name=localStorage.name
            this.goToHomePage()
            this.fetchArticles()
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.googleSignIn
        })
    },
    methods: {
        login: function(userForm) {
            axios
            .post(`${USER_PATH}/signin`, {
                email: userForm.email,
                password: userForm.password
            })
            .then(user => {
                userForm={}
                localStorage.token = user.data.token
                localStorage.name = user.data.name
                this.user.name=localStorage.name
                this.user.loggedIn=true
                this.fetchMyArticles()
                this.goToHomePage()
            })
            .catch(err => {
                userForm={}
                console.log(err);
            })
        },
        googleSignIn: function(googleUser) {
            const token = googleUser.getAuthResponse().id_token;
            // const profile = googleUser.getBasicProfile()
            
            let config = {
                headers: {
                  token
                }
            }
        
            axios
            .post(`${USER_PATH}/signinGoogle`, {}, config)
            .then( ({data}) => {
                localStorage.token = data.token
                app.user.name=data.name
                app.user.loggedIn=true
                app.fetchMyArticles()
                app.goToHomePage()
                console.log(app.user);
            })
            .catch(err => {
                console.log(err);
            })
        },
        register: function(userForm) {
            axios
            .post(`${USER_PATH}/signup`, {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password
            })
            .then(user => {
                userForm= {}
                this.goToLoginPage()
            })
            .catch(err => {
                userForm= {}
                console.log(err);
            })
        },
        logout: function() {
            // logoutGoogle()
            this.articles=[]
            this.user.loggedIn=false
            
            // GoogleAuth.signOut()
            // var auth2 = gapi.auth2.getAuthInstance();
            // auth2.logout().then(function () {});
            
            localStorage.clear()
            
            this.goToRegisterPage()
        },
        fetchArticles: function() {
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            this.createPage=false
            axios
            .get(`${ARTICLE_PATH}`, config)
            .then(({data}) => {
                this.homeArticles = data
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        fetchMyArticles: function() {
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            this.createPage=false
            axios
            .get(`${ARTICLE_PATH}/myarticle`, config)
            .then(({data}) => {
                this.articles=data
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        createArticle: function() {
            let formData = new FormData()
            formData.append('title', this.newArticle.title)
            formData.append('content', this.newArticle.content)

            if(this.newArticle.featured_image) {
                formData.append('featured_image', this.newArticle.featured_image)
            }

            if(this.newArticle.tags.length>0) {
                formData.append('tags', JSON.stringify(this.newArticle.tags))
            }
            
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            axios
            .post(`${ARTICLE_PATH}`, formData, config)
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
            let formData = new FormData()
            formData.append('title', this.newArticle.title)
            formData.append('content', this.newArticle.content)

            if(this.newArticle.featured_image) {
                formData.append('featured_image', this.newArticle.featured_image)
            }

            if(this.newArticle.tags.length>0) {
                formData.append('tags', JSON.stringify(this.newArticle.tags))
            }

            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            const id = this.newArticle.id

            axios
            .patch(`${ARTICLE_PATH}/${id}`, formData, config)
            .then( ({data}) => {
                console.log('cient data edit', data);
                this.articles=this.articles.map(e=> {
                    if(e._id===this.newArticle.id) {
                        e.title=data.title
                        e.content=data.content
                        e.tags=data.tags
                        e.featured_image=data.featured_image
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
            let config = {
                headers: {
                  token: localStorage.token,
                  id: localStorage.id
                }
            }

            this.goToArticlePage()
            axios
            .get(`${ARTICLE_PATH}/${id}`, config)
            .then(({data}) => {
                this.newArticle.title=data.title
                this.newArticle.content=data.content
                this.newArticle.id=data._id
                this.newArticle.tags=data.tags

                this.createPage=false
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteArticle: function(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    let config = {
                        headers: {
                          token: localStorage.token,
                          id: localStorage.id
                        }
                    }
                    
                    axios
                    .delete(`${ARTICLE_PATH}/${id}`, config)
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
                  
                Swal.fire(
                    'Deleted!',
                    'Your article has been deleted.',
                    'success'
                  )
                }
              })
        },
        goToLoginPage: function() {
            this.menus.login=true
            this.menus.register=false
            this.menus.home=false
            this.menus.list=false
            this.menus.article=false
        },
        goToRegisterPage: function() {
            this.menus.login=false
            this.menus.register=true
            this.menus.home=false
            this.menus.list=false
            this.menus.article=false
        },
        goToHomePage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.home=true
            this.menus.list=false
            this.menus.article=false
        },
        goToListPage: function() {
            this.fetchMyArticles()
            this.menus.login=false
            this.menus.register=false
            this.menus.home=false
            this.menus.list=true
            this.menus.article=false
        },
        goToArticlePage: function() {
            this.menus.login=false
            this.menus.register=false
            this.menus.home=false
            this.menus.list=false
            this.menus.article=true

            this.createPage=true
            this.newArticle={}
        },
        menuToggle: function() {
            this.toggled = !this.toggled
        }
    },
    computed: {
        filteredArticle() {
            return this.articles.filter(article => {
                if(article.title.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    return article.title
                } else if(article.tags.includes(this.searchValue)) {
                    return article.title
                }
            })
        },
        filteredHomeArticle() {
            return this.homeArticles.filter(article => {
                if(article.title.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    return article.title
                } else if(article.tags.includes(this.searchValue)) {
                    return article.title
                }
            })
        }
    },
    filters: {
        moment: function (date) {
          return moment(date).format('dddd');
        }
    }
})

// function googleSignIn(googleUser) {
//     const token = googleUser.getAuthResponse().id_token;
    
//     let config = {
//         headers: {
//           token
//         }
//     }

//     axios
//     .post(`${USER_PATH}/signinGoogle`, {}, config)
//     .then( ({data}) => {
//         localStorage.token = data.token
//         app.user.name=data.name
//         app.user.loggedIn=true
//         app.fetchMyArticles()
//         app.goToListPage()
//         console.log(app.user);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// function logoutGoogle() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     localStorage.clear()

    // auth2.logout().then(function () {});
// }

