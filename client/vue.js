const app = new Vue({
    el: '#app',
    data:{
        articles:[],
        search:'',
        selectedArticle:{
            title:'hello',
            article:null,
        },
        showHide:{
            eachArticle: false,
            allArticles: true,
            addArticle: false
        },
        newArticleTitle:"",
        newArticleContent:""
    },
    
    methods:{
        addNewArticle(){

            console.log(this.newArticleTitle)
            console.log(this.newArticleContent)
        },
        read(id){
            let selectedArticle = this.articles.filter((item)=>{
                console.log(item,"ini item")
                return (item._id === id)
            })
            console.log(selectedArticle)
            this.toShowAndHide("eachArticle")
            this.selectedArticle = selectedArticle[0]
            console.log(this.selectedArticle, "this")
        },
        toShowAndHide(whichOne){
            for( let i = 0; i < Object.keys(this.showHide).length; i++){
                var currentKey = Object.keys(this.showHide)[i]
                if(currentKey === whichOne){
                    this.showHide[currentKey] = true
                }else{
                    this.showHide[currentKey] = false
                }
            }
        }
    },
    computed:{
        
        filtered(){
            // let articleNotFound=[{
            //     title: "Article Not Found",
            //     content : "",
            //     createdAt : ""
            // }]
            if(this.search){
                let result = []
                result = this.articles.filter((item)=>{
                    return item.title.toLowerCase().includes(this.search.toLowerCase()) 
                })
                if(result.length === 0){
                    return this.articles
                } else{
                    return result
                }
            }else{
                return this.articles
            }
        }
    },
    watch:{
        
    },
    created(){
        axios({
            method:'GET',
            url:'http://localhost:3000/articles'
        })
        .then((response)=>{
            for(let i = 0; i<response.data.length; i++){
                this.articles.push(response.data[i])
            }
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
})