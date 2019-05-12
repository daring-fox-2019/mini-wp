Vue.component('published',{
    props : ['article','iterate','status'],
    data(){
        return {
            edit : `edit-${this.iterate}`,
            deleteH : `delete-${this.iterate}`,
            read : `read-${this.iterate}`,
            editContent : `Edit ${this.article.title}`,
            readContent : `Read ${this.article.title}`,
            deleteContent : `Delete ${this.article.title}`,
            date : moment( this.article.updatedAt).format("MMM Do YY")
        }
    },
    methods : {
        deleteArticle(id){
            this.$parent.deleteArticle(id)
        },
        toRead(check, article){
            this.$parent.toRead(check, article)
        },
        editArticle(article){
            this.$parent.editArticle(article)
        },
        tagSearch(tag){
            this.$emit('set-tag-search', tag)
        }
    },
    template : 
    `
    <div class="container p-5 animated fadeInUp">
        <div style="overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;">
            <h2> {{article.title}}</h2>
        </div>
        <p style="color:#49beb7"> <i> {{date}} </i> <br>
            <span style="color:grey"> by : <i> {{article.author.name}} </i></span>
        </p>
       
        <hr>
        <div>
            <button v-for="tag in article.tags" class="btn btn-sm btn-outline-secondary m-1" @click.prevent="tagSearch(tag.text)"> {{tag.text}}</button>
            <button v-if="article.tags.length != 0" class="btn btn-sm btn-secondary m-1" @click.prevent="tagSearch(null)"> All </button>
        </div>

        <div class=" container row mt-3" > 
            <b-button :id="edit" variant="success" class="mr-2" @click="editArticle(article)" v-if="status.Login"> <i class="far fa-edit"></i> Edit</b-button>
            <b-button :id="read" variant="dark" class="mr-2" @click='toRead(true, article)' > <i class="fas fa-glasses"></i></b-button>
            <b-button :id="deleteH" variant="secondary" class="mr-2" @click='deleteArticle(article._id)' v-if="status.Login"> <i class="fas fa-trash"></i></b-button>
            
            <b-popover
                :target="edit"
                placement="bottomleft"
                triggers="hover"
                :content="editContent"
                v-if="status.Login"
            ></b-popover>

            <b-popover
                :target="deleteH"
                placement="bottomleft"
                triggers="hover"
                :content="deleteContent"
                v-if="status.Login"
            ></b-popover>

            <b-popover
                :target="read"
                placement="bottomleft"
                triggers="hover"
                :content="readContent"
            ></b-popover>
        </div>
    </div>
    `
})