
let vue = new Vue({
  el : "#thepage",
  data : {
    user : "user",
    islogin : false,
    page : "login",
    name : "",
    email : "",
    password : "",
    articlelist : [],
    date : new Date ().toDateString(),
    article : {
      title : "",
      image : ""
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.islogin = true
      this.footer = true
      this.navigation = true
      this.page = "articles"
      this.user = localStorage.getItem('user')
      this.viewarticles()
    } else {
      this.islogin = false
      this.page = "login"
    }
  },
  methods : {
    previewFile(event){
      this.article.image = event.target.files[0]      
    },
    viewarticles(){
      axios({
        method : "get",
        url : "http://localhost:3000/articles",
        headers : {
          token : localStorage.getItem('token'),
          id : localStorage.getItem('id')
        }
      })
        .then(({data})=>{
          this.articlelist = data
        })
        .catch((errors)=>{
          swal("Error", "Fail to fetch data from database", "error")
        })
    },
    checklogin(){
      if(localStorage.getItem('token')){
        this.islogin = true
        this.footer = true
        this.navigation = true
        this.page = "articles"
        this.user = localStorage.getItem('user')
        this.viewarticles()

      } else {
        this.islogin = false
        this.page = "login"
      }
    },
    login(){
      console.log("login mulai")
      if(this.email == "" || this.password == ""){
        swal("Attention", "Complete the form below to make an account")
      } else {
        axios({
          method : "post",
          url : "http://localhost:3000/login",
          data : {
            email : this.email,
            password : this.password
          }
        })
          .then(({ data })=>{
            if(data){
              console.log(data)
              console.log("user found")
              localStorage.setItem('token', data.token)
              localStorage.setItem('email', data.email)
              localStorage.setItem('id', data.id)
              localStorage.setItem('user', data.name)
              this.checklogin()
              swal("Success",`hello ${data.name}!`,"success")
            } else {
              console.log(data)
              swal("Info",`username / password incorrect`,"warning")
            }
          })
          .catch(error=>{
            swal("Sorry", "Something bad happen in our server", "error");
            console.log(error)
          })
      }
    },
    googleLogin(){
        setTimeout(
          this.checklogin()
        , 3000)
    },
    register(){
      if(this.name == "" || this.email == "" || this.password == ""){
        swal("Attention", "Complete the form below to make an account")
      } else {
        console.log("register mulai")
        axios({
          method : "post",
          url : "http://localhost:3000/register",
          data : {
              name : this.name,
              email : this.email,
              password : this.password,
          }
        })
          .then(({ data })=>{
            if(data.message){
              console.log(data)
              swal("Error",`Validation Failed => ${data.message}`,"error")
            } else {
              console.log("user created")
              this.name = ""
              this.password = ""
              this.viewlogin()
              swal("Success","your account has been created","success")
            }
          })
          .catch(error=>{
            swal("Sorry", "Something bad happen :(", "error");
            console.log(error)
          })
      }
    },
    logout(){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      console.log("user telah logout")
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      localStorage.removeItem('user')
      this.islogin = false
      this.viewlogin()
      swal("Logged out", "user logged out", "success")
    },
    viewlogin(){
      this.page = "login"
    },
    viewregister(){
      this.page = "register"
    },
    viewwrite(){
      this.page = "writearticle"    
    },
    savearticle(){
      console.log("save article")
      console.log(this.article.image)
      if(this.article.image == ""){
        swal("Required an Image","please upload your image first","info")
      } else {
        swal("Please wait while we do your request", {
          buttons: false,
          timer: 3000,
        });
        const blob = new Blob([this.article.image], {type : this.article.image.type});
        console.log(blob)
        const formdata = new FormData();
        formdata.append("image", blob);
        axios({
          method : "post",
          url : "http://localhost:3000/uploadimg",
          data : formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
            token : localStorage.getItem('token'),
            id : localStorage.getItem('id')
          }
        }).then(({data})=>{
          this.article.image = ""
          let gcloudURL = data
          let editor = document.getElementById('editor')
          let htmlcontent = editor.firstChild.innerHTML
          let newArticle = {
            title: this.article.title,
            snippet : quill.getText(0,100),
            content: htmlcontent,
            status: "saved",
            image : gcloudURL,
            createdAt: new Date,
            updatedAt : "",
            postedAt : "",
            }
            axios({
              method : "post",
              url : "http://localhost:3000/articles",
              headers : {
                token : localStorage.getItem('token'),
                id : localStorage.getItem('id')
              },
              data : newArticle
            })
            .then(({data})=>{
              console.log(data)
              $('#createfeaturedimg').val('')
              this.article.title = ""
              quill.setText("\n\n\n")
              swal("Article Created!","successfully saved your article","success")
            })
            .catch(error=>{
              console.log(error)
            })
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    saveandpostarticles(){
      console.log("post article")
      console.log("save article")
      console.log(this.article.image)
      if(this.article.image == ""){
        swal("Required an Image","please upload your image first","info")
      } else {
        const blob = new Blob([this.article.image], {type : this.article.image.type});
        console.log(blob)
        const formdata = new FormData();
        formdata.append("image", blob);
        axios({
          method : "post",
          url : "http://localhost:3000/uploadimg",
          data : formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
            token : localStorage.getItem('token'),
            id : localStorage.getItem('id')
          }
        }).then(({data})=>{
          this.article.image = ""
          let gcloudURL = data
          let editor = document.getElementById('editor')
          let htmlcontent = editor.firstChild.innerHTML
          let newArticle = {
            title: this.article.title,
            snippet : quill.getText(0,100),
            content: htmlcontent,
            status: "posted",
            image : gcloudURL,
            createdAt: new Date,
            updatedAt : "",
            postedAt : new Date,
            }
            axios({
              method : "post",
              url : "http://localhost:3000/articles",
              headers : {
                token : localStorage.getItem('token'),
                id : localStorage.getItem('id')
              },
              data : newArticle
            })
            .then(({data})=>{
              console.log(data)
              this.article.title = ""
              quill.setText("\n\n\n")
              swal("Article Posted!","successfully posted your article","success")
            })
            .catch(error=>{
              console.log(error)
            })
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    updatearticles(){
      console.log("update article")
    }
  }
})

Vue.component('articleview',{
props : ['title', 'image', 'content'],
data (){
  return {

  }
},
template : `
<h1>{{title}}</h1>
<img v-bind:src="image">
<br>
{{content}}
`
})

