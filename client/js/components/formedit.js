Vue.component('editform', {
    props: ['blog_title','text','id','createdat'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data(){
        return {
            listBlogg: "",
            title: this.blog_title,
            content: "",
            // createdAt: "",
            file: "",
            author: ""
        }
    },
    watch: {
        blog_title(){
            this.title = this.blog_title
        },
        text(){
            this.content = this.text
        }
    },
    template: `
    <form class="form-blog-edit-subpage">
        <div>
        <label for title>Title: </label><br>
        <input v-model="title" type="text" name="title" id="blog_title" size="35"
            placeholder="Your title here.." required>
        </div><br>
        <label for editor>Content:</label>
        </div>
        <div>
            <wysiwyg id="editor" v-model="content"></wysiwyg>
        </div><br>
        <div>
            <input type="file" v-on:change="onChangeUpload" required>
        </div><br>
        <button class="btn btn-dark" type="submit" v-on:click.prevent="updateBlogg">Update</button>
    </form>
    `,
    methods: {
        updateBlogg() {
            if (this.title === "") {
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
                                    title: this.title,
                                    content: this.content,
                                    createdAt: this.createdAt,
                                    img: image,
                                    extension: extension
                                }, {
                                    headers: {
                                        auth: localStorage.jwtoken
                                    }
                                })
                                .then((data) => {
                                    this.$emit('editsuccess')
                                })
                                .catch((err) => {
                                    console.log(err.message)
                                })
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
