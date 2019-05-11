Vue.component('formadd', {
    props: ['page'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data(){
        return {
            listBlogg: "",
            blog_title: "",
            text: "",
            createdAt: "",
            file: "",
            author: "",
            tags: []
        }
    },
    template: `
    <form class="form-blog-add-subpage" method="POST">
    <div>
        <label for title>Title: </label><br>
        <input class="form-control form-control-lg" v-model="blog_title" type="text"
            name="title" size="35" placeholder="Your title here.." required>
    </div><br>
    <label for editor>Content:</label>
    <div>
        <wysiwyg id="editor" v-model="text"></wysiwyg>
    </div>
    <div>
        <input type="text" v-model="author" placeholder="Author of this article.."
            id="author-input">
    </div>
    <div>
        <input type="file" v-on:change="onChangeUpload" required>
    </div><br>
    <button class="btn btn-dark" v-on:click.prevent="addBlogg">Add</button>
    </form>
    `,
    
    methods: {
        addBlogg() {
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
                            return axios
                                .post(serverUrl, {
                                    title: this.blog_title,
                                    content: this.text,
                                    createdAt: new Date(),
                                    img: image,
                                    extension: extension,
                                    author: this.author,
                                }, {
                                    headers: {
                                        auth: localStorage.jwtoken
                                    }
                                })
                                .then(() => {
                                    this.$emit('addsuccess')
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }
        },
        onChangeUpload(e) {
            file = e.target.files[0]
            this.file = file
        },
        
    }
})

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
