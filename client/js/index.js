const url = `http://localhost:3000`;
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
    newArticle: {
      title: "",
      content: ""
    },
    userLogin: {
      email: "",
      password: ""
    },
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
    },
    isLogin: false
  },
  methods: {
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
            element.shortContent =
              element.content
                .split("")
                .splice(3, 200)
                .join("") + "..";
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
        url: `${url}/article`,
        method: "get",
        headers: {
          token: localStorage.token
        },
        params:{
            published: 1
        }
      })
        .then(({ data }) => {
          console.log("published article fetched");
          data = data.map(element => {
            element.author = element.author.name;
            element.created = moment(element.createdAt);
            let now = moment();
            element.daysAgo = element.created.from(now);
            element.created = moment(element.createdAt).format("LLLL");
            element.datePublished = moment(element.published_at).format('LL')
            element.shortContent =
              element.content
                .split("")
                .splice(3, 200)
                .join("") + "..";
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
    createArticle(data) {
      this.$bvModal.hide("article-form");
      console.log(moment().format("LLLL"));
      console.log(this.newArticle);
    },
    login() {
      axios
        .post(`${url}/login`, {
          email: this.userLogin.email,
          password: this.userLogin.password
        })
        .then(response => {
          localStorage.setItem("token", response.data);
          this.fetchArticlesPublished();
          this.fetchArticlesDrafts();
        })
        .catch(err => {
          console.log(err);
        });
      Swal.fire("Hello!", "You have logged in successfully", "success");
      this.isLogin = true;
    },
    logout() {
      localStorage.removeItem("token");
      this.isLogin = false;
    },
    deleteArticle(article){
        Swal.fire({
            title: `Are you sure to delete ${article.title}?`,
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.value) {
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
                    Swal.fire(
                      'Deleted!',
                      `${data.title} has been deleted.`,
                      'success'
                    )
                })
                .catch(err=>{
                    console.log(err.message)
                })
            }
          })
    }
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true;
      this.fetchArticlesDrafts();
      this.fetchArticlesPublished()
    }
  }
});

Vue.use(CKEditor);
