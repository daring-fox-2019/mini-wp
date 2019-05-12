Vue.component('mycard',{
    props: ['article', 'menus'],
    methods: {
        clickEdit(id) {
            this.$emit('click-edit', id)
        },
        clickDelete(id) {
            this.$emit('click-delete', id)
        }
    },
    template:
    `
    <div class="d-flex justify-content-between w-100">
        <div class="content">
            <div class="d-flex justify-content-between">
                <div style="max-width: 115px">
                    <img 
                        :src="article.featured_image ? article.featured_image : 'https://via.placeholder.com/70x70' " 
                        alt="article.title"
                        style="width:100%;"
                    >
                </div>
                <div class="ml-20">
                    <div class="my-card-header">
                        {{article.title}}
                    </div>
                    <div class="my-card-content" v-html="article.content">
                    </div>
                    <div v-if="menus.home">
                        by {{article.author.name}}
                    </div>
                    <div v-if="article.tags">
                        <div 
                            v-for="tag in article.tags"
                            class="tag"                
                        ># {{tag}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action">
            <div class="btn 
                btn-link 
                cursor-pointer" 
                @click="clickEdit(article._id)"
                v-if="menus.list">Edit</div>
            <div class="color-red 
                fs-17
                pointer-underline" 
                @click="clickDelete(article._id)"
                v-if="menus.list">Delete</div>
        </div>
    </div>
    `
})