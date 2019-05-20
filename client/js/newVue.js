// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.baseURL = "http://35.198.248.18"
// var userName = ""
Vue.use(CKEditor);

var app = new Vue({
  el: '#app',
  data: {
    posts: [],
    showMainPage: false,
    showFullPost: false,
    showNewPostPage: false,
    showLogRegPage: true,
    showSidebar: true,
    editPostButton: false,
    name: "",
    searchText: "",
    // registered: false,
    inputLogin: {
      email: "",
      password: ""
    },
    inputRegister: {
      name: "",
      email: "",
      password: ""
    },
    formPostHeading: "",
    inputNewPost: {
      _id: "",
      title: "",
      image: "",
      content: "",
      imagePreview: ""
    },
    editor: ClassicEditor,
    // editorData: '<p>Content of the editor.</p>',
    editorConfig: {
      // The configuration of the editor.
    }
  },
  // filters: {
  //   shortenContent(content) {
  //     if (content.length >= 50) return content.slice(0, 50) + "..."
  //     return content
  //   }
  // },
  computed: {

  },
  watch: {
    searchText(newText) {
      let query = `?title=${newText}`
      axios.get(`/posts/read/search${query}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.posts = [...response.data]
          this.posts.forEach((obj, i) => {
            this.posts[i].created_at = new Date(this.posts[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    if (localStorage.hasOwnProperty('token')) {
      this.showLogRegPage = false
      this.showMainPage = true
      this.name = localStorage.getItem('name')
      this.getAllPosts()
    }
    else {
      this.showLogRegPage = true
      this.showMainPage = false
    }
  },
  methods: {
    shortenContent(content) {
      // console.log('----------->'+content)
      if (content.length >= 10) return content.slice(0, 10).concat("...")
      return content
    },
    emptyLogRegForm() {
      this.inputRegister.name = ""
      this.inputRegister.email = ""
      this.inputRegister.password = ""
      this.inputLogin.email = ""
      this.inputLogin.password = ""
    },
    emptyPostForm() {
      this.inputNewPost.title = ""
      this.inputNewPost.content = ""
      this.inputNewPost.image = ""
      this.inputNewPost.imagePreview = ""
    },
    selectFile(event) {
      if (event.target.files[0]/* event.target.files &&  */) {
        this.inputNewPost.image = event.target.files[0]
        var newVue = this
        var reader = new FileReader()
        reader.onload = function (e) {
          newVue.inputNewPost.imagePreview = e.target.result
        }
        reader.readAsDataURL(event.target.files[0])
      }
    },
    EditOrNew() {
      if (this.editPostButton) this.updatePost(this.inputNewPost._id)
      else this.createPost()
    },
    searchPosts() {
      let query = `?title=${this.searchText}`
      axios({
        method: "GET",
        url: `/posts/read/search${query}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.posts = [...response.data]
          this.posts.forEach((obj, i) => {
            this.posts[i].created_at = new Date(this.posts[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllPosts() {
      axios({
        method: "GET",
        url: "/posts/read",
        headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(response => {
          this.posts = [...response.data]
          // console.log(this.posts[0].created_at.slice(0, 10))
          this.posts.forEach((obj, i) => {
            this.posts[i].created_at = new Date(this.posts[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    createPost() {
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title)
      formData.append("content", this.inputNewPost.content)
      formData.append("image_url", this.inputNewPost.image)
      axios({
        method: "POST",
        url: "/posts/create",
        data: formData,
        // {
        //   title: this.inputNewPost.title,
        //   content: this.inputNewPost.content,
        //   image: this.inputNewPost.image
        // },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          this.getAllPosts()
          this.showMainPage = true
          this.showNewPostPage = false
          this.emptyPostForm()
          Swal.fire(
            'Created New Post!',
            'New Post have been created',
            'success'
          )
        })
        .catch(err => {
          console.log(JSON.stringify(err))
        })
    },
    updatePost(id) {
      let formData = new FormData();
      formData.append("title", this.inputNewPost.title)
      formData.append("content", this.inputNewPost.content)
      formData.append("image_url", this.inputNewPost.image)
      axios({
        method: "PUT",
        url: `/posts/update/${id}`,
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          this.getAllPosts()
          this.showMainPage = true
          this.showNewPostPage = false
          this.emptyPostForm()
          Swal.fire(
            'Updated New Post!',
            'Post have been updated',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPost(post) {
      this.formPostHeading = 'Edit Post';
      this.editPostButton = true;
      this.showMainPage = false
      this.showNewPostPage = true
      this.inputNewPost._id = post._id
      this.inputNewPost.title = post.title
      this.inputNewPost.content = post.content
      this.inputNewPost.imagePreview = post.image_url
    },
    deletePost(idPost) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `/posts/delete/${idPost}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(result => {
              this.posts = this.posts.filter(post => post._id !== idPost)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    register() {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      if (emailRegex.test(this.inputRegister.email)) {
        axios({
          method: "POST",
          url: "/users/register",
          data: {
            name: this.inputRegister.name,
            email: this.inputRegister.email,
            password: this.inputRegister.password
          }
        })
          .then(({ data }) => {
            Swal.fire(
              'Registered!',
              'You Have Been Registered Successfully, please login now',
              'success'
            )
            this.emptyLogRegForm()
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        Swal.fire({
          type: 'error',
          title: 'Input Error',
          text: 'Email harus yang benar!'
        })
      }
    },
    login() {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      if (emailRegex.test(this.inputRegister.email)) {
        axios({
          method: "POST",
          url: "/users/login",
          data: {
            email: this.inputLogin.email,
            password: this.inputLogin.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            Swal.fire(
              'Logged In!',
              'You Have Been Logged In Successfully',
              'success'
            )
            localStorage.setItem('name', data.name)
            this.name = localStorage.getItem('name')
            this.showLogRegPage = false
            this.showMainPage = true
            this.emptyLogRegForm()
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        Swal.fire({
          type: 'error',
          title: 'Input Error',
          text: 'Email harus yang benar!'
        })
      }
    },
    
    logout() {
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      if (localStorage.hasOwnProperty('signedInVia')) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          localStorage.removeItem('signedInVia')
        });
      }
      Swal.fire(
        'Logged Out!',
        'You Have Been Logged Out Successfully',
        'success'
      )
      this.showLogRegPage = true
      this.showMainPage = false
    }
  }
})

function onSignIn(googleUser) {
  // let profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('onSignIn')
  if (!localStorage.hasOwnProperty('signedInVia')) {
  console.log('onSignIn masuk')
    let id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token) 
    axios({
      method: 'POST',
      url: `/users/signingoogle`,
      data: {
        id_token
      }
    })
      .then(({ data }) => {
        let msg = ''
        if (data.passRandom) {
          msg = ` Hurry up change your password now, your password is ${data.passRandom}`
        }
        Swal.fire(
          'Signed In via Google!',
          `You Have Been Logged In Successfully.${msg}`,
          'success'
        )
        localStorage.setItem('signedInVia', true)
        localStorage.setItem('token', data.token)
        app.getAllPosts()
        app.emptyLogRegForm()
        app.showLogRegPage = false
        app.showMainPage = true
      })
      .catch((err) => {
        console.log('hhmmm')
        console.log(err)
      })
  }
}