// alert("test")

const baseUrl = "http://localhost:3000";

var app = new Vue({
  el: "#app",
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: {
    message: "Test",

    isLoggedIn: false,

    currentPage: "homePage",
    // currentPage: "login",

    loginForm: {
      username: "",
      password: "",
    },

    registerForm: {
      username: "",
      fullName: "",
      password: "",
    },

    article: {
      title: "",
      content: "",
      visibility: "",
      tags: [],
      dropFiles: [],
    },

    articles: [],
    allArticles: [],
    filteredArticles: [],
    filteredAllArticles: [],
    selectedArticle: {},
    username: "",
    fullName: "",
    isLoading: false,
    isEdit: false,
    search: "",
    searchAll: "",
    isAuthorized: false,
  },

  created() {
    if (localStorage.token) {
      this.isLoggedIn = true;
      this.username = localStorage.username;
      this.fullName = localStorage.fullName;
      this.currentPage = localStorage.currentPage;
      // this.currentPage = "afterLoginNewPost";
      this.getArticles();
      this.getAllArticles();

      if (localStorage.currentArticle) {
        this.getArticle();
      }
    } else {
      this.isLoggedIn = false;
    }
  },

  watch: {
    search: function(newSearch, oldSearch) {
      this.filteredArticles = this.articles.filter((article) => {
        return article.title.toLowerCase().includes(newSearch.toLowerCase()) || 
          article.userId.fullName.toLowerCase().includes(newSearch.toLowerCase()) ||
          article.tags.join("").includes(newSearch);
      });
    },

    searchAll: function(newSearch, oldSearch) {
      this.filteredAllArticles = this.allArticles.filter((article) => {
        return article.title.toLowerCase().includes(newSearch.toLowerCase()) || 
          article.userId.fullName.toLowerCase().includes(newSearch.toLowerCase()) ||
          article.tags.join("").includes(newSearch);
      });
    },

    selectedArticle: function(newSelected, oldSelected) {
      if (this.selectedArticle.username === localStorage.username) {
        this.isAuthorized = true;
      } else {
        this.isAuthorized = false;
      }
    }
  },

  methods: {
    test() {
      console.log("test");
    },

    updateSearch(value) {
      this.search = value;
      this.searchAll = value;
    },
    deleteDropFile(index) {
      this.article.dropFiles.splice(index, 1);
    },

    changeState(value) {
      this.currentPage = value;
      localStorage.currentPage = value;
      this.isEdit = false;
    },

    currentArticle(article) {
      console.log(article);
      this.currentPage = "afterLoginViewPost";
      localStorage.currentPage = this.currentPage;
      localStorage.currentArticle = article._id;
      this.getArticle();
      // this.selectedArticle = article;
    },

    editArticle(data) {
      this.changeState("afterLoginNewPost");
      this.isEdit = true;

      // article: {
      //   title: "",
      //   content: "",
      //   visibility: "",
      //   tags: [],
      //   dropFiles: [],
      // },

      this.article.title = data.title;
      this.article.tags = data.tags;

      if (data.isPrivate) {
        this.article.visibility = "private";
      } else {
        this.article.visibility = "public";
      }

      this.article.content = data.content;
    },

    updateArticle() {
      this.isLoading = true;

      const articleData = new FormData();
      articleData.append("title", this.article.title);
      articleData.append("content", this.article.content);
      articleData.append("tags", this.article.tags);
      articleData.append("visibility", this.article.visibility);
      articleData.append("image", this.article.dropFiles[0]);

      console.log(this.article.dropFiles[0]);
      console.log(articleData);

      axios({
        method: "PATCH",
        url: `${baseUrl}/api/articles/${localStorage.currentArticle}`,
        data: articleData,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log({ data });

          this.article = {
            title: "",
            content: "",
            visibility: "",
            tags: [],
            dropFiles: [],
          };

          this.isLoading = false;
          this.currentPage = "afterLoginHome";

          this.$notification.open({
            duration: 3000,
            message: `The post was updated.`,
            position: 'is-top',
            type: 'is-success',
            hasIcon: true
          });

          this.getArticles();
          this.getAllArticles();
        })
        .catch((err) => {
          console.log(err.message);

          this.isLoading = false;
          // this.currentPage = "afterLoginHome";

          this.$notification.open({
            duration: 3000,
            message: `Failed to update the selected post.`,
            position: 'is-top',
            type: 'is-danger',
            hasIcon: true
          });
        });

    },

    deleteArticle() {
      axios({
        method: "DELETE",
        url: `${baseUrl}/api/articles/${localStorage.currentArticle}`,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log(data);
          this.$notification.open({
            duration: 3000,
            message: `The post was deleted.`,
            position: 'is-top',
            type: 'is-success',
            hasIcon: true
          });

          this.currentPage = "afterLoginHome";
          this.getArticles();
          this.getAllArticles();
        })
        .catch((err) => {
          console.log(err);
          this.$notification.open({
            duration: 3000,
            message: `You have no access to do that.`,
            position: 'is-top',
            type: 'is-danger',
            hasIcon: true
          })
        });
    },

    getArticle() {
      axios({
        method: "GET",
        url: `${baseUrl}/api/articles/${localStorage.currentArticle}`,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log(data);
          this.selectedArticle = data;
          this.selectedArticle.displayPicture = data.userId.displayPicture;
          this.selectedArticle.fullName = data.userId.fullName;
          this.selectedArticle.username = data.userId.username;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getArticles() {
      axios({
        method: "GET",
        url: `${baseUrl}/api/articles`,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
          this.filteredArticles = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllArticles() {
      axios({
        method: "GET",
        url: `${baseUrl}/api/articles/all`,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log(data);
          this.allArticles = data;
          this.filteredAllArticles = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitLogin() {
      const { username, password } = this.loginForm;

      axios({
        method: "POST",
        url: `${baseUrl}/api/login`,
        data: { username, password },
      })
        .then(({ data }) => {
          this.login(data);
        })
        .catch((err) => {
          console.log(err);
          this.$notification.open({
            duration: 3000,
            message: `Wrong username/password.`,
            position: 'is-top',
            type: 'is-danger',
            hasIcon: true
          })
        });
    },

    submitRegister() {
      const { username, fullName, password } = this.registerForm;

      axios({
        method: "POST",
        url: `${baseUrl}/api/register`,
        data: { username, fullName, password },
      })
        .then(({ data }) => {
          this.registerForm = {
            username: "",
            fullName: "",
            password: "",
          };
          this.login(data);
        })
        .catch((err) => {
          console.log(err);
          this.$notification.open({
            duration: 3000,
            message: `Username has been taken already.`,
            position: 'is-top',
            type: 'is-danger',
            hasIcon: true
          })
        });
    },

    login(data) {
      console.log(data);
      localStorage.token = data.token;
      localStorage.username = data.username;
      localStorage.fullName = data.fullName;
      this.isLoggedIn = true;
      this.loginForm = {
        username: "",
        password: "",
      };
      this.username = data.username;
      this.fullName = data.fullName;
      this.currentPage = "afterLoginHome";
      this.getArticles();
      this.getAllArticles();
    },

    logout() {
      this.isLoggedIn = false;
      this.currentPage = "homePage";
      localStorage.clear();
      sessionStorage.clear();
      googleSignOut();
    },

    submitArticle() {
      this.isLoading = true;

      const articleData = new FormData();
      articleData.append("title", this.article.title);
      articleData.append("content", this.article.content);
      articleData.append("tags", this.article.tags);
      articleData.append("visibility", this.article.visibility);
      articleData.append("image", this.article.dropFiles[0]);

      console.log(this.article.dropFiles[0]);
      console.log(articleData);

      axios({
        method: "POST",
        url: `${baseUrl}/api/articles`,
        data: articleData,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log({ data });

          this.article = {
            title: "",
            content: "",
            visibility: "",
            tags: [],
            dropFiles: [],
          };

          this.isLoading = false;
          this.currentPage = "afterLoginHome";

          this.$notification.open({
            duration: 3000,
            message: `You have successfully added a new post.`,
            position: 'is-top',
            type: 'is-success',
            hasIcon: true
          });

          this.getArticles();
        })
        .catch((err) => {
          console.log(err.message);

          this.isLoading = false;
          // this.currentPage = "afterLoginHome";

          this.$notification.open({
            duration: 3000,
            message: `Failed to add a new post.`,
            position: 'is-top',
            type: 'is-danger',
            hasIcon: true
          });
        });
    },
  }
})