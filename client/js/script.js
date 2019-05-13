const baseURL = "http://localhost:3000";

function onSignIn(googleUser) {
  event.preventDefault()
  
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;

  axios.post(`${baseURL}/users/google`,{ token : id_token })
    .then(({data}) => {
      console.log(data,'dapet apa?');
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      localStorage.setItem('username', data.username)
      localStorage.setItem('image', data.profPic)
      app.successLogin()
     
    })
    .catch((err)=> {
      console.log(err);
    });
}

function signOut() {
  app.logout()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}

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
    page: "home",
    details: {},
    newArticle : {
        title : '',
        content : '',
        photo : '',
        userId : localStorage.getItem('id')
    },
    currentTags : [],
    newTag : '',
    query: '',
    editMode: false,
    editArticle : {
      _id : '',
      title : '',
      content : '',
      photo : '',
      userId : localStorage.getItem('id')
    },
    isSearch : false,
    isTags : false,
    allTags : []
  },
  methods: {
    // [LOGIN & AUTHENTICATE]
    
    showHome() {
      this.page = 'home'
    },
    showRegister() {
      this.page = "register";
    },
    showLogin() {
      this.page = "login";
    },
    logout() {
      this.page = "home";
      this.isLogin = false;
      localStorage.clear();
    },
    showAll() {
      this.page = 'all'
    },
    successLogin() {
      this.loginUser.profPic = localStorage.getItem("image");
      this.loginUser.username = localStorage.getItem("username");
      this.fetchArticles()
      this.isLogin = true;
      this.authenticate = "";
      this.page = "all";
    },
    successRegister() {
      this.showLogin();
    },
    showEditor() {
      this.clearState()
      this.page = 'editor'
      this.editMode = false
    },
    showSearch() {
      this.isSearch == true ? this.isSearch = false : this.isSearch = true
    },
    showEditArticle(id){
      axios.get(`${baseURL}/articles/${id}`, { headers : { token : localStorage.getItem('token')}})
           .then(({ data })=> {
             console.log(data);
             this.currentTags = []
             this.editArticle = data
             this.page = 'editor'
             this.editMode = true
             data.tags.forEach( tag => {
               this.currentTags.push(tag.tagName)
             })
           })
           .catch((err) => {
             console.log(err);
           })
    },
    clearState(){
      this.articles = []
      this.currentTags = []
      this.newArticle = {}
      this.editArticle = {
        title : '',
        content : '',
        photo : '',
        userId : ''
      }
    },
    //------[FUNCTIONALITY]-------------
    search(){
     
      let params = {
        title : this.query,
        tag : this.query
      }
      axios
        .get(`${baseURL}/articles`,
              { headers : { token : localStorage.getItem('token')},
                params
              })
        .then(({ data }) => {
          this.articles = data
          console.log(data);
          
        })
        .catch((err)=> {
          console.log(err.response.data.message);
          
        })
    },
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
    showMine() {
      axios
        .get(`${baseURL}/articles/user`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
          this.page = 'private'
        })
        .catch((err) => {
          console.log(err);
        })
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
      
      let formData = new FormData()

      formData.append('title', this.newArticle.title)
      formData.append('content', this.newArticle.content)
      formData.append('photo', this.newArticle.photo)
      formData.append('userId', this.newArticle.userId)
      formData.append('tags', this.currentTags)

      axios
        .post(`${baseURL}/articles`, formData , { headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          this.fetchArticles()
          this.newArticle = {}
          swal('Congratulation!','Your post has been posted','success')
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
    getEditValue() {
      let overview = this.$refs.editor.getVal()
      this.editArticle.content = overview
      this.updateArticle(this.editArticle._id)
    },
    getImage(event) {

      let formData = new FormData()
      if(this.editMode) {
        this.editArticle.photo = event.target.files[0]
        formData.append('photo', this.editArticle.photo)
      } else {
        this.newArticle.photo = event.target.files[0]
        formData.append('photo', this.newArticle.photo)
      }
      
      axios.post(`${baseURL}/tags`, formData, { headers : { token : localStorage.getItem('token'), "Content-Type" : "multipart/form-data"}})
        .then(({ data }) => {
           data.forEach(tag => {
            this.currentTags.push(tag)
           });
           console.log(data);
           swal("Great!","Your image has been uploaded!","success")
           
        })
        .catch((err) => {
          console.log(err);
        })
    },
    createTag(){
      axios.post(`${baseURL}/tags/add`, {tagName : this.newTag}, { headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          console.log(data);
          this.currentTags.push(data.tagName)
          this.newTag = ''
        })
        .catch((err)=> {
          console.log(err);
        })
    },
    deleteTag(value){
        this.currentTags = this.currentTags.filter( tag => tag !== value )
    },
    updateArticle(id, value) {
      if (value == 'like') {
        axios
          .put(`${baseURL}/articles/${id}`, { type : 'like', like : localStorage.getItem('id') }, { headers : { token : localStorage.getItem('token')}})
          .then(({ data }) => {
            if (data.msg == 'like') {
              swal('You liked this blogs!','','success')
            } else {
              swal('You dislike this blogs!','','success')
            }
            if(this.page == 'all'){
              this.fetchArticles()
            } else if(this.page == 'private' ) {
              this.fetchArticles()
            } 

            console.log(data);
          })
          .catch((err) => {
            if (err.response.data) {
              swal('Oops', err.response.data.msg, 'warning')
            }
          })
      } else {
       
        
        let formData = new FormData()

        formData.append('title', this.editArticle.title)
        formData.append('content', this.editArticle.content)
        formData.append('photo', this.editArticle.photo)
        formData.append('userId', this.editArticle.userId)
        formData.append('tags', this.currentTags)

        axios
        .put(`${baseURL}/articles/${id}`, formData, { headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          console.log(data);
          swal("Great!","Your post has been successfully updated!","success")
          this.fetchDetails(data._id)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    deleteArticle(id) {
      axios
        .delete(`${baseURL}/articles/${id}`, { headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          console.log(data);
          swal('Deleted!','', 'success')
          this.showMine()
        })
        .catch((err) => {
          console.log(err);
        })
    },
    showLikes() {
      axios
        .get(`${baseURL}/articles/likes`, {headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          console.log(data);
          this.articles = data
          this.page = 'all'
        })
        .catch((err)=> {
          console.log(err);
        })
    },
    showTags() {
      if (this.isTags) {
         this.isTags = false
      } else {
        axios
          .get(`${baseURL}/tags`, {headers : { token : localStorage.getItem('token')}})
          .then(({ data })=> {
            console.log(data);
            this.allTags = data
            this.isTags = true
          })
          .catch((err)=> {
            console.log(err);
          })
      }
    },
    showByTag(value) {
      let params = { tag : value }
      axios
        .get(`${baseURL}/articles`, { headers : { token : localStorage.getItem('token')},
        params 
      })
      .then(({ data })=> {
        this.page = 'all'
        this.articles = data
        console.log(data);
      })
      .catch((err)=> {
        console.log(err);
      })
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.loginUser.profPic = localStorage.getItem("image");
      this.loginUser.username = localStorage.getItem("username");
      this.fetchArticles();
      this.isLogin = true;
      this.showAll()
    } 
  },
  computed: {
  
    computedList: function() {
      var vm = this
      return this.articles.filter(function(item){
        return item.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
});
