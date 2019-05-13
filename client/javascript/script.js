let baseUrl = "http://localhost:3000"

const app = new Vue({
    el:"#app",
    data:{
        user :{
            id:"",
            userName:"",
            email:"",
            password:""
        },
        articles: [],
        addArticle:{
            id:"",
            author:"",
            title:"",
            content: "",
            created_at: new Date(),
            // created_at: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            img: "https://scontent-sea1-1.cdninstagram.com/vp/9fb6549e2c697cdca87489f05ea0a1dd/5D705334/t51.2885-19/s150x150/55778917_621877284951923_2049740062177886208_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com"
        },
        home:false,
        notFound: false,
        writeNew: false,
        readArticle : false,
        logged: true,
        isLogin: false,
        isRegister: false,
        editArtc: false,
        searchArtc: "",
        notFounds: "",
    },
    methods:{
        onSignIn(googleUser) {
            console.log(googleUser, '=====')
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: "POST",
                url: `${baseURL}/users/loginGoogle`,
                data:{
                    id_token
                }
            })
            .then(response =>{
                localStorage.setItem('token', response.token)
            })
            .catch(err => {
                console.log(err)
            })
        },
        register(){
            axios({
                method: "POST",
                url: `${baseUrl}/users/register`,
                data:{
                    userName : this.user.userName,
                    email : this.user.email,
                    password : this.user.password
                }
            })
            .then(response => {
                this.user = {
                    id:"",
                    userName:"",
                    email:"",
                    password:""
                }
                this.isRegister = false
                this.isLogin = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        login(){
            axios({
                method: "POST",
                url: `${baseUrl}/users/login`,
                data:{
                    email : this.user.email,
                    password : this.user.password
                }
            })
            .then(response => {
                localStorage.setItem('token', response.data.access_token)
                this.user = {
                    id:"",
                    userName:"",
                    email:"",
                    password:""
                }
                this.logged = true
                this.home = true
                this.isLogin = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        signOut() {
            localStorage.clear()
            this.logged = false

            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            localStorage.clear()
            this.logged = false
            console.log('User signed out.');
            });
        },
        getId(input){
            console.log(input)
        },
        searchArticle(input){
            axios({
                method: "GET",
                url: `${baseUrl}/articles/search/${input}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response.data)
                this.searchArtc = ''
                let arrbaru = []
                if(response.data.response.length !== 0){
                    this.notFound = true;
                    for(let i = 0; i < response.data.response.length; i++){
                        arrbaru.push(response.data.response[i])
                    }
                    this.articles = arrbaru
                }else{
                    this.notFound = false
                    this.notFounds = "Not Found, Try Something Else"
                }
                console.log(this.notFound)
            })
            .catch(err => {
                console.log(err)
            })
        },
        clear(){
            this.addArticle = { 
                id:"",
                title:"",
                content: "",
                created_at: new Date(),
                img: "https://scontent-sea1-1.cdninstagram.com/vp/9fb6549e2c697cdca87489f05ea0a1dd/5D705334/t51.2885-19/s150x150/55778917_621877284951923_2049740062177886208_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com"
            }
        },
        addArticleToDB(){ //done
            axios({
                method: "POST",
                url: `${baseUrl}/articles`,
                data:{
                    title: this.addArticle.title,
                    content: this.addArticle.content,
                    created_at: this.addArticle.created_at,
                    img: this.addArticle.img
                },
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.articles.push(response.data.response)
                this.addArticle = { 
                    id:"",
                    title:"",
                    content: "",
                    created_at: new Date(),
                    img: "https://scontent-sea1-1.cdninstagram.com/vp/9fb6549e2c697cdca87489f05ea0a1dd/5D705334/t51.2885-19/s150x150/55778917_621877284951923_2049740062177886208_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com"
                }
                this.writeNew = false
                this.home = true
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticle(id){ //done
            axios({
                method: "GET",
                url: `${baseUrl}/articles/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.editArtc = true,
                this.addArticle = {
                    id : response.data.response._id,
                    author:response.data.response.author,
                    title:response.data.response.title,
                    content: response.data.response.content,
                    created_at: response.data.response.created_at,
                    img: response.data.response.img
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticleToDB(id){ //probably done
            console.log(id, 'ini id script')
            axios({
                method: "PATCH",
                url: `${baseUrl}/articles/${id}`,
                data:{
                    id: id,
                    title: this.addArticle.title,
                    content: this.addArticle.content,
                    created_at: this.addArticle.created_at,
                    img: this.addArticle.img
                },
                params: {
                    id : id
                },
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                // let arrbaru = []
                // for(let i = 0; i < this.articles.length; i++){
                //     if(this.articles[i]._id !== response.data.response._id){
                //         arrbaru.push(this.articles[i])
                //     }
                // }
                // arrbaru.push(response.data.response)
                // this.articles = arrbaru
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        },
        readMoress(id){ //done
            axios({
                method: "GET",
                url: `${baseUrl}/articles/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.readMore = true,
                this.addArticle = {
                    id : response.data.response._id,
                    author:response.data.response.author,
                    title:response.data.response.title,
                    content: response.data.response.content,
                    created_at: response.data.created_at,
                    img: response.data.img
                }
                console.log(response.data.response)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteArticle(id){ //done
            axios({
                method: "DELETE",
                url: `${baseUrl}/articles/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                let arrbaru = []
                for(let i = 0; i < this.articles.length; i++){
                    if(this.articles[i]._id !== response.data.response._id){
                        arrbaru.push(this.articles[i])
                    }
                }
                this.articles = arrbaru
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })   
        },
        articlesLists(){
            axios({
                method: "GET",
                url: `${baseUrl}/articles`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                let arrbaru = []
                for(let i = 0; i < response.data.response.length; i++){
                    // response.data[i].created_at = new Date() - response.data[i].created_at
                    arrbaru.push(response.data.response[i])
                }
                this.articles = arrbaru
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function(){
        if(localStorage.getItem('token')){
            this.logged = true
            axios({
                method: "GET",
                url: `${baseUrl}/articles`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.home = true
                for(let i = 0; i < response.data.response.length; i++){
                    // response.data[i].created_at = new Date() - response.data[i].created_at
                    this.articles.push(response.data.response[i])
                }
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            this.logged = false,
            this.isLogin = false,
            this.isRegister = false
        }
    }
})