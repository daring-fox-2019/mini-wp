var Axios = axios.create({
    baseURL: 'http://localhost:3000'
});

new Vue({
    el: '#app',
    data: {
        currentPage: '',
        isLogin: false,
        loginEmail: '',
        loginPassword: '',
        title: '',
        content: '',
        userImage: '',
        articleBody: '',
        articleTitle : '',
        currentArticle : '',
        currentTags : '',
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

        if (this.currentPage == "mystories") {
            this.getUserArticlesAll()
        }
        this.currentPage = 'home'

        if (localStorage.getItem('token')) {
            this.isLogin = true
            this.userImage = localStorage.getItem('userImage')
            this.getAllOverWebArticle()
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
        },
        changestories() {
            console.log('disini?');
            this.currentPage = 'myStory'
            this.getUserArticlesAll()
        },
        gethome() {
            this.currentPage = 'home'
        },
        showLogin() {
            console.log('masuk ga');
            
            this.currentPage = 'login'
        },
        showRegister() {
            this.currentPage = 'register'

        },
        getImage(event) {
            this.image = event.target.files[0]
            let formData = new FormData()
            formData.append('image', this.image)
            console.log('ini form dtaaaa', formData);
            
            Axios.post(`/tags`, formData, {headers: {
                'token': localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }})
            .then(({data}) => {
                this.currentTags = data
                
            })
            .catch(err => {
                console.log('hayo error get tag');
                
            })
            console.log('disini', this.image, '//////////');     
          },
          deletetag(namatag) {
            this.currentTags.tags = this.currentTags.tags.filter(tag =>  tag.description !== namatag)
            
          },
          fullarticle(id) {
            Axios.get(`/articles/${id}`,  {headers: {
                'token': localStorage.getItem('token')
            }})
            .then(({data}) => {
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
        getUserArticlesAll(){
            Axios.get(`/articles`, {headers: {
                'token': localStorage.getItem('token')
            }})
            .then(({data}) => {
                this.arrArticles = data
                this.user.myArticles = data
                console.log((data));
                
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
         postArticle(apa) {
            console.log(apa);
            let formData = new FormData()
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleBody)
            formData.append('image', this.image)
            formData.append('tags', JSON.stringify(this.currentTags))
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
                
                Axios.patch(`/articles/${obj.id}`, {type : 'like'}, {
                    headers: {
                        'token': localStorage.getItem('token')
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
                    console.log(err);
                    
                    swal({
                        text: 'Something is wrong',
                        icon: "warning",
                        button: "Understood",
                    });
                })
            }
        } 
    }
})