let serverAddress = "http://localhost:3001/"

function clearAlert(vueThis) {
    setTimeout(() => {
        vueThis.alert = "";
    }, 2200);
}

let avatarIcons = [
    "./icons/man-profile.png",
    "./icons/woman-profile.png",
    "./icons/boy-profile.png",
    "./icons/girl-profile.png",
    "./icons/fox-profile.png",
    "./icons/dog-profile.png",
    "./icons/cat-profile.png",
    "./icons/turtle-profile.png",
    "./icons/octopus-profile.png",
    "./icons/robot-profile.png",
]

Vue.use(CKEditor);

let app = new Vue({
    el: "#mini-wp",
    data: {
        loggedIn: false,
        showForm: 0,
        text: "Sign in",
        registerEmail: "",
        loginEmail: "",
        password: "",
        changePassword: {
            old: "",
            new: ""
        },
        userProfilePic: "",
        avatarIcons: avatarIcons,
        alert: "",
        articles: [],
        articleSearch: "",
        zone: 0,
        accountzone: 0,
        editorTitle: "",
        editor: ClassicEditor,
        editorData: "",
        selectedFile: null,
        editorConfig: {
            toolbar: ['heading', 'bold', 'italic', 'link', 'blockquote', 'bulletedlist', 'numberedlist', 'undo', 'redo']
        },
    },
    methods: {
        home() {
            this.password = ""
            if(this.loggedIn) {
                this.zone = 0
            } else {
                this.showForm = 0
            }
        },
        register() {
            this.password = ""
            this.showForm = 1
        },
        sign() {
            if(this.loggedIn) {
                this.text = "Sign in"
                this.loggedIn = false
                localStorage.removeItem("token")
            }
            else {
                this.password = ""
                this.showForm = 2
            }
        },
        sendRegister() {
            axios({
                method: 'post',
                url: serverAddress + "users/register",
                data: {
                  email: this.registerEmail,
                  password: this.password,
                }
            })
            .then(({ data }) => {
                this.alert = "Success, proceed to sign in."
                this.registerEmail = "";
                clearAlert(this)
            })
            .catch(err => {
                this.alert = "Failed"
                clearAlert(this)
            })
        },
        sendLogin() {
            axios({
                method: 'post',
                url: serverAddress + "users/login",
                data: {
                  email: this.loginEmail,
                  password: this.password,
                }
            })
            .then(({ data }) => {
                this.text = "Sign Out"
                this.loggedIn = true;
                this.showForm = 0;
                this.loginEmail = "";
                this.password = "";
                localStorage.setItem("token", data.token);
                axios({
                    method: 'get',
                    url: serverAddress + "articles",
                    headers: {"Authorization": data.token},
                })
                .then(({ data }) => {
                    if(data) {
                        this.articles = data
                    }
                    return
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
                this.alert = "Failed"
                clearAlert(this)
            })
        },
        fetchArticles() {
            this.zone = 2
            axios({
                method: 'get',
                url: serverAddress + "articles",
                headers: {"Authorization": localStorage.getItem("token")},
            })
            .then(({ data }) => {
                this.articles = data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        saveArticle() {
            console.log(this.editorTitle)
            console.log(this.editorData)
            console.log(this.selectedFile)

            // let formData = new FormData()
            // formData.append("file", this.selectedFile)
            axios({
                method: 'post',
                url: serverAddress + "articles",
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                data: {
                    title: this.editorTitle,
                    content: this.editorData,
                    created_at: new Date(),
                    image: this.selectedFile,
                }
            })
            .then(({ data }) => {
                console.log(data)
                this.alert = "Article saved"
                clearAlert(this)
            })
            .catch((err) => {
                this.alert = "Failed to save"
                clearAlert(this)
            })
        },
        onFileSelect(event) {
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
        },
        goToAccount() {
            this.accountzone = 0;
            this.zone = 3;
        },
        toggleCPP() {
            if(this.accountzone !== 1) {
                this.accountzone = 1
            } else {
                this.accountzone = 0
            }
        },
        toggleCPass() {
            if(this.accountzone !== 2) {
                this.accountzone = 2
            } else {
                this.accountzone = 0
            }
        },
        sendChangePass() {
            axios({
                method: 'put',
                url: serverAddress + "users",
                headers: {"Authorization": localStorage.getItem("token")},
                data: {
                    old: this.changePassword.old,
                    new: this.changePassword.new
                }
            })
            .then(() => {
                this.zone = 3;
                this.alert = "Password successfully changed";
                setTimeout(() => {
                    this.accountzone = 0;
                    this.alert = "";
                }, 2000);
            })
            .catch((err) => {
                console.log(err)
                this.alert = "Failed";
                clearAlert(this)
            })
        },
        deleteAccount() {
            axios({
                method: 'delete',
                url: serverAddress + "users",
                headers: {"Authorization": localStorage.getItem("token")},
            })
            .then(() => {
                this.articles = [];
                this.zone = 0;
                this.text = "Sign in";
                this.alert = "Account deleted";
                this.loggedIn = false;
                this.accountzone = 0;
                clearAlert(this)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    computed: {
        filteredArticles() {
            return this.articles.filter((article) => {
                return article.title.match(new RegExp(this.articleSearch, "i"))
            })
        },
        articleCount() {
            if(this.articles.length === 1) {
                return this.articles.length + " article"
            }
            else {
                return this.articles.length + " articles"
            }
        },
        sayDate() {
            let date = new Date()
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let ordinalDate = date.getDate()
            if(ordinalDate === 1) {
                ordinalDate += "st"
            } else if(ordinalDate === 2) {
                ordinalDate += "nd"
            } else if(ordinalDate === 3) {
                ordinalDate += "rd"
            } else {
                ordinalDate += "th"
            }
            return `Today is ${months[date.getMonth() - 1]} ${ordinalDate}, ${date.getFullYear()}`
        }

    }
})