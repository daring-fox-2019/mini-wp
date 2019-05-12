Vue.component('input-content', {
    props : ['dataArticle','status','articles'],
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    methods : {
        setArticles(){
            this.$emit('set-articles', this.articles)
        },
        emptyDataArticle(){
            this.$parent.emptyDataArticle()
        },
        editMode(id){
            this.$emit('edit-mode',id)
        }
    },
    template : 
    `
        <div class="container mt-5 animated zoomIn" v-if="status.Login && !status.Home && !status.Read && !status.Register" style="padding-top:100px;padding-bottom:100px">
            <h2 class="mb-3"> Add Content Here ...</h2>
            <div class="my-3">
                <b-form-input v-model="dataArticle.title" placeholder="Title"></b-form-input>
            </div>

            <div class="mt-3">
                <wysiwyg v-model="dataArticle.text" :options="{image: { uploadURL:'http://miniwp-server.komangmahendra.me/upload'}}"> </wysiwyg>
            </div>
            
            <div>
                <vue-tags-input
                    class="mt-3"
                    v-model="dataArticle.tag"
                    :tags="dataArticle.tags"
                    @tags-changed="newTags => dataArticle.tags = newTags"
                />
            </div>

            <save-button 
                :data-article="dataArticle" 
                :articles="articles" 
                @set-articles="setArticles"
                @edit-mode="editMode"
            ></save-button>
        </div>
    `
})