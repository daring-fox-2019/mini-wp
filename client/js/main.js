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
        formPost:false,
        contentAdmin:false,
        sidebarAdmin:false,
        post:{
            
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.googleLogin

        })

        gapi.load('auth2', function() {
            gapi.auth2.init();
          });
    },
    methods: {
        whereWego(value) {
            console.log('masuk whereWego')
            if (value == "login") {
                console.log('berhasil')
                this.showFormLogin()
            } else if (value == "register") {
                console.log('register')
                this.showFormRegister()
            } else if (value == "adminarea") {
                console.log('admin area')
                this.showAdminArea()
            } else if (value =="formpost"){
                console.log('masuk formpost');
                
                this.showFormPost()
            }

        },
        clear() {
            this.nav = false
            this.nav = true
            this.formRegister = false,
            this.formLogin = false,
            this.adminArea = false
            this.formPost=false,
            this.contentAdmin=false,
            this.sidebarAdmin=false
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
            this.adminArea = true
        },
        showFormPost(){
            console.log('lalala eyyeey')
            this.clear()
            this.adminArea = true
            this.formPost=true
            this.sidebarAdmin=true
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
        logout(){
            var auth2 =gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');            
            });
            localStorage.clear()
            this.login = false
            this.whereWego('login')
        }

    }
})

if (localStorage.access_token) {
    app.login = true
    axios.defaults.headers.common['access_token'] = localStorage.access_token
    app.username = localStorage.name
}




