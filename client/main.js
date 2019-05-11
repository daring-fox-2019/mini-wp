var Axios = axios.create({
    baseURL: 'http://localhost:3000'
});

new Vue({
    el: '#app',
    data: {
        currentPage: '',
        isLoading : false,
        isLogin: false,
        editor : false,
        loginEmail: '',
        loginPassword: '',
        href : '',
        title: '',
        content: '',
        userImage: '',
        articleBody: '',
        articleTitle : '',
        currentArticle : '',
        currentTags : [],
        inputTag : '',
        empty : '',
        searchInput : '',
        searchedInput : [],
        currentTagInputUser : [],
        arrArticles : [{
            title: ''
        }],
        image : '',
        user : {
            myArticles : [],
            title : '',
            content : '',
            image : '',
            tags : '',
        }

    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    mounted() {


    },
    created: function () {
        if (localStorage.getItem('token')) {
            this.isLogin = true
            this.userImage = localStorage.getItem('userImage')
            this.getAllOverWebArticle()
        }

        if (this.currentPage == "mystories") {
            this.getUserArticlesAll()
        }


        if (this.currentPage == 'home') {
            console.log('ehehe');

        }
    },
    methods: {
        signIn(pp) {
            this.isLogin = true
            this.currentPage = 'home'
            this.userImage = pp
            console.log('jadi true!');
        },
        userSignOut() {
            this.isLogin = false
            localStorage.clear()
            this.currentPage = 'home'
            swal({
                text: 'Logged Out',
                icon: "success",
                button: "OK",
            });

        },
        changestories() {
            console.log('disini?');
            this.getUserArticlesAll()
        },
        gethome() {
            this.currentPage = 'home'
        },
        showLogin() {
            console.log('masuk ga');
            this.currentPage = 'login'
        },
        erase() {
            this.articleBody = ''
            this.articleContent = ''
        },
        showRegister() {
            this.currentPage = 'register'
        },
        getImage(event) {
            this.image = event.target.files[0]
            let formData = new FormData()
            formData.append('image', this.image)
            console.log('ini form dtaaaa', formData);
            this.isLoading = true
            Axios.post(`/tags`, formData, {headers: {
                'token': localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }})
            .then(({data}) => {
                data.forEach(tag => {
                    this.currentTags.push(tag)
                })
                this.isLoading = false

            })
            .catch(err => {
                console.log(err);
                
                console.log('hayo error get tag');
                
            })
            console.log('disini', this.image, '//////////');     
          },
          deletetag(namatag) {
            this.currentTags = this.currentTags.filter(tag =>  tag !== namatag)
          },
          fullarticle(id) {
              console.log(id , 'masuk');
              
            Axios.get(`/articles/${id}`,  {headers: {
                'token': localStorage.getItem('token')
            }})
            .then(({data}) => {
                console.log(data, 'dari FA');
                
                this.currentArticle = data
                this.currentPage = 'fullarticle'
            })
            .catch(err => {
                console.log(err.response); 
                swal({
                    text: 'Something is wrong',
                    icon: "warning",
                    button: "Understood",
                });
 
            })
        },
        searchtag(tag) {
            Axios.get(`/articles/query`, { headers: {
                'token': localStorage.getItem('token') }, params: {
                    tag
                }
            })
            .then(({data}) => {
                if (data.length == 0) {
                    this.empty = true
                    this.currentPage = 'searchpage'

                } else {
                    this.searchedInput = data
                    console.log(data, 'hehe');
                    this.currentPage = 'searchpage'

                }
                
            })
            .catch(err => {
                console.log(err);
            })
        },
        getUserArticlesAll(){
            Axios.get(`/articles`, {headers: {
                'token': localStorage.getItem('token')
            }})
            .then(({data}) => {
                
                this.arrArticles = data
                this.user.myArticles = data
                this.currentPage = 'myStory'
                console.log((data));
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        writestories(id) {
            this.articleBody = ''
            this.articleTitle = ''
            this.currentTags = []

            this.currentPage = "writePage"
        },
        editarticle(id) {
            Axios.get(`/articles/${id}`, {headers: {
                'token': localStorage.getItem('token')
            }})
            .then(({data}) => {
                console.log(data, 'ITU APA YA?S');
                
                this.currentArticle = data
                this.editor = true
                this.articleBody = data.content
                this.articleTitle = data.title
                this.image = data.image
                let temp = []
                data.tags.forEach(tag => {temp.push(tag.tagName)})
                this.currentTags = temp

                this.currentPage = "writePage"
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        patchArticle() {
            let idnya = this.currentArticle._id

            let formData = new FormData()
            formData.append('title', this.currentArticle.title)
            formData.append('content', this.currentArticle.content)
            formData.append('image', this.image)
            formData.append('tags',this.currentTags)
            

            Axios.put(`/articles/${idnya}`, formData, 
            {headers: {
                'token': localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            
            }})
            .then(({data}) => {

                Swal.fire(
                    'Entry Posted!',
                    'View it on your dashboard',
                    'success')

                
                this.articleBody = ""
                this.articleTitle = ""
                this.image = ""

                this.getUserArticlesAll()
                this.fullarticle(idnya)

            })
            .catch(err => {
                console.log(err);
                
            })
        },
        getAllOverWebArticle() {
            Axios.get(`/articles/all`)
            .then(({data}) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        
        createTagInputUser() {
            Axios.post('/tags/user', {tag : this.inputTag}, {headers : {'token' : localStorage.getItem('token')}})
            .then(({data}) => {
                console.log(data,'???');
                this.currentTags.push(data.tagName)
                this.inputTag = ''
            })
            .catch(err => {
                console.log(err);
                
            })
        },
         postArticle(apa) {
            console.log(apa);
            let formData = new FormData()
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleBody)
            formData.append('image', this.image)
            formData.append('tags',this.currentTags)
            console.log(this.currentTags, 'APA ISINYA BRO');
            
            console.log(formData, 'ini form data')
            Axios.post(`/articles`, formData, {
                headers: {
                    'token': localStorage.getItem('token'),
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                let { data } = response

                Swal.fire(
                    'Entry Posted!',
                    'View it on your dashboard',
                    'success')
                this.articleBody = ''
                this.articleTitle = ''
                this.currentTags = ''
                this.getUserArticlesAll()
            })
            .catch(function (err, textStatus) {
                console.log(err)
                swal({
                    text: 'Something is wrong',
                    icon: "warning",
                    button: "Understood",
                });
            })
        },
        updateArticle(obj) {
            console.log(obj, '//');
            
            if (obj.type == 'like') {
                console.log('hehe');
                
                Axios.put(`/articles/${obj.id}`, {type : 'like'}, {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'Access-Control-Allow-Origin' : '*'
                    }
                })
                .then(({data}) => {
                    if (data.msg == 'dislike') {
                        Swal.fire( 'You disliked this post!', '', 'success')
                        this.getUserArticlesAll()
                    } else if (data.msg == 'like') {
                        Swal.fire( 'You liked this post!', '', 'success')
                        this.getUserArticlesAll()
                    } else {
                        console.log(data, 'dapet data gak?');
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    
                    swal({
                        text: 'Something is wrong',
                        icon: "warning",
                        button: "Understood",
                    });
                })
            }
        } ,
        deletearticle(id) {
            console.log('asjkasd', id);
            
            Axios.delete(`/articles/${id}`, { headers: {
                'token': localStorage.getItem('token') }})
                .then(({data}) => {
                    swal({
                        text: 'Deleted!',
                        icon: "warning"
                    
                    });
                    this.getUserArticlesAll()
                })
                .catch(err => {
                    console.log(err);              
            })
        },
            
        search(input) {
            console.log(input, 'aaoaloala');
            Axios.get(`/articles/query`, { headers: {
                'token': localStorage.getItem('token') }, params: {
                    title: input,
                    tag: input
                }
            })
            .then(({data}) => {
                this.searchedInput = data
                console.log(data, 'hehe');
                this.currentPage = 'searchpage'
                
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        translate(language) {
            console.log(language, '/////')
            if (language == 'or') {
                this.fullarticle(this.currentArticle._id)
            } else {
                Axios.post('/articles/translate', {content : this.currentArticle.content, title : this.currentArticle.title  ,language})
                .then(({data}) => {    
                    this.currentArticle.content = data[0]
                    this.currentArticle.title = data[1]        
                })
                .catch(err => {
                    console.log((err));
                    
                })
            }
            
        }
    }
})