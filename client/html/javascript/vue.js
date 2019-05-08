const app = new Vue({
    el: "#app",
    data: {
        searchQuery: "",
        articles: [],
        newArticle : {
            title : '',
            description: '',
            content: '',
            image : ''
        },
        articlePage: true,
        detail : false,
        articleDetail : {},
        editPage : false
    },
    methods :{
        showArticle(article){
            this.articleDetail = article
            this.detail = true
        },
        createArticle(){
            newArticle = {
                title : '',
                description: '',
                content: '',
                image : ''
            }
            // console.log(this.newArticle.title,this.newArticle.description,this.newArticle.content,this.newArticle.image)
            axios({
                method: 'post',
                url: `http://localhost:3000/articles`,
                data : {
                    title : this.newArticle.title,
                    description : this.newArticle.description,
                    content : this.newArticle.content,
                    image: this.newArticle.image
                }
            })
            .then(article =>{
                console.log(article.data);
                console.log(this.articles);
                this.articles.push(article.data)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        deleteArticle(input){
            console.log(input);
            
            axios({
                method: "delete",
                url: `http://localhost:3000/articles/${input}`
            })
            .then(value =>{
                newArt = []
                this.articles.forEach(article =>{
                    console.log(article);
                    if(article._id !== input){
                        newArt.push(article)
                    }
                })
                this.articles = newArt
            })
            .catch(err =>{
                console.log(err);
            })
        },
        editArticle(id){
            console.log(id);
            axios({
                method : 'get',
                url : `http://localhost:3000/articles/${id}`
            })
            .then(value=>{
                console.log(value);
                
                this.articlePage = false
                this.editPage = true
                this.newArticle.title = value.data.title,
                this.newArticle.description = value.data.description || '',
                this.newArticle.content = value.data.content
                this.newArticle.image = value.data.image
                this.newArticle.id = value.data._id
            })
            .catch(err =>{
                console.log(err,"======");
                
            })
        },
        editArticleDb(id){
            axios({
                method: "patch",
                url : `http://localhost:3000/articles/${id}`,
                data : {
                    title : this.newArticle.title,
                    description : this.newArticle.description,
                    content : this.newArticle.content,
                    image: this.newArticle.image
                }
            })
            .then(value => {
                return axios({
                    method: "get",
                    url: `http://localhost:3000/articles`
                })
            })
            .then(value =>{
                newArt = []
                value.data.forEach(article =>{
                        newArt.push(article)
                })
                this.articles = newArt
                this.articlePage = true
                this.editPage = false
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
    ,
    created(){
        axios({
            method : "get",
            url : "http://localhost:3000/articles"
        })
        .then(value =>{
            value.data.forEach(article => {
                // console.log(article);
                
                article.showStatus = true
                this.articles.push(article)
            });
        })
        .catch(err =>{
            console.log(err);
        })
    },
    computed :{
        filteredResources(){
            if(this.searchQuery){
                return this.articles.filter((item)=>{
                    return item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                })
            }else{
                return this.articles
            }
        }
    }
})