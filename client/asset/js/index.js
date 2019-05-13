
var url = `http://miniwp-server.komangmahendra.me`
Vue.config.keyCodes.backspace = 8

new Vue({
    el : '#app',
    data : {
        is: {
            Login : false,
            Home : true,
            Read : false,
            Publish : true,
            Register : false,
            mainPage : true
        },
        
        articles : [],
        draftArticle : [],
        search: '',
        tagSearch: '',

        pagePublished : 1,
        pageDraft: 1,
        pageMain: 1,
        
        total : {
            published : 0,
            draft : 0
        },

        dataArticle : {
            id: null,
            file : null,
            title: null,
            content: null,
            published: false,
            createdAt : null,
            tag : '',
            tags : [],
            text : '',
            author : null
        }
        
    },
    created(){
        if(localStorage.getItem('token')){
            this.is.Login = true
            this.fetchDataArticle()
        } else {
            this.fetchPublished()
        }
    },
    computed : {
        publishedList(){
            return this.articles.filter( el => {
                if (el.published) {
                    return el
                }
            })
        },
        draftList(){
            return this.articles.filter( el => {
                if (!el.published) {
                    return el
                }
            })
        },
    },
    watch : {
        pagePublished(){
            this.fetchPublished()
        },
        pageDraft(){
            this.fetchDraft()
        },
        pageMain(){
            this.fetchPublished()
        },
        draftPublished(){
            this.fetchDraft()
        },
        search : function(newVal,oldVal){
            this.fetchDataArticle()
        },
        tagSearch(){
            this.fetchDataArticle()
        }
    },
    methods : {
        editMode(id){
            this.dataArticle.id = id
        },
        changePagePublish(value){
            this.pagePublished = value
        },
        changePageDraft(value){
            this.pageDraft = value
        },
        changePageMain(value){
            this.pageMain = value
        },
        setTagSearch(tag){
            this.tagSearch = tag
        },
        setSearch(value){
            this.search = value
        },
        changeToLogin(){
            this.is.mainPage = false
            this.is.Login = false
            this.is.mainPage = false
            this.is.Read = false
        },
        toMainPage(){
            this.is.mainPage = true
            this.is.Read = false
            this.is.Publish = true
            this.fetchPublished()
        },
        toRegister(value){
            this.is.Register = value
            this.emptyDataArticle()
        },
        searchByTag(tag){
            axios.get(`${url}/articles`, {params : {tag}})
            .then(({data}) => {
                this.articles = data
            })
            .catch( err => {
                console.log(err)
            })
        },
        login(){
            this.is.Login = true
            this.is.mainPage = false
            this.is.Read = false
            this.emptyDataArticle()
            this.fetchDataArticle()
        },
        logout(){
            localStorage.clear()
            this.is.Login = false
            this.is.Home = false
            this.articles = []
            this.fetchPublished()

            Swal.fire({
                title: 'Bye bye ;D',
                text: `see you soon`,
                type: 'success',
                showConfirmButton: false
            })
        },
        changePublished(value){
            this.is.Publish = value

            this.fetchDataArticle()
        },
        fetchDataArticle(){
            this.articles = []
            this.fetchPublished()
            this.fetchDraft()
            flagFetchSearch = true
        },
        fetchPublished(){
            this.articles = []
            let page = this.pagePublished

            if(!this.is.Login){
                page = this.pageMain
            }

            axios.get(`${url}/articles`, {params : {published:true, page, search: this.search, tag: this.tagSearch}, 
                headers: {token : localStorage.getItem('token')}})
            .then(({data}) => {
                
                data.map( el =>{
                    this.articles.push(el)
                })
                return axios.get(`${url}/articles`, {params : {published:true, search: this.search, tag: this.tagSearch}, 
                    headers: {token : localStorage.getItem('token')}})
            })
            .then(({data}) => {
                this.total.published = data.length
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchDraft(){
            this.articles = []
            axios.get(`${url}/articles`, {params : {published:false, page: this.pageDraft, search: this.search, tag: this.tagSearch},
                headers: {token : localStorage.getItem('token')}})
            .then(({data}) => {
                data.map( el =>{
                    this.articles.push(el)
                })
                return axios.get(`${url}/articles`, {params : {published: false, search: this.search, tag: this.tagSearch}, 
                    headers: {token : localStorage.getItem('token')}})
            })
            .then(({data}) => {
                this.total.draft = data.length
            })
            .catch(err => {
                console.log(err)
            })
        },
        emptyDataArticle(){
            this.dataArticle.file = null
            this.dataArticle.id = ''
            this.dataArticle.title = ''
            this.dataArticle.text = ''
            this.dataArticle.tags = []
            this.dataArticle.author = ''
            this.dataArticle.published = false
        },
        setArticles(articles){
            this.articles = articles
        },
        setPublish(){
            if(this.dataArticle.id){
                axios.patch(`${url}/articles/${this.dataArticle.id}`,{published : true} ,{ headers : {token: localStorage.getItem('token')}}) 
                .then(({data}) => {
                    let index = this.articles.findIndex(el => el._id === data._id)
                    this.articles[index].published = data.published

                    Swal.fire({
                        title: 'Published',
                        text: `Article has been published`,
                        type: 'success',
                        showConfirmButton: false
                    })
                })
                .catch( err => {
                    console.log(err)
                })
            } else {
                this.dataArticle.published = true
                this.submitArticle()
            }
        },
        submitArticle(){
            axios.post(`${url}/articles`, 
                {title: this.dataArticle.title, content: this.dataArticle.text, published: this.dataArticle.published, tags: this.dataArticle.tags}, 
                {headers : { token : localStorage.getItem('token')}})
            .then(({data}) => {
                data.author.name = localStorage.getItem('name')
                console.log(data)
                this.articles.unshift(data)
                Swal.fire({
                    title: 'Success',
                    text: `Submit Success`,
                    type: 'success',
                    showConfirmButton: false
                })
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Error!!!',
                    text: `${err.response.data.message}`,
                    type: 'error',
                    showConfirmButton: false
                })
            })
        
        },
        deleteArticle(id){
            id = id || this.dataArticle.id

            if(id){
                axios.delete(`${url}/articles/${id}`, {headers : { token : localStorage.getItem('token')}})
                .then(({data}) => {
                    this.emptyDataArticle()
                    this.articles = this.articles.filter( el => {
                        if(el._id != id){
                            return el
                        }
                    })

                    Swal.fire({
                        title: 'Delete',
                        text: 'Article has been deleted',
                        type: 'success',
                        showConfirmButton: false
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Delete',
                        text: `${err.response.data.message}`,
                        type: 'error',
                        showConfirmButton: false
                    })
                    console.log(err)
                })
            } else {
                this.emptyDataArticle()
            }
        },
        editArticle(article){
            this.dataArticle.id = article._id
            this.dataArticle.title = article.title
            this.dataArticle.text = article.content
            this.dataArticle.tags = article.tags
            this.dataArticle.published = article.published
            this.is.Home = false
        },
        toHome(data){
            this.is.Home = data
            this.is.Read = false

            this.emptyDataArticle()
        },
        toRead(value, article){
            this.dataArticle.title = article.title
            this.dataArticle.text = article.content
            this.dataArticle.tags = article.tags
            this.dataArticle.createdAt = article.createdAt 
            this.dataArticle.author = article.author

            this.is.Home = false
            this.is.mainPage = false
            this.is.Register = false

            this.is.Read = value
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component
    }
})
