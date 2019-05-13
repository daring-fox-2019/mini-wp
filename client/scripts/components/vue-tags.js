
Vue.component('vue-tag', {
    template:`
    <div>
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
        />
    </div>
    `,
    data() {
        return {
            tag: '',
            tags: [],
        };
    },
})