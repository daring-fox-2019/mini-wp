moment.locale('id')

var axios = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(CKEditor)

new Vue({
  el: '#app',
  data: {
    login: {
      user: {},
      token: ''
    },
    page: 'login',
    articles: [],
    selectedArticle: '',
    searchQuery: ''
  },
  watch: {
    login: function ({ user, token }) {
      localStorage.setItem('miniwp_user', JSON.stringify(user))
      localStorage.setItem('miniwp_token', token)
    }
  },
  created: function () {
    if (localStorage.getItem('miniwp_token')) {
      this.login = {
        user: JSON.parse(localStorage.getItem('miniwp_user')),
        token: localStorage.getItem('miniwp_token')
      }

      axios.get('/articles', {
        headers: {
          Authorization: this.login.token
        }
      })
        .then(({ data }) => {
          this.articles = data.articles
        })
        .catch(err => console.log(err))

      this.page = 'list-article'
    }
  },
  methods: {
    handleRegister: function (data) {
      this.page = 'login'
    },
    handleLogin: function ({ user, jwtToken }) {
      this.login = { user, token: jwtToken }
      this.page = 'list-article'
    },
    logout: function () {
      this.login = {
        user: {},
        token: ''
      }
      this.page = 'login'
    },
    handleClickNav: function (link) {
      if (link === 'logout') {
        this.logout()
      } else if (link === 'home') {
        this.page = this.login.token ? 'list-article' : 'login'
      } else {
        this.page = link
      }
    },
    handleClickEditArticle: function (article_id) {
      this.selectedArticle = article_id
      this.page = 'form-article'
    },
    handleClickDeleteArticle: function (article_id) {
      axios
        .delete(`/articles/${article_id}`, {
          headers: {
            Authorization: this.login.token
          }
        })
        .then(({ data }) => {
          this.articles.splice(this.articles.findIndex(a => a._id === data.article._id), 1)
        })
        .catch(err => console.log(err))
    },
    handleNewArticle: function (article) {
      this.articles.unshift(article)
      this.page = 'list-article'
    },
    handleUpdateArticle: function (article) {
      this.articles.splice(this.articles.findIndex(a => a._id === article._id), 1, article)
      this.page = 'list-article'
    },
    handleMountedListArticle: function () {
      this.$refs.search.focus()
    },
    handleClickSearch: function () {
      axios
        .get(`/articles?q=${this.searchQuery}`, {
          headers: {
            Authorization: this.login.token
          }
        })
        .then(({ data }) => {
          this.articles = data.articles
        })
        .catch(err => console.log(err))
    },
    handleClickTag: function (tag) {
      this.searchQuery = tag
      this.handleClickSearch()
    }
  }
})
