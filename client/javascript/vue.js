Vue.config.devtools = true

var app2 = new Vue({
  el: '#body',
  data: {
    isLogin: false,
    isRegister: false,
    page: 'login',

    filterArticle: "",

    id: '',
    username: '',
    email: '',
    password: '',

    createForm: {
      title: '',
      content: '',
      image: ''
    },

    createTitle: '',
    createContent: '',
    createImage: '',

    editTitle: '',
    editContent: '',
    editImage: '',

    all_articles: false,
    listArticles: [],

  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true
      this.isRegister = true
      this.readArticle()
    }
  },
  mounted() {
    gapi.signin2.render("google-button", {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    userRegister() {
      this.isLogin = true
      this.page = 'register'
    },

    newUserRegister() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data);

          this.isLogin = false
          this.page='login'
          // this.readArticle()
          // console.log(list);
        })
        .catch(error => {

        })
    },
    userLogin() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.dataUser.id)
          localStorage.setItem('email', data.dataUser.email)
          this.isLogin = true
          this.readArticle()
          this.page = 'web'
          // console.log(list);
        })
        .catch(error => {

        })
      // this.isLogin = true
    },

    userLogout() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        if (localStorage.getItem('token')) {
          localStorage.removeItem('id')
          localStorage.removeItem('email')
          localStorage.removeItem('token')
        }
      });
      this.isLogin = false
      this.page = 'login'
    },
    uploadImage(event) {
      this.createImage = event.target.files[0]
    },
    createArticle() {
      let formData = new FormData()
      // formData.append('image',this.createImage)
      // formData.append('title',this.createTitle)
      // formData.append('content',this.createContent)

      axios({
        method: 'post',
        url: 'http://localhost:3000/articles/add',
        data: {
          title: this.createTitle,
          content: this.createContent
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.listArticles.push(data)
          console.log(data);
        })
        .catch(err => {
          console.log(`masuk`);
          console.log(err);
        })
    }
    ,
    readArticle() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles/read',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          // this.litsArticles = data
          // return data
          data.map(x => {
            if (x.updated_at) {
              let date = new Date(x.updated_at).toLocaleDateString()
              x.updated_at = date
            }
          })
          this.listArticles = data
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    ,
    deleteArticle(id) {
      console.log(id);
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles/delete/${id}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data);
          this.listArticles = this.listArticles.filter(x => x._id !== data._id)
        })
        .catch(err => {


        })

    },
    editArticle(article) {
      this.id = article._id
      this.editTitle = article.title
      this.editContent = article.content
      this.editImage = article.image
    },
    updateArticle() {
      console.log(this.id);
      axios({
        method: 'patch',
        url: `http://localhost:3000/articles/edit/${this.id}`,
        data: {
          title: this.editTitle,
          content: this.editContent,
          image: this.editImage
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.readArticle()
        })
        .catch(error => {

        })
    },
    allArticles() {
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/all`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.all_articles = true
          console.log(data);
          this.listArticles = data
          console.log(this.listArticles);
          // this.readArticle()
        })
        .catch(error => {

        })
    },
    onSignIn(user) {
      // console.log(user);
      let id_token = user.getAuthResponse().id_token;
      // console.log(id_token);
      axios({
        url: `http://localhost:3000/users/googleSignin`,
        method: "post",
        headers: {
          token: id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.readArticle();
          swal(`Welcome`, "You have sucessfully logged in through google", "success")
        })
        .catch(err => {
          console.log(err)
        })
        this.isLogin = true;
        this.page='web'
    }
  }
})

