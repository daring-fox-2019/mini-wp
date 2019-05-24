const baseURL = 'http://35.247.168.18'
const app = new Vue({
    el: '#app',
    data: {
        loginPage:true,
        registerPage:false,
        articles: [],
        search: '',
        selectedArticle: {
            title: 'hello',
            text: null,
        },
        updateArticle:{
            text:'',
            title:'',
            id:'',
            image:''     
        },
        showHide: {
            eachArticle: false,
            allArticles: true,
            addArticle: false,
            updateArticlePage: false
        },
        islogin: false,
        password: '',
        email: '',
        name: '',
        newArticle:{
            text: '',
            title: '',
            image: ''
        },
        editArticle:{
            text:'',
            title:'',
            image:''
        },
        file: ''
    },
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    methods: {
        deleteArticle:function(id){
            console.log(this.articles)
            axios({
                method:'DELETE',
                url:`${baseURL}/articles/${id}`,
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                let id = data._id
                console.log(data._id)
                this.articles = this.articles.filter(item =>{
                    return (item._id !== id)
                })
                console.log(this.articles)
                console.log(data)
            })
            .catch(({error})=>{
                console.log(error)
            })
        },
        tes:function(){
            console.log('testing button')
        },
        login:function() {
            console.log('hai')
            axios({
                method: 'POST',
                url: `${baseURL}/login`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({ data }) => {
                    console.log(data)

                    let token = data.token
                    localStorage.setItem('token', token)
                    if (localStorage.getItem('token')) {
                        this.islogin = true
                    }else{
                        this.islogin = false
                    }
                })
                .catch(({ error }) => {
                    console.log(error)
                })
        },
        register:function(){
            console.log('hello register')
            axios({
                method:'POST',
                url:`${baseURL}/register`,
                data:{
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data})=>{
                console.log(data)
            })
            .catch(({error})=>{
                console.log(error)
            })
        },
        uploadImage:function(){
            this.file= ''
            this.file=event.target.files[0]
        },
        addNewArticle:function() {
            this.newArticle.image = this.file
            this.file = ''
            console.log('vue add new article')
            let formData = new FormData()
            formData.append('image', this.newArticle.image)
            formData.append('title', this.newArticle.title)
            formData.append('content', this.newArticle.text)
            axios({
                method:'POST',
                url:`${baseURL}/articles`,
                // formData,
                data:formData,
                headers:{
                    token : localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'//; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                },
                // data:{
                //     title:this.newArticle.title,
                //     content:this.newArticle.text,
                //     image:formData
                // }
            })
            .then(({data})=>{
                this.articles.push(data)
                this.newArticle.text = ''
                this.newArticle.title = ''
                this.newArticle.image = ''
                this.read(data._id)
                console.log(data)
            })
            .catch(({error})=>{
                console.log(error)
            })
        },
        read:function(id) {
            let selectedArticle = this.articles.filter((item) => {
                console.log(item, "ini item")
                return (item._id === id)
            })
            this.toShowAndHide("eachArticle")
            this.selectedArticle = selectedArticle[0]
            console.log(this.selectedArticle, "this")
        },
        signout:function(){
            localStorage.removeItem('token')
            if (localStorage.getItem('token')) {
                this.islogin = true
            }else{
                this.islogin = false
            }
        },
        updatePage:function(id){
            //masih error kalau #updateArticlePage dengan v-if. kalau dengan v-show, updateArticle nya nggk ke render dalam page
            
            axios({
                method:'GET',
                url:`${baseURL}/articles/${id}`,
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.updateArticle.title = data.title
                this.updateArticle.text = data.content
                this.updateArticle.id = data._id
                console.log(this.updateArticle.id)
                this.toShowAndHide("updateArticlePage")
            })
            .catch((error)=>{
                console.log('masuk error')
                console.log(error)
            })
        },
        update:function(id){
            let formData = new FormData()
            this.updateArticle.image = this.file
            formData.append('image', this.updateArticle.image)
            formData.append('title', this.updateArticle.title)
            formData.append('content', this.updateArticle.text)
            axios({
                method:'PATCH',
                url:`${baseURL}/articles/${id}`,
                headers:{
                    token:localStorage.getItem('token')
                },
                data:formData
            })
            .then(({data})=>{
                this.editArticle.image = ''
                this.editArticle.title = ''
                this.editArticle.text = ''
                this.read(data._id)
                console.log(data)
            })
            .catch(({error})=>{
                console.log(error)
            })
        },
        toShowAndHide:function(whichOne) {
            for (let i = 0; i < Object.keys(this.showHide).length; i++) {
                var currentKey = Object.keys(this.showHide)[i]
                if (currentKey === whichOne) {
                    this.showHide[currentKey] = true
                } else {
                    this.showHide[currentKey] = false
                }
            }
        }
    },
    computed: {
        dateFormating(date){
            let dateArray = date.
            return(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`)
        },
        filtered() {
            if (this.search) {
                let result = []
                result = this.articles.filter((item) => {
                    return item.title.toLowerCase().includes(this.search.toLowerCase())
                })
                if (result.length === 0) {
                    return this.articles
                } else {
                    return result
                }
            } else {
                return this.articles
            }
        }
    },
    watch: {


    },
    created() {
        if (localStorage.getItem('token')) {
            this.islogin = true
        }else{
            this.islogin = false
        }

        if (this.islogin) {
            axios({
                method: 'GET',
                url: `${baseURL}/articles`,
                headers:{
                    token : localStorage.getItem('token')
                }
            })
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        let dateArray = response.data[i].created_at.slice(0,10).split('-')
                        response.data[i].created_at = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
                        this.articles.push(response.data[i])
                    }
                    console.log(response)
                    console.log()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
})