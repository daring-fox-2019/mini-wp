Vue.component('postitemcard', {
    props: ['post'],
    data() {
        return {
            showActionButtons: false,
            loading: false,
        }
    },
    computed: {
        formattedDate: function() {
            return moment(new Date(this.$props.post.created_at)).format('MMM DD, YYYY')
        },
        cardImage() {
            if(this.$props.post.featured_image) {
                return this.$props.post.featured_image
            }
            else {
                return "https://storage.googleapis.com/miniwp-images/user.png"
            }
        },
    },
    methods: {
        updatePost(id) {
            this.$emit('updatePost', id)
        },
        deletePost(id) {
            this.$emit('deletePost', id)
        },
    },
    template:
    `
    <div class="d-flex" v-on:mouseover="showActionButtons = true" v-on:mouseleave="showActionButtons = false">
        <a href="#" v-on:click="$root.showDetailPost(post._id)" class="list-group-item list-group-item-action flex-row post-list-item p-3 card-content">
            <div class="d-flex flex-column justify-content-between w-100">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{post.title}}</h5>
                    <small>{{ formattedDate }}</small>
                </div>
                <div class="mb-1" v-html="post.content"></div>
                <div class="d-flex">
                    <tag-badge class="mr-1" v-for="(tag,i) in post.tags" :key="i" :tag="tag"></tag-badge>
                </div>
            </div>
            <div class="ml-3"><img style="width: 150px; height:100%;" v-bind:src="cardImage"></div>
        </a>
        <div class="itemcard-actions" v-show="showActionButtons">
            <a href="#" class="itemcard-action-btn" v-on:click="$root.showUpdatePost(post._id)"><i class="fas fa-edit"></i></a>
            <a href="#" class="itemcard-action-btn" v-on:click="deletePost(post._id)"><i class="fas fa-trash-alt"></i></a>
        </div>
    </div>
    `
})