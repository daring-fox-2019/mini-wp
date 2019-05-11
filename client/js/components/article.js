Vue.component('blog', {
    props: ['blog'],
    template: `
    <div>
        <div>
            <div>
                <h2><strong>{{ blog.title }}</strong></h2><br>
            </div>
            <div>
                <img v-bind:src="blog.img" style="margin:auto" width="70%">
            </div><br>
        </div>
        <h6 v-html="blog.content"></h6>
                <h6>Created At: {{blog.createdAt}}</h6>
                <h6>By: {{blog.author}}</h6><br>
    </div>
    `
})
