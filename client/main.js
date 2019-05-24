const domain = `http://localhost:3000`
var app = new Vue({
    el:'#app',
    data:{
        articles:[],
        searchField:'',
        showCreate:false,
        title:'',
        content:'',
        condition:'notlogin',
        loginForm:'login',
        readArticle:'',
        read:false,
        updateIndex:'',
        imageProfile:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        author:'',
        email:'',
        password:'',
        selectedFile:null,
        imgsrc:''
    },
    computed: {
        filterArticles() {
            return this.articles.filter((article) => {
                return article.title.toLowerCase().match(this.searchField)
            })
        }
    },
    methods:{
        deleteArticle:function(id){
            const data = this.articles[id]
            let token = localStorage.getItem('token')
            let Config = {
                headers: {
                    'token': token,
                }
            }
            axios.delete(`${domain}/articles/${data._id}`,Config)
            .then((response)=>{
                console.log(response)
                this.articles.splice(id,1)
            })
            .catch(function(err){
                console.log(err)
            })
        },
        displayCreate:function(){
            if(this.showCreate == false){
                this.showCreate = true
            }
            else{
                this.showCreate = false
            }
        },
        createArticle:function(){
            let token = localStorage.getItem('token')
            if(this.updateIndex !== ''){
                // this.articles[this.updateIndex].title = this.title
                // this.articles[this.updateIndex].content = this.content
                // this.title = ''
                // this.content = ''
                let data = {
                    title:this.title,
                    content:this.content,
                    author:this.author,
                    image:this.imgsrc,
                    created_at:new Date().toDateString()
                }
                let Config = {
                    headers: {
                        'token': token,
                    }
                }
                axios.patch(`${domain}/articles/${this.articles[this.updateIndex]._id}`,data,Config)
                .then((article) => {
                    console.log(article.data)
                    this.articles[this.updateIndex].title = article.title
                    this.articles[this.updateIndex].content = article.content
                    this.articles[this.updateIndex].author = article.author
                    this.title = ''
                    this.content = ''
                    this.author = ''
                    this.articles=[]
                    this.readAllArticle()
                })
                .catch((err) => {
                    console.log(err)
                })
                // axios({
                //     url:`${domain}/articles/${this.articles[this.updateIndex].id}`,
                //     method:'PATCH',
                //     data:{
                //         title:this.title,
                //         content:this.content,
                //         author:this.author,
                //         created_at:new Date().toDateString()
                //     }
                // })
                // .then((article) => {
                //     this.articles[this.updateIndex].title = article.title
                //     this.articles[this.updateIndex].content = article.content
                //     this.articles[this.updateIndex].author = article.author
                //     this.title = ''
                //     this.content = ''
                //     this.author = ''
                // })
                // .catch((err) => {
                //     console.log(err)
                // })
            }
            else{
                let axiosConfig = {
                    headers: {
                        'token': token,
                    }
                }
                const fd = new FormData()
                    fd.append('image',this.selectedFile,this.selectedFile.name)
                    axios.post('http://localhost:3000/articles/upload',fd,axiosConfig)
                    .then(({data}) =>{
                        this.imgsrc = data.link
                        let input = {
                            title:this.title,
                            content:this.content,
                            author:this.author,
                            image:this.imgsrc
                        }
                        axios.post(`${domain}/articles`,input,axiosConfig)
                        .then(({data}) => {
                            console.log(data.createdArticle)
                            this.articles.push(data.createdArticle)
                            this.title = ''
                            this.content = ''
                            this.author=''
                            this.imgsrc=''
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
            }
        },
        fullread:function(id){
            this.readArticle = this.articles[id]
            this.read = true
            window.scrollTo(0,50);
        },
        showregister:function(){
            this.loginForm = 'register'
        },
        showlogin:function(){
            this.loginForm = 'login'
        },
        close:function(){
            this.read = false
        },
        updateArticle:function(index){
            window.scrollTo(0,0);
            this.updateIndex = index
            console.log(this.updateIndex)
            this.showCreate = true
            this.title = this.articles[index].title
            this.content = this.articles[index].content
            this.author = this.articles[index].author
        },
        closeArticle:function(){
            this.showCreate = false
        },
        uncheck:function(){
            localStorage.clear()
            this.condition = 'notlogin'
            this.articles = []
        },
        registerUser:function(){
            axios({
                url:`${domain}/users/signUp`,
                method:`POST`,
                data:{
                    email:this.email,
                    password:this.password,
                }
            })
            .then(({data}) => {
                console.log(data)
                this.email = ''
                this.password = ''
            })
            .catch((err) => {
                console.log(err)
            })
        },
        loginUser:function(){
            axios({
                url:`${domain}/users/signIn`,
                method:`POST`,
                data:{
                    email:this.email,
                    password:this.password,
                }
            })
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user',JSON.stringify(data.details))
                this.email = ''
                this.password = ''
                this.condition = 'login'
                this.readAllArticle()
            })
            .catch((err) => {
                console.log(err)
            })
        },
        readAllArticle:function(){
            let token = localStorage.getItem('token')
            let Config = {
                headers: {
                    'token': token,
                }
            }
            axios.get(`${domain}/articles`,Config)
            .then((response)=>{
                let data = response.data
                for(let i=0; i < data.length; i++){
                    this.articles.push(data[i])
                }
            })
            .catch(function(err){
                console.log(err)
            })
        },
        onFileSelected:function(event){
            this.selectedFile = event.target.files[0]
        }
    },
    created(){
        // axios({
        //     url:`${domain}/articles`,
        //     method:'GET'
        // })
        // .then((response)=>{
        //     let data = response.data
        //     for(let i=0; i < data.length; i++){
        //         this.articles.push(data[i])
        //     }
        // })
        // .catch(function(err){
        //     console.log(err)
        // })
    }      
})