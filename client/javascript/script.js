const app = new Vue({
    el:"#isi",
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
        searchArtc: "",
        readMore: "",
        editArtc: false,
        watch: {
            // searchArtc: function(newArt, oldArt){
            //     // console.log("test")
            // }
        },
    },
    methods:{
        getId(input){
            console.log(input)
        },
        searchArticle(input){
            axios({
                method: "GET",
                url: `http://localhost:3000/articles?title=${input}`
            })
            .then(response => {
                let arrbaru = []
                if(response.data.length !== 0){
                    for(let i = 0; i < response.data.length; i++){
                        arrbaru.push(response.data[i])
                    }
                    this.articles = arrbaru
                }else{
                    console.log("not Found")
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        addArticleToDB(){
            axios({
                method: "POST",
                url: "http://localhost:3000/articles",
                data:{
                    title: this.addArticle.title,
                    content: this.addArticle.content,
                    created_at: this.addArticle.created_at,
                    img: this.addArticle.img
                }
            })
            .then(response => {
                this.articles.push(response.data)
                this.addArticle = { 
                    id:"",
                    title:"",
                    content: "",
                    created_at: new Date(),
                    img: "https://scontent-sea1-1.cdninstagram.com/vp/9fb6549e2c697cdca87489f05ea0a1dd/5D705334/t51.2885-19/s150x150/55778917_621877284951923_2049740062177886208_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com"
                }
                //something here
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticleToDB(id){
            axios({
                method: "PATCH",
                url: `http://localhost:3000/articles/${id}`,
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
        readMoress(id){
            axios({
                method: "GET",
                url: `http://localhost:3000/articles/${id}`
            })
            .then(response => {
                // this.readMore = response.data.content
                // console.log(response.data.content)
                this.addArticle.id = response.data.id,
                this.addArticle.title = response.data.title,
                this.addArticle.content = response.data.content,
                this.addArticle.created_at = response.data.created_at,
                this.addArticle.img = response.data.img,
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticle(id){
            axios({
                method: "GET",
                url: `http://localhost:3000/articles/${id}`
            })
            .then(response => {
                this.editArtc = true,
                this.addArticle.id = response.data.id,
                this.addArticle.title = response.data.title,
                this.addArticle.content = response.data.content,
                this.addArticle.created_at = response.data.created_at,
                this.addArticle.img = response.data.img,
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteArticle(id){
            axios({
                method: "DELETE",
                url: `http://localhost:3000/articles/${id}`,
            })
            .then(response => {
                let arrbaru = []
                for(let i = 0; i < this.articles.length; i++){
                    if(this.articles[i].id !== id){
                        arrbaru.push(this.articles[i])
                    }
                }
                this.articles = arrbaru
                //something here
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })   
        }
    },
    created: function(){
        axios({
            method: "GET",
            url: "http://localhost:3000/articles"
        })
        .then(response => {
            // console.log(response.data[0].created_at)
            for(let i = 0; i < response.data.length; i++){
                // response.data[i].created_at = new Date() - response.data[i].created_at
                this.articles.push(response.data[i])
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
})