Vue.component('article-page', {
    props:['createpage', 'newarticle'],
    data() {
        return {
            tagValue : ''
        }
    },
    methods: {
        submitCreate() {
            this.$emit('submit-create')
        },
        submitEdit() {
            this.$emit('submit-edit')
        },
        handleFileUpload(event) {
            this.newarticle.featured_image = event.target.files[0]
        },
        clickAddTags() {
            if(this.newarticle.tags===undefined) {
                this.newarticle.tags=[]
            }

            if(this.tagValue.trim()) {
                this.newarticle.tags.push( this.tagValue )
            }
            this.tagValue=""
        },
        removeTag(tagName) {
            this.tagValue='reactive-force biar update tags nya jalan :D'
            this.tagValue=''
            this.newarticle.tags = this.newarticle.tags.filter(tag => {
                if(tag!==tagName) {
                    return tag
                }
            })
        }
    },
    template:
    `
    <div class="article__container">
        <h3>Article</h3>
        <form 
            v-on:submit.prevent="submitEdit" 
            v-show="!createpage" 
            enctype="multipart/form-data"
        >
            <div class="form-group">
                <input 
                    type="file" 
                    name="featured_image"
                    ref="file"
                    accept="image/*"
                    v-on:change="handleFileUpload"
                >
            </div>
            <div class="form-group">
                <input 
                    type="text" 
                    v-model.trim="newarticle.title" 
                    class="form-control" 
                    placeholder="Title"
                >
            </div>
            <div class="form-group">
                <slot 
                    name="wysiwyg"
                    v-model.trim="newArticle.content"                       
                ></slot>
            </div>

            <input 
                type="hidden" 
                v-model.trim="newarticle.id"
            >

            <h6>Tags</h6>
            <div class="input-group mb-3" style="width: 20em;">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Article tags" 
                    aria-label="Article tags" 
                    aria-describedby="button-addon2"
                    v-model="tagValue"
                >
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                    @click.prevent="clickAddTags" 
                    id="button-addon2">Add</button>
                </div>
            </div>

            <div v-show="this.newarticle.tags!==undefined">
                <div 
                    v-for="tag in this.newarticle.tags"
                    class="tag"
                >{{tag}} <span class="remove-tag" @click="removeTag(tag)" style="display:inline-block; margin-right: 3px;">x</span>
                </div>
            </div>

            <button class="btn 
                btn-primary
                cursor-pointer"
            >Edit</button>
        </form>

        <form 
            v-on:submit.prevent="submitCreate" 
            v-show="createpage"
            enctype="multipart/form-data"
        >
            <div class="form-group">
                <input 
                    type="file" 
                    name="featured_image"
                    ref="file"
                    accept="image/*"
                    v-on:change="handleFileUpload"
                >
            </div>

            <div class="form-group">
                <input 
                    type="text" 
                    v-model.trim="newarticle.title" 
                    class="form-control" 
                    placeholder="Title"
                >
            </div>
            <div class="form-group">
                <slot 
                    name="wysiwyg"
                    v-model.trim="newArticle.content"    
                ></slot>
            </div>


            <h6>Tags</h6>
            <div class="input-group mb-3" style="width: 20em;">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Article tags" 
                    aria-label="Article tags" 
                    aria-describedby="button-addon2"
                    v-model="tagValue"
                >
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                    @click.prevent="clickAddTags" 
                    id="button-addon2">Add</button>
                </div>
            </div>

            <div v-show="this.newarticle.tags">
                <div 
                    v-for="tag in this.newarticle.tags"
                    class="tag"
                >{{tag}} <span class="remove-tag" @click="removeTag(tag)" style="display:inline-block; margin-right: 3px;">x</span>
                </div>
            </div>

            <button 
                id="article__draft-btn" 
                class="btn btn-success"
            >Draft</button>
            <button 
                id="article__publish-btn" 
                class="btn btn-primary"
            >Publish</button>
        </form>
    </div>
    `
})