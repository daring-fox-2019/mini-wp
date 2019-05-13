Vue.component('show-one', {
    props: ['islogin', 'article'],
    template: `<div class="row mx-auto">
    <div class="col-9 mx-auto mb-30" style="width:70rem;">
        <div class="card ">
            <div class="card-head px-2 pt-3">
                <a href="#" class="text-dark text-center">
                    <h1 class="card-title">{{post.title}}</h1>
                </a>
                <div class="d-flex justify-content-between px-2">
                    <p><small>posted by: {{post.user.name}}</small></p>
                    <p><small>{{dateformat(post.updated_at)}}</small></p>
                </div>
   
            </div>
            <img class="card-img-top" v-bind:src="post.featured_image" alt="Card image cap" >
            <div class="card-body">
                <p class="card-text" v-html="post.content">

                </p>
            </div>
            <div class="card-footer">
                <a class="btn btn-info ml-1" href="#" v-for="(tag,index) in post.tags" >#{{tag}}</a>   
            </div>
        </div>
    </div>
   </div>`,
    data() {
        return {
            post :{
                
            }


        }
    },
    mounted(){
        this.post = this.article

    },
    methods: {
        dateformat: function (date) {
            return moment(date).format('llll')
        },

    }

})


