Vue.component('content-admin', {
    template: `<div class="col-9 bg-light  ">
    <container>
        <div class="card col-9  align-middle mx-auto">
            <div class="card-body ">  
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="search mypost by tag" aria-label="search mypost by tag" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button"><i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>   
            </div>
        </div>
        <br>
        <div class="card col-9 my-10 mx-auto">
            <div class="card-body row" >
            <h6>my post</h6> 
            <hr/>     
                <div class="col-12 border-bottom d-flex justify-content-between" v-for="(post,index) in mypost">
                <div>
                <a href="#" @click.prevent="showOneArticle(post)"><h4>{{post.title}}</h4></a>
                 <small>{{timeago(post.created_at)}}</small>
                </div>
                <div>
                <b-img thumbnail fluid :src="post.featured_image" alt="Image 1" style="height:60px;"></b-img>
                <b-dropdown class="text-dark" variant="link" size="lg" no-caret>
                  <template slot="button-content"><i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </template>
              
                  <b-dropdown-item href="#">
                  <a href="#" @click.prevent="deleteArticle(post._id)"><i class="fa fa-trash" aria-hidden="true"></i> trash</a></b-dropdown-item>
                  <b-dropdown-item href="#"> <a href="#" @click.prevent="updateArticle(post)"><i class="far fa-edit"></i>update</a></b-dropdown-item>
                  <b-dropdown-item href="#"><a href="#" @click.prevent="showOneArticle(post)"><i class="fa fa-file" aria-hidden="true"></i> detail</a></b-dropdown-item>
                </b-dropdown>
              
                
              </div>                         
                </div>
               
            </div>
    </container>
</div>`,
    props: [],
    data() {
        return {
            mypost : []

        }


    },
    created() {
        this.getdata()
       
    },
    methods:{
        deleteArticle(id) {
            console.log('masuk delete',id)
            axios
                .delete(serverUrl + '/article/' + id)
                .then(({ data }) => {
                    this.mypost =data
                    this.getdata()

                })
                .catch((err) => {
                    console.log(err)
                })

        },
        updateArticle(item){
            this.$emit('editform',item)

        },
        showOneArticle(item){
            this.$emit('showonearticle',item)

        },
        getdata(){
            axios
            .get(serverUrl + '/article/user/list')
            .then(({ data }) => {
                console.log(data,'my data')
                this.mypost = data.reverse()
              

            })
            .catch((err) => {
                console.log(err)
            })
        },
        timeago: function (date) {
            return moment(date).fromNow()
        },
    }

})

