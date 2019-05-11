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
      content : "",
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
    getGCSurl(){

    },
    previewFile(event){
      this.image = event.target.files[0]      
    },
    viewarticles(){
      axios({
        method : "get",
        url : "http://localhost:3000/articles?userId="+localStorage.getItem('id'),
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
          method : "get",
          url : "http://localhost:3000/users?email="+this.email+"&password="+this.password,
        })
          .then(({ data })=>{
            if(data.length > 0){
              data = data[0]
              console.log(data)
              console.log("user found")
              localStorage.setItem('token', "ceritanya token")
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
            swal("Sorry", "Something bad happen :(", "error");
            console.log(error)
          })
      }
    },
    register(){
      if(this.name == "" || this.email == "" || this.password == ""){
        swal("Attention", "Complete the form below to make an account")
      } else {
        console.log("register mulai")
        axios({
          method : "post",
          url : "http://localhost:3000/users",
          data : {
              name : this.name,
              email : this.email,
              password : this.password,
          }
        })
          .then(({ data })=>{
            console.log(data)
            console.log("user created")
            this.name = ""
            this.password = ""
            this.viewlogin()
            swal("Success","your account has been created","success")
          })
          .catch(error=>{
            swal("Sorry", "Something bad happen :(", "error");
            console.log(error)
          })
      }
    },
    logout(){
      console.log("user telah logout")
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      this.islogin = false
      this.viewlogin()
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
      let editor = document.getElementById('editor')
      let htmlcontent = editor.firstChild.innerHTML
      let data = {
        title: this.title,
        snippet : quill.getText(0,100),
        content: htmlcontent,
        createdAt: new Date,
        postedAt: null,
        userId: localStorage.getItem('id'),
        status: "saved",
        image : this.image
      }
      
    },
    saveandpostarticles(){
      console.log("post article")
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
