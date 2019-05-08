const baseURL = "http://localhost:3000";

var app = new Vue({
  el: "#app",
  data: {
    isLogin: false,
    authenticate: "",
    loginUser: {
      profPic: "",
      username: ""
    },
    articles: [],
    page: "",
    details: {},
    newArticle : {
        title : '',
        content : '',
        photo : '',
        tags : '',
        userId : localStorage.getItem('id')
    },
    editor : false
  },
  methods: {
    // [LOGIN & AUTHENTICATE]
    showRegister() {
      this.authenticate = "register";
    },
    showLogin() {
      this.authenticate = "login";
    },
    logout() {
      this.authenticate = "";
      this.isLogin = false;
      localStorage.clear();
    },
    successLogin() {
      this.loginUser.profPic = localStorage.getItem("image");
      this.loginUser.username = localStorage.getItem("username");
      this.isLogin = true;
      this.authenticate = "";
      this.page = "all";
    },
    successRegister() {
      this.showLogin();
    },
    showEditor() {
      this.editor = true
    },
    //------[FUNCTIONALITY]-------------
    fetchArticles() {
      axios
        .get(`${baseURL}/articles`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
          this.page = "all";
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchDetails(id) {
      axios
        .get(`${baseURL}/articles/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.details = data;
          this.page = "details";
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addArticle() {
      console.log('masuk');
      
      let formData = new FormData()

      formData.append('title', this.newArticle.title)
      formData.append('content', this.newArticle.content)
      formData.append('photo', this.newArticle.photo)
      formData.append('userId', this.newArticle.userId)

      axios
        .post(`${baseURL}/articles`, formData , { headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getValue() {
      let overview = this.$refs.editor.getVal()
      this.newArticle.content = overview
      this.addArticle()
    },
    getImage() {
      this.newArticle.photo = event.target.files[0]
    },
    updateArticle(id, value) {
      if (value == 'like') {
        axios
          .put(`${baseURL}/articles/${id}`, { like : localStorage.getItem('id') }, { headers : { token : localStorage.getItem('token')}})
          .then(({ data }) => {
            this.fetchArticles()
            this.fetchDetails()
            swal('You liked this blogs!','','success')
            console.log(data);
          })
          .catch((err) => {
            if (err.response.data) {
              swal('Oops', err.response.data.msg, 'warning')
            }
          })
      }
    }
  },
  mounted() {
     this.$refs.editor.run('code','')
  },
  created() {
    if (localStorage.getItem("token")) {
      this.loginUser.profPic = localStorage.getItem("image");
      this.loginUser.username = localStorage.getItem("username");
      this.fetchArticles();
      this.isLogin = true;
      this.page = "all";
    }
  }
});
