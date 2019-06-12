const app = new Vue({
    el: "#app",
    components : {
        wysiwyg : vueWysiwyg.default.component
    },
    data: {
        isUpload : false,
        searchQuery: "",
        articles: [],
        newArticle : {
            title : '',
            description: '',
            author: '',
            content: '',
            image : ''
        },
        file : '',
        articlePage: true,
        detail : false,
        articleDetail : {},
        homePage: true,
        siginPage: false,
        editPage : false,
        isLogin : false,
        registerform : {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        user : {
            name : localStorage.fullName
        }
    },
    methods :{
        register(input){
            console.log(input);
            axios({
                method : 'post',
                url : "http://localhost:3000/register",
                data : {
                    firstName : input.firstName,
                    lastName : input.lastName,
                    email : input.email,
                    password : input.password
                }
            })
            .then(({data})=>{
                console.log(data,'ini response data');
                swal(`Account successfully registered!`, ' ', 'success');
                this.homePage = false,
                this.siginPage = true
            })
            .catch(err =>{
                console.log(err);
            })
            
        },
        login(input){
            console.log(input);
            axios({
                method: "post",
                url: "http://localhost:3000/login",
                data : {
                    email : input.email,
                    password : input.password
                }
            })
            .then(({data}) =>{
                // console.log(data.token);
                this.successLogin(data)

            })
            .catch(err =>{
                console.log(err,'---------');
                swal(`usernam/password salah!`, ' ', 'error');
            })
        },
        
        successLogin(data){
            console.log(data,'ini dari login');
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('fullName', `${data.firstName} ${data.lastName}`);
            window.localStorage.setItem('email', data.email);
            window.localStorage.setItem('id', data.id);
            this.user.name = localStorage.fullName
            this.isLogin = true;
            swal(`Welcome ${localStorage.fullName}!`, ' ', 'success');
            this.checkLog();
        },

        getMyArticles(){
            axios({
                method : "get",
                url : "http://localhost:3000/myArticles",
                headers : {
                    token : localStorage.token
                }
            })
            .then(value =>{
                value.data.forEach(article => {
                    article.showStatus = true
                    this.articles.push(article)
                });
            })
            .catch(err =>{
                console.log(err);
            })
        },
        checkLog(){
            if(localStorage.token != undefined){
                console.log('masih kebaca token');
                this.isLogin = true
                this.articlePage = true
                this.getMyArticles()
                
            }else{
                this.isLogin = false
                this.articlePage = false
            }
        },
        signOut(){
            if(gapi.auth2 != undefined){
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut()
                .then(()=>{
                    this.user.name = ''
                    this.emptyLocalStorage()
                    this.checkLog()   
                })
                .catch(err =>{
                    console.log(err);
                    
                })
            }else{
                this.user.name = ''
                this.emptyLocalStorage()
                this.checkLog()
            }
        },
        emptyLocalStorage(){
            console.log('masuk empty')
            this.articles = []
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('id')
            window.localStorage.removeItem('email')
            swal('Signed out', `Goodbye, ${localStorage.fullName}!`, 'success')
            window.localStorage.removeItem('fullName')
            this.isLogin = false
            this.articlePage = false
            this.checkLog()
        },
        uploadImage(){
            this.file = ''
            this.file = event.target.files[0]
            this.newArticle.image = this.file
            console.log('file masuk',this.file)
        },
        showArticle(article){
            this.articleDetail = article
            this.detail = true
        },
        createArticle(){
            let formData = new FormData()
            formData.append('image',this.newArticle.image)
            formData.append('title',this.newArticle.title)
            formData.append('description',this.newArticle.description)
            formData.append('author',this.newArticle.author)            
            formData.append('content',this.newArticle.content)

            axios({
                method: 'post',
                url: `http://localhost:3000/articles`,
                data : formData,
                headers : {
                    token : localStorage.token
                }
            })
            .then(article =>{
                // console.log(article.data);
                // console.log(this.articles);
                this.emptyForm()
                this.articles.push(article.data.newArt)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        deleteArticle(input){
            
            axios({
                method: "delete",
                url: `http://localhost:3000/articles/${input}`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(value =>{
                newArt = []
                this.articles.forEach(article =>{
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
            // console.log(id);
            axios({
                method : 'get',
                url : `http://localhost:3000/articles/${id}`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(value=>{
                // console.log(value);
                this.articlePage = false
                this.editPage = true
                this.newArticle.title = value.data.title,
                this.newArticle.description = value.data.description || '',
                this.newArticle.author = value.data.author,
                this.newArticle.content = value.data.content
                this.newArticle.image = value.data.image
                this.newArticle.id = value.data._id
            })
            .catch(err =>{
                console.log(err,"======");
                
            })
        },
        editArticleDb(id){
            // console.log(id,'mau update database');
            // console.log(this.newArticle);
            
            let formData = new FormData()
            formData.append('title',this.newArticle.title)
            formData.append('author',this.newArticle.author)
            formData.append('description',this.newArticle.description)
            formData.append('content',this.newArticle.content)
            formData.append('image',this.newArticle.image)
            
            // console.log(formData);
            
            axios({
                method: "patch",
                url : `http://localhost:3000/articles/${id}`,
                data : formData,
                headers : {
                    token : localStorage.token
                }
            })
            .then(value => {
                // console.log(value,'ini value');
                console.log('selesai patch');
                return axios({
                    method: "get",
                    url: `http://localhost:3000/myArticles`,
                    headers : {
                        token : localStorage.token
                    }
                })
            })
            .then(value =>{
                // console.log(value,'value hasil get');
                
                newArt = []
                value.data.forEach(article =>{
                        newArt.push(article)
                })
                // console.log(newArt);
                
                this.articles = newArt
                this.articlePage = true
                this.editPage = false
                this.emptyForm()
            })
            .catch(err =>{
                console.log('lah kok kesini');
                
                console.log(err);
            })
        },
        emptyForm(){
            this.newArticle = {
                title : '',
                description: '',
                content: '',
                image : ''
            }
        }
    }
    ,
    created(){
        if(localStorage.token != undefined){
            console.log(localStorage);
            this.isLogin = true
            this.articlePage = true
            this.checkLog()
            // console.log(localStorage);
        }else{
            this.isLogin = false
        }
        
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
if(localStorage.token === undefined){
    function onSignIn(googleUser){
        console.log('google user kesini');
        console.log(googleUser);  
        let id_token = googleUser.getAuthResponse().id_token
        // console.log(id_token);
        axios({
            method: 'post',
            url: 'http://localhost:3000/googleLogin',
            headers: {
                id_token
            }
        })
        .then(function({data}){
            app.successLogin(data)
        })
        .catch(err=>{
            console.log('yah error');
            
            console.log(err);
            
        })
    }
}
