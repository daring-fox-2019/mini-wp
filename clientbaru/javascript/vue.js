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
    title : "",
    content : "",
    image : ""
  },
  created(){
    if(localStorage.getItem('token')){
      this.islogin = true
      this.footer = true
      this.navigation = true
      this.page = "articles"
      this.viewarticles()
    } else {
      this.islogin = false
      this.page = "login"
    }
  },
  methods : {
    viewarticles(){
      axios({
        method : "get",
        url : "http://localhost:3000/articles?userId="+localStorage.getItem('id'),
      })
        .then(({data})=>{
          console.log(data)
          this.articlelist = data
        })
        .catch(({errors})=>{
          swal("Error", "Fail to fetch data from database", "error")
          console.log(errors)
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
      
    },
    saveandpostarticles(){

    },
    updatearticles(){

    }
  }
})