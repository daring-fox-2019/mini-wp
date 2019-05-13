const serverUrl = 'http://35.187.224.202'

alertify.success('main.js loaded!')
let vue = new Vue({
  el: '#app',
  data() {
    return {
      isLoggedIn: false,
      isLoading: false,
      username: '',
      userId: '',
      page: 'login',
      items: [],
      content: '',
      filteredItems: [],
      currentContent: {
        id: '',
        title: '',
        content: '',
        author: '',
        url: '',
        tags: [],
        fileName: 'Choose File...',
        file: '',
        tagInput: ''
      },
      createContent: {
        title: '',
        content: '',
        fileName: 'Choose File...',
        file: '',
        tags: [],
        tagInput: ''
      },
      loginUser: {
        name: '',
        email: '',
        password: ''
      },
      searchBox: ''
    }
  },
  methods: {
    prepareFile(element) {
      let file = event.target.files[0];
      // console.log({file})
      this.createContent.file = file
      this.createContent.fileName = file.name
    },
    prepareFileEdit(element) {
      let file = event.target.files[0];
      this.currentContent.file = file
      this.currentContent.fileName = file.name
    },
    prepareTag() {
      let duplicate = false
      this.createContent.tags.forEach(item => {
        if (item == this.createContent.tagInput) {
          duplicate = true
        }
      })
      if (!duplicate) {
        this.createContent.tags.push(this.createContent.tagInput)
      }
      this.createContent.tagInput = ''
      this.$refs.tag.focus()
    },
    prepareTagEdit() {
      duplicate = false
      this.currentContent.tags.forEach(item => {
        if (item == this.currentContent.tagInput) {
          duplicate = true
        }
      })
      if (!duplicate) {
        this.currentContent.tags.push(this.currentContent.tagInput)
      }
      this.currentContent.tagInput = ''
      this.$refs.tag2.focus()
    },
    removeTag(tag) {
      this.createContent.tags = this.createContent.tags.filter(item => item != tag)
    },
    removeTagEdit(tag) {
      this.currentContent.tags = this.currentContent.tags.filter(item => item != tag)
    },
    createArticle() {
      this.isLoading = true
      const { title, content } = this.createContent
      const formData = new FormData()
      formData.append('image', this.createContent.file)
      formData.append('title', this.createContent.title)
      formData.append('content', this.createContent.content)
      formData.append('tags', this.createContent.tags)
      axios({
        method: 'post',
        url: `${serverUrl}/articles`,
        data: formData,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          this.createContent = {
            title: '',
            content: '',
            fileName: 'Choose file...',
            file: '',
            tags: [],
            tagInput: ''
          }
          $('#new-post').collapse('hide')
          this.getAllArticles()
        })
        .catch(err => {
          this.isLoading = false
          this.error(err, 'createArticle')
        })
    },
    changeId(id) {
      let current = this.filteredItems.filter(item => item._id === id)[0]
      this.currentContent = {
        id,
        title: current.title,
        content: current.content,
        author: current.author,
        url: current.featuredImg,
        tags: current.tags,
        fileName: 'Choose File...',
        file: '',
        tagInput: ''
      }
    },
    editArticle(id) {
      // swal('Edit', id)
      console.log(this.currentContent)
      this.isLoading = true
      const formData = new FormData()
      if (this.currentContent.fileName != 'Choose File...') {
        console.log('masuk if ===>', this.currentContent.fileName)
        formData.append('image', this.currentContent.file)
      }
      formData.append('title', this.currentContent.title)
      formData.append('content', this.currentContent.content)
      formData.append('tags', this.currentContent.tags)
      axios({
        method: 'put',
        url: serverUrl + `/articles/${id}`,
        data: formData,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.currentContent = {
            id: '',
            title: '',
            content: '',
            author: '',
            url: '',
            tags: [],
            fileName: 'Choose File...',
            file: '',
            tagInput: ''
          }
          swal('Success', 'Data edited.', 'success')
          $('#modalEdit').modal('hide')
          this.isLoading = false
          this.getAllArticles()
          this.checkLog()
        })
        .catch(err => {
          this.error(err, 'edit Article')
        })
    },
    deleteArticle(id) {
      // swal('Delete', id)
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this article!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios({
              method: 'delete',
              url: serverUrl + `/articles/${id}`,
              headers: {
                token: localStorage.token
              }
            })
          } else {
            swal("Your article is safe!");
          }
        })
        .then(response => {
          console.log(response)
          swal("Poof!", "Your article has been deleted!", 'success')
          $('#modalEdit').modal('hide')
          this.getAllArticles()
        })
        .catch(err => {
          this.error(err, 'deleteArticle')
        })
    },
    getAllArticles() {
      axios({
        method: 'get',
        url: 'http://35.187.224.202/articles',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          data.forEach(item => {
            item.created = item.created.slice(0, 10)
          });
          this.items = data
          this.filteredItems = data
        })
        .catch(err => this.error(err, 'getAllArticles'))
    },
    getMyArticles() {
      axios({
        method: 'get',
        url: serverUrl + '/articles/myArticles',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          data.forEach(item => {
            item.created = item.created.slice(0, 10)
          });
          this.items = data
          this.filteredItems = data
        })
        .catch(err => {
          this.error(err, 'getMyArticles')
        })
    },
    error(err, origin) {
      console.log({ err, dari: origin })
      if (err.response) {
        let { data, status, statusText } = err.response
        let message = data.error.message
        if (err.response.hasOwnProperty('data')) {
          swal(`Error ${status}: ${statusText}.`, err.response.data.error, 'error')
        } else {
          swal(`Error ${status}: ${statusText}.`, err.response.data.message, 'error')
        }
      } else {
        swal(`Error ${status}.`, err.message, 'error')
        // swal(err.message)
      }
    },
    register() {
      let { name, email, password } = this.loginUser
      axios.post(serverUrl + '/register', { name, email, password })
        .then(({ data }) => {
          swal('Registered!', `Welcome to the club, ${name}!`, 'success')
          this.page = 'login'
          this.loginUser = {
            name: '',
            email: '',
            password: ''
          }
        })
        .catch(err => this.error(err, 'register'))
    },
    login() {
      let { email, password } = this.loginUser
      let obj = {
        email,
        password
      }
      axios.post(serverUrl + '/login', obj)
        .then(({ data }) => {
          this.successLogin(data);
        })
        .catch(err => { this.error(err, 'login') })
    },
    emptyLocalStorage() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('email')
      swal('Signed out', `Goodbye, ${localStorage.name}!`, 'success')
      window.localStorage.removeItem('name')
      this.isLoggedIn = false
      this.page = 'login'
      this.checkLog()
    },
    logout() {
      this.loginEmail = ''
      this.loginPassword = ''
      this.username = ''
      if (gapi.auth2 != undefined) {
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut()
          .then(() => {
            this.emptyLocalStorage()
            this.checkLog()
          })
          .catch(err => {
            this.error(err, 'logout')
          })
      }
      else {
        this.emptyLocalStorage()
        this.checkLog()
      }
    },
    checkLog() {
      if (localStorage.token != undefined) {
        this.page = 'home'
        this.username = localStorage.name
        this.userId = localStorage.id
        this.getAllArticles()
      } else {
        this.page = 'login'
      }
    },
    successLogin(data) {
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('name', data.name);
      window.localStorage.setItem('email', data.email);
      window.localStorage.setItem('id', data.id);
      this.loginUser = {
        email: '',
        name: '',
        password: ''
      };
      this.username = data.name;
      this.isLoggedIn = true;
      swal(`Selamat datang ${data.name}!`, ' ', 'success');
      this.checkLog();
    },
    viewTag(tag) {
      // swal(tag)
      axios({
        method: 'get',
        url: serverUrl + `/articles/tag?tag=${tag}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          this.items = data
          this.filteredItems = data
        })
        .catch(err => {
          this.error(err, 'viewTag')
        })
    }
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  watch: {
    searchBox(input) {
      this.filteredItems = this.items.filter(article => {
        let tagSearch = article.tags.filter(tag => tag.toLowerCase().includes(input.toLowerCase()))
        if (tagSearch.length > 0) return true
        return article.title.toLowerCase().includes(input.toLowerCase())
        || article.content.toLowerCase().includes(input.toLowerCase())
      })
    }
  },
  created() {
    this.checkLog()
  }
})

function onSignIn(googleUser) {
  let { id_token } = googleUser.getAuthResponse()
  axios({
    url: 'http://35.187.224.202/auth/google',
    method: 'post',
    headers: {
      token: id_token
    }
  })
    .then(({ data }) => {
      vue.successLogin(data)
    })
    .catch(err => vue.error(err, 'google onSignIn'))
}


function signOut() {
  if (gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
      .then(() => {
        vue.emptyLocalStorage()
        vue.checkLog()
      })
      .catch(err => {
        let message = (err.responseJSON.message) ? err.responseJSON.message : err.responseJSON.error
        swal('Error', message, 'error')
      })
  } else {
    vue.emptyLocalStorage()
    vue.checkLog()
  }
}