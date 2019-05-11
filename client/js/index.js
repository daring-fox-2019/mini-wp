let app = new Vue({
  el: '#inspire',
  props: {
    source: String
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: () => ({

    userLogin: '',

    // List Article
    articles: [],
    articlesDraft: [],
    articlesPublish: [],

    // User
    user: {
      fullname: '',
      email: '',
      password: '',
    },

    // For header and navbar
    drawer: true,

    // About article
    idArticleSelected: '',
    form: {
      title: '',
      content: '',
      imageName: '',
      imageUrl: '',
      imageFile: '',
      status: '',
      tags: [],
    },
    titleRules: [
      v => !!v || 'Title is required'
    ],
    contentRules: [
      v => !!v || 'Content is required'
    ],

    // for display
    displayContent: '0',  // main content
    statusSign: '0',      // login/register/main content

    search: "", // for tags
    searchTitle: "",
    searchTag: "",

    dialog: false,
    dialogEdit: false,
    dialogTitle: '',
    dialogImage: '',
    dialogContent: '',
    dialogTags: [],

    // Sign in
    signin: {
      email: '',
      password: ''
    },

    // Sign up
    signup: {
      name: '',
      email: '',
      password: ''
    },

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  created() {
    if (!localStorage.getItem('token')) {
      this.statusSign = '0'
    } else {
      this.statusSign = '2'
    }
    this.userLogin = localStorage.name
    this.loadData()
  },

  watch: {
    articles: function (val) {
      this.articlesDraft = val.filter(el => {
        if (el.status === false) return el
      })
      this.articlesPublish = val.filter(el => {
        if (el.status === true) return el
      })
    },
    searchTitle: function (val) {
      this.articlesDraft = this.articles.filter(el => {
        if (el.status == 0) {
          if (el.title.toLowerCase().match(new RegExp(val.toLowerCase()))) {
            return el
          }
        }
      })
      this.articlesPublish = this.articles.filter(el => {
        if (el.status == 1) {
          if (el.title.toLowerCase().match(new RegExp(val.toLowerCase()))) {
            return el
          }
        }
      })
    }
  },

  methods: {

    // ===================================== EDIT ARTICLE =====================================
    showEditArticle(data) {
      this.idArticleSelected = data._id
      this.form.title = data.title
      this.form.content = data.content
      this.form.status = data.status
      this.form.tags = data.tags
      this.dialogEdit = true
    },

    backEdit() {
      this.form.title = '';
      this.form.content = '';
      this.form.status = '';
      this.form.imageName = '';
      this.form.tags = '';
      this.dialogEdit = false;
    },

    editArticle() {
      let data = new FormData()
      data.append("title", this.form.title)
      data.append("content", this.form.content)
      data.append("status", this.form.status)
      if (this.form.imageFile) {
        data.append("image", this.form.imageFile, this.form.imageName)
      }
      data.append("tags", this.form.tags)


      axios.put(`http://localhost:3000/articles/${this.idArticleSelected}`, data, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.articles.map(el => {
            if (el._id === data._id) {
              el.title = data.title
              el.content = data.content
              el.status = data.status
              el.featured_image = data.featured_image
              el.tags = data.tags
            }
          })
          swal(`Update article Success!`, {
            icon: "success",
          });
          this.generateArticle()
          this.dialogEdit = false
        })
        .catch(err => {
          console.log(err);

        })
    },

    loadData() {
      axios.get('http://localhost:3000/articles', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err);
        })
    },

    backSignin() {
      this.statusSign = '0'
    },

    showSignup() {
      this.statusSign = '1'
    },

    signUp() {
      axios.post('http://localhost:3000/users/signup', this.signup)
        .then(({ data }) => {
          swal(`Register Success!`, {
            icon: "success",
          });
          this.statusSign = '0'
        })
        .catch(err => {
          swal(`Register Fail!`, {
            icon: "warning",
          });
          console.log(err);
          
        })
    },

    signIn() {
      axios.post('http://localhost:3000/users/signin', this.signin)
        .then(({ data }) => {
          this.signin.email = ''
          this.signin.password = ''
          swal(`Hi, ${data.userName}`, {
            icon: "success",
          });
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.userName)
          this.userLogin = data.userName
          this.statusSign = '2'
          this.loadData()
        })
        .catch(err => {
          swal(`Signin Fail!`, {
            icon: "warning",
          });
          console.log(err);
        })
    },

    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },

    deleteArticle(id) {
      swal({
        title: "Are you sure to delete this article?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`http://localhost:3000/articles/${id}`, {
              headers: {
                token: localStorage.token
              }
            })
              .then(({ data }) => {
                swal("The article has been deleted!", {
                  icon: "success",
                });
                this.articles = this.articles.filter(el => {
                  if (el._id != data._id) {
                    return el
                  }
                })
              })
              .catch(err => {
                console.log(err);
              })
          }
        });
    },

    showModal(data) {
      this.dialogTitle = data.title,
      this.dialogContent = data.content
      this.dialogImage = data.featured_image
      this.dialog = true
      this.dialogTags = data.tags
    },

    addArticle() {
      let data = new FormData()
      data.append("title", this.form.title)
      data.append("content", this.form.content)
      data.append("status", this.form.status)
      if (this.form.imageFile) {
        data.append("image", this.form.imageFile, this.form.imageName)
      }
      data.append("tags", this.form.tags)

      axios.post('http://localhost:3000/articles', data, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          swal(`Create article Success!`, {
            icon: "success",
          });
          this.articles.push(data)
          this.reset()
          console.log("ADD SUKSES");
        })
        .catch(err => {
          console.log(err);
        })
    },

    reset() {
      this.form.imageUrl = ''
      this.form.content = ''
      this.$refs.form.reset()
    },

    pickFile() {
      this.$refs.image.click()
    },

    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.form.imageName = files[0].name
        if (this.form.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.form.imageUrl = fr.result
          this.form.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.form.imageFile = ''
        this.form.imageUrl = ''
      }
    },

    displayAddArticle() {
      this.displayContent = '1'
    },

    displayDraftArticle() {
      this.displayContent = '2'
    },

    displayPublishArticle() {
      this.displayContent = '3'
    },

    searchTags(tag) {
      this.searchTag = tag
      let statusMasuk

      this.articlesDraft = this.articles.filter(el => {
        statusMasuk = false
        if (el.status == 0) {
          el.tags.forEach(element => {
            if (element == tag) {
              statusMasuk = true
            }
          });
          if (statusMasuk) {
            return el
          }
        }
      })
      this.articlesPublish = this.articles.filter(el => {
        statusMasuk = false
        if (el.status == 1) {
          el.tags.forEach(element => {
            if (element == tag) {
              statusMasuk = true
            }
          });
          if (statusMasuk) {
            return el
          }
        }
      })
    },

    tagClose() {
      this.searchTag = ''
      this.generateArticle()
    },

    generateArticle() {
      this.articlesDraft = this.articles.filter(el => {
        if (el.status == 0) {
          return el
        }
      })
      this.articlesPublish = this.articles.filter(el => {
        if (el.status == 1) {
          return el
        }
      })
    }
  }
})

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;

  axios.post('http://localhost:3000/users/signinGoogle', {
    token: id_token
  })
    .then(({ data }) => {
      swal(`Hi, ${data.userName}`, {
        icon: "success",
      });
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.userName)
      console.log("OK1");

      app.userLogin = data.userName
      app.statusSign = '2'
      app.loadData()
      console.log("OK2");
      
    })
    .catch((jqXHR, textStatus) => {
      console.log(`request failed ${textStatus}`)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    localStorage.removeItem('token')
    localStorage.removeItem('name')

    app.statusSign = '0'
    app.displayContent = '0'
    swal(`See you!`);
  });
}

