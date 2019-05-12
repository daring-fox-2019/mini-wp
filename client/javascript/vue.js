var baseUrl = 'http://localhost:3000'

const app = new Vue ({
    el: '#app',
    data : {
        articles : [],
        detailArticle : {},
        newArticle: {
        },
        user : {
            email : '',
            password : ''
        },
        newUser : {
            firstName : '',
            lastName : '',
            email : '',
            password : ''
        },
        page : 'login',
        isLogin : false,
        isLoginGoogle: false,
        search : '',
        showList : false,
        showAdd : false,
        showEdit : false,
        showLogin : false,
        showRegister : false,
        showHome : false,
        showDetail: false,
        isImageChange: false

    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    created() {
        this.initial()
    },
    methods: {
        initial() {
            if(localStorage.getItem("token")){
                axios({
                    method: 'post',
                    url: `${baseUrl}/authenticate`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(response =>{
                    this.isLogin = true
                    this.page = 'home'
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Welcome Back',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }) 
                .catch(err =>{
                    localStorage.removeItem('token')
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Token invalid',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
            else{
                this.page = 'login'
                this.isLogin = false
            }  
        },
        userRegister(){
            axios({
                url: baseUrl + '/register',
                method: 'post',
                data : this.newUser
            })
            .then(({data})=>{
                this.page = 'home'
                this.isLogin = true
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('email', data.email)
                localStorage.setItem('name', data.name)
            })
            .catch(err =>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        userLogin() {
            axios({
                url : baseUrl+'/login',
                method: 'post',
                data : this.user
            })
            .then(({data}) => {
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('email', data.email)
                localStorage.setItem('name', data.name)
                this.page = 'home'
                this.isLogin = true
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        logOutGoogle(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Sign Out',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        logOut (){
            (this.isLoginGoogle) ? this.logOutGoogle()  : null
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('name')
            this.initial()
        },
        handleFileUpload() {
            this.isImageChange = true
            this.newArticle.image = this.$refs.file.files[0]
        },
        showHomePage() {
            this.page = 'home'
        },
        showRegisterPage() {
            this.page = 'register'
        },
        showLoginPage(){
            this.page = 'login'
        },
        showArticle() {
            axios({
                method: 'get',
                url: `${baseUrl}/articles`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data}) =>{ 
                this.page = 'list-article'
                this.articles = data
                this.articles.forEach((el,i) =>{
                    this.articles[i].date = String(el.updatedAt).slice(0,10)
                    this.articles[i].description = el.description.slice(0,500) + '...'
                })
            })
            .catch(err =>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        showAddArticle() {
            this.page = 'add-article'
            this.newArticle = {}
        },
        showEditArticle(idArticle) {
            axios({
                method: 'get',
                url: `${baseUrl}/articles/${idArticle}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data}) =>{ 
                this.newArticle = data
                this.page = 'edit-article'
            })
            .catch(err =>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        showDetailPage(idArticle){
            this.showList = false
            axios({
                method: 'get',
                url: `${baseUrl}/articles/${idArticle}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data}) =>{ 
                this.page = 'detail-article'
                this.detailArticle = data
                this.detailArticle.date = String(data.updatedAt).slice(0,10)
            })
            .catch(err =>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        addArticle() {
            let timerInterval
            Swal.fire({
                title: 'Add new artcile',
                html: 'On progress <strong></strong> seconds.',
                timer: 2000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong')
                        .textContent = Swal.getTimerLeft()
                    }, 
                    100)},
                onClose: () => { clearInterval(timerInterval) }
                })
                .then((result) => {
                if (
                    result.dismiss === Swal.DismissReason.timer
                ) 
                {}
            })
            const formData = new FormData()
            formData.append('image',this.newArticle.image)
            formData.append('title',this.newArticle.title)
            formData.append('description',this.newArticle.description)
            axios({
                url: baseUrl + '/articles',
                method: 'post',
                data : formData,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.showArticle()
                this.isImageChange = false
            })
            .catch(err =>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        editArticle() {
            const formData = new FormData()
            if(this.isImageChange) formData.append('image',this.newArticle.image)
            formData.append('title',this.newArticle.title)
            formData.append('description',this.newArticle.description)
           axios({
               method: 'put',
               url: `${baseUrl}/articles/${this.newArticle._id}` ,
               data: formData,
               headers: {
                   token : localStorage.getItem('token')
               }
           })
           .then(response=>{
                let timerInterval
                Swal.fire({
                    title: 'Edit artcile',
                    html: 'On progress <strong></strong> seconds.',
                    timer: 2000,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                        }, 
                        100)},
                    onClose: () => { clearInterval(timerInterval) }
                    })
                    .then((result) => {
                    if (
                        result.dismiss === Swal.DismissReason.timer
                    ) 
                    {}
                })
                this.showArticle()
           })
           .catch(err=>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
           })
        },
        deleteArticle(id) {
            axios({
                method: 'delete',
                url: `${baseUrl}/articles/${id}`,
                headers: {
                    token : localStorage.getItem('token')
                } 
            })
            .then(response =>{
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Delete succesfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.showArticle()
            })
            .catch(err =>{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Internal Server Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        _search(){
            Swal.fire({
                position: 'center',
                type: 'error',
                title: 'search not found',
                showConfirmButton: false,
                timer: 1500
            })
        }
    },
    watch : {
        search(newSearch,oldSearch) {
            let get = this.articles.filter((el,i) =>{
                let check = el.title.includes(this.search)
                if(check) return el
            })
            this.articles = get
            if(newSearch.length < oldSearch.length) this.showArticle()
        }
    }
})
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    axios.post(baseUrl+'/google/login',{id_token})
    .then(({data})=>{
        localStorage.setItem('token',data.access_token)
        app.isLogin = true
        app.page = 'home'
        app.isLoginGoogle = true
    })
}