
Vue.component('postform', {
    props: ['type', 'data'],
    components: {
        vuewysiwyg: vueWysiwyg.default.component,
    },
    data() {
        return {
            formData: {
                title: '',
                featured_image: '',
                content: '',
                created_at: '',
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
            let filtered
            if(this.availableTags && this.availableTags.length > 0) {
                filtered =  this.availableTags.filter(x => {
                  return x.text.indexOf(this.tag.toLowerCase()) !== -1;
                });
    
                filtered = filtered.map(x => {
                    return {text: x.text}
                })
                
                return filtered
            }
            else {
                return []
            }

        }
    },
    created() {
        $('[data-toggle="tooltip"]').tooltip();
        this.getTags();
    },
    methods: {
        getTags() {
            this.availableTags = []

            axios({
                method: 'GET',
                url: serverURL + '/tags'
            })
            .then(({data}) => {
                data.forEach(x => {
                    this.availableTags.push(x)
                })
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        refreshTags(newTags) {
            this.formData.tags = newTags
        },
        processSubmit() {
            if(this.formData.tags && this.formData.tags.length > 0) {
                this.formData.tags = this.formData.tags.map(x => {
                    return x.text
                })
            }

            if(this.$props.type === 'create') {
                this.$emit('create', this.formData)
            }
            else {
                this.$emit('update', this.formData)
            }
        },
        onTakeImage(data) {
            console.log('image loaded...');
            this.formData.featured_image = data
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
        <div class="form-group" data-toggle="tooltip" title="You can add new tag here">
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