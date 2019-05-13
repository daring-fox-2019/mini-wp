var serverUrl = 'http://localhost:3000';

Vue.config.devtools = true
const app = new Vue({
    el: "#app",
    data: {
        login: false,
        formRegister: false,
        formLogin: false,
        adminArea: false,
        username: "",
        nav: true,
        formPost: false,
        contentAdmin: false,
        sidebarAdmin: false,
        formEditPost: false,
        showOne:false,
        showAllArticle:false,
        searchResult:false,
        searchResultValue:'',
        post: {

        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.googleLogin

        })

        gapi.load('auth2', function () {
            gapi.auth2.init();
        });
    },
    created() {
        if (localStorage.access_token) {
            this.login = true
            axios.defaults.headers.common['access_token'] = localStorage.access_token
            this.username = localStorage.name
            this.showAdminArea()
        } else {
            this.login = false

        }

    },
    methods: {
        whereWego(value) {
            console.log('masuk whereWego')
            if (value == "login") {
                console.log('berhasil')
                this.showFormLogin()
            } else if (value == "register") {showAll
                console.log('register')
                this.showFormRegister()
            } else if (value == "adminarea") {
                console.log('admin area')
                this.showAdminArea()
            } else if (value == "formpost") {
                console.log('masuk formpost');

                this.showFormPost()
            } else if (value=="showall"){
                this.showGetAll()
            }

        },
        clear() {
            this.nav = false
            this.nav = true
            this.formRegister = false,
            this.formLogin = false,
            this.adminArea = false
            this.formPost = false,
            this.contentAdmin = false,
            this.sidebarAdmin = false,
            this.formUpdate = false,
            this.showOne = false,
            this.showAllArticle=false
            this.searchResult = false
        },
        lagiLogin(value) {
            this.login = value
        },
        showFormLogin() {
            this.clear()
            this.formLogin = true
            console.log('show form login')
        },
        showFormRegister() {
            this.clear()
            this.formRegister = true
        },
        showAdminArea() {
            this.clear()
            console.log('admin area');
            this.contentAdmin = true
            this.sidebarAdmin = true

            this.username = localStorage.name
            this.adminArea = true
        },
        showFormPost() {
            this.clear()
            this.adminArea = true
            this.formPost = true
            this.sidebarAdmin = true
        },
        showFormUpdate(item) {
            console.log('lalala eyyeey', item)
            this.clear()
            this.adminArea = true
            this.formUpdate = true
            this.sidebarAdmin = true
            this.post = item
        }, showGetOne(item) {
            this.clear()
            this.showOne = true
            this.post = item
        },
        searchResultAction(value){
            this.clear()
            this.searchResult = true
            this.searchResultValue=value
            console.log(value,'ini search result')

        },
        showGetAll() {
            this.clear()
            this.showAllArticle = true
            console.log('masuk')
        },
        googleLogin(googleUser) {
            console.log('masuk')
            const idToken = googleUser.getAuthResponse().id_token
            axios.post(`${serverUrl}/user/googleLogin`, {
                idToken
            })
                .then(({ data }) => {
                    console.log(data)
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('name', data.name)
                    axios.defaults.headers.common['access_token'] = localStorage.access_token
                    this.login = true
                    this.whereWego('adminarea')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.clear()
            this.login = false
            this.whereWego('login')
            Swal.fire({
                type: 'success',
                title: 'Success logout',
                showConfirmButton: false,
                timer: 1500
            })
        },
        dateformat: function (date) {
            return moment(date).format('llll')
        },

    }
})






