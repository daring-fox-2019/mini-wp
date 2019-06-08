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
                <div style="max-width: 145px">
                    <img 
                        :src="article.featured_image ? article.featured_image : 'https://via.placeholder.com/155x155' " 
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
                    <div 
                        v-if="menus.home"
                        class="color-grey4"
                        style="margin-top: 21px;" 
                    >by {{article.author.name}}</div>
                    <div style="color: #616161;
                    font-weight: 500;
                    margin-top: 5px;
                    font-size: 13px;">{{new Date(article.created_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</div>
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