
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
                
                // console.log('current match...', filtered);
                return filtered
            }
            else {
                return []
            }

        }
    },
    mounted() {
        $('[data-toggle="tooltip"]').tooltip();
        this.getTags();
        if(this.$props.data) {
            this.formData = this.$props.data
            this.formData.featured_image = this.$props.data.featured_image
            //populate tags if the current mode is update
            this.formData.tags.forEach(x => {
                this.tags.push(x.text)
            })
        }


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
            console.log(this.formData.tags);
            if(this.formData.tags && this.formData.tags.length > 0) {
                this.formData.tags = this.formData.tags.map(x => {
                    if(x.text) {
                        return x.text
                    }
                    else if(x) {
                        return x
                    }
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
            this.formData.featured_image = data
            console.log('image loaded...', this.formData.featured_image);
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
            <image-upload id="featured-image" v-bind:toupload="uploadingImage" v-on:take-image="onTakeImage" :initimage="type ==='update' ? formData.featured_image : ''" ></image-upload>
        </div>
        <div class="form-group">
            <label for="post-content"><h5>Content</h5></label>
            <vuewysiwyg style="min-height: 300px;" v-model="formData.content"></vuewysiwyg>
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
        <div class="d-flex">
            <button class="btn btn-success" type="submit">Submit</button>
            <button class="btn btn-danger ml-1" type="button" @click="$root.showIndex()">Cancel</button>
        </div>
    </form>`
})