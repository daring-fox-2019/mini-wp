const BACKEND = `http://localhost:3000`

var app = new Vue({
  el: '#blog-post',
  data: {
    articles: [],
    token: null,
    signInMethod: {
      google: false
    },
    reg: {},
    cred: {},
    user_id: null,
    user_name: null,
    user_email: null,
    mainPage: "home",
    readArticle: "",
    editArticle: "",
    newArticle: "",
    alert: null
  },

  mounted() {
    this.fetchHomeArticles()
    if (localStorage.getItem('mwp-token') && localStorage.getItem('user')) {
      this.token = localStorage.getItem('mwp-token')
      this.user_name = localStorage.getItem('user_name')
      this.user_email = localStorage.getItem('user_email')
      this.user_id = localStorage.getItem('user_id')
    }
  },
  computed: {},
  methods: {
    setAlert(message) {
      this.alert = message
      let self = this
      setTimeout(() => { self.alert = null }, 2000)
    },
    setRead(_id) {
      this.mainPage = "read"
      this.readArticle = this.articles.find(ar => ar._id == _id)
      console.log(`reading this article:`, _id)
    },
    remove(_id) {
      axios({
        method: 'delete',
        url: `${BACKEND}/article/${_id}`,
        headers: { token: this.token },
      })
        .then(({ data }) => {
          this.fetchHomeArticles()
          this.mainPage = 'home';
        })
        .catch(err => {
          this.setAlert(err.response.data.message)
          console.log(err)
        })
    },
    setEdit(_id) {
      console.log(`editting this article:`, _id)
      this.mainPage = "edit"
      this.editArticle = this.articles.find(ar => ar._id == _id)
    },
    setAdd(_id) {
      this.mainPage = "create"
      this.newArticle = {
        author: this.user_id,
        title: "",
        content: "",
        created_at: new Date,
        featured_image: "",
        tags: []
      }
    },
    patchArticle(article) {
      // console.log(`we are going to patch this article`)
      // Object.keys(article).forEach(key=>console.log(key,article[key]))
      // console.log(Object.keys(article))   

    },
    addArticle(article) {
      axios({
        method: 'post',
        url: `${BACKEND}/article`,
        data: article,
        headers: { token: this.token },
      })
        .then(({ data }) => {
          this.fetchHomeArticles()
          this.mainPage = 'home';
        })
        .catch(err => {
          this.setAlert(err.response.data.message)
          console.log(err)
        })
    },
    fetchHomeArticles() {
      axios
        .get('http://localhost:3000/article-home')
        .then(response => (this.articles = response.data))
        .catch(err => console.log(err))
    },
    logout() {
      if(gapi.auth2.getAuthInstance().isSignedIn.get()){
      // if (localStorage.getItem('login-method') === 'google') {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('Google User signed out.');
        });
      }

      localStorage.removeItem('mwp-token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_email')
      localStorage.removeItem('user_name')
      localStorage.removeItem('login-method')
      this.token = null;
      this.user_id = null;
      this.user_email = null;
      this.user_name = null;
    },

    regularLogin(loginData) {
      console.log(`regular login -- will send to server`)
      this.mainPage = 'home'
      // console.log(Object.keys(loginData))      
      axios.post(`${BACKEND}/auth/login`, loginData)
        .then(({ data }) => {
          this.logout()
          localStorage.setItem('mwp-token', data.token)
          localStorage.setItem('user_id', data.user._id)
          localStorage.setItem('user_email', data.user.email)
          localStorage.setItem('user_name', data.user.name)
          this.token = data.token
          this.user_id = data.user._id
          this.user_email = data.user.email
          this.user_name = data.user.name
          console.log(data)
        })
        .catch(err => {
          this.setAlert(err.response.data.message)          
          console.log(err)
        })
    },
    regularRegister(registerData) {
      this.mainPage = 'home'
      axios.post(`${BACKEND}/auth/register`, registerData)
        .then(({ data }) => {
          console.log(data)
        }).catch(err => {
          this.setAlert(err.response.data.message)          
          console.log(err)
        })
    }
  }
})

function onGoogleSignIn() {
  const googleUser = gapi.auth2.getAuthInstance().currentUser.get();

  let profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  let id_token = googleUser.getAuthResponse().id_token;
  localStorage.setItem('login-method', 'google')
  
  axios({
    method: 'post',
    url: `${BACKEND}/auth/google-login`,
    data: { token: id_token }
  })
    .then(({ data }) => {
      console.log(data.user._id)
      console.log(data.user.email)
      console.log(data.user.name)
      console.log(data.token)
      app.token = data.token
      app.user_id = data.user._id
      app.user_email = data.user.email
      app.user_name = data.user.name
      app.mainPage = 'home';
    })
    .catch(err => {
      app.logout()
      app.setAlert(err.response.data.message)
      console.log(err)
    })



  localStorage.setItem('login-method', 'google')
}