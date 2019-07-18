var Axios = axios.create({
    baseURL: 'http://localhost:3000'
});

let app = new Vue({
    el: '#app',
    data: {
        userId : localStorage.getItem('userId'),
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
        myLikes : [],
        inputTag : '',
        empty : '',
        searchInput : '',
        searchedInput : [],
        currentTagInputUser : [],
        arrArticles : [],
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
        } else {
            this.currentPage = 'landing'
        }

        if (this.currentPage == "mystories") {
            this.getUserArticlesAll()
        }


        if (this.currentPage == 'home') {
            this.getAllOverWebArticle()


        }
    },
    methods: {
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        },
        signIn(pp) {
            this.getAllOverWebArticle()
            this.isLogin = true
            this.userImage = pp
            this.currentPage = 'home'
            console.log('jadi true!');

        },
         signOut() {
            this.currentPage = 'landing'
            this.isLogin = false
            localStorage.clear()

            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
            .then(function () {
              console.log('User signed out.');
                this.isLogin = false
                localStorage.clear()
                swal({
                    text: 'Logged Out',
                    icon: "success",
                    button: "OK",
                });
                this.currentPage = 'landing'
            });
        },
        
        changestories() {
            console.log('disini?');
            this.getUserArticlesAll()
        },
        gethome() {
            this.getAllOverWebArticle()
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
          getMyLikes() {
            Axios.get(`/articles/likes`, {headers: {
                'token': localStorage.getItem('token')
            }})
            .then(({data}) => {
                this.myLikes = data
            })
            .catch(err => {
                console.log(err);
                
            })
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
                this.currentPage = 'mystories'
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
            this.editor = false
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
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleBody)
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
            console.log('nyari smuaaaaa');
            
            Axios.get(`/articles/all`, {headers : {'token' : localStorage.getItem('token')}})
            .then(({data}) => {
                this.currentPage = 'home'
                this.arrArticles = data
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
                console.log(err.response)
                if (err.response.status == 406) {
                swal({
                    text: `${err.response.data.msg}`,
                    icon: "warning",
                    button: "Understood",
                })
            }
                else {
                    swal({
                        text: `Something is wrong`,
                        icon: "warning",
                        button: "Understood",
                    }) 
                }
            })
        },
        likearticle(id) {
            console.log(id)
            console.log(localStorage.getItem('token'));
            
            Axios.put(`/articles/like/${id}`, {}, {headers: {
                'token': localStorage.getItem('token')
            
            }})
            .then(({data}) => {
                if (data.msg == 'dislike') {
                    Swal.fire( 'You disliked this post!', '', 'success')
                    if (this.currentPage == 'mystories') {
                        this.getUserArticlesAll()
                    } else if (this.currentPage == 'home') {
                        this.getAllOverWebArticle()
                    }
                } else if (data.msg == 'like') {
                    Swal.fire( 'You liked this post!', '', 'success')
                    if (this.currentPage == 'mystories') {
                        this.getUserArticlesAll()
                    } else if (this.currentPage == 'home') {
                        this.getAllOverWebArticle()
                    }
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
        },
        updateArticle(obj) {
            
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

            })
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
            
        },
    }
})

let serverURL = 'http://localhost:3000'



function onSignIn(googleUser) {
    console.log('apalu');
    
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  Axios.post(`${serverURL}/users/signin/google`, {
      id_token
    })
    .then((response) => {
      let { data } = response
      console.log(response, '///')
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.id)
      localStorage.setItem('username', data.username)
      localStorage.setItem('userImage', data.image)
      
      app.isLogin = true
      app.userImage = data.image
      app.getAllOverWebArticle()

    })
    .catch((err, textStatus) => {
      swal({
        text: 'Something is wrong',
        icon: "warning",
        button: "Understood",
      });
    })
}