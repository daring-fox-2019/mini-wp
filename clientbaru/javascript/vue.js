let myvjs = new Vue({
  el : "#thepage",
  data : {
    articlelist : [],
    articlelistempty : null,
    userid : localStorage.getItem('id') ,
    user : localStorage.getItem('name'),
    navigation : false,
    write : false,
    list : false,
    update : false,
    footer : false,
    update : false,
    register : false,
    registernameform : "",
    registeremailform : "",
    registerpasswordform : "",
    registererror : false,
    registersuccess : false,
    registersuccessmsg : "",
    registererrormsg : "",
    login : false,
    loginemailform : "",
    loginpasswordform : "",
    loginerror : false,
    loginerrormsg: "",
    date : new Date().toDateString(),
    newarticletitle : "",
    newarticleerror : false,
    newarticleerrormsg : "",
    newarticlesuccess : false,
    newarticlesuccessmsg : "",
    currentarticletitle : "",
    currentarticlecontent : "",
    currentarticlestatus : "",
    updatearticleerror : false,
    updatearticleerrormsg : ""
  },
  created() {
    console.log('masuk')
      if(localStorage.getItem('token')){
        this.register = false
        this.login = false
        this.write = false
        this.update = false
        this.navigation = true
        this.list = true
        this.footer = true
        
        axios({
          method : "get",
          url : "http://localhost:3000/articles"
        })
        .then(response=>{
          if(response.data.length == 0){
            this.articlelistempty = true
            this.articlelist = []
          } else {
            this.articlelistempty = false
            this.articlelist = response.data
            this.articlelist.forEach(article=>{
              article.author = this.user
            })
            console.log(this.user)
          }
        })
        .catch(error=>{
          console.log(error)
        })
      } else {
        this.register = false
        this.navigation = false
        this.write = false
        this.list = false
        this.update = false
        this.footer = false
        this.login = true
      }
  },
  methods : {
    checklogin : function(){
      console.log("ceklogin")
      if(localStorage.getItem('token')){
        this.viewlist()
      } else {
        this.viewlogin()
      }
    },
    viewregister : function (){
      console.log("view halaman register")
      this.login = false
      this.navigation = false
      this.write = false
      this.list = false
      this.update = false
      this.footer = false
      this.register = true
      this.loginemailform = ""
      this.loginpasswordform = ""
    },
    viewlogin : function(){
      console.log("view halaman login")
      this.register = false
      this.navigation = false
      this.write = false
      this.list = false
      this.update = false
      this.footer = false
      this.login = true
      this.registernameform = ""
      this.registeremailform = ""
      this.registerpasswordform = ""
    },
    viewlist : function(){
      console.log("view halaman utama")
      this.loginemailform = ""
      this.loginpasswordform = ""
      this.register = false
      this.login = false
      this.write = false
      this.update = false
      this.navigation = true
      this.list = true
      this.footer = true
    },
    viewwrite : function(){
      console.log("view halaman new article")
      this.register = false
      this.login = false
      this.update = false
      this.list = false
      this.navigation = true
      this.write = true
      this.footer = true
      
      
    },
    viewupdate : function(){
      console.log("view halaman update article")
      this.register = false
      this.login = false
      this.update = true
      this.list = false
      this.navigation = true
      this.write = false
      this.footer = true
    },
    showerrormsgeditarticle : function(){
      this.updatearticleerror = true
      setTimeout(function(){
        this.updatearticleerror = false
      },
      2000)
    },
    seearticledetail : function(id){
      this.viewupdate()
      axios({
        method : 'get',
        url : `http://localhost:3000/articles?userId=${id}`
      })
      .then(result=>{
        this.currentarticletitle = result.data[0].title
        editorupdatearticle.firstChild.innerHTML = result.data[0].content
        this.currentarticlestatus = result.data[0].status
      })
      .catch(error=>{
        this.updatearticleerrormsg = "failed to get your data, please reload"
        this.showerrormsgeditarticle()
        console.log(error)
      })
    },
    registernewaccount : function(){
      console.log("prosess register")
      let newUser = {
        name : this.registernameform,
        email : this.registeremailform,
        password : this.registerpasswordform
      }
      if(newUser.name == "" || newUser.email == "" || newUser.password == ""){
        this.registererrormsg = "please fill the form below"
        this.showerrormsgregister()
      }
      else{
        axios({
          method : "POST",
          url : "http://localhost:3000/users",
          data : newUser
        })
        .then(response=>{
          console.log(response)
          this.registersuccessmsg = "berhasil create account"
          this.loginemailform = response.data.email
          this.showsuccessmsgregister()
          this.viewlogin()
          console.log("selesai proses register : sukses")
        })
        .catch(err=>{
          this.registererrormsg = "we can't process your request right now"
          this.showerrormsgregister()
          console.log("selesai proses register : gagal")
        })
      }
    },
    showsuccessmsgregister : function(){
      this.loginerror = false
      this.registersuccess = true
        setTimeout(function(){
          this.registersuccess = false
        }, 1000)
    },
    showerrormsgregister : function(){
      this.registererror = true
      setTimeout(function(){
        this.registererror = false
      },
      1000)
    },
    
    logintoyouraccount : function(){
      console.log("proses login")
      let user = {
        email : this.loginemailform,
        password : this.loginpasswordform
      }
      if(user.email == "" || user.password == ""){
        this.loginerrormsg = "please fill the form below"
        this.showerrormsglogin();
      }
      else{
        console.log(user)
        axios({
          method : "GET",
          url : `http://localhost:3000/users?name=${user.email}&password=${user.password}`
        })
        .then(response=>{
          if(response.data.length == 0){
            this.loginerrormsg = "email / password is wrong"
            this.showerrormsglogin()
          } else {
            console.log(response)
            localStorage.setItem('token', 'ceritanya token jwt')
            localStorage.setItem('name', response.data[0].name)
            localStorage.setItem('email', response.data[0].email)
            localStorage.setItem('id', response.data[0].id)
            this.viewlist()
            console.log("selesai proses login : sukses")
          }
        })
        .catch(error=>{
          this.loginerrormsg = "email / password is wrong"
          this.showerrormsglogin()
          console.log("selesai proses login : gagal")
        })
      }
    },
    showerrormsglogin : function(){
      this.loginerror = true
      setTimeout(function(){
        this.loginerror = false
      },
      2000)
    },
    logoutfromyouraccount : function(){
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      
      this.user = ""
      this.userid = ""
      this.checklogin();
    },
    showerrormsgnewarticle : function(){
      this.newarticleerror = true
      setTimeout(function(){
        this.newarticleerror = false
      },
      2000)
    },
    showsuccessmsgnewarticle : function(){
      this.newarticlesuccess = true
      setTimeout(function(){
        this.newarticlesuccess = false
      },
      2000)
    },
    postnewarticle : function(){
      console.log(`"input new article from user ${this.userid}"`)
      let htmlcontent = editornewarticle.firstChild.innerHTML
      let text = $(htmlcontent).text()
      let snippet = ""
      if(text == "\n" || this.newarticletitle == ""){
        this.newarticleerrormsg = "you can't post or save an empty article"
        this.showerrormsgnewarticle()
      } else {
        if(text.length > 100){
          text.split("").forEach((el,i)=>{
            if(i < 100){
              snippet += el
            }
          })
        } else {
          snippet = text
        }
        let articleData = {
          title: this.newarticletitle,
          snippet: snippet,
          content: htmlcontent,
          createdAt: new Date,
          postedAt: new Date,
          userId: localStorage.getItem('id'),
          status: "posted"
        }
        console.log(articleData)
        
        axios({
          method : 'post',
          url : 'http://localhost:3000/articles',
          data : articleData
        })
        .then(response=>{
          console.log(response)
          this.newarticlesuccessmsg = "successful creating new article"
          this.newarticletitle = ""
          quill.setText("")
          editornewarticle.firstChild.innerHTML = "<p></p><br>"
          this.showsuccessmsgnewarticle();
        })
        .catch(error=>{
          this.newarticleerrormsg = "you can't post or save an empty article"
          this.showerrormsgnewarticle()
        })
      }
    },
    savenewarticle : function(){
      console.log(`"input new article from user ${this.userid}"`)
      let htmlcontent = editornewarticle.firstChild.innerHTML
      let text = $(htmlcontent).text()
      let snippet = ""
      if(text == "\n" || this.newarticletitle == ""){
        this.newarticleerrormsg = "you can't post or save an empty article"
        this.showerrormsgnewarticle()
      } else {
        if(text.length > 100){
          text.split("").forEach((el,i)=>{
            if(i < 100){
              snippet += el
            }
          })
        } else {
          snippet = text
        }
        let articleData = {
          title: this.newarticletitle,
          snippet: snippet,
          content: htmlcontent,
          createdAt: new Date,
          postedAt: null,
          userId: localStorage.getItem('id'),
          status: "saved"
        }
        console.log(articleData)
        
        axios({
          method : 'post',
          url : 'http://localhost:3000/articles',
          data : articleData
        })
        .then(response=>{
          console.log(response)
          this.newarticlesuccessmsg = "successful creating new article"
          this.newarticletitle = ""
          quill.setText("")
          editornewarticle.firstChild.innerHTML = "<p></p><br>"
          this.showsuccessmsgnewarticle();
        })
        .catch(error=>{
          this.newarticleerrormsg = "you can't post or save an empty article"
          this.showerrormsgnewarticle()
        })
      }
    }
  }
})

