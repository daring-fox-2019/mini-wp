Vue.component('Reader', {
    props: ['article'],
    components: {
        vuewysiwyg: vueWysiwyg.default.component,
    },
    methods: {},
    template: `
    <div class="col p-2" >
        <div class="container">
            <h3>{{article.title}}</h3>
            <img :src="article.featured_image">
            <div v-html="article.content">
            </div>
        </div>
    </div>
`
})