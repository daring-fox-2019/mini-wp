Vue.component('article-card', {
    props: ['articlecomponent'],
    data() {
        return {}
    },
    methods: {
        toEditPage(id) {
            this.$emit('toeditpage', id)
        },
        deleteArticle(id) {
            this.$emit('deletearticle', id)
        }
    },
    template: `
        <div class="card">
            <div class="card-body" style="background-color: #F1E7FE;">
                <img v-bind:src="articlecomponent.image" style="height: 250px; width: 100%;">
                <h5 style="font-weight: bold;" class="card-title">{{ articlecomponent.title }}</h5>
                <h6>{{ articlecomponent.createdAt }}</h6>
                <p class="card-text" v-html="articlecomponent.content"></p>
                <div>                
                    <ul class="tags" v-for="tag in articlecomponent.tags">
                        <li>{{ tag }}</li>
                    </ul>
                </div>
                <button type="submit" class="btn btn-warning"
                    @click="toEditPage(articlecomponent._id)">Edit</button>
                <button type="submit" class="btn btn-danger"
                    @click="deleteArticle(articlecomponent._id)">Delete</button>
            </div>
        </div>
    `
})