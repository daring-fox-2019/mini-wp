const serverURL = 'http://localhost:3000';

new Vue ({
  el: '#app',

  data: {
    loading: false,
    activeUser: '',
    isLogin: true,
    isRegister: false,
    isOauth: false,

    isWelcome: true,

    isPrimaryFab: true,
    isArticleForm: false,
    isGeneral: true,
    isCreating: true,

    drawer: null,
    drawerchild: null,

    article: null,
    filtered: [],
    articles: [],
    myArticles: [],
  },

  watch: {
    drawerchild() {
      if (this.drawerchild !== this.drawer) {
        this.drawer = this.drawerchild;
      }
    },

    isGeneral() {
      if (this.isGeneral) {
        this.fetchAll();
      } else {
        this.fetchMine();
      }
    }
  },

  created() {
    this.logCheck();
  },

  methods: {
    search(keyword) {
      if (!keyword) {
        this.filtered = this.isGeneral ? this.articles : this.myArticles;
      } else {
        this.filtered = (this.isGeneral ? this.articles : this.myArticles).filter(article => article.title.toLowerCase().match(keyword.toLowerCase()));
      }
    },

    logCheck() {
      if (localStorage.token) {
        this.isWelcome = false;
        this.activeUser = localStorage.user;
        this.fetchAll();
      }
    },

    toggleWelcome() {
      this.isLogin = !this.isLogin;
      this.isRegister = !this.isRegister;
    },

    login(data) {
      axios({
        method: 'post',
        data,
        url: `${serverURL}/login`
      })
        .then(({ data }) => {
          const { token, user, message } = data;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
          this.activeUser = user;
          this.isWelcome = false;
          this.fetchAll();
          this.showMyArticles(0);
        })
        .catch(err => {
          const { message } = err.response.data;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    register(data) {
      axios({
        method: 'post',
        data,
        url: `${serverURL}/register`
      })
        .then(({ data }) => {
          const { message } = data;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
          this.toggleWelcome();
        })
        .catch(err => {
          const { message } = err.response.data;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    logout() {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'logged out',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem('token');
      this.activeUser = '';
      this.isWelcome = true;
    },

    fetchAll() {
      this.loading = true;
      const { token } = localStorage;
      
      axios({
        method: 'get',
        url: `${serverURL}/articles`,
        headers: { token }
      })
        .then(({ data }) => {
          const { articles } = data;
          this.loading = false;
          this.articles = articles;
          this.filtered = this.articles;
        })
        .catch(err => {
          this.loading = false;
          const { status } = err.response;
          const { message } = err.response.data;
          if (status === 500) {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: message,
              showConfirmButton: false,
              timer: 1500
            })
          }
          this.articles = [];
          this.filtered = [];
        })
    },

    fetchMine() {
      this.loading = true;
      const { token } = localStorage;

      axios({
        method: 'get',
        url: `${serverURL}/user/articles`,
        headers: { token }
      })
        .then(({ data }) => {
          const { articles } = data;
          this.loading = false;
          this.myArticles = articles;
          this.filtered = this.myArticles;
        })
        .catch(err => {
          this.loading = false;
          const { status } = err.response;
          const { message } = err.response.data;
          if (status === 500) {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: message,
              showConfirmButton: false,
              timer: 1500
            })
          }
          this.myArticles = [];
          this.filtered = [];
        })
    },

    uploadArticle(data) {
      this.loading = true;
      const { token } = localStorage;

      axios({
        method: 'post',
        data,
        headers: { token },
        url: `${serverURL}/articles`
      })
        .then(({ data }) => {
          this.loading = false;
          const { newArticle, message } = data;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
          this.articles.unshift(newArticle);
          this.myArticles.unshift(newArticle);
          this.toggleApp();
        })
        .catch(err => {
          const { message } = err.response.data;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    fetchOne(id) {
      this.toggleApp();
      this.article = this.myArticles.find(article => article._id === id);
      this.isCreating = false;
    },

    closeEditing() {
      this.toggleApp();
      this.isCreating = true;
    },

    editArticle(detail) {
      const { id, data } = detail;
      this.loading = true;
      const { token } = localStorage;

      axios({
        method: 'patch',
        data,
        headers: { token },
        url: `${serverURL}/articles/${id}`
      })
        .then(({ data }) => {
          this.loading = false;
          const { updatedArticle, message } = data;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
          this.articles = this.articles.filter(article => article._id !== updatedArticle._id);
          this.articles.unshift(updatedArticle);
          this.myArticles = this.myArticles.filter(article => article._id !== updatedArticle._id)
          this.myArticles.unshift(updatedArticle);
          this.filtered = this.myArticles;
          this.closeEditing();
        })
        .catch(err => {
          console.log(err);
          const { message } = err.response.data;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    toggleApp() {
      this.isArticleForm = !this.isArticleForm;
      this.isPrimaryFab = !this.isPrimaryFab;
    },

    showMyArticles(foo) {
      if (this.drawer) {
        this.drawer = !this.drawer;
      }
      if(this.isArticleForm) {
        this.toggleApp();
      }
      if (!foo) {
        this.fetchAll();
      } else {
        this.fetchMine();
      }
      this.isGeneral = !foo;
    },
  }
});
