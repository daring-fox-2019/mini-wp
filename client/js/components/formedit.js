Vue.component('editform', {
    props: ['blog_title', 'text', 'id', 'createdat', 'tagz'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data() {
        return {
            listBlogg: "",
            title: this.blog_title,
            content: "",
            // createdAt: "",
            file: "",
            author: "",
            tags: [],
            tag: ''
        }
    },
    watch: {
        blog_title() {
            this.title = this.blog_title
        },
        text() {
            this.content = this.text
        },
        tagz(){
            this.tags = this.tagz 
        }
    },
    template: `
    <form class="form-blog-edit-subpage">
        <div>
        <label for title>Title: </label><br>
        <input v-model="title" type="text" name="title" id="blog_title" size="35"
            placeholder="Your title here.." class="form-control form-control-lg" required>
        </div><br>
        <label for editor>Content:</label>
        </div>
        <div>
            <wysiwyg id="editor" v-model="content"></wysiwyg>
        </div>
        <div style="margin-top: 10px">
        <div class="col-6" style="margin-left:-15px">
        <div class="input-group mb-3">
        <div class="custom-file">
        <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" v-on:change="onChangeUpload">
        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
        </div>
        </div>
        <div>
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          @tags-changed="newTags => tags = newTags"
        />
        </div>
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
                this.tags = this.tags.map(el => el.text)
                if (validExtensions.indexOf(extension) === -1) {
                    swal('Valid extensions: .png, .jpeg, or .jpg')
                } else {
                    getBase64(file)
                        .then((image) => {
                            axios
                                .put(serverUrl + '/' + this.id, {
                                    id: this.id,
                                    title: this.title,
                                    content: this.content,
                                    createdAt: this.createdAt,
                                    img: image,
                                    extension: extension,
                                    tags: this.tags
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