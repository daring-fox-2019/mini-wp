const url = `http://server-miniwp.sutansyah.co/`;
let app = new Vue({
  el: "#app",
  data: {
    draftArticles: [],
    publishedArticles: [],
    oneArticle: {
      title: "",
      author: "",
      content: "",
      image: ""
    },
    userRegister:{
      email: "",
      password: "",
      name : ""
    },
    searchInput : "",
    fetchedSearch: "",
    editing : false,
    articleId: "",
    formArticle: {
      title: "",
      content: "",
      image: ""
    },
    userLogin: {
      email: "",
      password: ""
    },
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
    },
    isLogin: false,
    file: null,
    image: ""
  },
  methods: {
    search(){
      axios({
        url: `${url}/article/search`,
        method: "get",
        headers:{
          token : localStorage.token
        },
        params:{
          title : this.searchInput,
          author : this.searchInput
        }
      })
      .then(({data})=>{
        data = data.map(element=>{
          element.created = moment(element.createdAt).format("LLLL");
          return element
        })
        this.fetchedSearch = data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    register(){
      axios({
        url : `${url}/user`,
        method: "post",
        data : {
          email: this.userRegister.email,
          name : this.userRegister.name,
          password: this.userRegister.password
        }
      })
      .then(({data})=>{
        this.$bvModal.hide("register-modal")
        this.$swal(`Welcome ${data.name.split(" ")[0]}`, "You may now log in!", "success")
        this.userRegister.email = ''
        this.userRegister.name = ''
        this.userRegister.password = ''
      })
    },  
    publish(article){
      this.$swal({
          dangerMode: true,
          title: `Are you sure to publish ${article.title}?`,
          text: "You won't be able to edit it again!",
          icon: 'warning',
          buttons :["Cancel", "Yes I am sure!"]
      })
      .then((result)=>{
        if(result){
          return axios({
            url: `${url}/article`,
            method : "patch",
            headers : {
              token : localStorage.token
            },
            data : {
              id : article._id,
              published: 1
            }
          })
        }
      })
      .then(({data})=>{
        this.draftArticles = this.draftArticles.filter(el =>{
          return el._id != data._id
        })
        this.fetchArticlesPublished()
        this.$swal("Published!", `You just published ${data.title}!`, 'success')
      })
    },
    upload(){
      console.log('Uploading')
      let formData = new FormData()
      formData.append('file', this.file)
      axios({
        url: `${url}/article/upload`,
        method:"post",
        headers:{
          token : localStorage.token
        },
        data: formData
      })
      .then(({data})=>{
        console.log("CLIENT AXIOS CREATE ARTICLE")
        axios({
          url: `${url}/article`,
          method: "post",
          headers:{
            token: localStorage.token
          },
          data :{
            title: this.formArticle.title,
            content: this.formArticle.content,
            image: data.imageUrl
          }
        })
        .then(({data})=>{

          this.fetchArticlesDrafts()
          this.$bvModal.hide("article-form")
          this.file=null
          this.$swal("Success!", "Your article has been saved to draft list!", "success")
        })
      })
      .catch(err=>{
        console.log("errorrr")
      })
    },
    fetchArticlesDrafts() {
      axios({
        url: `${url}/article`,
        method: "get",
        headers: {
          token: localStorage.token
        },
        params:{
            published: 0
        }
      })
        .then(({ data }) => {
          data = data.map(element => {
            element.author = element.author.name;
            element.created = moment(element.createdAt);
            let now = moment();
            element.daysAgo = element.created.from(now);
            element.created = moment(element.createdAt).format("LLLL");
            return element;
          });
          this.draftArticles = data;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    fetchArticlesPublished() {
      axios({
        url: `${url}/article/published`,
        method: "get",
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          data = data.map(element => {
            element.author = element.author.name;
            element.created = moment(element.createdAt);
            let now = moment();
            element.daysAgo = element.created.from(now);
            element.created = moment(element.createdAt).format("LLLL");
            element.datePublished = moment(element.published_at).format('LL')
            return element;
          });
          this.publishedArticles = data;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    getOneArticle(article) {
      this.oneArticle = {
        title: article.title,
        author: article.author,
        content: article.content,
        image: article.image
      };
    },
    login() {
      axios
        .post(`${url}/login`, {
          email: this.userLogin.email,
          password: this.userLogin.password
        })
        .then(response => {
          localStorage.setItem("token", response.data);
          this.userLogin.email = ""
          this.userLogin.password = ""
          this.fetchArticlesPublished();
          this.fetchArticlesDrafts();
          this.$swal({
            title: "Welcome",
            text: "You have successfully logged in",
            icon: "success"
          })
          this.isLogin = true;
        })
        .catch(err => {
          this.$swal(`Oops..`, "Invalid email/password", "error")
          console.log(err);
        });
    },
    editArticle(article){
      this.editing = true
      this.articleId = article._id
      this.formArticle.image = article.image
      this.formArticle.title = article.title
      this.formArticle.content = article.content
      this.$bvModal.show("article-form")
    },
    createArticle(){
      this.editing = false
      this.formArticle.title = ""
      this.formArticle.content = ""
      this.$bvModal.show("article-form")
    },
    updateArticle(){
      if(this.file){
        let formData = new FormData()
        formData.append('file', this.file)
        axios({
          url: `${url}/article/upload`,
          method:"post",
          headers:{
            token : localStorage.token
          },
          data: formData
        })
        .then(({data})=>{
          axios({
            url: `${url}/article`,
            method: "patch",
            headers:{
              token: localStorage.token
            },
            data:{
              id : this.articleId,
              title: this.formArticle.title,
              content: this.formArticle.content,
              image: data.imageUrl
            }
          })
          .then(({data})=>{
            this.fetchArticlesDrafts()
            this.file =null
            this.$bvModal.hide("article-form")
            this.$swal("Updated!", `${data.title} has been updated!`,"success")
          })
        })
      }else{
        axios({
          url: `${url}/article`,
          method: "patch",
          headers:{
            token: localStorage.token
          },
          data:{
            id : this.articleId,
            title: this.formArticle.title,
            content: this.formArticle.content,
          }
        })
        .then(({data})=>{
          this.fetchArticlesDrafts()
          this.file =null
          this.$bvModal.hide("article-form")
          this.$swal("Updated!", `${data.title} has been updated!`,"success")
        })
      }
    },
    deleteArticle(article){
        this.$swal({
            dangerMode: true,
            title: `Are you sure to delete ${article.title}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons :["Cancel", "Yes!"]
          })
          .then((result) => {
            if (result) {
                axios({
                    url: `${url}/article`,
                    method : "delete",
                    headers:{
                        token : localStorage.token
                    },
                    data:{
                        id: article._id
                    }
                })
                .then(({data})=>{
                    this.draftArticles = this.draftArticles.filter(el =>{
                        return el._id != data._id
                    })
                    this.publishedArticles = this.publishedArticles.filter(el=>{
                        return el._id != data._id
                    })
                    this.$swal(
                      'Deleted!',
                      `${data.title} has been deleted.`,
                      'success'
                    )
                })
                .catch(err=>{
                    this.$swal("Unauthorized", "It looks like that article is not yours...", "error")
                })
            }else{
              
            }
          })
    },
    onSignIn (user) {
      let id_token = user.getAuthResponse().id_token;
      axios({
        url : `${url}/login`,
        method: "post",
        data :{
          googleToken : id_token
        }
      })
      .then(({data})=>{
        localStorage.setItem("token", data.token);
        this.fetchArticlesPublished();
        this.fetchArticlesDrafts();
        this.$swal(`Welcome`, "You have sucessfully logged in through google", "success")
        this.isLogin = true;
      })
      .catch(err=>{
        console.log(err)
      })
    },
    logout() {
      this.$swal({
        dangerMode: true,
        title: `Are you sure to sign out?`,
        icon: 'warning',
        buttons :["Cancel", "Yes!"]
      })
      .then((result)=>{
        if(result){
          this.$swal({
            title: `Bye bye!`,
            text:`Hope to see you soon!`,
            icon: 'success',
            buttons :["Cancel", "Yes!"]
          })
          let auth2 = gapi.auth2.getAuthInstance();
          if (auth2) {
            auth2.signOut().then(function () {
              // gapi.signin2.render("google-button",{
              //   onsuccess: this.onSignIn
              // })
              console.log('User signed out.');
            });
          } 
          localStorage.removeItem("token");
          this.isLogin = false;
        }else{
          
        }
      })
    },
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true;
      this.fetchArticlesDrafts();
      this.fetchArticlesPublished()
    }
  },
  mounted(){
    gapi.signin2.render("google-button",{
      onsuccess: this.onSignIn
    })
  }
});

Vue.use(CKEditor);
