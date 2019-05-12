Vue.component('article-card', {
    props: ['article'],
    data() {
        return {
            diff: moment(this.article.createdAt).fromNow()
        }
    },
    computed: {
    },
    methods: {
        showViewer(){
            this.$emit('show-viewer', this.article._id) //emit some data
        },
        searchByTag(tag) {
            this.$emit('search-by-tag', {tag})
        }
    },
    template: `
    <b-row class="p-3 border-top">
        <b-col class="article-homepage-card px-3">
            
            <b-row class="font-serif">
                <a href="#" @click="showViewer"><h2 class="mb-0">{{article.title}}</h2></a>
            </b-row>
            <b-row style="color:grey;font-size: 15px;">
                {{article.subtitle}}
            </b-row>
            <b-row class="mt-3">
                <div class="col">
                    <b-row class="font-15 mt-1">
                        {{article.user.name}}
                    </b-row>
                    <b-row class="font-10">
                        Published: {{diff}}
                    </b-row>
                    <b-row class="d-flex align-items-center mt-3" style="max-height:23px;overflow:hidden;">
                         <div style="font-size:13px;">Tags:</div>
                        <b-badge href="#" class="px-1" 
                            variant="light" 
                            v-for="(tag,index) in article.tags"
                            @click="searchByTag(tag.text)"
                            :key="index">{{tag.text}}</b-badge>
                    </b-row>
                </div>
            </b-row>
        </b-col>
        <div style="width: 180px; height: 160px; overflow:hidden;">
            <img :src="article.image" alt=""
                style="background-size:cover; height: inherit;">
        </div>
        
    </b-row>
    `,
})