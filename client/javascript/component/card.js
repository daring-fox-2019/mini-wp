Vue.component("card-article", {
  props: ["list"],
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data() {
    return {
      isLogin: false,
      id: '',
      email: '',
      password: '',

      createTitle: '',
      createContent: '',
      createImage: '',

      editTitle: '',
      editContent: '',
      editImage: '',

      listArticles: [],
    }
  },
  methods: {
    editArticle(list) {
      console.log(list);
      this.$emit('edit-form', list)
      this.id = list._id
      this.editTitle = list.title
      this.editContent = list.content
      this.editImage = list.image
    }
    ,
    updateArticle(list){
      console.log(this);
      this.$emit('update-form',this.id, this)
      
      // this.editTitle = list.title
      // this.editContent = list.content
      // this.editImage = list.image
    }
  },
  template:
    `
    <div class="card">
                    <img class="card-img-top"
                    src="https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/12/22235003/WordPress-Logo-PNG-Image.png"
                    alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">{{list.title}}</h5>
                      <p class="card-text">{{list.content}}</p>
                        <p class="card-text"><small class="text-muted">published : {{list.updated_at}}</small></p>
                        <button @click='editArticle(list)' type="button" class="btn btn-secondary" data-toggle="modal"
                        data-target=".bd-edit-modal-lg" >Edit</button>

                        <!-- -Edit From----------------------------------------------------------------------------- -->
                        <div class="modal fade bd-edit-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg ">
                          <div class="modal-content">
                            <div class="font-weight-bold mb-3">
                              <p>Title :</p>
                              <input v-model:value="editTitle" type="text" class="form-control p-3" id="recipient-name">
                            </div>
                            <div>
                              <p>Image :</p>
                              <div class="input-group mb-3">
                                <div class="custom-file">
                                  <!-- <input v-model="editImage"  type="file" class="custom-file-input" id="inputGroupFile01"> -->
                                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <wysiwyg v-model="editContent"></wysiwyg>
                            </div>
              
                            <button @click="updateArticle()" class="btn btn-secondary" data-dismiss="modal">Edit</button>
                          </div>  
                        </div>
                      </div>
                      <!-- -End Edit Form -------------------------------------------------------------------------------->

                        <button @click="deleteArticle(list._id)"   type="button" class="btn btn-secondary">Delete</button>
                      </div>
                    </div>
                  </div>
  `
})




{/* <div class="card">
<img class="card-img-top"
src="https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/12/22235003/WordPress-Logo-PNG-Image.png"
alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">{{list.title}}</h5>
  <p class="card-text">{{list.content}}</p>
    <p class="card-text"><small class="text-muted">published : {{list.updated_at}}</small></p>
    <button @click='editArticle(list)' type="button" class="btn btn-secondary" data-toggle="modal"
    data-target=".bd-edit-modal-lg" >Edit</button>

    <!-- -Edit From----------------------------------------------------------------------------- -->
    <div class="modal fade bd-edit-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg ">
      <div class="modal-content">
        <div class="font-weight-bold mb-3">
          <p>Title :</p>
          <input v-model:value="editTitle" type="text" class="form-control p-3" id="recipient-name">
        </div>
        <div>
          <p>Image :</p>
          <div class="input-group mb-3">
            <div class="custom-file">
              <!-- <input v-model="editImage"  type="file" class="custom-file-input" id="inputGroupFile01"> -->
              <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>
          </div>
        </div>
        <div>
          <wysiwyg v-model="editContent"></wysiwyg>
        </div>

        <button @click="updateArticle(list._id)" class="btn btn-secondary" data-dismiss="modal">Edit</button>
      </div>  
    </div>
  </div>
  <!-- -End Edit Form -------------------------------------------------------------------------------->

    <button @click="deleteArticle(list._id)"   type="button" class="btn btn-secondary">Delete</button>
  </div>
</div>
</div> */}
