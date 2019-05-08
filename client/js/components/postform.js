
Vue.component('postform', {
    props: ['type', 'data'],
    components: {
        vuewysiwyg: vueWysiwyg.default.component,
    },
    data() {
        return {
            formData: {
                title: '',
                feature_image: '',
                content: '',
                createdat: '',
                author: '',
                tags: [],
            },
            tag: '',
            tags: [],
            availableTags: [],
            uploadingImage: false,
        }
    },
    computed: {
        filteredTags: function() {
            return this.availableTags.filter(i => {
              return i.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
            });
        }
    },
    created() {
        this.availableTags = ['node', 'js', 'javascript', 'c#', 'bootstrap']

        axios.get({
            url: serverURL
        })
        .then(({data}) => {
            data.forEach(x => {
                this.availableTags.push(x.name)
            })
        })
        .catch(err => {

        })
    },
    methods: {
        refreshTags(newTags) {
            console.log('changed..',newTags);
        },
        createPost() {
            backend.post({
                data: formData,
                headers: {
                    token: localStorage.getItem('miniwp_token')
                }
            })
            .then(({data}) => {
                console.log('create done\n', formData);
            })
            .catch(err => {
                console.log('error create --', err);
            })
        },
        updatePost() {
            backend.put({
                data: formData,
                headers: {
                    token: localStorage.getItem('miniwp_token')
                }
            })
            .then(({data}) => {
                console.log('update done\n', formData);
            })
            .catch(err => {
                console.log('error create --', err);
            })
        },
        processSubmit() {
            if(this.$props.type === 'create') {
                this.tags.map(x => {
                    this.formData.tags.push(x.text.toLowerCase())
                })
                this.$emit('create', this.formData)
            }
            else {
                this.updatePost()
            }
        },
        onTakeImage() {
            console.log('image loaded...');
        }
    },
    template: 
    `<form class="needs-validation w-100" novalidate @submit.prevent="processSubmit">
        <div class="form-group">
            <label for="title"><h5>Title</h5></label>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Title" v-model="formData.title"
                    aria-describedby="title" autocomplete="off" required>
                <div class="invalid-feedback">
                    Please set any title
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="tags"><h5>Feature Image</h5></label>
            <!--<input type="file" class="form-control" id="feature-image" v-model="formData.feature_image"
                aria-describedby="feature-image" autocomplete="off"> -->
                <image-upload id="featured-image" v-bind:toupload="uploadingImage" v-on:take-image="onTakeImage"></image-upload>
        </div>
        <div class="form-group">
            <label for="post-content"><h5>Content</h5></label>
            <vuewysiwyg v-model="formData.content"></vuewysiwyg>
        </div>
        <div class="form-group">
            <label for="tags"><h5>Tags</h5></label>
            <vue-tags-input v-model="tag"
                :tags="tags"
                autocomplete="off"
                :autocomplete-items="filteredTags"
                @tags-changed="refreshTags"
            />
        </div>
        <div class="form-group">
            <button class="btn-sm btn-success" type="submit">Submit</button>
        </div>
    </form>`
})