Vue.component('blog', {
    props: ['blog'],
    template: `
    <div>
    <h2><strong>{{ blog.title }}</strong></h2>
        <div class="d-flex flex-wrap">
            <div class="mb-auto p-4">
                <img v-bind:src="blog.img" style="margin:auto; max-height:300px; width: 500px; overflow:hidden">
            </div>
            <h6 v-html="blog.content"></h6>
        </div>
        <h6><small>Created At: {{blog.createdAt}}</small></h6>
        <h6><small>By: {{blog.author}}</small></h6>
        <span><small>Tags: </small></span>
        <span v-for="(tagy,index) in this.blog.tags" :key="index">
            <tag :tagz="tagy" @foundbytag="send"></tag>
        </span>
    </div>
    `,
    methods: {
        send(v){
            this.$emit('foundbytag',v)
        }
    }
})