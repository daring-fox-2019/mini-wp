Vue.component('article-card', {
    props: {
        article: Object,
        index: Number
    },
    template: `
    <div class="item">
        <div class="image medium">
            <img :src="article.featured_image" />
        </div>
        <div class="content">
            <a class="header" @click="$emit('view-article', index)">{{
            article.title
            }}</a>

            <div class="meta">
                {{ article.subtitle }}
            </div>
            
            <br />
            
            <div class="description">
                <p></p>
            </div>
            
            <div class="extra">
                <div class="ui small labels">
                    <a
                        class="ui label"
                        v-for="(tag, i) in article.tags"
                        :key="i"
                        @click="$emit('fetch-articles', tag)"
                    >
                    {{ tag }}
                    </a>
                </div>
                
                <div
                    class="ui right floated grey basic button"
                    @click="$emit('view-article', index)"
                >
                    Read
                    <i class="right chevron icon"></i>
                </div>
                
                {{ article.owner.name }} <br />
                    <p>Created At: {{ $parent.createdAt(article.created_at) }}</p>
            </div>

        </div>
    </div>
    `
})