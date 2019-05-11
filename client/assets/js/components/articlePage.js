Vue.component('article-page', {
    props:['createpage', 'newarticle'],
    methods: {
        submitCreate() {
            this.$emit('submit-create')
        },
        submitEdit() {
            this.$emit('submit-edit')
        },
        handleFileUpload(event) {
            this.newarticle.featured_image = event.target.files[0]
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