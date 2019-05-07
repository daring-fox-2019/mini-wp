Vue.component('detail-post', {
    props: ['post'],
    data() {
        return {
            status: {
                type: null,
                message: '',
            },
        }
    },
    methods: {
        getAlertClass() {
            if(this.status.type === 'error') {
                return 'alert alert-dismissible fade alert-danger show'
            }
            else {
                return 'alert alert-dismissible fade alert-success show'
            }
        },

    },
    template:
    `<div class="d-flex flex-column pb-5">
        <h3 class="mb-4">{{ post.title }}</h3>
        <div v-if="status.message" v-bind:class="getAlertClass()" role="alert">
            {{ status.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div><img v-bind:src="post.featured_image"></div>
        <div class="mb-1" v-html="post.content"></div>
    </div>`
})