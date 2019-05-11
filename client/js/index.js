var serverUrl = "http://localhost:3000"
const input = document.querySelector('input[type="file"]')
let file = null

function onSignIn(googleUser) {
    if(googleUser){
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token
        axios
            .post("http://localhost:3000/user/login", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                user_google_email: profile.getEmail(),
                idToken: id_token
            })
            .then(data => {
                localStorage.setItem('jwtoken', data.data)
                app.isLoggedIn = true
                console.log('signed in', data)
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
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data() {
        return {
            text: '',
        };
    },
    data: {
        id: "",
        listBlogg: "",
        page: "",
        blog_title: "",
        myHtmlCode: "",
        text: "",
        value: "",
        createdAt: "",
        file: "",
        isLoggedIn: false,
        author: ""
        // blog_content: "",
    },
    methods: {

        // function methods for blog

        editBlog_btn(id, title, content, createdAt) {
            this.page = "blog-update-page"
            this.blog_title = title
            this.text = content
            this.id = id
            this.createdAt = createdAt
            // document.getElementById('editor2').innerHTML = this.blog_content
        },
        updateBlogg() {
            if (this.blog_title === "") {
                swal("A great article always started by a title isn't it?")
            } else if (this.file === "") {
                swal('Insert image to make your blog more interesting!')
            } else {
                file = this.file
                const extension = file.name.split('.')[1]
                const validExtensions = ['png', 'jpg', 'jpeg']
                if (validExtensions.indexOf(extension) === -1) {
                    swal('Valid extensions: .png, .jpeg, or .jpg')
                } else {
                    getBase64(file)
                        .then((image) => {
                            axios
                                .put(serverUrl, {
                                    id: this.id,
                                    title: this.blog_title,
                                    content: this.text,
                                    createdAt: this.createdAt,
                                    img: image,
                                    extension: extension
                                }, {
                                    headers: {
                                        auth: localStorage.jwtoken
                                    }
                                })
                                .then((data) => {
                                    console.log(data)
                                    this.listBlog()
                                })
                                .catch((err) => {
                                    console.log(err.message)
                                })
                        })
                }
            }
        },
        deleteBlog_btn(id) {
            this.id = id
            axios
                .delete(serverUrl, {
                    headers: {
                        auth: localStorage.jwtoken
                    },
                    data: {
                        id: this.id
                    }
                })
                .then(({
                    data
                }) => {
                    this.listBlog()
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
            // console.log('a')
            // input.addEventListener('change', function () {})
            // console.log(input)
        },
        // addBlogg() {
        //     if (this.blog_title === "") {
        //         swal("A great article always started by a title isn't it?")
        //     } else if (this.file === "") {
        //         swal('Insert image to make your blog more interesting!')
        //     } else {
        //         file = this.file
        //         const extension = file.name.split('.')[1]
        //         const validExtensions = ['png', 'jpg', 'jpeg']
        //         if (validExtensions.indexOf(extension) === -1) {
        //             swal('Valid extensions: .png, .jpeg, or .jpg')
        //         } else {
        //             getBase64(file)
        //                 .then((image) => {
        //                     return axios
        //                         .post(serverUrl, {
        //                             title: this.blog_title,
        //                             content: this.text,
        //                             createdAt: new Date(),
        //                             img: image,
        //                             extension: extension,
        //                             author: this.author,
        //                         }, {
        //                             headers: {
        //                                 auth: localStorage.jwtoken
        //                             }
        //                         })
        //                         .then(() => {
        //                             this.listBlog()
        //                         })
        //                 })
        //                 .catch((err) => {
        //                     console.log(err)
        //                 })
        //         }
        //     }
        // },
        searchBlog() {
            axios
                .get(serverUrl, {
                    headers: {
                        auth: localStorage.jwtoken
                    }
                })
                .then(({
                    data
                }) => {
                    let x = new RegExp(this.value, "i")
                    this.listBlogg = data.filter(blog => x.test(blog.title))
                    if (!this.listBlogg[0]) {
                        this.listBlogg[0] = "sorry there is nothing to show for this keyword"
                    }
                })
        },

        // function methods for user

        register() {
            Swal.mixin({
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3']
                }).queue([{
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
                    let email = result.value[0]
                    let password = result.value[1]
                    let pp = result.value[2] || null
                    return axios
                        .post(serverUrl + '/user/register', {
                            email: email,
                            password: password,
                            pp: pp
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
                    Swal.fire({
                        type: 'error',
                        text: err
                    })
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
                    return axios
                        .post(serverUrl + '/user/login', {
                            email: email,
                            password: password
                        })
                        .then(data => {
                            if (data) {
                                console.log(data.data)
                                localStorage.setItem('jwtoken', data.data)
                                app.isLoggedIn = true
                                Swal.fire({
                                    text: 'You have succesfully logged in',
                                    confirmButtonText: 'Lovely!'
                                })
                            }
                        })
                })
                .catch(err => {
                    Swal.fire({
                        type: 'error',
                        text: 'Your email/password must be wrong, please try again ><'
                    })
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
            localStorage.clear()
            this.isLoggedIn = false
        },

        // onstart function

        onstart() {
            if (localStorage.jwtoken) {
                this.isLoggedIn = true
            }
        }
    },
    created() {
        this.onstart()
        onSignIn()
    }
})