Vue.component('post-detail', {
    props: ['post'],
    data() {
        return {
            status: {
                type: null,
                message: '',
            },
        }
    },
    computed: {
        twitterShareLink() {
            return `https://twitter.com/intent/tweet?text=Hi, Tweet this ${this.articlePublicUrl}`
        },
        whatsappLink() {
            return `https://api.whatsapp.com/send?text=Hi, checkout this post: ${this.articlePublicUrl}`
        },
        articlePublicUrl() {
            return this.$root.baseURL + '/explore/' + this.$props.post.slug
        },
        fbShareLink() {
            let finalLink = `https://www.facebook.com/plugins/share_button.php?href=${this.articlePublicUrl}&layout=button_count&size=small&appId=357508474873802`
            return finalLink
        },
    },
    methods: {
        tagLink(text) {
            return serverURL + '/tags/' +text
        },
        getAlertClass() {
            if(this.status.type === 'error') {
                return 'alert alert-dismissible fade alert-danger show'
            }
            else {
                return 'alert alert-dismissible fade alert-success show'
            }
        },
        processTag(tag) {
            this.$root.searchTag = tag
            this.$root.page = 'search'
        }
    },
    template:
    `<div class="d-flex flex-column pb-5">
        <div id="fb-root"></div>
        <small class="detail__date">{{ $root.formattedDate(post.created_at) }}</small>
        <div class="detail__title">{{ post.title }}</div>
        <div class="d-flex my-2 align-content-center">
            <iframe v-bind:src="fbShareLink" width="80" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            <a v-bind:href="whatsappLink" 
                style="height: 20px; font-size: 12px; font-family: 'Montserrat'; padding-left: 4px; padding-right: 4px;  padding-top: 2px; padding-bottom: 2px; color: white; border-radius: 4px; background: green; font-weight: bold;">
                <i class="fab fa-whatsapp">&nbsp;Share on Whatsapp</i>
            </a>
            <a v-bind:href="twitterShareLink" class="px-2" style="display: flex; align-content: center; margin-left:10px; color: white; border-radius: 4px; background: #00a4de; height: 20px;">
                <i class="fab fa-twitter">&nbsp;Tweet</i>
            </a>
        </div>
        <div v-if="status.message" v-bind:class="getAlertClass()" role="alert">
            {{ status.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="align-self-center my-4"><img v-bind:src="post.featured_image"></div>
        <div class="my-3 detail__content" v-html="post.content"></div>
        <div class="d-flex mt-5">
            <a v-for="tag in post.tags" :key="tag._id" @click="processTag(tag.text)">
                <tag-badge :tag="tag" class="mr-2 detail-badge" ></tag-badge>
            </a>
        </div>
    </div>`
})