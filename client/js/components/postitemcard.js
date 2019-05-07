Vue.component('postitemcard', {
    props: ['post'],
    computed: {
        formattedDate: function() {
            return moment(new Date(this.$props.post.createdat)).format('MMM DD, YYYY')
        }
    },
    template:
    `<a href="#" class="list-group-item list-group-item-action flex-row post-list-item p-3">
        <div class="d-flex flex-column justify-content-between w-100">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{post.title}}</h5>
                <small>{{ formattedDate }}</small>
            </div>
            <div class="mb-1" v-html="post.content"></div>
            <div class="d-flex">
                <span class="badge badge-info mr-1" v-for="(tag,i) in post.tags" :key="i">{{tag}}</span>
            </div>
        </div>
        <div class="ml-3"><img style="width: 150px; height:100%;" src="img/user.png"></div>
    </a>`
})