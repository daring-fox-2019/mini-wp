Vue.component('card-article', {
    props: ['article'],
    methods:{
        showModal(article){
            this.$emit('show-detail', article)
        },
        showEditArticle(article){
            this.$emit('edit-article', article)
        },
        deleteArticle(id){
            this.$emit('delete-article', id)
        },
        searchTags(tag){
            this.$emit('search-tag', tag)
        }
    },
    template: ` 
        <v-card>
            <v-card-title primary-title>
            <div>
                <div class="headline">{{ article.title }}</div>
                <div class="text-xs-center">
                    <tags :tags="article.tags" @search-tag="searchTags"/>
                </div>            
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat @click="showModal(article)">Detail</v-btn>
            <v-btn flat color="green" @click="showEditArticle(article)">Edit</v-btn>
            <v-btn flat color="red" @click="deleteArticle(article._id)">Delete</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    `
})
