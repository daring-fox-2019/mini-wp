
const url = `http://localhost:3000`
let app = new Vue({
    el: "#app",
    data: {
        articles: [],
        oneArticle: {
            title: "",
            author: "",
            content: "",
            image: ""
        },
        newArticle:{
            title: "",
            content: "",
        },
        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
        },
        isLogin: false
    },
    methods: {
        fetchArticles() {
            axios.get(`${url}/articles`)
                .then(({ data }) => {
                    console.log(data)
                    console.log('articles fetched')
                    data = data.map(element => {
                        element.shortContent = element.content.split('').splice(0, 200).join('') + ".."
                        return element
                    })
                    this.articles = data
                    console.log(this.articles)
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        getOneArticle(article) {
            this.oneArticle = {
                title: article.title,
                author: article.author,
                content: article.content,
                image: article.image
            }
        },
        createArticle(data){
            this.$bvModal.hide('article-form')
            console.log(moment().format("LLLL"))
            console.log(this.newArticle)
        },
        login(){
            this.isLogin = true
        },
        logout(){
            this.isLogin = false
        }
    },
    created() {
        this.fetchArticles()
    }
})

Vue.use( CKEditor );