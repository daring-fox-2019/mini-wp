const serverUrl = 'http://localhost:3000'
// console.log('masuk function main')


var app = new Vue({
    el: '#app',
    data: {
        serverUrl: 'http://localhost:3000',
        //wysiwyg
        text: '',
        //article
        articleCards: [],
        filteredArticleCards: [],
        userArticles: [],
        userPublishedArticles: [],
        userDraftArticles:[],
        
        //vuetags
        tag: '',
        tags: [],
        //display and hide 
        show:{
            page: 'home',
            saveArticleButton: 'new', //new or edit
            onSearchResult: false,
            login: false,
            currentPage: 1
        },
        searchbar:'',

        //passing data
        onViewer: {},
        onEditor: {},
        file: '',
        perPage: 5,
        currentPage:1,
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    created() {
        this.getAllPublishedArticles()
        // this.getAllUserArticles()
        // console.log(this.lodash.debounce)
       this.debouncedFunction = _.debounce(this.consolesomething, 500)
       this.debouncedSearch = _.debounce(this.searchBy, 500)
       this.debouncedAutosaveEditor = _.debounce(this.autosaveEditor, 3000)
       if(localStorage.token) {
           this.show.login = true;
       }
    },
    mounted() {
        gapi.signin2.render("google-button",{
            onsuccess: this.onSignIn
          })
    },
    methods: {
        getNextPage() {
            let a = this.filteredArticleCards
            // axios
            // .get(`${this.serverUrl}/articles?last_id=${a[a.length-1]._id}`, {params:{status:'published'}})
            // .then(({ data }) => {
            //     console.log(data)
            //     this.articleCards = data
            //     this.filteredArticleCards = data
            // })
            // .catch(err => {
            //     console.log('gagal fetch article')
            //     console.log(err.response.data)
            // })
            axios
            .get(`${this.serverUrl}/articles?page=${this.show.currentPage+1}`, {params:{status:'published'}})
            .then(({ data }) => {
                // console.log(data)
                this.articleCards = data
                this.filteredArticleCards = data
                this.show.currentPage++
            })
            .catch(err => {
                console.log('gagal fetch article')
                console.log(err.response.data)
            })
        },
        getPreviousPage() {
            if(this.show.currentPage > 1) {
                axios
                .get(`${this.serverUrl}/articles?page=${this.show.currentPage-1}`, {params:{status:'published'}})
                .then(({ data }) => {
                    // console.log(data)
                    this.articleCards = data
                    this.filteredArticleCards = data
                    this.show.currentPage--
                })
                .catch(err => {
                    console.log('gagal fetch article')
                    console.log(err.response.data)
                })
            }
        },
        autosaveEditor() {
            this.saveEditor()
        },
        getAllPublishedArticles() {
            this.articleCards = []
            this.filteredArticleCards = []

            axios
            .get(`${this.serverUrl}/articles`, {params:{status:'published'}})
            .then(({ data }) => {
                // console.log(data)
                this.articleCards = data
                this.filteredArticleCards = data
            })
            .catch(err => {
                console.log('gagal fetch article')
                console.log(err.response.data)
            })
        },
        getAllUserArticles(){
            this.userArticles = []
            this.filteredUserArticles = []
            this.userPublishedArticles= []
            this.userDraftArticles = []

            if(!localStorage.token) {
                Swal.fire({
                     // position: 'top-end',
                     type: 'error',
                     title: 'Not Logged In',
                     text: 'Please Login First',
                     showConfirmButton: false,
                     timer: 1500
                })
            } else {
                axios
                .get(`${this.serverUrl}/articles/user`, {headers: {token:localStorage.token}})
                .then(({ data }) => {
                    // console.log(data)
                    // console.log("----------------------- else")
                    this.userArticles = data
                    this.filteredUserArticles = data
                    this.sortDraftAndPublished()
                    this.show.page = 'my-stories'
                })
                .catch(err => {
                    console.log('gagal fetch article')
                    console.log(err.response.data)
                })
            }
        },
        sortDraftAndPublished() {
            this.filteredUserArticles.forEach(el => {
                if(el.status == 'published') {
                    this.userPublishedArticles.push(el)
                } else {
                    this.userDraftArticles.push(el)
                }
            })
        },
        consolesomething() {
            console.log('something')
        },
        debouncedFunction() {
            // console.log('test')
            // _.debounce(console.log('haha'),3000)
            
        },

        /////////////////////////////////////
        showMyStories() {
            this.getAllUserArticles()
        },
        showHome() {
            this.show.page = 'home'
        },
        showEditor(article_id) {
            this.show.page = 'editor'

            axios
            .get(`${serverUrl}/articles/${article_id}`, {headers:{token:localStorage.token}})
            .then(({ data }) => {
                this.onEditor = data
                
                this.tags = data.tags
            })
            .catch(err => {
                console.log(err)
                console.log('error show article in editor')
            })
        },
        goToEditor1() {
            this.show.page = 'editor'
        },
        goToEditor2() {
            this.show.page ='editor2'
        },
        // goToMyStories() {
        //     this.show.page = 'my-stories'
        // },
        showViewer(id) {
            this.show.page = 'viewer'
            axios
            .get(`${serverUrl}/articles/${id}`)
            .then(({ data }) => {
                // console.log(data)
                this.onViewer = data
                this.onViewer.diff =  moment(data.lastUpdate).fromNow()
            })
            .catch(err => {
                console.log(err)
            })
        },
        showPublishedInEditor(id) {
            this.showEditor(id)
        },
        writeNewStory() {
            console.log('function jalan')
            axios
            .post(`${serverUrl}/articles`, {}, {headers: {token:localStorage.token}})
            .then(({ data }) => {
                // console.log(data)
                this.show.page = 'editor'
                this.onEditor = data;
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        uploadPicture() {
            //return a string of url from gcs, will be placed on onEditor.image var
            this.onEditor.image = 'https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40'
            this.file = event.target.files[0]
            let formData = new FormData()
            formData.append('image', this.file)

            axios
            .post(`${serverUrl}/images/`, formData, {headers: {token: localStorage.token}})
            .then(({ data }) => {
                // console.log(data)
                this.onEditor.image = data.image
                data.tags.forEach(el => this.tags.push(el))
                // this.tags = data
            })
            .catch(err => {
                console.log(err.response)
            })
            
        },
        saveEditor() {
            const article_obj = {}
            article_obj.tags = this.tags
            if(article_obj.title != '') article_obj.title = this.onEditor.title
            if(article_obj.subtitle != '') article_obj.subtitle = this.onEditor.subtitle
            if(article_obj.image != '' || article_obj.image != undefined) article_obj.image = this.onEditor.image
            if(article_obj.body != '') article_obj.body = this.onEditor.body
            if(article_obj.status != '') article_obj.status = this.onEditor.status

            axios
            .patch(`${serverUrl}/articles/${this.onEditor._id}`, article_obj, {headers: {token:localStorage.token}})
            .then(({data}) => {
                console.log('autosaved')
            })
            .catch(err => {
                console.error(err)
            })
        },
        saveThisDraft() {
            const article_obj = {}
            article_obj.tags = this.tags
            if(article_obj.title != '') article_obj.title = this.onEditor.title
            if(article_obj.subtitle != '') article_obj.subtitle = this.onEditor.subtitle
            if(article_obj.image != '' || article_obj.image != undefined) article_obj.image = this.onEditor.image
            if(article_obj.body != '') article_obj.body = this.onEditor.body
            article_obj.status = 'draft'
            // console.log(article_obj)

            axios
            .patch(`${serverUrl}/articles/${this.onEditor._id}`, article_obj, {headers: {token:localStorage.token}})
            .then(({data}) => {
                console.log('sucess edit')
                console.log(data)
                this.onEditor = data
                this.getAllUserArticles()
                this.show.page = 'my-stories'
                // this.showEditor(data._id)
            })
            .catch(err => {
                console.error(err.response)
            })
        },
        publishStory(){
            const article_obj = {}
            article_obj.tags = this.tags
            if(article_obj.title != '') article_obj.title = this.onEditor.title
            if(article_obj.subtitle != '') article_obj.subtitle = this.onEditor.subtitle
            if(article_obj.image != '' || article_obj.image != undefined) article_obj.image = this.onEditor.image
            if(article_obj.body != '') article_obj.body = this.onEditor.body
            
            article_obj.status = 'published'

            axios
            .patch(`${serverUrl}/articles/${this.onEditor._id}`, article_obj, {headers: {token:localStorage.token}})
            .then(({data}) => {
                console.log('sucess edit')
                // console.log(data)
                this.onEditor = data
                this.showEditor(data._id)
                this.getAllUserArticles()
                this.show.page = 'my-stories'
            })
            .catch(err => {
                console.error(err)
            })
        },
        //////emit event
        hideLoginModal() {
            console.log('masuk function')
            this.$emit('hide-login-modal', 1)
        },
        ////////search function
        searchBy() {
            const search = this.searchbar
            axios
            .get(`${serverUrl}/articles?tag=${search}&&title=${search}`)
            .then(({ data }) => {
                // console.log(data)
                this.filteredArticleCards = data
                this.show.onSearchResult = true
                this.show.page = 'home'
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        searchByTag(obj) {
            axios
            .get(`${serverUrl}/articles?tag=${obj.tag}`)
            .then(({ data }) => {
                // console.log(data)
                this.filteredArticleCards = data
                this.show.page = 'home'
                this.show.onSearchResult = true
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        ///remove Search result
        showAllPublishedArticleAgain() {
            this.filteredArticleCards = this.articleCards
            this.show.onSearchResult = false
        },
    },
    computed: {
        token() {
            return localStorage.token
        },
        filterArticleCards(input) {
            this.articleCards.forEach(el => {
                if(el.title.includes(input) || el.subtitle.includes(input)) {
                    this.filteredArticleCards.push(el)
                }
            })
        },
        lodash() {
            return _
        },
        rows() {
            return this.filteredArticleCards.length
        }
    },
    watch: {
        // searchbar() {
        //     this.debouncedFunction()
        // }
        searchbar(){
            this.debouncedSearch()
        },
        'onEditor.title'() {
            this.debouncedAutosaveEditor()
        },
        'onEditor.subtitle'() {
            this.debouncedAutosaveEditor()
        },
        'onEditor.body'() {
            this.debouncedAutosaveEditor()
        },
        'onEditor.image'() {
            this.debouncedAutosaveEditor()
        },
        'onEditor.tags'() {
            this.debouncedAutosaveEditor()
        }
    }
})

