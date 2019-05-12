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
    user_name:null,
    user_email:null,
    mainPage: "home",
    readArticle: "",
    editArticle: "",
    newArticle: ""
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
    setRead(_id) {
      this.mainPage = "read"
      this.readArticle = this.articles.find(ar => ar._id == _id)
      console.log(`reading this article:`, _id)
    },
    setRemove(_id) {
      // this.readArticle = this.articles.find(ar=>ar._id==_id)
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

    },
    fetchHomeArticles() {
      axios
        .get('http://localhost:3000/post-home')
        .then(response => (this.articles = response.data))
        .catch(err => console.log(err))
    },
    logout() {
      if (localStorage.getItem('login-method') === 'google') {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
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
        .then(({
          data
        }) => {
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
          console.log(err)
        })
    },
    regularRegister(registerData) {
      this.mainPage = 'home'
      axios.post(`${BACKEND}/auth/register`, registerData)
        .then(({
          data
        }) => {
          console.log(data)
        })
        .catch(err => {
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

  // The ID token you need to pass to your backend:
  let id_token = googleUser.getAuthResponse().id_token;
  // app.token = id_token
  // localStorage.setItem('mwp-token', id_token)
  localStorage.setItem('login-method', 'google')
}