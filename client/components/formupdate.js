Vue.component('form-update', {
    props: ['islogin', 'valuepost'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "tags-input": VoerroTagsInput,
        'picture-input': PictureInput
    },
    template: `<div class="col-9 bg-light">
    <div class="col-10 align-center">
        <div class="card my-15">
        <div class="mx-auto">
        <h2 >Update Article</h2>
        </div>      
        <div class="card-body">
        <form method="POST">             
            <input type="text" v-model="title" class="form-control mb-4"
                placeholder="text your Title Here" autocomplete="off" autofocus>
            <wysiwyg v-model="content" class="mb-4"></wysiwyg>
            <div class="d-flex justify-content-between">
           <div class="col-4">
           <b-img thumbnail fluid :src="valuepost.featured_image" alt="Image 1" style="height:150px;"></b-img>
           <picture-input
           ref="pictureInput"
           @change="onChanged"
           :width="500"
           :removable="true"
           removeButtonClass="btn btn-danger"
           :height="500"
           accept="image/jpeg, image/png, image/gif"
           buttonClass="btn btn-primary"
           :customStrings="{
           upload: '<h1>Upload it!</h1>',
           drag: 'Drag and drop your image here, or just click on me :)'}">
         
         </picture-input>
         </div>

         <div class="col-8">
         <tags-input element-id="tags"
         v-model="selectedTags" 
         :existing-tags="existTag"
          :typeahead="true"></tags-input>  
         </div>                 

            </div>
            <div class="d-flex flex-row justify-content-end">
                <button  class="btn btn-danger mx-2" @click.prevent="$parent.showAdminArea()">cancel</button>            
                <button  type="submit" class="btn btn-info" @click.prevent="updateArticle(valuepost._id)">update</button></div>
        </form>

    </div>
</div>
    </div>
</div>
`,
    data() {
        return {
            title: '',
            content: '',
            existTag: {},
            selectedTags: [],
            background: ''
        
        }
    },
    mounted() {
       if(this.valuepost){
           console.log(this.valuepost,'ini valuepost')
        this.title = this.valuepost.title
        this.content = this.valuepost.content
        this.selectedTags = this.valuepost.tags
        this.background = this.valuepost.featured_image
    
       }
    
    },
    methods: {
        onChanged(image) {
            this.file = this.$refs.pictureInput.file
            const img = {
                image
            }
            console.log(img, 'ini imgggg')
            axios.post(`${serverUrl}/tag/generate`, img)
                .then(({ data }) => {

                    console.log(data)
                    this.selectedTags = data.tags
                    console.log(this.existTag)

                })
                .catch(function (err) {
                    console.log(err)

                })

        },
        updateArticle(id){
            let formData = new FormData()
            formData.append('file', this.file)
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('tags', this.selectedTags)
            console.log(formData)
            axios
                .put(serverUrl + `/article/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    this.$parent.whereWego('adminarea')
                    this.content = ""
                    this.title = ""
                    this.file = null


                })
                .catch((err) => {
                    console.log(err)
                })

        }

    }

})