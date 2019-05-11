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
        userId : localStorage.getItem('id')
    },
    currentTags : [],
    newTag : '',
    query: '',
    editMode: false,
    editArticle : {
      title : '',
      content : '',
      photo : '',
      userId : localStorage.getItem('id')
    }
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
      this.page = 'editor'
    },
    showEditArticle(id){
      this.currentTags = []
      this.page = 'editor'
      this.editMode = true
      axios.get(`${baseURL}/articles/${id}`, { headers : { token : localStorage.getItem('token')}})
           .then(({ data })=> {
             this.editArticle = data
      
             data.tags.forEach( tag => {
               this.currentTags.push(tag.tagName)
             })
           })
           .catch((err) => {
             console.log(err);
           })
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
    getImage(event) {

      this.newArticle.photo = event.target.files[0]
      
      let formData = new FormData()

      formData.append('photo', this.newArticle.photo)

      axios.post(`${baseURL}/tags`, formData, { headers : { token : localStorage.getItem('token'), "Content-Type" : "multipart/form-data"}})
        .then(({ data }) => {
           data.forEach(tag => {
            this.currentTags.push(tag)
           });
           console.log(data);
           
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
        })
        .catch((err)=> {
          console.log(err);
        })
    },
    beforeEnter: (el) => {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: (el, done) => {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height : '1.6em'},
          { complete : done }
        )
      }, delay)
    },
    leave: (el, done) => {
      var delay = el.dataset.index * 150
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete : done }
        )
      }, delay)
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
