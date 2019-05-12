Vue.component('formadd', {
    props: ['page'],
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    data() {
        return {
            listBlogg: "",
            blog_title: "",
            text: "",
            createdAt: "",
            file: "",
            author: localStorage.name,
            tag: '',
            tags: [],
            disable: true
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
    <div class="row">
    <div class="col-6" style="margin-top:10px">
                <div class="input-group mb-3">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" v-on:change="onChangeUpload">
            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
          </div>
        </div>
    </div>
    <div class="col-6">
        <input type="text" v-model="author"
            id="author-input" :disabled="disable" style="margin-right:0;margin-bottom:0">
            <small style="color:red;cursor:pointer" @click="editdisable"><i>Change Author</i></small>
    </div>
    <br>
    </div>
    
    <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
    </div><br>
    <button class="btn btn-dark" v-on:click.prevent="addBlogg">Add</button>
    </form>
    `,

    methods: {
        editdisable(){
            this.disable = !this.disable
            this.author = localStorage.name
        },
        addBlogg() {
            if (this.blog_title === "") {
                swal("A great article always started by a title isn't it?")
            } else if (this.file === "") {
                swal('Insert image to make your blog more interesting!')
            } else {
                file = this.file
                const extension = file.name.split('.')[1]
                const validExtensions = ['png', 'jpg', 'jpeg']
                this.tags = this.tags.map(el => el.text)
                console.log(this.tags)
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
                                    tags: this.tags
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

{
    /* <input type="file" style="opacity:1; position:relative; left:0px;" v-on:change="onChangeUpload" required> */ }