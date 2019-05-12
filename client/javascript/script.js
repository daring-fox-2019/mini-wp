const baseUrl = "http://localhost:3000"

const app = new Vue({
    el:"#app",
    data:{
        articles: [],
        addArticle:{
            id:"",
            title:"",
            content: "",
            created_at: new Date(),
            // created_at: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            img: "https://scontent-sea1-1.cdninstagram.com/vp/9fb6549e2c697cdca87489f05ea0a1dd/5D705334/t51.2885-19/s150x150/55778917_621877284951923_2049740062177886208_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com"
        },
        editArtc: false,
        searchArtc: "",
        notFounds: "",
    },
    methods:{
        getId(input){
            console.log(input)
        },
        searchArticle(input){
            console.log(input)
            axios({
                method: "GET",
                url: `${baseUrl}/articles/search/${input}`
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
        addArticleToDB(){ //done
            axios({
                method: "POST",
                url: `${baseUrl}/articles`,
                data:{
                    title: this.addArticle.title,
                    content: this.addArticle.content,
                    created_at: this.addArticle.created_at,
                    img: this.addArticle.img
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
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticle(id){ //done
            axios({
                method: "GET",
                url: `${baseUrl}/articles/${id}`
            })
            .then(response => {
                this.editArtc = true,
                this.addArticle = response.data.response
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticleToDB(id){ //probably done
            axios({
                method: "PUT",
                url: `${baseUrl}/articles/${id}`,
                data:{
                    id: id,
                    title: this.addArticle.title,
                    content: this.addArticle.content,
                    created_at: this.addArticle.created_at,
                    img: this.addArticle.img
                }
            })
            .then(response => {
                //something here
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        },
        readMoress(id){ //done
            axios({
                method: "GET",
                url: `${baseUrl}/articles/${id}`
            })
            .then(response => {
                this.readMore = true,
                this.addArticle = response.data.response
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
                url: `${baseUrl}/articles`
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
        axios({
            method: "GET",
            url: `${baseUrl}/articles`
        })
        .then(response => {
            for(let i = 0; i < response.data.response.length; i++){
                // response.data[i].created_at = new Date() - response.data[i].created_at
                this.articles.push(response.data.response[i])
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
})