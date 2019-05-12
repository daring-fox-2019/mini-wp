var serverUrl = "http://localhost:3000"
const input = document.querySelector('input[type="file"]')
let file = null


function onSignIn(googleUser) {
    if (googleUser) {
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token
        axios
            .post(serverUrl+"/user/login", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                user_google_email: profile.getEmail(),
                idToken: id_token
            })
            .then(data => {
                localStorage.setItem('jwtoken', data.data.jwtoken)
                localStorage.setItem('name', data.data.name)
                localStorage.setItem('pp', data.data.pp)
                localStorage.setItem('id', data.data.id)
                app.isLoggedIn = true
                app.onstart()
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = error => reject(error)
    })
}

var app = new Vue({
    el: '#app',
    // components: {
    //     wysiwyg: vueWysiwyg.default.component,
    // },
    data() {
        return {
            text: '',
        };
    },
    data: {
        userId: localStorage.id,
        pp: localStorage.pp,
        username: localStorage.name,
        id: "",
        listBlogg: "",
        listAllBlog: "",
        page: "",
        blog_title: "",
        myHtmlCode: "",
        text: "",
        value: "",
        createdAt: "",
        file: "",
        isLoggedIn: false,
        author: "",
        tags: "",
        taglist: []
        // blog_content: "",
    },
    watch: {
        userId: function () {
            this.userId = localStorage.id
        },
        pp: function () {
            this.pp = localStorage.pp
        },
        username: function () {
            this.username = localStorage.name
        }
    },
    methods: {

        // function methods for blog

        editBlog_btn(id, title, content, createdAt, tags) {
            this.page = "blog-update-page"
            this.blog_title = title
            this.text = content
            this.id = id
            this.createdAt = createdAt,
                this.tags = tags
            // document.getElementById('editor2').innerHTML = this.blog_content
        },
        deleteBlog_btn(id) {
            this.id = id
            Swal.fire({
                title: 'Are you sure?',
                text: "You are going to delete this article!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0d3d69',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    return axios
                        .delete(serverUrl + '/' + id, {
                            headers: {
                                auth: localStorage.jwtoken
                            },
                            data: {
                                id: this.id
                            }
                        })
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your article has been deleted.',
                                'success'
                            )
                            this.listBlog()
                        }) 
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        },
        listBlog() {
            axios
                .get(serverUrl, {
                    headers: {
                        auth: localStorage.jwtoken
                    }
                })
                .then(({
                    data
                }) => {
                    this.listBlogg = data
                    this.page = "blog-list"
                })
                .catch((err) => {
                    console.log(err.message)
                })
        },
        onChangeUpload(e) {
            file = e.target.files[0]
            this.file = file
        },
        addBlogPageFunc() {
            this.blog_title = ""
            this.id = ""
            this.text = ""
            this.page = "blog-add-page"
        },
        searchBlog(all) {
            let url
            if (all) {
                url = serverUrl + '/all'
            } else {
                url = serverUrl
            }
            axios
                .get(url, {
                    headers: {
                        auth: localStorage.jwtoken
                    }
                })
                .then(({
                    data
                }) => {
                    let x = new RegExp(this.value, "i")
                    if (all) {
                        console.log('aaa')
                        this.listAllBlog = data.filter(blog => x.test(blog.title))
                        if (!this.listAllBlog && !this.listAllBlogg[0]) {
                            this.listAllBlogg[0] = "sorry there is nothing to show for this keyword"
                        }
                    } else {
                        console.log('bbb')
                        this.listBlogg = data.filter(blog => x.test(blog.title))
                        if (!this.listBlogg && !this.listBlogg[0]) {
                            this.listBlogg[0] = "sorry there is nothing to show for this keyword"
                        }
                    }
                })
        },

        // function methods for user

        register() {
            Swal.mixin({
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3', '4']
                }).queue([{
                        text: 'Please register your name',
                        preConfirm: result => {
                            if (!result) {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Name field must not empty!'
                                })
                                throw new Error('Name field must not empty!')
                            }
                        }
                    }, {
                        text: 'Please register your email',
                        preConfirm: result => {
                            if (!result) {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Email field must not empty!'
                                })
                                throw new Error('Email field must not empty!')
                            }
                        }
                    },
                    {
                        input: 'password',
                        text: 'Please input your desired password',
                        preConfirm: result => {
                            if (!result) {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Password field must not empty!'
                                })
                                throw new Error('Password field must not empty!')
                            }
                        }
                    }, {
                        input: 'text',
                        text: 'Please input your desired profile picture url',
                    }
                ]).then((result) => {
                    let name = result.value[0]
                    let email = result.value[1]
                    let password = result.value[2]
                    let pp = result.value[3] || null
                    return axios
                        .post(serverUrl + '/user/register', {
                            email: email,
                            password: password,
                            pp: pp,
                            name
                        })
                        .then(data => {
                            if (data) {
                                Swal.fire({
                                    text: 'You have succesfully registered',
                                    confirmButtonText: 'Lovely!'
                                })
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        regularLogin() {
            Swal.mixin({
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2']
                }).queue([{
                        text: 'Please input your email',
                        preConfirm: result => {
                            if (!result) {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Email field must not empty!'
                                })
                                throw new Error('Email field must not empty!')
                            }
                        }
                    },
                    {
                        input: 'password',
                        text: 'Please input your password',
                        preConfirm: result => {
                            if (!result) {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Password field must not empty!'
                                })
                                throw new Error('Password field must not empty!')
                            }
                        }
                    }
                ]).then((result) => {
                    // 
                    let email = result.value[0]
                    let password = result.value[1]
                    axios
                        .post(serverUrl + '/user/login', {
                            email: email,
                            password: password
                        })
                        .then(data => {
                            if (data) {
                                localStorage.setItem('jwtoken', data.data.jwtoken)
                                localStorage.setItem('name', data.data.name)
                                localStorage.setItem('pp', data.data.pp)
                                localStorage.setItem('id', data.data.id)
                                app.isLoggedIn = true
                                Swal.fire({
                                    text: 'You have succesfully logged in',
                                    confirmButtonText: 'Lovely!'
                                })
                                this.onstart()
                            }
                        })
                        .catch(err => {
                            Swal.fire('Please check your input!')
                        })
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        signOut() {
            if (gapi.auth2) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
            this.listBlogg = ''
            localStorage.clear()
            this.isLoggedIn = false
        },
        showbytag(list) {
            this.listAllBlog = list
            this.page = 'allblog-list'
        },
        showallblogs() {
            axios
                .get(serverUrl + "/all", {
                    headers: {
                        auth: localStorage.jwtoken
                    }
                })
                .then(({
                    data
                }) => {
                    this.listAllBlog = data
                    this.page = 'allblog-list'
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getTags() {
            axios.get(serverUrl + "/tags", {
                    headers: {
                        auth: localStorage.jwtoken
                    }
                })
                .then(({
                    data
                }) => {
                    this.taglist = data.sort()
                    this.page = 'tags-list'
                })
        },

        // onstart function

        onstart() {
            if (localStorage.jwtoken) {
                this.isLoggedIn = true
                this.userId = localStorage.id
                this.pp = localStorage.pp
                this.username = localStorage.name
                this.listBlog()
            }
        }
    },
    created() {
        this.onstart()
        onSignIn()
    }
})